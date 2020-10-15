import EventDispatcher from "../util/eventdispatch"
import echarts_cfg from './echarts_config';
import ax from "axios"
import { API_TICK_DATA, HTTP_SERVER } from '@/util/configs';
import g_H_fmt_echarts, { H_fmt_echarts } from '@/util/H_fmt_echarts';
import { dateFMT } from '@/util/utils';



export class M_Tickdata extends EventDispatcher
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

    public async getData(): Promise<any> {
        let self = this;
        ax.defaults.baseURL = HTTP_SERVER;
        var info = await ax.get(API_TICK_DATA);
        let fmt_data = self.formatForEchart(info.data);
        let fmt_data0 = self.formatForEchart(
            {
                msg: [
                    //{
                    //    id: 1
                    //    , period: 1
                    //    , tradyingday: "tradyingday"
                    //    , actionday: "actionday"
                    //    , starttime: "starttime"
                    //    , endtime: "endtime"
                    //    , startprice: 1000.01
                    //    , endprice: 2000.01
                    //    , highprice: 3000.01
                    //    , lowprice: 4000.01
                    //    , averprice: 5000.01
                    //    , limitprice: 6000.01
                    //    , addvolume: 123
                    //},
                    {
                        "id": "zn2108",
                        "period": 30,
                        "tradyingday": "20200914",
                        "actionday": "20200914",
                        "starttime": "14:49:14",
                        "endtime": "14:49:14",
                        "startprice": 19195.0,
                        "endprice": 19195.0,
                        "highprice": 19195.0,
                        "lowprice": 19195.0,
                        "averprice": 19195.0,
                        "limitprice": 0.0,
                        "addvolume": 0
                    },
                    {
                        "id": "zn2108",
                        "period": 30,
                        "tradyingday": "20200914",
                        "actionday": "20200914",
                        "starttime": "14:48:43",
                        "endtime": "14:48:55",
                        "startprice": 19195.0,
                        "endprice": 19195.0,
                        "highprice": 19195.0,
                        "lowprice": 19195.0,
                        "averprice": 19195.0,
                        "limitprice": 0.0,
                        "addvolume": 0
                    },
                ]
            })

        let opdata = g_H_fmt_echarts.reset()
            .setCategoryData(fmt_data.categoryData)
            .setTitle("tick_data") 
            //.setValuesCandlestick(fmt_data.values,{name:"日k"})
            .setValuesAddLine(fmt_data.linevalues,{name:"tickLine"})
            .getOptions();

        console.log("logictick getdata!");
        return opdata;
    }

    private formatForEchart(d: any): any {
        let self =this;
        var categoryData = [];
        var linevalues = [];
        self._data = {};
        for (var i = 0; i < d.msg.length; i++) {
            let n: any = d.msg[i];
            categoryData.push(dateFMT(new Date(parseInt(n.time))));
            linevalues.push(n.lastprice);
            self._data[n.StartTime] = n;
        }
        return {
            categoryData: categoryData,
            linevalues: linevalues
        };
    }

    /** 
        ID:String 合约号
        Period:Int 周期
        TradyingDay:String
        ActionDay:String
        StartTime:String  开始时间
        EndTime:String   结束时间
        StartPrice:Float   起始价
        EndPrice:Float	 结束价
        HighPrice:Float   最高价
        LowPrice:Float    最低价
        AverPrice:Float    平均价
        LimitPrice:Float    最大点差
        AddVolume:Long  新增成交量
    
    {
        ID:1
        ,Period:1
        ,TradyingDay:"TradyingDay"
        ,ActionDay:"ActionDay"
        ,StartTime:"StartTime"
        ,EndTime:"EndTime"
        ,StartPrice:1.01
        ,EndPrice:2.01
        ,HighPrice:3.01
        ,LowPrice:4.01
        ,AverPrice:5.01
        ,LimitPrice:6.01
        ,AddVolume:123
    }
    
        */

    //{
    //    "id": "zn2108",
    //    "tradingday": "20200915",
    //    "actionday": "20200915",
    //    "updatetime": "00:25:02",
    //    "millisecond": 500,
    //    "lastprice": 19105.0,
    //    "volume": 3,
    //    "turnover": 287025,
    //    "openinterest": 53.0,
    //    "askprice1": 19175.0,
    //    "bidprice1": 19070.0,
    //    "askvolume1": 1,
    //    "bidvolume1": 3,
    //    "time": 1600100702500
    //},
}
let g_tickdata = new M_Tickdata();
export default g_tickdata; 