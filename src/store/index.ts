import Vue from 'vue'
import Vuex from 'vuex'


import echarts_cfg from './echarts_config';

Vue.use(Vuex)
let arr:any[] =  [];

export default new Vuex.Store({
  state: {//元数据定义
    echars:echarts_cfg 
  },
  mutations: {//响应 commit(key,data) 方法
    setLegendShow(state, b)
    {
      state.echars.legend.show = b;
    }
  },
  actions: {//声明统一的接口,封装 commit , 外部 this.$store.dispatch('actLegendShow', this.Data);　时响应
    actLegendShow: ({ commit }, payload) => {
      commit('setLegendShow', payload);
    },
  },
  modules: {
  }
})

/**
  vuex的运行过程
    组件派发任务到 actions，
    actions 触发 mutations 中的方法，
    然后 mutations　来改变state中的数据，数据变更后响应推送给组件，组件重新渲染
  
 */