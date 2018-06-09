<template>
  <div id="show-menu">
    <div class="menu-cont">
      <div class="search" @click="onShowSearchBar">
        <i class="icon-search icon-5x"></i>
        <p class="search-des">搜索简历</p>
      </div>
      <transition name="fade">
        <div class="search-bar" v-show="showSearchBar">
          <div>
            <label>钱包地址：</label>
            <input type="text" v-model="title" placeholder="请输入地址搜索"/>
          </div>
          <div class="action">
            <label @click="onSearchClick">搜索</label>
            <label @click="onShowSearchBar">关闭</label>
          </div>
        </div>
      </transition>
      <div class="file" @click="fileClick">
        <i class=" icon-file-alt icon-5x"></i>
        <p class="file-des">生成简历</p>
      </div>
      <div class="download-file" @click="downloadClick">
        <i class=" icon-download-alt icon-5x"></i>
        <p class="file-des">下载简历</p>
      </div>
      <transition name="fade">
        <div class="download-choice" v-show="showSaveBar">
          <div class="name">
            <span>钱包地址：</span>
            <input type="text" v-model="title" placeholder="请输入地址"/>
          </div>
          <div>
            <span>尺寸：</span>
            <div class="size-choice">
              <div class="dpi96 setdpi">
                <p>96像素/英寸</p>
                <p>A4 794×1123</p>
                <input type="radio" name='radio' @click="choiceClick({'width':794,'height':1123})">
              </div>
              <div class="dpi120 setdpi">
                <p>120像素/英寸</p>
                <p>A4 1487×2105</p>
                <input type="radio" name='radio' @click="choiceClick({'width':1487,'height':2015})">
              </div>
              <div class="custom">
                width :<input type="text" v-model="customPx.width" placeholder="px">
                height:<input type="text" v-model="customPx.height" placeholder="px">
              </div>
            </div>
          </div>
          <div class="save">
            <label @click="saveResume">保存并下载</label>
            <label @click="downloadClick">关闭</label>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        msg: 'hello vue',
        customPx: {
          width: "",
          height: ""
        }
      }
    },
    props:{
      showSearchBar: {
        type: Boolean
      },
      showSaveBar: {
        type: Boolean
      },
      title: {
        type: String
      }
    },
    methods: {
      fileClick: function () {
        this.$emit('listenShowMenu', {"type": "fileClick", "showFlag": true});
      },
      downloadClick: function () {
        this.$emit('onShowSaveBar')
      },
      onShowSearchBar: function () {
        this.$emit('onShowSearchBar')
      },
      choiceClick: function (size) {
        if (size.width && size.height) {
          // this.$emit('listenShowMenu', {"type": "choiceClick", "size": size});
          // this.showDownloadChoice = !this.showDownloadChoice;
          this.customPx = {width: size.width, height: size.height}
        }
      },
      onSearchClick: function () {
        this.$emit('searchResume', this.title)
      },
      saveResume: function () {
        if (this.customPx.width && this.customPx.height) {
          this.$emit('listenShowMenu', {type: 'choiceClick', size: this.customPx, title: this.title})
          this.showDownloadChoice = !this.showDownloadChoice
        } else {
          this.$toasted.error('请选择简历尺寸')
        }
      }
    },
    components: {}
  }
</script>

<style>
  #show-menu {
    float: left;
    width: 8%;
    height: 100%;
    background: #ffffff;
  }

  .menu-cont {
    position: relative;
    width: 90%;
    height: 99%;
    margin: 0 auto;
    padding-top: 1rem;
    box-sizing: border-box;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  }

  .logo, .file, .download-file, .search, .save-resume {
    width: 100%;
    color: #42b983;
    text-align: center;
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }

  .logo a {
    color: #42b983;
  }

  .file-des, .search-des {
    font-size: 1.6rem;
  }

  /*.download-file {*/
    /*position: absolute;*/
    /*bottom: 2rem;*/
  /*}*/

  .logo, .file, .download-file:hover {
    cursor: pointer;
  }

  .save-bar {
    position: absolute;
    z-index: 9999;
    top: 30px;
    left: 110%;
    width: 50rem;
    display: flex;
    flex-direction: column;
    padding: 10px;
    background: #fff;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  }
  .save-bar input {
    width: 400px;
    height: 40px;
    border: solid 1px #f2f2f2;
    border-radius: 5px;
    padding: 3px;
  }
  .save-bar > div {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  .save-bar > div > label {
    width: 60px;
  }
  .action > label {
    display: inline-block;
    width: 60px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border: solid 1px #f2f2f2;
    border-radius: 10px;
    color: #ffffff;
  }
  .action > label:first-child {
    background: #3ca777;
    margin-left: 60px;
    margin-right: 5px;
  }
  .action > label:last-child {
    color: #313131;
  }
  .search-bar {
    position: absolute;
    z-index: 9999;
    top: 20px;
    left: 110%;
    width: 50rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10px;
    background: #fff;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  }
  .search-bar > div > label {
    width: 60px;
  }
  .search-bar > div > input {
    width: 400px;
    height: 40px;
    border: solid 1px #f2f2f2;
    border-radius: 5px;
    padding: 3px;
    margin-bottom: 8px;
  }

  .download-choice {
    position: absolute;
    z-index: 9999;
    top: 18.5rem;
    left: 110%;
    width: 40rem;
    text-align: center;
    padding: 20px 10px;
    background: #ffffff;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  }

  .download-choice > div {
    display: flex;
    align-items: center;
  }
  .download-choice > div > span {
    width: 60px;
    color: #000;
    font-weight: bolder;
    font-size: 14px;
  }
  .download-choice .name > input {
    width: 300px;
    height: 40px;
    border: solid 1px #f2f2f2;
    border-radius: 5px;
    padding: 3px;
    margin-bottom: 8px;
  }
  .download-choice .save > label {
    display: inline-block;
    width: 70px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border: solid 1px #f2f2f2;
    border-radius: 10px;
    color: #ffffff;
  }
  .download-choice .save > label:first-child {
    background: #3ca777;
    margin-left: 60px;
    margin-right: 5px;
  }
  .download-choice .save > label:last-child {
    color: #313131;
  }
  .size-choice {
    display: flex;
    align-items: flex-start;
  }
  .setdpi {
    display: inline-block;
    padding: 1rem;
    font-size: 1.6rem;
    color: #3ca777;
  }

  .custom {
    display: inline-block;
    width: 10rem;
    font-size: 1.6rem;
    color: #3ca777;
    margin-top: 12px;
  }

  .custom input {
    width: 4.5rem;
    text-align: right;
    margin-left: 5px;
    border: solid 1px #e3e3e3;
    border-radius: 3px;
  }
  .ok-choice {
    display: inline-block;
    text-align: center;
    border: 1px solid #4cd195;
    border-radius: 6px;
    padding: 1px 8px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  }

  .ok-choice:hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0);
    cursor: pointer;
  }
</style>
