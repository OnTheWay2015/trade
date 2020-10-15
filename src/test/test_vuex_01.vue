<template>
  <div class="test_vuex_01">
      <h1>test_vuex_01---------------</h1>
    <h1> test_vuex store.pathName:{{ $store.state.pathName}}</h1>
    <h1> test_vuex store.currData.saveCurrData:{{ $store.state.currData.saveCurrData}}</h1>

    <button id="test_vuex_01_btn" @click="onClick" type="button">Click</button>
  </div>
</template>

<script lang="ts">


import { Component, Prop, Vue } from 'vue-property-decorator';


@Component
export default class test_vuex_01 extends Vue {
    @Prop({ default: '123' }) private msg!: string


    public onClick(evt:any){
        console.log("test_vuex_01_btn clk!");
   
        //vuex直接修改
        this.$store.commit("savePath","test_vuex_01_btn_clk" );
        //派发 vuex 事件
        //this.$store.dispatch("act_savePath","test_vuex_01_btn_clk" );
        this.$store.dispatch("act_addkey","test_vuex_01_btn_clk" );
    }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
