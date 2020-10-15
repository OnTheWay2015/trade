import EventDispatcher from "../util/eventdispatch"
import ax from "axios"
import { API_MIN_DATA, API_TICK_DATA, HTTP_SERVER } from '@/util/configs';
import g_H_fmt_echarts from '@/util/H_fmt_echarts';
import { paramsUrlFMT } from '@/util/utils';



export class M_Mindata extends EventDispatcher
{
    constructor() {
        super();
    }
    private _data:any;
    public getDataByStartTime(k: string): any {
        let self = this;
        if (self._data[k]) {
            return self._data[k];
        }
        return null;
    }

    private END_PRICE_IDX = 1;
    private calculateMA(dayCount, data) {
        let self = this;
        var result = [];
        for (var i = 0, len = data.length; i < len; i++) {
            if (i < dayCount) {
                result.push('-');
                continue;
            }
            var sum = 0;
            for (var j = 0; j < dayCount; j++) {
                sum += data[i - j][self.END_PRICE_IDX];
            }
            result.push(sum / dayCount);
        }
        return result;
    }

    public async getData(id:string,date_st:string,date_ed:string,timeCount:number): Promise<any> {
        let self = this;
        let reg_1 = /:/g
        let reg_2 = / /g
        date_st = date_st.replace(reg_1, "%3A");
        date_st = date_st.replace(reg_2, "%20");
        
        date_ed = date_ed.replace(reg_1, "%3A");
        date_ed = date_ed.replace(reg_2, "%20");

        let args = paramsUrlFMT(["contract_id","date_start","date_stop","data_min"],[id,date_st,date_ed,timeCount]);

        ax.defaults.baseURL = HTTP_SERVER;
        var info = await ax.get(API_MIN_DATA + args);
        
        let fmt_data = self.formatForEchart(info.data);
        let opdata = g_H_fmt_echarts.reset()
            .setTitle("trade_data") 
            .setCategoryData(fmt_data.categoryData)
            .setValuesCandlestick(fmt_data.values,{name:"d-k"})
            //.setValuesAddLine(fmt_data.linevalues_5d,{name:"ma5"})
            //.setValuesAddLine(fmt_data.linevalues_10d,{name:"ma10"})
            //.setValuesAddLine(fmt_data.linevalues_20d,{name:"ma20"})
            //.setValuesAddLine(fmt_data.linevalues_30d,{name:"ma30"})
            //.setValuesAddLine(fmt_data.linevalues,{name:"tickLine"})
            .getOptions();

        console.log("logicmindata getdata!");
        return opdata;
    }
    public async getData_old(): Promise<any> {
        let self = this;
        ax.defaults.baseURL = HTTP_SERVER;
        var info = await ax.get(API_MIN_DATA);
        
        let fmt_data = self.formatForEchart(info.data);
        let opdata = g_H_fmt_echarts.reset()
            .setTitle("min_data") 
            .setCategoryData(fmt_data.categoryData)
            .setValuesCandlestick(fmt_data.values,{name:"日k"})
            //.setValuesAddLine(fmt_data.linevalues,{name:"tickLine"})
            .getOptions();

        console.log("logicmindata getdata!");
        return opdata;
    }

    private formatForEchart(d: any): any {
        let self =this;
        var categoryData = [];
        var values = [];
        var linevalues = [];
        self._data = {};
        let arr = d.trade_list;
        for (var i = 0; i < arr.length; i++) {
            let n: any = arr[i];//开始价格，结束价格，最高价，最低价，最大价差。新增成交量，成交金额。平均价
            //categoryData.push(n.actionday + " " + n.starttime);
            categoryData.push(n[0]);
            linevalues.push(n[self.END_PRICE_IDX]);
            values.push([
                n[1]
                , n[2]
                , n[3]
                , n[4]
            ]);
            //self._data[n[0]] = n;
            self._data[n[0]] = n;
        }
        let linevalues_5d = self.calculateMA(5,arr); 
        let linevalues_10d = self.calculateMA(10,arr); 
        let linevalues_20d = self.calculateMA(20,arr); 
        let linevalues_30d = self.calculateMA(30,arr); 
        return {
            categoryData: categoryData,
            values: values,
            linevalues_5d  :linevalues_5d ,
            linevalues_10d :linevalues_10d ,
            linevalues_20d :linevalues_20d ,
            linevalues_30d :linevalues_30d ,
            linevalues: linevalues
        };
    }
    private formatForEchart_old(d: any): any {
        let self =this;
        var categoryData = [];
        var values = [];
        var linevalues = [];
        self._data = {};
        for (var i = 0; i < d.msg.length; i++) {
            let n: any = d.msg[i];
            categoryData.push(n.actionday + " " + n.starttime);
            linevalues.push(n.endprice);
            values.push([
                n.startprice
                , n.endprice
                , n.lowprice
                , n.highprice
            ]);
            self._data[n.StartTime] = n;
        }
        return {
            categoryData: categoryData,
            values: values,
            linevalues: linevalues
        };
    }

}
let g_mindata = new M_Mindata();
export default g_mindata; 