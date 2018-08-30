import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'
import 'babel-polyfill';
import i18n from './lang'
import '@/icons' // icon
import '@/permission' // permission control
require('babel-polyfill');
Vue.use(ElementUI, { locale })

Vue.config.productionTip = false


Date.prototype.Format=function(fmt){
  var o={
    "M+":this.getMonth()+1,//月份
    "d+":this.getDate(),//日
    "H+":this.getHours(),//小时
    "m+":this.getMinutes(),//分
    "s+":this.getSeconds(),//秒
    "q+":Math.floor((this.getMonth()+3)/3),//季度
    "S+":this.getMilliseconds()//毫毛
  };
  if(/(y+)/.test(fmt)) fmt=fmt.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
};

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
