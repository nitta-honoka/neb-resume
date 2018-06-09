<template>
    <div id="app">
    <ShowMenu :showSearchBar="showSearchBar"
              :showSaveBar="showSaveBar"
              :title="nebFrom"
              v-on:onShowSearchBar="onShowSearchBar"
              v-on:listenShowMenu='listenShowMenu'
              v-on:searchResume="searchResume"
              v-on:onShowSaveBar="onShowSaveBar"></ShowMenu>
    <ShowStyle ref="comShowStyle"></ShowStyle>
    <ShowResume ref="comShowResume" :resumeData="resumeData"></ShowResume>
    <transition name="fade">
      <FormList ref="comFormList" :resumeData="resumeData" v-if="formListShow"
                v-on:listenFormList='listenFormList'
                v-on:closeFormList='closeFormList'></FormList>
    </transition>
    <footer>
      基于<a href='https://nebulas.io/'>星云链</a>开发 |&nbsp;<a href="#" @click="onShowModal">帮助&反馈</a>
    </footer>
      <modal v-if="showModal" @closeModal="onShowModal">
        <h2 slot="header">
          帮助&反馈
        </h2>
        <div slot="body">
          <h3 class="body-header">功能说明</h3>

          <ul><li>通过预设字段生成简历</li><li>实时预览简历渲染</li><li>可下载 PDF 格式的简历并保存至星云链上，永不丢失</li><li>通过钱包地址可搜索和再次下载之前保存过的简历</li></ul>

          <h3 class="body-header">关于应用</h3>

          <ul><li>基于<a href="https://nebulas.io/">星云链</a>驱动</li><li>WEB 端使用请安装<a href="https://chrome.google.com/webstore/detail/nasextwallet/gehjkhmhclgnkkhpfamakecfgakkfkco">星云钱包插件</a></li><li>移动端使用请安装<a href="https://nano.nebulas.io/index_cn.html">星云钱包 APP</a></li></ul>

          <h3 class="body-header">如何反馈</h3>

          <ol><li>欢迎提交意见与反馈，<strong>特别欢迎</strong>更多简历模板定制，可通过邮件（xal821792703@gmail.com）或 <a href="https://github.com/nitta-honoka/morning-daily/issues">ISSUE</a> 的方式联系我们</li><li>欢迎参加星云链开发者<a href="https://incentive.nebulas.io/cn/signup.html?invite=LGfSR">激励活动</a>，用一杯下午茶的时间赢取 NAS 奖励</li></ol>

          <h3>现在，请尽情书写和下载您的简历吧，祝求职顺利！</h3>
        </div>
      </modal>
  </div>
</template>

<script>
  import ShowMenu from './components/menu/ShowMenu.vue'
  import ShowStyle from './components/showStyle/ShowStyle.vue'
  import ShowResume from './components/showResume/ShowResume.vue'
  import FormList from './components/form/FormList.vue'
  import Modal from './components/modal'
  import resumeData from '../static/resumedata.json'
  import {str} from './config/comstr.js'
  import isempty from 'lodash.isempty'
  import NebPay from 'nebpay.js'
  const nebPay = new NebPay()
  const nebUrl = "https://pay.nebulas.io/api/mainnet/pay"
  // const nebUrl = "https://pay.nebulas.io/api/pay"
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
        dappContract: 'n1owtMDyRr2xDcKK3ZMPRoNqEcNjQADB6ko', // mainnet
        // dappContract: 'n1wzAXG12PCiro3F9K5s66SvxJt3qGDhnLX', // testnet
        nebFrom: '',
        showModal: false
      }
    },
    created() {
      // 获得绑定钱包地址
      window.postMessage({
        'target': 'contentscript',
        'data': {},
        'method': 'getAccount'
      }, '*')

      window.addEventListener('message', e => {
        if (e.data && e.data.data && e.data.data.account) {
          this.nebFrom = e.data.data.account
        }
      })

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
        // 下载并保存简历 事件
        if (msg.type == 'choiceClick') {
          const self = this
          const resumeData = self.resumeData || {}
          const callFunc = 'save'
          const callArgs = JSON.stringify([msg.title, resumeData.head, resumeData.blogLink, resumeData.workExperience, resumeData.projectExperience, resumeData.skill, resumeData.selfAssessment])
          this.$toasted.info('交易完成后将保存并下载简历，请稍等...', {
            duration: 40000
          })
          this.serialNumber = nebPay.call(this.dappContract, '0', callFunc, callArgs, {
            callback: nebUrl,
            listener: res => {
              if (res === 'Error: Transaction rejected by user') {
                this.$toasted.clear()
                this.$toasted.error('已终止交易，无法下载简历', {
                  action: {
                    text: '重新下载',
                    onClick: () => self.listenShowMenu(msg)
                  }
                })
              }
            }
          })

          this.queryInterval = setInterval(() => this.querySaveInfo(msg), 10000)
        }
      },
      querySaveInfo: function(msg) {
        if (this.queryCount > 4) {
          // 4 次轮询未通过判为超时
          this.$toasted.clear()
          this.$toasted.error('交易超时，请稍后再试')
          clearInterval(this.queryInterval)
          return this.queryCount = 0
        }

        this.queryCount = this.queryCount + 1
        nebPay.queryPayInfo(this.serialNumber, {callback: nebUrl})
        .then(resp => {
          const result = JSON.parse(resp)
          if (result.code === 0 && result.data.status === 1) {
            // 交易成功且打包上链
            clearInterval(this.queryInterval)
            this.queryCount = 0
            this.$toasted.clear()
            this.$toasted.success('交易成功，即将为您下载简历，后续可通过钱包地址搜索下载简历')
            this.downResume(msg)
          }
        })
        .catch(err => {
          clearInterval(this.queryInterval)
          this.queryCount = 0
          this.$toasted.clear()
          this.$toasted.error('交易失败，请稍后再试')
        })
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
      searchResume: function (title) {
        const self = this
        const callFunction = 'get'
        const callArgs = `["${title}"]`
        nebPay.simulateCall(this.dappContract, '0', callFunction, callArgs, {
          callback: nebUrl,
          listener: (res) => {
            if (res.result !== 'null') {
              const result = JSON.parse(res.result) || {}
              this.resumeData = result
              this.$toasted.success('成功搜索到您保存的简历')
              this.showSearchBar = !this.showSearchBar
            } else {
              self.$toasted.error('找不到简历，请稍后再试')
            }
          }
        })
      },
      onShowModal() {
        this.showModal = !this.showModal
      },
      onShowSaveBar() {
        this.showSaveBar = !this.showSaveBar
      }
    },
    components: {
      ShowMenu,
      ShowStyle,
      ShowResume,
      FormList,
      Modal
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

  .body-header {
    margin-top: 8px;
    border-bottom: solid 1px #42b983;
  }
</style>
