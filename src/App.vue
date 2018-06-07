<template>
    <div id="app">
    <ShowMenu :showSearchBar="showSearchBar" :showSaveBar="showSaveBar"
              v-on:onShowSearchBar="onShowSearchBar"
              v-on:listenShowMenu='listenShowMenu'
              v-on:searchResume="searchResume"
              v-on:onShowSaveBar="onShowSaveBar"
              v-on:saveResume="saveResume"></ShowMenu>
    <ShowStyle ref="comShowStyle"></ShowStyle>
    <ShowResume ref="comShowResume" :resumeData="resumeData"></ShowResume>
    <transition name="fade">
      <FormList ref="comFormList" :resumeData="resumeData" v-if="formListShow"
                v-on:listenFormList='listenFormList'
                v-on:closeFormList='closeFormList'></FormList>
    </transition>
    <footer>
      基于<a href='https://nebulas.io/'>星云链</a>开发，请先安装<a href='https://github.com/ChengOrangeJu/WebExtensionWallet'>星云钱包插件</a>使用
    </footer>
  </div>
</template>

<script>
  import ShowMenu from './components/menu/ShowMenu.vue'
  import ShowStyle from './components/showStyle/ShowStyle.vue'
  import ShowResume from './components/showResume/ShowResume.vue'
  import FormList from './components/form/FormList.vue'
  import resumeData from '../static/resumedata.json'
  import {str} from './config/comstr.js'
  import isempty from 'lodash.isempty'
  import NebPay from 'nebpay.js'
  const nebPay = new NebPay()
  const mainnetUrl = "https://pay.nebulas.io/api/mainnet/pay"
  const testnetUrl = "https://pay.nebulas.io/api/pay"
  export default {
    name: 'app',
    data() {
      return {
        fromDataT: {},
        formListFlag: false,
        formListShow: false,
        showSearchBar: false,
        showSaveBar: false,
        resumeData: resumeData,
        code: str.code,
        // nebPay: new NebPay(),
        nebTo: 'n1cjAfTYk2bFVdM212UCMkMmNHJGhFCcKDZ', // mainnet
        dappContract: 'n1hrumGMTrmbT9LGbE5kdRQBFsTGjo6TbNf', // mainnet
        // nebTo: 'n1bs9seJ2QtqY7w28MkRTUkosciEwgCD4Fo', // testnet
        // dappContract: 'n1ex44prbtukVqEQSBcMjDMATj1gKxWZmDr', // testnet
        nebValue: '0',
      }
    },
    created() {
      // 检查是否安装星云钱包
      if (typeof webExtensionWallet === 'undefined') {
        alert('星云钱包环境未运行，请安装钱包插件或开启')
      } else {
        console.info('星云钱包环境运行成功')
      }
      let n = 0;
      let _this = this;

      this.$nextTick(function () {
        let len = _this.code.length;
        // 每5ms 写入一次
        var setIn = setInterval(function () {
          // 只显示作用
          if (_this.$refs.comShowStyle) {
            _this.$refs.comShowStyle.writeStyleCode(_this.code.substring(0, n));
          }
          // 渲染作用
          if (_this.$refs.comShowResume) {
            _this.$refs.comShowResume.responseStyleCode(_this.code.substring(0, n));
          }
          n++;
          if (n >= len) {
            // 停止
            clearInterval(setIn);
          }
        }, 5);
      })
    },
    methods: {
      onShowSearchBar: function() {
        this.showSearchBar = !this.showSearchBar
      },
      listenShowMenu: function (msg) {
        const self = this
        // 生成简历 事件
        if (msg.type == 'fileClick') {
          this.formListShow = msg.showFlag;
          if (this.formListFlag) {
            this.resumeData.formFlag = true;
          }
        }
        // 下载简历 事件
        if (msg.type == 'choiceClick') {
          nebPay.pay(this.nebTo, this.nebValue, {
            callback: mainnetUrl,
            listener: function (res) {
              if (res.txhash) {
                self.$toasted.success('成功生成简历，稍后将为您下载')
                self.downResume(msg)
              } else {
                self.$toasted.error('已终止交易，无法下载简历', {
                  action: {
                    text: '重新下载',
                    onClick: () => self.listenShowMenu(msg)
                  }
                })
              }
            }
          })
        }
      },
      downResume: function(msg) {
        var resumeName = this.resumeData.head.intention + "-" + this.resumeData.head.name + "-" + this.resumeData.head.tel;
        var htmlcode = document.getElementById('show-resume');
        htmlcode.style.width = msg.size.width + 'px';
        htmlcode.style.height = msg.size.height + 'px';
        // html 转 canvas 再转 pdf
        html2canvas(htmlcode, {
          onrendered: function (canvas) {
            var imgData = canvas.toDataURL('image/png');
            //Default export is a4 paper
            var doc = new jsPDF();
            doc.addImage(imgData, 'PNG', 10, 10);
            doc.save(resumeName + '.pdf');
          }
        });
      },
      listenFormList: function (msg) {
        if (msg.type == "createResClick") {
          this.formListShow = msg.showFlag;
        }
        if (msg.type == "fromData") {
          this.resumeData = msg.fromData;
          this.formListFlag = true;
        }
      },
      closeFormList: function () {
        this.formListShow = false
      },
      searchResume: function (q) {
        const self = this
        const callFunction = 'get'
        const callArgs = `["${q}"]`
        nebPay.simulateCall(this.dappContract, this.nebValue, callFunction, callArgs, {
          callback: mainnetUrl,
          listener: function (res) {
            if (res.result !== 'null') {
              const { resumeUrl } = JSON.parse(res.result)
              self.$toasted.success('成功搜索到链上简历，点击链接即可查看', {
                duration: 5000,
                action: {
                  text: '我的简历',
                  onClick: function () {
                    window.open(resumeUrl)
                  }
                }
              })
            } else {
              self.$toasted.error('找不到简历，请稍后再试')
            }
          }
        })
      },
      onShowSaveBar: function () {
        this.showSaveBar = !this.showSaveBar
      },
      saveResume: function ({tel, url}) {
        const self = this
        const callFunction = 'save'
        const callArgs = `["${tel}", "${url}"]`
        const serialNumber = nebPay.call(this.dappContract, this.nebValue, callFunction, callArgs, {
          callback: mainnetUrl,
          listener: function (params) {
            console.log(params)
            if (params.txhash) {
              self.$toasted.success('成功将简历数据存储在星云链上，待交易完成后即可通过个人电话查询简历')
            } else {
              self.$toasted.error('已终止交易，简历未能成功上链', {
                action: {
                  text: '重新保存',
                  onClick: () => self.saveResume({tel, url})
                }
              })
            }
          }
        })
      }
    },
    components: {
      ShowMenu,
      ShowStyle,
      ShowResume,
      FormList
    }
  }
