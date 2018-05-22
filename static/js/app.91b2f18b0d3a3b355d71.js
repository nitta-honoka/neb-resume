webpackJsonp([1],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(26)

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(16),
  /* template */
  __webpack_require__(64),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_menu_ShowMenu_vue__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_menu_ShowMenu_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_menu_ShowMenu_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_showStyle_ShowStyle_vue__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_showStyle_ShowStyle_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_showStyle_ShowStyle_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_showResume_ShowResume_vue__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_showResume_ShowResume_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_showResume_ShowResume_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_form_FormList_vue__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_form_FormList_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__components_form_FormList_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__static_resumedata_json__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__static_resumedata_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__static_resumedata_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__config_comstr_js__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_lodash_isempty__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_lodash_isempty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_lodash_isempty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_nebpay_js__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_nebpay_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_nebpay_js__);










var nebPay = new __WEBPACK_IMPORTED_MODULE_7_nebpay_js___default.a();
var mainnetUrl = "https://pay.nebulas.io/api/mainnet/pay";
var testnetUrl = "https://pay.nebulas.io/api/pay";
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'app',
  data: function data() {
    return {
      fromDataT: {},
      formListFlag: false,
      formListShow: false,
      showSearchBar: false,
      showSaveBar: false,
      resumeData: __WEBPACK_IMPORTED_MODULE_4__static_resumedata_json___default.a,
      code: __WEBPACK_IMPORTED_MODULE_5__config_comstr_js__["a" /* str */].code,

      nebTo: 'n1cjAfTYk2bFVdM212UCMkMmNHJGhFCcKDZ',
      dappContract: 'n1hrumGMTrmbT9LGbE5kdRQBFsTGjo6TbNf',
      nebValue: '0'
    };
  },
  created: function created() {
    if (typeof webExtensionWallet === 'undefined') {
      alert('星云钱包环境未运行，请安装钱包插件或开启');
    } else {
      console.info('星云钱包环境运行成功');
    }
    var n = 0;
    var _this = this;

    this.$nextTick(function () {
      var len = _this.code.length;

      var setIn = setInterval(function () {
        if (_this.$refs.comShowStyle) {
          _this.$refs.comShowStyle.writeStyleCode(_this.code.substring(0, n));
        }

        if (_this.$refs.comShowResume) {
          _this.$refs.comShowResume.responseStyleCode(_this.code.substring(0, n));
        }
        n++;
        if (n >= len) {
          clearInterval(setIn);
        }
      }, 5);
    });
  },

  methods: {
    onShowSearchBar: function onShowSearchBar() {
      this.showSearchBar = !this.showSearchBar;
    },
    listenShowMenu: function listenShowMenu(msg) {
      var self = this;

      if (msg.type == 'fileClick') {
        this.formListShow = msg.showFlag;
        if (this.formListFlag) {
          this.resumeData.formFlag = true;
        }
      }

      if (msg.type == 'choiceClick') {
        nebPay.pay(this.nebTo, this.nebValue, {
          callback: mainnetUrl,
          listener: function listener(res) {
            if (res.txhash) {
              self.$toasted.success('成功生成简历，稍后将为您下载');
              self.downResume(msg);
            } else {
              self.$toasted.error('已终止交易，无法下载简历', {
                action: {
                  text: '重新下载',
                  onClick: function onClick() {
                    return self.listenShowMenu(msg);
                  }
                }
              });
            }
          }
        });
      }
    },
    downResume: function downResume(msg) {
      var resumeName = this.resumeData.head.intention + "-" + this.resumeData.head.name + "-" + this.resumeData.head.tel;
      var htmlcode = document.getElementById('show-resume');
      htmlcode.style.width = msg.size.width + 'px';
      htmlcode.style.height = msg.size.height + 'px';

      html2canvas(htmlcode, {
        onrendered: function onrendered(canvas) {
          var imgData = canvas.toDataURL('image/png');

          var doc = new jsPDF();
          doc.addImage(imgData, 'PNG', 10, 10);
          doc.save(resumeName + '.pdf');
        }
      });
    },
    listenFormList: function listenFormList(msg) {
      if (msg.type == "createResClick") {
        this.formListShow = msg.showFlag;
      }
      if (msg.type == "fromData") {
        this.resumeData = msg.fromData;
        this.formListFlag = true;
      }
    },
    closeFormList: function closeFormList() {
      this.formListShow = false;
    },
    searchResume: function searchResume(q) {
      var self = this;
      var callFunction = 'get';
      var callArgs = '["' + q + '"]';
      nebPay.simulateCall(this.dappContract, this.nebValue, callFunction, callArgs, {
        callback: mainnetUrl,
        listener: function listener(res) {
          if (res.result !== 'null') {
            var _JSON$parse = JSON.parse(res.result),
                resumeUrl = _JSON$parse.resumeUrl;

            self.$toasted.success('成功搜索到链上简历，点击链接即可查看', {
              duration: 5000,
              action: {
                text: '我的简历',
                onClick: function onClick() {
                  window.open(resumeUrl);
                }
              }
            });
          } else {
            self.$toasted.error('找不到简历，请稍后再试');
          }
        }
      });
    },
    onShowSaveBar: function onShowSaveBar() {
      this.showSaveBar = !this.showSaveBar;
    },
    saveResume: function saveResume(_ref) {
      var tel = _ref.tel,
          url = _ref.url;

      var self = this;
      var callFunction = 'save';
      var callArgs = '["' + tel + '", "' + url + '"]';
      var serialNumber = nebPay.call(this.dappContract, this.nebValue, callFunction, callArgs, {
        callback: mainnetUrl,
        listener: function listener(params) {
          console.log(params);
          if (params.txhash) {
            self.$toasted.success('成功将简历数据存储在星云链上，待交易完成后即可通过个人电话查询简历');
          } else {
            self.$toasted.error('已终止交易，简历未能成功上链', {
              action: {
                text: '重新保存',
                onClick: function onClick() {
                  return self.saveResume({ tel: tel, url: url });
                }
              }
            });
          }
        }
      });
    }
  },
  components: {
    ShowMenu: __WEBPACK_IMPORTED_MODULE_0__components_menu_ShowMenu_vue___default.a,
    ShowStyle: __WEBPACK_IMPORTED_MODULE_1__components_showStyle_ShowStyle_vue___default.a,
    ShowResume: __WEBPACK_IMPORTED_MODULE_2__components_showResume_ShowResume_vue___default.a,
    FormList: __WEBPACK_IMPORTED_MODULE_3__components_form_FormList_vue___default.a
  }
});

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });


