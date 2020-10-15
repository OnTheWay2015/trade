<template>
  <div id="splite_time">
<el-row>
  <el-col :span="2">
    <div>
    <el-autocomplete class="width_full"
      popper-class="my-autocomplete"
      v-model="contractID"
      :fetch-suggestions="querySearch"
      placeholder="合约ID"
      @select="handleSelect">
      <i
        class="el-icon-edit el-input__icon"
        slot="suffix"
        @click="handleIconClick">
      </i>
      <template slot-scope="{ item }">
        <div class="name">{{ item.value }}</div>
        <span class="addr">{{ item.address }}</span>
      </template>
        </el-autocomplete>
      </div>
  </el-col>

  <el-col :span="1">
    <div >
              <div style="float: left; width:50%">
                <el-input type="text" v-model="input_num" placeholder="数值"></el-input>

              </div>
              <div style="float: left; width:50%">
                <div>
                  <button style="width: 100%; height: 50%;"  @click="btn_add">
                   + 
                  </button>
                </div>
                <div>
                  <button style="width: 100%; height: 50%;"  @click="btn_sub">
                   - 
                  </button>
                </div>
              </div>
    </div>

  </el-col>

  <el-col :span="1">
    <div  class="grid-content bg-purple">
        <el-select class ="width_full" v-model="select_unit_value" placeholder="分钟">
          <el-option
            v-for="item in UNITs"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
    </div>
  </el-col>

  <el-col :span="2">
  <div >
    <el-date-picker 
      class ="width_full" 
      v-model="date_value_st"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
  </div>
  </el-col>

  <el-col :span="2">
  <div>
    <el-time-picker
    class ="width_full" 
    v-model="time_value_st"
    :picker-options="{
    }"
    placeholder="任意时间点">
  </el-time-picker>
  </div>
  </el-col>

  <el-col :span="2">
  <div>
    <el-date-picker
      class ="width_full" 
      v-model="date_value_ed"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
  </div>
  </el-col>

  <el-col :span="2">
  <div >
    <el-time-picker
    class ="width_full" 
    v-model="time_value_ed"
    :picker-options="{
    }"
    placeholder="任意时间点">
  </el-time-picker>
  </div>
    </el-col>
  <el-col :span="1">
     
    <div class ="width_full">
        <el-button @click.native="onclick_view()">查看</el-button> 
    </div>
    </el-col>
</el-row>










  </div>
</template>

<script lang="ts">
/*

        <el-input v-model="input_num" placeholder="输入数值"></el-input>
        <el-button id="add" type="success" icon="el-icon-check" ></el-button>
        <el-button id="sub" type="success" icon="el-icon-check" ></el-button>
*/
import { Component,Prop, Vue } from 'vue-property-decorator';
import event_key from '@/util/event_key'
import configs, { TIME_UNIT_DAY, TIME_UNIT_HOUR, TIME_UNIT_MIN } from '@/util/configs'
import { dateFMT} from '@/util/utils';

@Component
export default class RootShow extends Vue {
  private _init_():void{
    let self = this;


  }
  private mounted():void {
    console.log("splite_time.vue mounted");
    this._init_();
  }

  //------------
  private time_value_st:Date=new Date(0);
  private time_value_ed:Date=new Date(0);
  private date_value_st:Date=new Date(0);
  private date_value_ed:Date=new Date(0);
  private select_unit_value:number=1;
  private input_num:string="1";
  private contractID:string =  'ag2102';

  private UNITs:any[] = [
         {value:TIME_UNIT_MIN,label:"分钟"}
         ,{value:TIME_UNIT_HOUR,label:"小时"}
         ,{value:TIME_UNIT_DAY,label:"天"}
    ];
    //------------------
    private restaurants:any[] = [];
    private querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      }
    private   createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      }
    private handleSelect(item) {
        console.log(item);
      }
    private handleIconClick(ev) {
        console.log(ev);
      }
    private btn_add()
    {
      console.log("btn_add");
      let self = this;
      let v = parseInt(self.input_num);
      self.input_num = (v+1).toString();
    }   
    private btn_sub()
    {
        console.log("btn_sub");

      let self = this;
      let v = parseInt(self.input_num);
      if (v<=1)
      {
        return;
      }
      self.input_num = (v-1).toString();
    }   

    private onclick_view(ev) {
      let self = this;
      let vm:any= self.$root; 
      let year = self.date_value_st.getFullYear();
      let year1 = self.date_value_st.getUTCFullYear();//协调世界时UTC
      let date = self.date_value_st.getDate();
      let month= self.date_value_st.getMonth(); //从 0开始,0为一月
      let day = self.date_value_st.getDay();//星期几
      let hour = self.date_value_st.getHours();
      //let dstr = dateFMT(self.date_value_st,"yyMM"); 
      let st_str = dateFMT(self.date_value_st,"yy-MM-dd"); 
      let ed_str = dateFMT(self.date_value_ed,"yy-MM-dd"); 
      let tmst_str = dateFMT(self.time_value_st," hh:mm:ss"); 
      let tmed_str = dateFMT(self.time_value_ed," hh:mm:ss"); 
      (vm as Vue).$emit(event_key.UIACT_MIN_DATA_SET_PARAMS, {
        id:self.contractID,
        date_st: st_str+tmst_str,
        date_ed: ed_str+tmed_str,
        timeCount:self.input_num,
        timeType:self.select_unit_value
      } ); 
      (vm as Vue).$emit(event_key.UIACT_MIN_DATA_SHOW, null);
    }


}

</script>
