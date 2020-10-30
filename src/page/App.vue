<template>
  <div id="app">
      <div id="r_top" >

           <div v-if="showSplitTools">
              <el-row>
              <c_splite_time />
              </el-row>
              <el-row>
              </el-row>
           </div>
      </div>
      <div id="r_midcav" >
        <div id="r_left" class="left_float" >
              <c_opstate /> 
        </div>
        <div id="r_center"  class="left_float" >
           <div v-if="showKFlag">
            <c_k_show />
            </div>
        </div>
        <div id="r_right"  class="left_float" >
        </div> 
      </div>
      <div id="r_foot" >
      </div>
  </div>
</template>

<script lang="ts">
 /**
 
    <el-button @click.native="onclick_k()">日k</el-button> 
    <el-button @click.native="onclick_tick()">tick</el-button> 
    <el-button @click.native="onclick_test()">test</el-button> 
 
 *  */ 
  
  //<img alt="Vue logo" src="./assets/logo.png">
    //<HelloWorld v-bind:msg="msg1"/>

    //<div id="main" style="width: 600px;height:400px;"></div>
    //<c_echarts_test />
   
  //<c_opstate /> 
   //<c_k_show />
    //<c_user_show/>
    //<c_test_vuex />
    //<c_test_vuex_01 />
import { Component,Prop, Vue } from 'vue-property-decorator';
//import HelloWorld from '../components/HelloWorld.vue';
import c_echarts_test from '../test/myEcharts.vue';
//import c_test_vuex from '../test/test_vuex.vue';
//import c_test_vuex_01 from '../test/test_vuex_01.vue';
import c_k_show from '@/page/k_show.vue';
import c_splite_time from '@/page/splite_time.vue';
import c_opstate from '@/page/opstate.vue';
//import c_user_show from 'user_show.vue';
import event_key from '../util/event_key'
import g_ui from '@/UIMain';

@Component({
  components: {
    //HelloWorld,
    c_echarts_test ,
    //c_test_vuex ,
    //c_test_vuex_01 ,
    c_k_show,
    c_splite_time ,
    c_opstate ,
    //c_user_show,
  },
})
export default class App extends Vue {
  private showSplitTools:boolean = true;
  private showKFlag:boolean = true;
  private _init_():void{
    let self = this;
        //let vm:any= self.$root; 
        //(vm as Vue).$on(event_key.UI_RESIZE, self.onResize.bind(self) ); 
        g_ui.addEventListener(event_key.UI_RESIZE, self.onResize.bind(self),self); 
  }
  private mounted():void {
    console.log("App.vue mounted");
    this._init_();
  }

  private onResize(data:any)
  {
        let ele:any = document.getElementById('app');
        ele.style.width = data.width;
        ele.style.height= data.height;
  }
  private onclick_k():void {
    console.log("app onclick_k---");
    (this.$root as Vue).$emit(event_key.UIACT_APP_BTN_K, null);
  }
  private onclick_tick():void {
    console.log("app onclick_tick---");
    (this.$root as Vue).$emit(event_key.UIACT_APP_BTN_TICK, null);
  }
  private onclick_test():void {
    console.log("app onclick_test---");
    (this.$root as Vue).$emit(event_key.UIACT_TEST, null);
    let self = this;
    self.showSplitTools = !self.showSplitTools;
    self.$forceUpdate(); 
  }

}

</script>
