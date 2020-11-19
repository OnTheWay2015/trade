<template>
  <div id="opstate_show">

<el-row>
  <el-col class="red">
    <div v-if="showstate">
        {{stateStr}}
    </div>
  </el-col>
</el-row>

<el-row>
  <el-button class="button_width" @click.native="changeShow()">{{change_show}}</el-button> 
</el-row>
<el-row>
  <el-button class="button_width"  @click.native="getDealData()">{{getDealData_label}}</el-button> 
</el-row>

<el-row>
  <el-button class="button_width"  @click.native="turnMarkLineLabel()">{{btn_turn_markline_label}}</el-button> 
</el-row>

  <el-row v-for="item in items">
    {{ item.key}} : {{item.value}}
  </el-row>

</div>
</template>

<script lang="ts">

/*

//原生按钮
  <button v-on:click="changeShow()"> {{ change_show}} </button>

<el-row>
  <el-col :span="8" class="white">

        <el-button @click.native="onSELclick()">{{btn_label}}</el-button> 
  </el-col>
  <el-col :span="8" class="white">

        <el-button @click.native="onOPclickAdd()">{{btn_op_add}}</el-button> 
  </el-col>
  <el-col :span="8" class="white">

        <el-button @click.native="onOPclickDel()">{{btn_op_del}}</el-button> 
  </el-col>
</el-row>
*/


import { Component,Prop, Vue } from 'vue-property-decorator';
import event_key from '@/util/event_key'
import g_ui from '@/UIMain';
import g_main from '@/logicMain';
import { dateFMT, stringToDate } from '@/util/utils';
import { DEAL_IDX_TRADETIME_DATE,DEAL_IDX_DIRECTION, DEAL_IDX_ID, DEAL_IDX_PRICE, DEAL_IDX_TRADETIME, HIGHT_PRICE_IDX, LOW_PRICE_IDX } from '@/util/configs';

import lang from '@/util/lang';

@Component
export default class OpstateShow extends Vue {
    private showstate:boolean = false;
    private showbtn:boolean = false;
    private stateStr:string = lang.xxx;
    private btn_turn_markline_label:string = lang.show_distance
    private change_show:string =lang.change_show_mbm; 
    private getDealData_label:string =lang.get_deal_data;
    private items:any[]=[];
    private showData:any[] = [];
  private _init_():void{
    let self = this;
    //g_main.g_logicMinData.addEventListener(event_key.UI_SELECT_LINE, (evt:any)=>{
    //    let self = this;
    //    if (evt.data)
    //    {
    //        self.showstate= true;
    //        self.btn_label = "Exit select";
    //    }
    //    else
    //    {
    //        self.btn_label = "Line select";
    //        self.showstate= false;
    //    }
    //    self.$forceUpdate(); 
    //},this);


    g_main.g_logicMinData.addEventListener(event_key.UI_SHOW_BLOCKS,self.showBlocks,self);
    //g_main.g_logicMinData.addEventListener(event_key.UI_SELECT_POINTS,self.showPoints,self);
    //g_main.g_logicMinData.addEventListener(event_key.UI_SELECT_POINT_FLAG,self.selectPointFlag,self);
  }

  private selectPointFlag(evt:any):void {
        //let self = this;
        //if (evt.data)
        //{
        //    self.btn_label = "LineExit";
        //}
        //else
        //{
        //    self.btn_label = "LineSelect";
        //}
        //self.$forceUpdate(); 
  }
  private showBlocks(evt:any):void {
    let self = this;
    self.showData.length = 0;
    self.showData = self.showData.concat(evt.data)  ;
    self.items.length = 0;
    //for (let i=self.showData.length-1;i>=0;i--)
    for (let i = 0; i <self.showData.length; i++) 
    {
      let p = self.showData[i];
      let itm = this.fmtShowBlock(p);
      self.items = self.items.concat(itm);
    }

    if (self.showData.length == 2)
    {
      let p1 = self.showData[0];
      let p2 = self.showData[1];
      let dis = Math.abs( p1.idx - p2.idx); 
           let label = Math.abs(
              Math.max(p1.v[HIGHT_PRICE_IDX],p2.v[HIGHT_PRICE_IDX]) - Math.min(p1.v[LOW_PRICE_IDX],p2.v[LOW_PRICE_IDX])
           ).toString();

      self.items.push({key:"---------------------",value:""});
      self.items.push({key:lang.show_distance,value:dis});
      self.items.push({key:lang.show_diff_price,value:label});

    }

    self.$forceUpdate(); 
  }

//  private showBlocks(evt:any):void {
//    let self = this;
//    self.showData.length = 0;
//    self.showData.push(evt.data);
//    self.items.length = 0;
//    let itm = this.fmtShowBlock(self.showData[0]);
//    self.items = self.items.concat(itm);
//    self.$forceUpdate(); 
//  }
//
  private fmtShowBlock(p:any)
  {
    let itm:any[]=[];
    let v = p.v;
    let str = v[0];
    itm.push({key:"---------------------",value:""});
    //itm.push({key:"date",value:dateFMT( stringToDate(str) ) });
    itm.push({key:"date",value:str });
    itm.push({key:"start_price",value:v[1]});
    itm.push({key:"end_price",value:v[2]});
    itm.push({key:"hight_price",value:v[3]});
    itm.push({key:"low_price",value:v[4]});
    return itm;
  }
  private mounted():void {
    console.log("opstate_show.vue mounted");
    this._init_();
  }

  private onSELclick():void {
    console.log("opstate.vue onSELclick---");
    let self = this;
    g_ui.dispatch(event_key.UI_ACT_SEL_POINT_FLAG, null);
  }
  private onOPclickAdd():void {
    console.log("opstate.vue onOPclickAdd---");
    let self = this;
    if (self.showData.length == 1)
    {
      g_ui.dispatch(event_key.UI_ACT_ADD_POINT, self.showData[0]);
    }
    else
    {
      g_ui.dispatch(event_key.UI_ACT_ADD_LINE, self.showData);
    }

  }
  private onOPclickDel():void {
    console.log("opstate.vue onOPclickDel---");
    let self = this;
    if (self.showData.length == 1)
    {
      g_ui.dispatch(event_key.UI_ACT_DEL_POINT, self.showData[0]);
    }
    else
    {
      g_ui.dispatch(event_key.UI_ACT_DEL_LINE, self.showData);
    }
  }
  
  private changeShow():void{
    let self = this;
    if (self.change_show==lang.change_show_mbm)
    {
      self.change_show=lang.change_show_k;
    }
    else{
      self.change_show=lang.change_show_mbm;
    }
    g_ui.dispatch(event_key.UI_ACT_CHANGE_SHOW, null);
  }
  private getDealData():void{
    g_ui.dispatch(event_key.UI_ACT_DEAL_DATA, null);
  }
  private turnMarkLineLabel():void{
    let self = this;
    if (self.btn_turn_markline_label==lang.show_distance)
    {
      self.btn_turn_markline_label=lang.show_diff_price;
    }
    else{
      self.btn_turn_markline_label=lang.show_distance;
    }
    g_ui.dispatch(event_key.UI_ACT_TURN_MARKLINE_LABEL, null);
  }
}

</script>
