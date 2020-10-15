<template>
  <div class="test_vuex">
      <h1>test_vuex---------------</h1>
    <h1> test_vuex store.pathName:{{ $store.state.pathName}}</h1>
    <h1> test_vuex store.currData.saveCurrData:{{ $store.state.currData.saveCurrData}}</h1>
    <h1>  {{act()}} </h1> 

      <el-row>
        <div v-for="item in $store.state.v_for_items_ary">
          <button id="test_vuex_btn" @click="onClickItm(item)" type="button">{{ item }}</button>
        </div>
     </el-row>
      <el-row>
        <div v-for="item in items">
          {{ item }}
        </div>
     </el-row>
     <button id="test_vuex_btn" @click="onClick('xxx')" type="button">------------ Click</button>
  </div>
</template>

<script lang="ts">


import { Component, Prop, Vue } from 'vue-property-decorator';


@Component
export default class test_vuex extends Vue {
    @Prop({ default: '123' }) private msg!: string
    private items:any[] =["1","2"]; 
    private onClick(key:string)
    {
      this.items.push(key);
    }
    private onClickItm(itm:any)
    {
      console.log("onClickItm:" + itm);
    }
    private act()
    {
      return "666";
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