/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      msg: 'hello vue',
      workExperienceFlag: 0,
      projectExperienceFlag: 0,
      skillFlag: 0,
      fromData: {
        "head": {
          "name": "",
          "intention": "",
          "tel": "",
          "email": "",
          "address": "",
          "age": "",
          "sex": "",
          "school": "",
          "graduationTime": "",
          "graduation": "",
          "major": "",
          "honor": "",
          "interest": "",
          "speciality": "",
          "specialityPer": ""
        },
        "blogLink": {
          "github": "",
          "blog": ""
        },
        "workExperience": {
          "time": "",
          "experience": [{
            "name": "",
            "skill": "",
            "time": "",
            "describe": []
          }, {
            "name": "",
            "skill": "",
            "time": "",
            "describe": []
          }, {
            "name": "",
            "skill": "",
            "time": "",
            "describe": ["", "", ""]
          }]
        },
        "projectExperience": {
          "time": "",
          "experience": [{
            "name": "",
            "skill": "",
            "time": "",
            "describe": ["", "", ""]
          }, {
            "name": "",
            "skill": "",
            "time": "",
            "describe": ["", "", ""]
          }, {
            "name": "",
            "skill": "",
            "time": "",
            "describe": ["", "", ""]
          }]
        },
        "skill": [{
          "type": "",
          "describe": ["", "", ""]
        }, {
          "type": "",
          "describe": ["", "", ""]
        }, {
          "type": "",
          "describe": ["", "", ""]
        }],
        "selfAssessment": ["", "", ""]
      }
    };
  },

  props: {
    resumeData: {
      type: Object
    }
  },
  created: function created() {
    if (this.resumeData.formFlag) {
      this.fromData = this.resumeData;
    }
  },

  watch: {
    "fromData": {
      handler: function handler(val, oldVal) {
        this.$emit('listenFormList', { type: "fromData", "fromData": this.fromData });
      },
      deep: true
    }
  },
  methods: {
    createResClick: function createResClick() {
      this.$emit('listenFormList', { type: "createResClick", "showFlag": false });
    },
    workIconClick: function workIconClick() {
      this.workExperienceFlag++;
    },
    pojIconClick: function pojIconClick() {
      this.projectExperienceFlag++;
    },
    skillIconClick: function skillIconClick() {
      this.skillFlag++;
    },
    closeFormList: function closeFormList() {
      this.$emit('closeFormList');
    }
  },
  components: {}
});

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });


/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      msg: 'hello vue',
      showDownloadChoice: false,
      q: '',
      url: '',
      tel: '',
      customPx: {
        width: "",
        height: ""
      }
    };
  },

  props: {
    showSearchBar: {
      type: Boolean
    },
    showSaveBar: {
      type: Boolean
    }
  },
  methods: {
    fileClick: function fileClick() {
      this.$emit('listenShowMenu', { "type": "fileClick", "showFlag": true });
    },
    downloadClick: function downloadClick() {
      this.showDownloadChoice = !this.showDownloadChoice;
    },
    onShowSearchBar: function onShowSearchBar() {
      this.$emit('onShowSearchBar');
    },
    choiceClick: function choiceClick(size) {
      if (size.width && size.height) {
        this.$emit('listenShowMenu', { "type": "choiceClick", "size": size });
        this.showDownloadChoice = !this.showDownloadChoice;
      }
    },
    onSearchClick: function onSearchClick() {
      this.$emit('searchResume', this.q);
    },
    onShowSaveBar: function onShowSaveBar() {
      this.$emit('onShowSaveBar');
    },
    onSaveResume: function onSaveResume() {
      this.$emit('saveResume', { url: this.url, tel: this.tel });
    }
  },
  components: {}
});

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });


/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            msg: 'hello vue',
            ttc: 80,
            resStyleCode: "",
            pfdSize: {
                width: "",
                height: ""
            }
        };
    },

    props: {
        resumeData: {
            type: Object
        }
    },
    methods: {
        responseStyleCode: function responseStyleCode(code) {
            this.resStyleCode = "<style>" + code + "</style>";
        }
    },
    components: {}
});

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });


/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            msg: 'hello vue',
            styleMsg: ""
        };
    },

    methods: {
        writeStyleCode: function writeStyleCode(code) {
            this.styleMsg = code;

            document.getElementById('style_content').scrollTop = document.getElementById('style_content').scrollHeight;
        }
    }
});

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return str; });

var str = {
    code: "\n\n     /* \u53C8\u5230\u4E86\u62DB\u8058\u5B63\u5566 !\n        \u57FA\u4E8E\u661F\u4E91\u94FE\u548C vue \u505A\u4E86\u4E2A\u80FD\u81EA\u52A8\u751F\u6210\u7B80\u5386\u7684\u5C0F\u9879\u76EE\n        \u80FD\u652F\u6301\u7B80\u5386\u7F16\u8F91\u548C\u751F\u6210 PDF\u683C\u5F0F\u7684\u7B80\u5386\u54E6!\n     ------------------------------------*/\n     /* \u597D\u4E86,\u5F00\u59CB\u5236\u4F5C\u7B80\u5386\n        \u5148\u5BF9\u5DE6\u8FB9\u8FDB\u884C\u5E03\u5C40\n     ------------------------------------*/\n     .section-left{\n         float: left;\n         width: 30%;\n         height: 100%;\n         text-align: center;\n         color: #313131;\n         line-height: 1.8;\n\n     }\n     /* \u53F3\u8FB9\u5E03\u5C40\n      ------------------------------------*/\n     .section-right{\n         float: left;\n         width: 69%;\n         height: 100%;\n         padding: 1rem;\n         box-sizing: border-box;\n         background: #ffffff;\n\n     }\n     .section-left i{\n     color: rgb(151, 151, 151);\n     font-size: 1.5rem;\n\n    }\n    .section-left h2{\n        font-size: 2.5rem;\n    }\n    .section-left h3{\n        font-size: 2rem;\n    }\n    .section-left p{\n        font-size: 1.5rem;\n    }\n    /* \u5934\u90E8\u4FE1\u606F\n    ------------------------------------*/\n    .section-left .head{\n        padding-top: 2rem;\n        background: rgb(236,236,236);\n\n    }\n    .head ul{\n        width: 100%;\n        margin: 1rem 0;\n        border-top: 2px solid rgba(151, 151, 151,0.5);\n        border-bottom:2px solid rgba(151, 151, 151,0.5);\n    }\n    .head ul li{\n        float: left;\n        width: 32.1%;\n    }\n    .head ul li + li{\n        border-left: 2px solid rgba(151, 151, 151,0.5);\n    }\n    .section-left .item-title{\n        border-bottom: 2px solid rgba(151, 151, 151,0.5);\n        padding: 0 0.4rem;\n    }\n    /* \u6559\u80B2\u80CC\u666F\n    ------------------------------------*/\n    .section-left .edu{\n        line-height: 2;\n        margin-bottom: 0.8rem;\n    }\n    .edu .honor-title{\n        font-size: 1.8rem;\n        color: #3d3d3d;\n        font-weight: 500;\n    }\n    /* \u5174\u8DA3\u7231\u597D\n    ------------------------------------*/\n    .section-left .interest{\n        margin-bottom: 0.8rem;\n\n    }\n    .section-left .inte-span{\n        display: inline-block;\n        font-size: 1.4rem;\n        border: 1px solid rgba(151, 151, 151,0.5);\n        padding: 0 1rem;\n        margin: 0.2rem 1rem;\n        border-radius: 1rem;\n    }\n    /* \u6280\u80FD\u7279\u957F\n    ------------------------------------*/\n    .section-left .skill{\n        width: 100%;\n    }\n    .skill h3{\n        margin-bottom: 1rem;\n    }\n    .skill .sk{\n        position: relative;\n        width: 90%;\n        margin: 0 auto;\n        text-align: left;\n        text-indent: 1.5rem;\n        font-size: 1.6rem;\n    }\n    .skill .sk-wrap{\n        position: absolute;\n        top:0;\n        right: 0;\n        bottom: 0;\n        margin: auto 0;\n        width: 70%;\n        height: 1rem;\n        border-radius: 0.5rem;\n        background:  rgba(151, 151, 151,0.5);\n    }\n    .skill .sk-per{\n        display: block;\n        width: 90%;\n        height: 100%;\n        background: rgba(151, 151, 151,0.9);\n        border-radius: 0.4rem;\n    }\n\n    /* \u53F3\u8FB9 \u535A\u5BA2\u94FE\u63A5\n     ------------------------------------*/\n    .section-right .blog-box{\n        margin-bottom: 1rem;\n    }\n    .section-right .blog{\n        float: right;\n        font-size: 1.4rem;\n        margin-right: 2rem;\n    }\n    .blog .title-name{\n        font-size: 1.6rem;\n    }\n    .blog .title-name:after{\n        content: '';\n        height: 2px;\n        width: 100%;\n        display:block;\n        margin-bottom: 2px;\n    }\n    .blog .link{\n        line-height: 2rem;\n        margin-bottom: 2px;\n        padding-right: 0.5rem;\n\n    }\n    .blog .link i{\n        margin-right: 1rem;\n    }\n    .blog .link a{\n        color: #313131;\n    }\n    /* \u5DE5\u4F5C\u7ECF\u9A8C\n     ------------------------------------*/\n    .experience{\n        padding: 0.5rem;\n        box-sizing: border-box;\n        font-size: 1.4rem;\n        margin-bottom: 1rem;\n        /*box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);*/\n    }\n    .experience .title{\n        width: 100%;\n        height: 2rem;\n    }\n    .experience .title:after{\n        content: '';\n        height: 2px;\n        width: 100%;\n        display:block;\n        margin-bottom: 2px;\n        background: linear-gradient(to right, #ffffff, rgba(135, 135, 135, 0.5) 50%, #ffffff);\n    }\n    .title .title-name{\n        font-size: 1.8rem;\n        display: inline-block;\n    }\n    .title .title-date{\n        float: right;\n    }\n    .experience .item-title{\n        padding: 0.6rem 0;\n        color: #42b983;\n    }\n    .experience .item-title span{\n        display: inline-block;\n    }\n    .item-title .item-name{\n        font-size: 1.6rem;\n    }\n    .item-title .item-skill{\n\n    }\n    .item-title .item-date{\n        float: right;\n    }\n    .experience .item ul{\n        margin-left: 1.5rem;\n        list-style: circle;\n    }\n    .self-evaluation .title{\n        margin-bottom: 1rem;\n    }\n    .self-evaluation p{\n        line-height: 1.4;\n    }\n    /* \u7F16\u8F91\u7ED3\u675F !!!!\n       \u754C\u9762\u8BBE\u8BA1\u4E11\u4E86\u70B9\n       \u80FD\u63D0\u4F9B\u597D\u770B\u7684\u8BBE\u8BA1\u56FE\u975E\u5E38\u611F\u6FC0\u4E0D\u5C3D!!!!\n     ------------------------------------*/\n    "
};

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__App__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue_resource__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vue_toasted__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vue_toasted___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_vue_toasted__);






