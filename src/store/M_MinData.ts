import EventDispatcher from "../util/eventdispatch"
import ax from "axios"
import { API_MIN_DATA, API_TICK_DATA, DEAL_IDX_TRADETIME, MARK_TIME_IDX,START_PRICE_IDX,MARK_TIME_1_IDX,END_PRICE_IDX, HIGHT_PRICE_IDX, LOW_PRICE_IDX, HTTP_SERVER } from '@/util/configs';
import { dateFMT, paramsUrlFMT, stringToDate } from '@/util/utils';
import { http } from '@/net/httpHandle';
import  H_fmt_echarts  from '@/util/H_fmt_echarts';
import event_key from '@/util/event_key';



export class M_Mindata extends EventDispatcher
{
    constructor() {
        super();
        this._params = {id:"",period:0};
    }
    private _params:{id:string,period:number};
    private _data:{init:boolean,d:any,datafmt:any,dataraw:any,datarawMap:any,marklines:any[],markpoints:any[],lineMarkpoints:any[]};
    public getDataByStartTime(k: string): any {
        let self = this;
        if (self._data[k]) {
            return self._data[k];
        }
        return null;
    }

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
                sum += data[i - j][END_PRICE_IDX];
            }
            result.push(sum / dayCount);
        }
        return result;
    }

    public getShowData()
    {
        let self = this;
        //let fmt_data = self._data.datafmt;
//        self._h_fmt.reset(); 
//        let opdata = self._h_fmt 
//            .setTitle("trade_data") 
//            .setCategoryData(fmt_data.categoryData)
//            .setValuesCandlestick(fmt_data.values,{name:"d-k",dataraw:self._data.dataraw,marklines:self._data.marklines,markpoints:self._data.markpoints})
//            .setValuesAddLine(fmt_data.linevalues_5d,{name:"ma5"})
//            .setValuesAddLine(fmt_data.linevalues_10d,{name:"ma10"})
//            .setValuesAddLine(fmt_data.linevalues_20d,{name:"ma20"})
//            .setValuesAddLine(fmt_data.linevalues_30d,{name:"ma30"})
//            .getOptions();
//
        return self._data;
    }

    public getMarkPoint(idx:number)
    {
        let self = this;
        let data = self._data.markpoints;
        for (let i = data.length - 1; i >= 0; i--) {
            if (idx == data[i].idx) {
                return data[i];
            }
        }
        return null;
    }
    public getKeyByidx(idx:number)
    {
        let self = this;
        let data = self._data.dataraw;
        if (idx<data.length)
        {
            return data[idx][0];
        }
        return null;
    }
    public getPerData(dateStr:string)
    {
        let self = this;
        let data = self._data.datarawMap;
        if (data[dateStr])
        {
            return data[dateStr];
        }
        return null;
    }
    public getPerDataByidx(idx:number)
    {
        let self = this;
        let key = self.getKeyByidx(idx);
        let p = self.getPerData(key);
        return p;
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
        //var info = await ax.get(API_MIN_DATA + args);
        var info = await http.asyncGet(HTTP_SERVER+API_MIN_DATA + args);
        self._params.period = timeCount;
        self._params.id= id;
       
        //self._h_fmt = new H_fmt_echarts();
        let data = self.formatData(info);
        //let opdata = self._h_fmt 
        //    .setTitle("trade_data") 
        //    .setCategoryData(fmt_data.categoryData)
        //    .setValuesCandlestick(fmt_data.values,{name:"d-k",dataraw:self._data.dataraw,marklines:self._data.marklines,markpoints:self._data.markpoints})
        //    .setValuesAddLine(fmt_data.linevalues_5d,{name:"ma5"})
        //    .setValuesAddLine(fmt_data.linevalues_10d,{name:"ma10"})
        //    .setValuesAddLine(fmt_data.linevalues_20d,{name:"ma20"})
        //    .setValuesAddLine(fmt_data.linevalues_30d,{name:"ma30"})
        //    .getOptions();

        console.log("logicmindata getdata!");
        return data;
    }

    private formatData(d: any): any {
        let self =this;
        let categoryData = [];
        let values = [];
        let linevalues = [];

        let datarawmap = {};
        let datafmt = {};
        let arr = d.trade_list;
        for (let i = 0; i < arr.length; i++) {
            let n: any = arr[i];//开始价格，结束价格，最高价，最低价，最大价差。新增成交量，成交金额。平均价
            //categoryData.push(n.actionday + " " + n.starttime);
            categoryData.push(n[MARK_TIME_IDX]);
            linevalues.push(n[END_PRICE_IDX]);
            values.push([
                n[START_PRICE_IDX]    //start_price
                , n[END_PRICE_IDX] //end_price
                , n[HIGHT_PRICE_IDX] //hight_price
                , n[LOW_PRICE_IDX] //low_price
            ]);
            if (n.length<=11)
            {
                let de = stringToDate(n[MARK_TIME_IDX]);
                n.push(de.getTime());
            }
            
            //self._data[n[0]] = n;
            datarawmap[n[MARK_TIME_IDX]] = {v:n,idx:i};
        }            


        let linevalues_5d = self.calculateMA(5,arr); 
        let linevalues_10d = self.calculateMA(10,arr); 
        let linevalues_20d = self.calculateMA(20,arr); 
        let linevalues_30d = self.calculateMA(30,arr); 
        datafmt = {
            categoryData: categoryData,
            values: values,
            linevalues_5d  :linevalues_5d ,
            linevalues_10d :linevalues_10d ,
            linevalues_20d :linevalues_20d ,
            linevalues_30d :linevalues_30d ,
            linevalues: linevalues
        };
        //let marklines:any[] = [];
        //let markpoints:any[] = [];
        let markpoints = d.markpoints ? d.markpoints : [];
        let marklines = d.marklines ? d.marklines : [];
        let lineMarkpoints = d.lineMarkpoints? d.lineMarkpoints: [];
        //let markpoints = [
        ////mark  {下标,标识数据块哪个属性}                
        //   //{idx:5, valueidx:1} ,
        //   //{idx:10, valueidx:1} ,
        //   //{idx:20, valueidx:1} ,

        //];
        //let marklines= [
        ////mark  {下标1, 下标2,标识数据块哪个属性}
        //   //{idx1:4,idx2:10,valueidx1:1} 
        //   //,{idx1:24,idx2:30,valueidx1:1,valueidx2:1} 
        //];
        self._data = {init:true,d:d,datafmt:datafmt,dataraw:arr,datarawMap:datarawmap,markpoints:markpoints,marklines:marklines,lineMarkpoints:lineMarkpoints  };
        return self._data;
    }

        //let markpoints = [
        ////mark  {下标,标识数据块哪个属性}                
        //   //{idx:5, valueidx:1} ,
        //   //{idx:10, valueidx:1} ,
        //   //{idx:20, valueidx:1} ,

        //];

                    //InstrumentID: n[DEAL_IDX_ID]// 合约代码
                    //, Price: n[DEAL_IDX_PRICE] //成交价格
                    //, TradeTime: n[DEAL_IDX_TRADETIME] //时间 
                    //, Direction: n[DEAL_IDX_DIRECTION]//买卖方向
                    //, CombOffsetFlag: 0 //开平标记

    public tryAddDealData(id:string,dataArr:{InstrumentID:string,Price:number,TradeTime:string,Direction:number,CombOffsetFlag:number}[])
    {
        let self = this;
        let trade_list = self._data.d.trade_list ;
        if (!self._data.init || 
            trade_list.length<=0 ||
            dataArr.length<=0)
        {
            return;
        }
        let  marks:{
            timemark:number
            ,idx:number
            ,price:number
            ,direction:number
            ,COFlag:number //开平标记
        }[]= [];
        let j = trade_list.length-1;
        let timeseg = 60 * self._params.period;
        let endflag = false;
        for (let i=dataArr.length-1;i>=0;i--)
        {
            let d = dataArr[i];
            let de = stringToDate(d.TradeTime);
            let addtm = de.getTime();
            for (; j >=0; j--) 
            {
                let v = trade_list[j];
                let comptime= v[MARK_TIME_1_IDX] +timeseg;
                if (addtm <= comptime)
                {
                    j++;
                    if (marks.length <= 0) {                            
                        marks.push({
                            timemark:addtm,
                            idx:j,
                            price:d.Price,                                
                            direction:d.Direction,
                            COFlag:d.CombOffsetFlag
                        });
                    }
                    else {
                        let last = marks[marks.length-1];
                        if (addtm < last.timemark )
                        {
                            marks.push({
                                timemark: addtm,
                                idx: j,
                                price: d.Price,
                                direction: d.Direction,
                                COFlag: d.CombOffsetFlag
                            });

                        }
                        else
                        {
                            //todo ...
                        }

                    }
                    break;
                } 
                else
                {
                    endflag = true;                        
                    break;
                }                    

            }
            if (endflag)
            {
                break;
            }

        }
        let markstmp = [];
        markstmp.push({
            timemark: new Date().getTime(),
            idx: 10,
            price: 1000,
            direction: 1,
            COFlag: 1
        });

        markstmp.push({
            timemark: new Date().getTime(),
            idx: 20,
            price: 2000,
            direction: 0,
            COFlag: 0
        });

        self._data.lineMarkpoints = marks;
        //self._data.lineMarkpoints = markstmp;
    }

    public tryAddData(id:string,dataArr:any)
    {
        let de:Date= dataArr[0];
        let self = this;
        if (!self._data.init)
        {
            return;
        }
        //self._data.d todo add
        let trade_list = self._data.d.trade_list ;
        let chg:boolean = false;
        if (!trade_list ||trade_list.length<=0)
        {
           trade_list.push([
            dateFMT(de,"yy-MM-ddThh:mm:ss+08:00")
            ,dataArr[1]
            ,dataArr[2]
            ,dataArr[3]
            ,dataArr[4]
            ,0
            ,0
            ,0
            ,0
            ,0
            ,0
           ]);
           chg = true;
           console.log("tryAddData empty add:");
           console.log(dataArr);
        }
        else {
            let last = trade_list[trade_list.length - 1];
            let timeseg = 60 * self._params.period;
            let lasttm = last[MARK_TIME_1_IDX];
            let addtm = de.getTime();
            let newtm = lasttm + timeseg;
            if (newtm <= addtm) {
                if (last[START_PRICE_IDX] != dataArr[1] &&
                    last[END_PRICE_IDX] != dataArr[2] &&
                    last[HIGHT_PRICE_IDX] != dataArr[3] &&
                    last[LOW_PRICE_IDX] != dataArr[4]) {
            
                        last[START_PRICE_IDX] = dataArr[1];
                        last[END_PRICE_IDX] = dataArr[2];
                        last[HIGHT_PRICE_IDX] = dataArr[3];
                        last[LOW_PRICE_IDX] = dataArr[4];
                        chg = true;

                        console.log("tryAddData exsit update:");
                        console.log(dataArr);
                }
                else{
                        console.log("tryAddData exsit update same:");
                        console.log(dataArr);
                }
            }
            else {
                let detmp = new Date(newtm);
                let add = [
                    dateFMT(detmp, "yy-MM-ddThh:mm:ss+08:00")
                    , dataArr[1]
                    , dataArr[2]
                    , dataArr[3]
                    , dataArr[4]
                    , 0
                    , 0
                    , 0
                    , 0
                    , 0
                    , 0
                    , newtm
                ];
                trade_list.push(add);
                chg = true;
                
                console.log("tryAddData add:");
                console.log(dataArr);
            }
        }
        if (chg)
        {
            self.formatData(self._data.d);
            self.dispatch(event_key.LGACT_CURR_DATA, null);
        }
    }

        //self._params.period = timeCount;
        //self._params.id= id;
    
    public transPointValueIdx(idx:number,valueidx:number,valueidxTo:number):number
    {
        let self = this;
        let points = self._data.markpoints;
        let match = -1;
        for (let i = points.length - 1; i >= 0; i--) {
            let v = points[i];
            if (v.idx == idx && v.valueidx == valueidxTo) {
                return -1;
            }
            if (v.idx == idx && v.valueidx == valueidx) {
                match = i;
            }
        }
        if (match < 0 )
        {
            return -2;
        }
        points[match].valueidx = valueidxTo;
        self.dispatch(event_key.DATA_ACT_ADD_POINT, null);
        return 0;
    }
    public addPoint(idx:number,valueidx:number):number
    {
        let self = this;
        let points = self._data.markpoints;
        for (let i = points.length - 1; i >= 0; i--) {
            let v = points[i];
            if (v.idx == idx && v.valueidx == valueidx) {
                return -1;
            }
        }
        points.push({ idx: idx, valueidx: valueidx });
        self.dispatch(event_key.DATA_ACT_ADD_POINT, null);
        return 0;
    }
    public delPoint(idx:number):number
    {
       let self = this;
       let arr = self._data.markpoints;
       let res = -1;
       for (let i=arr.length-1;i>=0;i--)
       {
            if (arr[i].idx == idx)
            {
                arr.splice(i,1);
                res = 0;
                break;
            }
       }
       //self.dispatch(event_key.DATA_ACT_DEL_POINT,null);
       return res;
    }

    public addLine(idx1:number,valueidx1:number,idx2:number,valueidx2:number)
    {
       let self = this;
       self._data.marklines.push({
           idx1:idx1,
           valueidx1:valueidx1,
           idx2:idx2,
           valueidx2:valueidx2
        }); 
        //self.dispatch(event_key.DATA_ACT_ADD_LINE,null);
    }
    public delLine(idx1:number,idx2:number)
    {
       let self = this;
       let arr = self._data.marklines;
       for (let i=arr.length-1;i>=0;i--)
       {
            if (arr[i].idx1 == idx1 && arr[i].idx2==idx2 ||
            arr[i].idx1 == idx2 && arr[i].idx2==idx1)
            {
                arr.splice(i,1);
                break;
            }
       }
        self.dispatch(event_key.DATA_ACT_DEL_LINE,null);
    }

}
let g_mindata = new M_Mindata();
export default g_mindata; 