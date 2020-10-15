<template>
  <div id="splite_time">

    <div class="splite_time_line box_width_normal">
    <el-autocomplete
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
    <div class="splite_time_line box_width_normal">
              <div style="float: left;">
                <el-input type="text" v-model="input_num" placeholder="输入数值"></el-input>

              </div>
              <div style="float: left;">
                <div>
                  <button style="width: 50px; height: 50%;">
                   + 
                  </button>
                </div>
                <div>
                  <button style="width: 50px; height: 50%;">
                   - 
                  </button>
                </div>
              </div>
    </div>

    <div class="splite_time_line box_width_normal">
        <el-select v-model="select_unit_value" placeholder="分钟">
          <el-option
            v-for="item in UNITs"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
    </div>

  <div class="splite_time_line box_width_normal block">
    <el-date-picker
      v-model="date_value_st"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
  </div>
  <div class="splite_time_line box_width_normal block">
    <el-time-picker
    v-model="time_value_st"
    :picker-options="{
    }"
    placeholder="任意时间点">
  </el-time-picker>
  </div>


  <div class="splite_time_line box_width_normal block">
    <el-date-picker
      style="width:100;"
      v-model="date_value_ed"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
  </div>

  <div class="splite_time_line box_width_normal block">
    <el-time-picker
    style="width:100;"
    v-model="time_value_ed"
    :picker-options="{
    }"
    placeholder="任意时间点">
  </el-time-picker>
  </div>


    <div class="splite_time_line box_width_normal">
        <el-button @click.native="onclick_view()">查看</el-button> 
    </div>




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
  private input_num:number=1;
    private contractID:string =  '';
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