</script>

<style>
  /* 内外边距通常让各个浏览器样式的表现位置不同 */
  body, div, dl, dt, dd, ul, ol, li, h1, h2, h3, h4, h5,
  h6, pre, code, form, fieldset, legend, input, textarea,
  p, blockquote, th, td, hr, button, article, aside, details,
  figcaption, figure, footer, header, menu, nav, section {
    margin: 0;
    padding: 0;
  }

  input, select, textarea {
    font-size: 100%;
  }

  input {
    outline: none;
    border-style: none
  }

  /* 去掉各 Table  cell 的边距并让其边重合 */
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  /* 去除默认边框 */
  fieldset, img {
    border: 0;
  }

  /* 去掉 firefox 下此元素的边框 */
  abbr, acronym {
    border: 0;
    font-variant: normal;
  }

  /* 一致的 del 样式 */
  del {
    text-decoration: line-through;
  }

  address, caption, cite, code, dfn, em, th, var {
    font-style: normal;
    font-weight: 500;
  }

  /* 去掉列表前的标识, li 会继承 */
  ol, ul {
    list-style: none;
  }

  /* 对齐是排版最重要的因素, 别让什么都居中 */
  caption, th {
    text-align: left;
  }

  a {
    text-decoration: none;
  }

  /*清除浮动代码*/
  .clearfloat:after {
    display: block;
    clear: both;
    content: "";
    visibility: hidden;
    height: 0
  }

  .clearfloat {
    zoom: 1
  }

  body, html {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    min-width: 1024px;
    font-size: 62.5%;
  }

  #app {
    width: 100%;
    height: 100%;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-active {
    opacity: 0
  }

  footer {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 40px;
    background: #f0f0f0;
    font-size: 14px;
  }

  footer > a {
    color: #42b983;
  }
</style>