__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_2_vue_resource__["a" /* default */]);
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_3_vue_toasted___default.a, {
  position: 'top-center',
  duration: 3000
});
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].config.productionTip = false;

new __WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */]({
  el: '#app',
  template: '<App/>',
  components: { App: __WEBPACK_IMPORTED_MODULE_1__App___default.a }
});

/***/ }),
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 27 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 28 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 29 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 30 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(29)

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(17),
  /* template */
  __webpack_require__(67),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(30)

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(18),
  /* template */
  __webpack_require__(68),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(27)

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(19),
  /* template */
  __webpack_require__(65),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(28)

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(20),
  /* template */
  __webpack_require__(66),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 64 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "app"
    }
  }, [_c('ShowMenu', {
    attrs: {
      "showSearchBar": _vm.showSearchBar,
      "showSaveBar": _vm.showSaveBar
    },
    on: {
      "onShowSearchBar": _vm.onShowSearchBar,
      "listenShowMenu": _vm.listenShowMenu,
      "searchResume": _vm.searchResume,
      "onShowSaveBar": _vm.onShowSaveBar,
      "saveResume": _vm.saveResume
    }
  }), _vm._v(" "), _c('ShowStyle', {
    ref: "comShowStyle"
  }), _vm._v(" "), _c('ShowResume', {
    ref: "comShowResume",
    attrs: {
      "resumeData": _vm.resumeData
    }
  }), _vm._v(" "), _c('transition', {
    attrs: {
      "name": "fade"
    }
  }, [(_vm.formListShow) ? _c('FormList', {
    ref: "comFormList",
    attrs: {
      "resumeData": _vm.resumeData
    },
    on: {
      "listenFormList": _vm.listenFormList,
      "closeFormList": _vm.closeFormList
    }
  }) : _vm._e()], 1), _vm._v(" "), _vm._m(0)], 1)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('footer', [_vm._v("\n    基于"), _c('a', {
    attrs: {
      "href": "https://nebulas.io/"
    }
  }, [_vm._v("星云链")]), _vm._v("开发，请先安装"), _c('a', {
    attrs: {
      "href": "https://github.com/ChengOrangeJu/WebExtensionWallet"
    }
  }, [_vm._v("星云钱包插件")]), _vm._v("使用，如有问题或反馈欢迎前往\n    "), _c('a', {
    attrs: {
      "href": "https://github.com/nitta-honoka/neb-resume"
    }
  }, [_vm._v("Github")]), _vm._v("提交issue\n  ")])
}]}

