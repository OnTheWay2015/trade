import Vue from 'vue'
import root from './page/Root.vue'
//import store from './store'
//element-ui
import ElementUI from 'element-ui';
//import 'element-ui/lib/theme-chalk/index.css';
import LogicMain from "./logicMain"

//-------------
//import echarts from 'echarts'
//Vue.prototype.$echarts = echarts //通过Vue.prototype 将echarts保存为全局变量。原则上$echarts可以为任意变量名。

Vue.config.productionTip = false
Vue.use(ElementUI);

let op ={
  //store, //vuex里会创建两个Vue实例. vuex::_watcherVM, vuex::vm
  render: (h:any) => {
   return h(root);
 }
};
let com = new Vue(op);

com.$on("hook:mounted", (evt: any) => {
  console.log("VM com --->hook:mounted");
  let lg = new LogicMain(com);
  lg.init();
  lg.start();
})

com.$mount("#app");