/***/ }),
/* 65 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "show-resume"
    }
  }, [_c('div', {
    staticClass: "resume-content clearfloat",
    style: ({
      width: _vm.pfdSize.width + 'px',
      height: _vm.pfdSize.height + 'px'
    }),
    attrs: {
      "id": "resume_content"
    }
  }, [_c('section', {
    staticClass: "section-left"
  }, [_c('div', {
    staticClass: "head"
  }, [_c('h2', [_vm._v(_vm._s(_vm.resumeData.head.name))]), _vm._v(" "), _c('h3', [_vm._v("求职意向:" + _vm._s(_vm.resumeData.head.intention))]), _vm._v(" "), _vm._m(0), _vm._v(" "), _c('p', [_vm._v(_vm._s(_vm.resumeData.head.tel))]), _vm._v(" "), _vm._m(1), _vm._v(" "), _c('p', [_vm._v(_vm._s(_vm.resumeData.head.email))]), _vm._v(" "), _c('ul', {
    staticClass: "clearfloat"
  }, [_c('li', [_c('p', [_vm._v("住址")]), _vm._v(" "), _c('p', [_vm._v(_vm._s(_vm.resumeData.head.address))])]), _vm._v(" "), _c('li', [_c('p', [_vm._v("年龄")]), _vm._v(" "), _c('p', [_vm._v(_vm._s(_vm.resumeData.head.age))])]), _vm._v(" "), _c('li', [_c('p', [_vm._v("性别")]), _vm._v(" "), _c('p', [_vm._v(_vm._s(_vm.resumeData.head.sex))])])])]), _vm._v(" "), _c('div', {
    staticClass: "edu"
  }, [_vm._m(2), _vm._v(" "), _c('p', [_vm._v(_vm._s(_vm.resumeData.head.school) + " (" + _vm._s(_vm.resumeData.head.graduation) + ")")]), _vm._v(" "), _c('p', [_vm._v(_vm._s(_vm.resumeData.head.graduationTime))]), _vm._v(" "), _c('p', [_vm._v("专业:" + _vm._s(_vm.resumeData.head.major))]), _vm._v(" "), _c('p', {
    staticClass: "honor-title"
  }, [_vm._v("荣获")]), _vm._v(" "), _vm._l((_vm.resumeData.head.honor.split('、')), function(item) {
    return _c('p', [_vm._v(_vm._s(item))])
  })], 2), _vm._v(" "), _c('div', {
    staticClass: "interest"
  }, [_vm._m(3), _vm._v(" "), _c('p', _vm._l((_vm.resumeData.head.interest.split('、')), function(item) {
    return _c('span', {
      staticClass: "inte-span"
    }, [_vm._v(_vm._s(item))])
  }))]), _vm._v(" "), _c('div', {
    staticClass: "skill"
  }, [_vm._m(4), _vm._v(" "), _vm._l((_vm.resumeData.head.speciality.split('、')), function(item, index) {
    return _c('div', {
      staticClass: "sk"
    }, [_vm._v(_vm._s(item) + "\n                    "), _c('div', {
      staticClass: "sk-wrap"
    }, [_c('span', {
      staticClass: "sk-per",
      style: ({
        width: _vm.resumeData.head.specialityPer.split('、')[index] + '%'
      })
    })])])
  })], 2)]), _vm._v(" "), _c('section', {
    staticClass: "section-right"
  }, [_c('div', {
    staticClass: "blog-box clearfloat"
  }, [_c('div', {
    staticClass: "blog"
  }, [_c('div', {
    staticClass: "title-name"
  }, [_vm._v("BLOG LINK")]), _vm._v(" "), _c('div', {
    staticClass: "link github"
  }, [_c('i', {
    staticClass: "icon-github-alt icon-1x"
  }), _vm._v("Github: "), _c('a', {
    attrs: {
      "target": "_blank",
      "href": "https://github.com/ZengTianShengZ"
    }
  }, [_vm._v(_vm._s(_vm.resumeData.blogLink.github))])]), _vm._v(" "), _c('div', {
    staticClass: "link personal-blog"
  }, [_c('i', {
    staticClass: "icon-flag icon-1x"
  }), _vm._v("技术博文 "), _c('a', {
    attrs: {
      "target": "_blank",
      "href": "https://segmentfault.com/u/zss"
    }
  }, [_vm._v(_vm._s(_vm.resumeData.blogLink.blog))])])])]), _vm._v(" "), _c('div', {
    staticClass: "experience work-experience"
  }, [_c('div', {
    staticClass: "title"
  }, [_c('div', {
    staticClass: "title-name"
  }, [_vm._v("工作经验")]), _vm._v(" "), _c('div', {
    staticClass: "title-date"
  }, [_vm._v(_vm._s(_vm.resumeData.workExperience.time))])]), _vm._v(" "), _vm._l((_vm.resumeData.workExperience.experience), function(item) {
    return _c('div', {
      staticClass: "show"
    }, [(item.name) ? _c('div', {
      staticClass: "item"
    }, [_c('div', {
      staticClass: "item-title"
    }, [_c('span', {
      staticClass: "item-name"
    }, [_vm._v(_vm._s(item.name))]), _vm._v(" "), _c('span', {
      staticClass: "item-skill"
    }, [_vm._v("/ " + _vm._s(item.skill))]), _vm._v(" "), _c('span', {
      staticClass: "item-date"
    }, [_vm._v(_vm._s(item.time))])]), _vm._v(" "), _c('ul', _vm._l((item.describe), function(des) {
      return _c('li', [_vm._v(_vm._s(des))])
    }))]) : _vm._e()])
  })], 2), _vm._v(" "), _c('div', {
    staticClass: "experience project-experience"
  }, [_c('div', {
    staticClass: "title"
  }, [_c('div', {
    staticClass: "title-name"
  }, [_vm._v("项目经验")]), _vm._v(" "), _c('div', {
    staticClass: "title-date"
  }, [_vm._v(_vm._s(_vm.resumeData.projectExperience.time))])]), _vm._v(" "), _vm._l((_vm.resumeData.projectExperience.experience), function(item) {
    return _c('div', {
      staticClass: "show"
    }, [(item.name) ? _c('div', {
      staticClass: "item"
    }, [_c('div', {
      staticClass: "item-title"
    }, [_c('span', {
      staticClass: "item-name"
    }, [_vm._v(_vm._s(item.name))]), _vm._v(" "), _c('span', {
      staticClass: "item-skill"
    }, [_vm._v("/ " + _vm._s(item.skill))]), _vm._v(" "), _c('span', {
      staticClass: "item-date"
    }, [_vm._v(_vm._s(item.time))])]), _vm._v(" "), _c('ul', _vm._l((item.describe), function(des) {
      return (des != '') ? _c('li', [_vm._v(_vm._s(des))]) : _vm._e()
    }))]) : _vm._e()])
  })], 2), _vm._v(" "), _c('div', {
    staticClass: "experience skill-experience"
  }, [_vm._m(5), _vm._v(" "), _vm._l((_vm.resumeData.skill), function(item) {
    return _c('div', {
      staticClass: "show"
    }, [(item.type) ? _c('div', {
      staticClass: "item"
    }, [_c('div', {
      staticClass: "item-title"
    }, [_c('span', {
      staticClass: "item-name"
    }, [_vm._v(_vm._s(item.type))])]), _vm._v(" "), _c('ul', _vm._l((item.describe), function(des) {
      return _c('li', [_vm._v(_vm._s(des))])
    }))]) : _vm._e()])
  })], 2), _vm._v(" "), _c('div', {
    staticClass: "experience self-evaluation"
  }, [_vm._m(6), _vm._v(" "), _vm._l((_vm.resumeData.selfAssessment), function(item) {
    return _c('p', {
      staticClass: "eval-detail"
    }, [_vm._v(_vm._s(item))])
  })], 2)])]), _vm._v(" "), _c('div', {
    domProps: {
      "innerHTML": _vm._s(_vm.resStyleCode)
    }
  })])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('p', [_c('i', {
    staticClass: "icon-phone icon-2x"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('p', [_c('i', {
    staticClass: "icon-envelope-alt icon-2x"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('h3', [_c('span', {
    staticClass: "item-title"
  }, [_vm._v("教育背景")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('h3', [_c('span', {
    staticClass: "item-title"
  }, [_vm._v("兴趣爱好")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('h3', [_c('span', {
    staticClass: "item-title"
  }, [_vm._v("技能特长")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "title"
  }, [_c('div', {
    staticClass: "title-name"
  }, [_vm._v("掌握技能")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "title"
  }, [_c('div', {
    staticClass: "title-name"
  }, [_vm._v("自我评价")])])
}]}

/***/ }),
/* 66 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "show-style"
    }
  }, [_c('div', {
    staticClass: "style-content",
    attrs: {
      "id": "style_content"
    }
  }, [_c('pre', {
    staticClass: "style-code",
    domProps: {
      "innerHTML": _vm._s(_vm.styleMsg)
    }
  })])])
},staticRenderFns: []}

/***/ }),
/* 67 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "from_box"
    }
  }, [_c('div', {
    staticClass: "from-content"
  }, [_c('div', {
    staticClass: "from-content-item"
  }, [_c('div', {
    staticClass: "item"
  }, [_c('div', {
    staticClass: "item-head"
  }, [_vm._v("个人基本资料")]), _vm._v(" "), _c('div', {
    staticClass: "item-content clearfloat"
  }, [_c('div', {
    staticClass: "inp-short"
  }, [_vm._v("姓名:"), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.fromData.head.name),
      expression: "fromData.head.name"
    }],
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.fromData.head.name)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.fromData.head, "name", $event.target.value)
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "inp-short"
  }, [_vm._v("意向:"), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.fromData.head.intention),
      expression: "fromData.head.intention"
    }],
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.fromData.head.intention)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.fromData.head, "intention", $event.target.value)
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "inp-short"
  }, [_vm._v("邮箱:"), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.fromData.head.email),
      expression: "fromData.head.email"
    }],
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.fromData.head.email)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.fromData.head, "email", $event.target.value)
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "inp-short"
  }, [_vm._v("电话:"), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.fromData.head.tel),
      expression: "fromData.head.tel"
    }],
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.fromData.head.tel)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.fromData.head, "tel", $event.target.value)
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "inp-short"
  }, [_vm._v("住址:"), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.fromData.head.address),
      expression: "fromData.head.address"
    }],
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.fromData.head.address)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.fromData.head, "address", $event.target.value)
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "inp-short"
  }, [_vm._v("性别:"), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.fromData.head.sex),
      expression: "fromData.head.sex"
    }],
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.fromData.head.sex)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.fromData.head, "sex", $event.target.value)
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "inp-short"
  }, [_vm._v("年龄:"), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.fromData.head.age),
      expression: "fromData.head.age"
    }],
    attrs: {
      "type": "text",
      "placeholder": "1770.8.23"
    },
    domProps: {
      "value": (_vm.fromData.head.age)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.fromData.head, "age", $event.target.value)
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "inp-short"
  }, [_vm._v("毕业学校:"), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.fromData.head.school),
      expression: "fromData.head.school"
    }],
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.fromData.head.school)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.fromData.head, "school", $event.target.value)
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "inp-short"
  }, [_vm._v("学历:"), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.fromData.head.graduation),
      expression: "fromData.head.graduation"
    }],
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.fromData.head.graduation)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.fromData.head, "graduation", $event.target.value)
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "inp-short"
  }, [_vm._v("毕业时间:"), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.fromData.head.graduationTime),
      expression: "fromData.head.graduationTime"
    }],
    attrs: {
      "type": "text",
      "placeholder": "2012-9 至 2016-7"
    },
    domProps: {
      "value": (_vm.fromData.head.graduationTime)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.fromData.head, "graduationTime", $event.target.value)
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "inp-short"
  }, [_vm._v("专业:"), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.fromData.head.major),
      expression: "fromData.head.major"
    }],
    attrs: {
      "type": "text",
      "placeholder": ""
    },
    domProps: {
      "value": (_vm.fromData.head.major)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.fromData.head, "major", $event.target.value)
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "inp-short"
  }, [_vm._v("荣获:"), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.fromData.head.honor),
      expression: "fromData.head.honor"
    }],
    attrs: {
      "type": "text",
      "placeholder": "多份殊荣顿号隔开"
    },
    domProps: {
      "value": (_vm.fromData.head.honor)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.fromData.head, "honor", $event.target.value)
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "inp-short"
  }, [_vm._v("技能特长:"), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.fromData.head.speciality),
      expression: "fromData.head.speciality"
    }],
    attrs: {
      "type": "text",
      "placeholder": "顿号隔开"
    },
    domProps: {
      "value": (_vm.fromData.head.speciality)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.fromData.head, "speciality", $event.target.value)
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "inp-short"
  }, [_vm._v("技能特长对应分数:"), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.fromData.head.specialityPer),
      expression: "fromData.head.specialityPer"
    }],
    attrs: {
      "type": "text",
      "placeholder": "顿号隔开 如 80、90"
    },
    domProps: {
      "value": (_vm.fromData.head.specialityPer)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.fromData.head, "specialityPer", $event.target.value)
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "inp-short"
  }, [_vm._v("兴趣爱好:"), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.fromData.head.interest),
      expression: "fromData.head.interest"
    }],
    attrs: {
      "type": "text",
      "placeholder": "逗号隔开"
    },
    domProps: {
      "value": (_vm.fromData.head.interest)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.fromData.head, "interest", $event.target.value)
      }
    }
  })])]), _vm._v(" "), _vm._m(0)]), _vm._v(" "), _c('div', {
    staticClass: "item"
  }, [_c('div', {
    staticClass: "item-head"
  }, [_vm._v("技术链接")]), _vm._v(" "), _c('div', {
    staticClass: "item-content"
  }, [_c('div', {
    staticClass: "inp-long"
  }, [_vm._v("GitHub:"), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.fromData.blogLink.github),
      expression: "fromData.blogLink.github"
    }],
    attrs: {
      "type": "text",
      "placeholder": "选填"
    },
    domProps: {
      "value": (_vm.fromData.blogLink.github)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.fromData.blogLink, "github", $event.target.value)
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "inp-long"
  }, [_vm._v("技术博文:"), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.fromData.blogLink.blog),
      expression: "fromData.blogLink.blog"
    }],
    attrs: {
      "type": "text",
      "placeholder": "选填"
    },
    domProps: {
      "value": (_vm.fromData.blogLink.blog)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.fromData.blogLink, "blog", $event.target.value)
      }
    }
  })])]), _vm._v(" "), _vm._m(1)]), _vm._v(" "), _c('div', {
    staticClass: "item"
  }, [_c('div', {
    staticClass: "item-head"
  }, [_c('span', [_vm._v("工作经验")]), _vm._v(" "), _c('span', {
    staticClass: "item-head-time"
  }, [_vm._v("时间:"), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.fromData.workExperience.time),
      expression: "fromData.workExperience.time"
    }],
    attrs: {
      "type": "text",
      "placeholder": "2001-2 至 今"
    },
    domProps: {
      "value": (_vm.fromData.workExperience.time)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.fromData.workExperience, "time", $event.target.value)
      }
    }
  })])]), _vm._v(" "), (_vm.workExperienceFlag >= 0) ? _c('div', {
    staticClass: "item-content"
  }, [_c('div', {
    staticClass: "contt clearfloat"
  }, [_c('div', {
    staticClass: "inp-short"
  }, [_vm._v("项目名称:"), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.fromData.workExperience.experience[0].name),
      expression: "fromData.workExperience.experience[0].name"
    }],
    attrs: {
      "type": "text",
      "placeholder": ""
    },
    domProps: {
      "value": (_vm.fromData.workExperience.experience[0].name)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.fromData.workExperience.experience[0], "name", $event.target.value)
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "inp-short"
  }, [_vm._v("项目技术:"), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.fromData.workExperience.experience[0].skill),
      expression: "fromData.workExperience.experience[0].skill"
    }],
    attrs: {
      "type": "text",
      "placeholder": ""
    },
    domProps: {
      "value": (_vm.fromData.workExperience.experience[0].skill)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.fromData.workExperience.experience[0], "skill", $event.target.value)
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "inp-short"
  }, [_vm._v("项目时间:"), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.fromData.workExperience.experience[0].time),
      expression: "fromData.workExperience.experience[0].time"
    }],
    attrs: {
      "type": "text",
      "placeholder": "2001-2 至 今"
    },
    domProps: {
      "value": (_vm.fromData.workExperience.experience[0].time)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.fromData.workExperience.experience[0], "time", $event.target.value)
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "inp-long inp-long-more"
  }, [_vm._v("项目简介:\n            "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.fromData.workExperience.experience[0].describe),
      expression: "fromData.workExperience.experience[0].describe"
    }],
    attrs: {
      "type": "text",
      "placeholder": "1、"
    },
    domProps: {
      "value": (_vm.fromData.workExperience.experience[0].describe)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.fromData.workExperience.experience[0], "describe", $event.target.value)
      }
    }
  })])]) : _vm._e(), _vm._v(" "), (_vm.workExperienceFlag >= 1) ? _c('div', {
    staticClass: "item-content"
  }, [_c('div', {
    staticClass: "contt clearfloat"
  }, [_c('div', {
    staticClass: "inp-short"
  }, [_vm._v("项目名称:"), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.fromData.workExperience.experience[1].name),
      expression: "fromData.workExperience.experience[1].name"
    }],
    attrs: {
      "type": "text",
      "placeholder": ""
    },
    domProps: {
      "value": (_vm.fromData.workExperience.experience[1].name)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.fromData.workExperience.experience[1], "name", $event.target.value)
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "inp-short"
  }, [_vm._v("项目技术:"), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.fromData.workExperience.experience[1].skill),
      expression: "fromData.workExperience.experience[1].skill"
    }],
    attrs: {
      "type": "text",
      "placeholder": ""
    },
    domProps: {
      "value": (_vm.fromData.workExperience.experience[1].skill)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.fromData.workExperience.experience[1], "skill", $event.target.value)
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "inp-short"
  }, [_vm._v("项目时间:"), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.fromData.workExperience.experience[1].time),
      expression: "fromData.workExperience.experience[1].time"
    }],
    attrs: {
      "type": "text",
      "placeholder": "2001-2 至 今"
    },
    domProps: {
      "value": (_vm.fromData.workExperience.experience[1].time)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.fromData.workExperience.experience[1], "time", $event.target.value)
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "inp-long inp-long-more"
  }, [_vm._v("项目简介:\n            "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.fromData.workExperience.experience[1].describe),
      expression: "fromData.workExperience.experience[1].describe"
    }],
    attrs: {
      "type": "text",
      "placeholder": "1、"
    },
    domProps: {
      "value": (_vm.fromData.workExperience.experience[1].describe)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.fromData.workExperience.experience[1], "describe", $event.target.value)
      }
    }
  })])]) : _vm._e(), _vm._v(" "), (_vm.workExperienceFlag >= 2) ? _c('div', {
    staticClass: "item-content"
  }, [_c('div', {
    staticClass: "contt clearfloat"
  }, [_c('div', {
    staticClass: "inp-short"
  }, [_vm._v("项目名称:"), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.fromData.workExperience.experience[2].name),
      expression: "fromData.workExperience.experience[2].name"
    }],
    attrs: {
      "type": "text",
      "placeholder": ""
    },
    domProps: {
      "value": (_vm.fromData.workExperience.experience[2].name)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.fromData.workExperience.experience[2], "name", $event.target.value)
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "inp-short"
  }, [_vm._v("项目技术:"), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.fromData.workExperience.experience[2].skill),
      expression: "fromData.workExperience.experience[2].skill"
    }],
    attrs: {
      "type": "text",
      "placeholder": ""
    },
    domProps: {
      "value": (_vm.fromData.workExperience.experience[2].skill)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.fromData.workExperience.experience[2], "skill", $event.target.value)
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "inp-short"
  }, [_vm._v("项目时间:"), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.fromData.workExperience.experience[2].time),
      expression: "fromData.workExperience.experience[2].time"
    }],
    attrs: {
      "type": "text",
      "placeholder": "2001-2 至 今"
    },
    domProps: {
      "value": (_vm.fromData.workExperience.experience[2].time)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.fromData.workExperience.experience[2], "time", $event.target.value)
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "inp-long inp-long-more"
  }, [_vm._v("项目简介:\n            "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.fromData.workExperience.experience[2].describe),
      expression: "fromData.workExperience.experience[2].describe"
    }],
    attrs: {
      "type": "text",
      "placeholder": "1、"
    },
    domProps: {
      "value": (_vm.fromData.workExperience.experience[2].describe)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.fromData.workExperience.experience[2], "describe", $event.target.value)
      }
    }
  })])]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "item-footer"
  }, [_c('i', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.workExperienceFlag < 2),
      expression: "workExperienceFlag<2"
    }],
    staticClass: " icon-plus-sign-alt icon-1x",
    on: {
      "click": _vm.workIconClick
    }
  }), _vm._v("   \n        ")])]), _vm._v(" "), _c('div', {
    staticClass: "item"
  }, [_c('div', {
    staticClass: "item-head"
  }, [_c('span', [_vm._v("项目经验")]), _vm._v(" "), _c('span', {
    staticClass: "item-head-time"
  }, [_vm._v("时间:"), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.fromData.projectExperience.time),
      expression: "fromData.projectExperience.time"
    }],
    attrs: {
      "type": "text",
      "placeholder": "2001-2 至 今"
    },
    domProps: {
      "value": (_vm.fromData.projectExperience.time)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.fromData.projectExperience, "time", $event.target.value)
      }
    }
  })])]), _vm._v(" "), (_vm.projectExperienceFlag >= 0) ? _c('div', {
    staticClass: "item-content"
  }, [_c('div', {
    staticClass: "contt clearfloat"
  }, [_c('div', {
    staticClass: "inp-short"
  }, [_vm._v("项目名称:"), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.fromData.projectExperience.experience[0].name),
      expression: "fromData.projectExperience.experience[0].name"
    }],
    attrs: {
      "type": "text",
      "placeholder": ""
    },
    domProps: {
      "value": (_vm.fromData.projectExperience.experience[0].name)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.fromData.projectExperience.experience[0], "name", $event.target.value)
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "inp-short"
  }, [_vm._v("项目技术:"), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.fromData.projectExperience.experience[0].skill),
      expression: "fromData.projectExperience.experience[0].skill"
    }],
    attrs: {
      "type": "text",
      "placeholder": ""
    },
    domProps: {
      "value": (_vm.fromData.projectExperience.experience[0].skill)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.fromData.projectExperience.experience[0], "skill", $event.target.value)
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "inp-short"
  }, [_vm._v("项目时间:"), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.fromData.projectExperience.experience[0].time),
      expression: "fromData.projectExperience.experience[0].time"
    }],
    attrs: {
      "type": "text",
      "placeholder": "2001-2 至 今"
    },
    domProps: {
      "value": (_vm.fromData.projectExperience.experience[0].time)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.fromData.projectExperience.experience[0], "time", $event.target.value)
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "inp-long inp-long-more"
  }, [_vm._v("项目简介:\n            "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.fromData.projectExperience.experience[0].describe),
      expression: "fromData.projectExperience.experience[0].describe"
    }],
    attrs: {
      "type": "text",
      "placeholder": "1、"
    },
    domProps: {
      "value": (_vm.fromData.projectExperience.experience[0].describe)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.fromData.projectExperience.experience[0], "describe", $event.target.value)
      }
    }
  })])]) : _vm._e(), _vm._v(" "), (_vm.projectExperienceFlag >= 1) ? _c('div', {
    staticClass: "item-content"
  }, [_c('div', {
    staticClass: "contt clearfloat"
  }, [_c('div', {
    staticClass: "inp-short"
  }, [_vm._v("项目名称:"), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.fromData.projectExperience.experience[1].name),
      expression: "fromData.projectExperience.experience[1].name"
    }],
    attrs: {
      "type": "text",
      "placeholder": ""
    },
    domProps: {
      "value": (_vm.fromData.projectExperience.experience[1].name)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.fromData.projectExperience.experience[1], "name", $event.target.value)
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "inp-short"
  }, [_vm._v("项目技术:"), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.fromData.projectExperience.experience[1].skill),
      expression: "fromData.projectExperience.experience[1].skill"
    }],
    attrs: {
      "type": "text",
      "placeholder": ""
    },
    domProps: {
      "value": (_vm.fromData.projectExperience.experience[1].skill)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.fromData.projectExperience.experience[1], "skill", $event.target.value)
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "inp-short"
  }, [_vm._v("项目时间:"), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.fromData.projectExperience.experience[1].time),
      expression: "fromData.projectExperience.experience[1].time"
    }],
    attrs: {
      "type": "text",
      "placeholder": "2001-2 至 今"
    },
    domProps: {
      "value": (_vm.fromData.projectExperience.experience[1].time)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.fromData.projectExperience.experience[1], "time", $event.target.value)
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "inp-long inp-long-more"
  }, [_vm._v("项目简介:\n            "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.fromData.projectExperience.experience[1].describe),
      expression: "fromData.projectExperience.experience[1].describe"
    }],
    attrs: {
      "type": "text",
      "placeholder": "1、"
    },
    domProps: {
      "value": (_vm.fromData.projectExperience.experience[1].describe)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.fromData.projectExperience.experience[1], "describe", $event.target.value)
      }
    }
  })])]) : _vm._e(), _vm._v(" "), (_vm.projectExperienceFlag >= 2) ? _c('div', {
    staticClass: "item-content"
  }, [_c('div', {
    staticClass: "contt clearfloat"
  }, [_c('div', {
    staticClass: "inp-short"
  }, [_vm._v("项目名称:"), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.fromData.projectExperience.experience[2].name),
      expression: "fromData.projectExperience.experience[2].name"
    }],
    attrs: {
      "type": "text",
      "placeholder": ""
    },
    domProps: {
      "value": (_vm.fromData.projectExperience.experience[2].name)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.fromData.projectExperience.experience[2], "name", $event.target.value)
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "inp-short"
  }, [_vm._v("项目技术:"), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.fromData.projectExperience.experience[2].skill),
      expression: "fromData.projectExperience.experience[2].skill"
    }],
    attrs: {
      "type": "text",
      "placeholder": ""
    },
    domProps: {
      "value": (_vm.fromData.projectExperience.experience[2].skill)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.fromData.projectExperience.experience[2], "skill", $event.target.value)
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "inp-short"
  }, [_vm._v("项目时间:"), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.fromData.projectExperience.experience[2].time),
      expression: "fromData.projectExperience.experience[2].time"
    }],
    attrs: {
      "type": "text",
      "placeholder": "2001-2 至 今"
    },
    domProps: {
      "value": (_vm.fromData.projectExperience.experience[2].time)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.fromData.projectExperience.experience[2], "time", $event.target.value)
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "inp-long inp-long-more"
  }, [_vm._v("项目简介:\n            "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.fromData.projectExperience.experience[2].describe),
      expression: "fromData.projectExperience.experience[2].describe"
    }],
    attrs: {
      "type": "text",
      "placeholder": "1、"
    },
    domProps: {
      "value": (_vm.fromData.projectExperience.experience[2].describe)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.fromData.projectExperience.experience[2], "describe", $event.target.value)
      }
    }
  })])]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "item-footer"
  }, [_c('i', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.projectExperienceFlag < 2),
      expression: "projectExperienceFlag<2"
    }],
    staticClass: " icon-plus-sign-alt icon-1x",
    on: {
      "click": _vm.pojIconClick
    }
  }), _vm._v("   \n        ")])]), _vm._v(" "), _c('div', {
    staticClass: "item"
  }, [_c('div', {
    staticClass: "item-head"
  }, [_vm._v("掌握技能")]), _vm._v(" "), (_vm.skillFlag >= 0) ? _c('div', {
    staticClass: "item-content"
  }, [_c('div', {
    staticClass: "contt clearfloat"
  }, [_c('div', {
    staticClass: "inp-short"
  }, [_vm._v("技能分类:"), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.fromData.skill[0].type),
      expression: "fromData.skill[0].type"
    }],
    attrs: {
      "type": "text",
      "placeholder": ""
    },
    domProps: {
      "value": (_vm.fromData.skill[0].type)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.fromData.skill[0], "type", $event.target.value)
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "inp-long inp-long-more"
  }, [_vm._v("简介:\n            "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.fromData.skill[0].describe),
      expression: "fromData.skill[0].describe"
    }],
    attrs: {
      "type": "text",
      "placeholder": "1、"
    },
    domProps: {
      "value": (_vm.fromData.skill[0].describe)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.fromData.skill[0], "describe", $event.target.value)
      }
    }
  })])]) : _vm._e(), _vm._v(" "), (_vm.skillFlag >= 1) ? _c('div', {
    staticClass: "item-content"
  }, [_c('div', {
    staticClass: "contt clearfloat"
  }, [_c('div', {
    staticClass: "inp-short"
  }, [_vm._v("技能分类:"), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.fromData.skill[1].type),
      expression: "fromData.skill[1].type"
    }],
    attrs: {
      "type": "text",
      "placeholder": ""
    },
    domProps: {
      "value": (_vm.fromData.skill[1].type)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.fromData.skill[1], "type", $event.target.value)
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "inp-long inp-long-more"
  }, [_vm._v("简介:\n            "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.fromData.skill[1].describe),
      expression: "fromData.skill[1].describe"
    }],
    attrs: {
      "type": "text",
      "placeholder": "1、"
    },
    domProps: {
      "value": (_vm.fromData.skill[1].describe)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.fromData.skill[1], "describe", $event.target.value)
      }
    }
  })])]) : _vm._e(), _vm._v(" "), (_vm.skillFlag >= 2) ? _c('div', {
    staticClass: "item-content"
  }, [_c('div', {
    staticClass: "contt clearfloat"
  }, [_c('div', {
    staticClass: "inp-short"
  }, [_vm._v("技能分类:"), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.fromData.skill[2].type),
      expression: "fromData.skill[2].type"
    }],
    attrs: {
      "type": "text",
      "placeholder": ""
    },
    domProps: {
      "value": (_vm.fromData.skill[2].type)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.fromData.skill[2], "type", $event.target.value)
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "inp-long inp-long-more"
  }, [_vm._v("简介:\n            "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.fromData.skill[2].describe),
      expression: "fromData.skill[2].describe"
    }],
    attrs: {
      "type": "text",
      "placeholder": "1、"
    },
    domProps: {
      "value": (_vm.fromData.skill[2].describe)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.fromData.skill[2], "describe", $event.target.value)
      }
    }
  })])]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "item-footer"
  }, [_c('i', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.skillFlag < 2),
      expression: "skillFlag<2"
    }],
    staticClass: " icon-plus-sign-alt icon-1x",
    on: {
      "click": _vm.skillIconClick
    }
  }), _vm._v("   \n        ")])]), _vm._v(" "), _c('div', {
    staticClass: "item last-item"
  }, [_c('div', {
    staticClass: "item-head"
  }, [_vm._v("自我评价")]), _vm._v(" "), _c('div', {
    staticClass: "item-content"
  }, [_c('div', {
    staticClass: "inp-long inp-long-more"
  }, [_vm._v("评价:\n            "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.fromData.selfAssessment[0]),
      expression: "fromData.selfAssessment[0]"
    }],
    attrs: {
      "type": "text",
      "placeholder": "1、"
    },
    domProps: {
      "value": (_vm.fromData.selfAssessment[0])
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.fromData.selfAssessment, 0, $event.target.value)
      }
    }
  }), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.fromData.selfAssessment[1]),
      expression: "fromData.selfAssessment[1]"
    }],
    attrs: {
      "type": "text",
      "placeholder": "2、"
    },
    domProps: {
      "value": (_vm.fromData.selfAssessment[1])
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.fromData.selfAssessment, 1, $event.target.value)
      }
    }
  }), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.fromData.selfAssessment[2]),
      expression: "fromData.selfAssessment[2]"
    }],
    attrs: {
      "type": "text",
      "placeholder": "3、"
    },
    domProps: {
      "value": (_vm.fromData.selfAssessment[2])
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.fromData.selfAssessment, 2, $event.target.value)
      }
    }
  })])]), _vm._v(" "), _vm._m(2)])]), _vm._v(" "), _c('div', {
    staticClass: "xs"
  }), _vm._v(" "), _c('div', {
    staticClass: "xs2"
  }), _vm._v(" "), _c('div', {
    staticClass: "from-box-footer"
  }, [_c('span', {
    staticClass: "butt",
    on: {
      "click": _vm.closeFormList
    }
  }, [_vm._v("关闭窗口")]), _vm._v(" "), _c('span', {
    staticClass: "butt",
    on: {
      "click": _vm.createResClick
    }
  }, [_vm._v("预览简历")])])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "item-footer"
  }, [_c('i'), _vm._v("   ")])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "item-footer"
  }, [_c('i'), _vm._v("   ")])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "item-footer"
  }, [_c('i', {
    staticClass: " icon-plus-sign-alt icon-1x"
  }), _vm._v("   ")])
}]}

/***/ }),
/* 68 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "show-menu"
    }
  }, [_c('div', {
    staticClass: "menu-cont"
  }, [_c('div', {
    staticClass: "save-resume",
    on: {
      "click": _vm.onShowSaveBar
    }
  }, [_c('i', {
    staticClass: "icon-archive icon-5x"
  }), _vm._v(" "), _c('p', {
    staticClass: "save-des"
  }, [_vm._v("存储简历")])]), _vm._v(" "), _c('transition', {
    attrs: {
      "name": "fade"
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.showSaveBar),
      expression: "showSaveBar"
    }],
    staticClass: "save-bar"
  }, [_c('div', [_c('label', [_vm._v("简历链接：")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.url),
      expression: "url"
    }],
    attrs: {
      "type": "text",
      "placeholder": "请输入简历链接存储"
    },
    domProps: {
      "value": (_vm.url)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.url = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', [_c('label', [_vm._v("手机号：")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.tel),
      expression: "tel"
    }],
    attrs: {
      "type": "number",
      "placeholder": "请输入手机号"
    },
    domProps: {
      "value": (_vm.tel)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.tel = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "action"
  }, [_c('label', {
    on: {
      "click": _vm.onSaveResume
    }
  }, [_vm._v("保存")]), _vm._v(" "), _c('label', {
    on: {
      "click": _vm.onShowSaveBar
    }
  }, [_vm._v("关闭")])])])]), _vm._v(" "), _c('div', {
    staticClass: "search",
    on: {
      "click": _vm.onShowSearchBar
    }
  }, [_c('i', {
    staticClass: "icon-search icon-5x"
  }), _vm._v(" "), _c('p', {
    staticClass: "search-des"
  }, [_vm._v("查找简历")])]), _vm._v(" "), _c('transition', {
    attrs: {
      "name": "fade"
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.showSearchBar),
      expression: "showSearchBar"
    }],
    staticClass: "search-bar"
  }, [_c('div', [_c('label', [_vm._v("手机号：")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.q),
      expression: "q"
    }],
    attrs: {
      "type": "text",
      "placeholder": "请输入手机号搜索"
    },
    domProps: {
      "value": (_vm.q)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.q = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "action"
  }, [_c('label', {
    on: {
      "click": _vm.onSearchClick
    }
  }, [_vm._v("搜索")]), _vm._v(" "), _c('label', {
    on: {
      "click": _vm.onShowSearchBar
    }
  }, [_vm._v("关闭")])])])]), _vm._v(" "), _c('div', {
    staticClass: "file",
    on: {
      "click": _vm.fileClick
    }
  }, [_c('i', {
    staticClass: " icon-file-alt icon-5x"
  }), _vm._v(" "), _c('p', {
    staticClass: "file-des"
  }, [_vm._v("生成简历")])]), _vm._v(" "), _c('div', {
    staticClass: "download-file",
    on: {
      "click": _vm.downloadClick
    }
  }, [_c('i', {
    staticClass: " icon-download-alt icon-5x"
  })]), _vm._v(" "), _c('transition', {
    attrs: {
      "name": "fade"
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.showDownloadChoice),
      expression: "showDownloadChoice"
    }],
    staticClass: "download-choice"
  }, [_c('div', {
    staticClass: "dpi96 setdpi"
  }, [_c('p', [_vm._v("96像素/英寸")]), _vm._v(" "), _c('p', [_vm._v("A4 794×1123")]), _vm._v(" "), _c('input', {
    attrs: {
      "type": "radio"
    },
    on: {
      "click": function($event) {
        _vm.choiceClick({
          'width': 794,
          'height': 1123
        })
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "dpi120 setdpi"
  }, [_c('p', [_vm._v("120像素/英寸")]), _vm._v(" "), _c('p', [_vm._v("A4 1487×2105")]), _vm._v(" "), _c('input', {
    attrs: {
      "type": "radio"
    },
    on: {
      "click": function($event) {
        _vm.choiceClick({
          'width': 1487,
          'height': 2015
        })
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "custom"
  }, [_vm._v("\n          width :"), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.customPx.width),
      expression: "customPx.width"
    }],
    attrs: {
      "type": "text",
      "placeholder": "px"
    },
    domProps: {
      "value": (_vm.customPx.width)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.customPx, "width", $event.target.value)
      }
    }
  }), _vm._v("\n          height:"), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.customPx.height),
      expression: "customPx.height"
    }],
    attrs: {
      "type": "text",
      "placeholder": "px"
    },
    domProps: {
      "value": (_vm.customPx.height)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.customPx, "height", $event.target.value)
      }
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "ok-choice",
    on: {
      "click": function($event) {
        _vm.choiceClick({
          'width': parseInt(_vm.customPx.width),
          'height': parseInt(_vm.customPx.height)
        })
      }
    }
  }, [_vm._v("down")])])])])], 1)])
},staticRenderFns: []}

/***/ }),
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */
/***/ (function(module, exports) {

module.exports = {"head":{"name":"星云链","intention":"区块链开发","tel":"18702186543","email":"wowo@neb","address":"中国","age":"1992.7.28","sex":"男","school":"未知","graduation":"本科","graduationTime":"2012-9-1 至 2016-7-1","major":"区块链专科","honor":"超级易用的 JS SDK","interest":"骑行、游泳、编程、音乐、攀岩","speciality":"js、css、html","specialityPer":"40、50、60"},"blogLink":{"github":"https://github.com/nitta-honoka","blog":"http://honoka.me"},"workExperience":{"time":"2016-10 至 今","experience":[{"name":"网页游戏bong精灵","skill":"gulp+scss+zepto","time":"","describe":["bong精灵可以根据用户消耗的卡路里换取食物进行喂养,有食物商店,宠物商店,宠物PK,精灵分享等","使用gulp构建项目,实现浏览器热刷新,js、css压缩合并,图片压缩处理等项目自动打包处理","使用flexible.js实现移动端屏幕适配问题"]},{"name":"微信公众号活动页","skill":"vue.js+vue-route+nodeJs","time":"","describe":["基于微信公众号的网页活动,实现用户活动分享,用户活动查看好友记录等","使用vue框架完成项目前端开发,使用nodeJs完成项目后端开发","项目服务器部署,项目后期维护和运维"]}]},"projectExperience":{"time":"","experience":[{"name":"轻量级Dom操作库-zBase.js","skill":"轻量级,无依赖","time":"2016.9","describe":["轻量级Dom操作库,可类似于jquery操作dom","无依赖,支持AMD,CMD加载","项目链接: https://github.com/ZengTianShengZ/zBase"]},{"name":"React项目构建三部曲","skill":"react+react-Redux+react-router+ES6","time":"2017.3","describe":["构建适合React项目开发的脚手架"]}]},"skill":[{"type":"构建工具","describe":["熟练使用gulp,webpack构建项目"]},{"type":"框架","describe":["熟悉 jQuery,Bootstrap","熟练使用vue完成复杂交互的开发","了解react"]},{"type":"-","describe":["熟悉 js,能使用原生js完成一般项目的开发","熟悉css,scss,以及css3的以下新特性","熟悉 html5,能写出语义化网页","熟悉网页优化","了解网络安全,懂得项目运维"]}],"selfAssessment":["   鲁迅先生曾说过:世上本没有路,走的人多了便成了路"]}

/***/ }),
/* 73 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })
],[22]);
//# sourceMappingURL=app.91b2f18b0d3a3b355d71.js.map