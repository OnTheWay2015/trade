import  LogicBase from "./logicBase"
import event_key, { _key_board }  from '@/util/event_key';
import Event from '@/util/event';
import g_mindata, { M_Mindata } from '@/store/M_MinData';
import { DEAL_IDX_TRADETIME_DATE,DEAL_IDX_DIRECTION, DEAL_IDX_ID, DEAL_IDX_PRICE, DEAL_IDX_TRADETIME, HIGHT_PRICE_IDX, LOW_PRICE_IDX } from '@/util/configs';
//import g_ui, { UIMain } from '@/UIMain';
import { LogicMain } from '@/logicMain';
import g_ui from '@/UIMain';
import H_fmt_echarts from '@/util/H_fmt_echarts';
import { stringToDateDEF } from '@/util/utils';
import g_completeTradeData from '@/store/M_DealData';
import g_dealdata from '@/store/M_DealData';
export default class LogicMinData extends LogicBase 
{
    private _h_fmt:H_fmt_echarts;
    private _id: string;
    private _date_st: string;
    private _date_ed: string;
    private _timeType: number;
    private _timeCount: number;
    protected m_mindata: M_Mindata;
    private _showMarkLineValue:number = 1;
    private SHOW_DISTANCE = 1;
    private SHOW_MAX_DIFF_PRICE= 2;
    constructor(m: LogicMain) {
        super(m);
    }

    //---------------------
    private _points: any[] = [];
    private _selectPointFlag:boolean = false;
    //---------------------

    public init() {
        let self = this;
        //self.m_ui = self.m_main.g_uimain;
        self.m_mindata = g_mindata;
        //self.m_mindata.addEventListener(event_key.LGACT_MIN_DATA_SHOW, (evt:Event)=>{
        //    self.m_ui.dispatch(event_key.UI_ECHARTS_DATA_SHOW, evt.data);
        //},self);
        //self.m_mindata.addEventListener(event_key.LGACT_MIN_DATA_UPDATE, (evt:Event)=>{
        //    self.m_ui.dispatch(event_key.UI_ECHARTS_DATA_UPDATE, evt.data);
        //},self);


        //self.m_ui.addEventListener(event_key.UI_ACT_DEL_POINT,(evt:Event)=>{
        //    let self = this;
        //    let key = evt.data;
        //    self.delPoint(key);
        //},self);

        self.m_mindata.addEventListener(event_key.LGACT_CURR_DATA,self.onCurrData,self);
        g_ui.addEventListener(event_key.UI_ACT_DEAL_DATA, self.showDealData, self);
        g_ui.addEventListener(event_key.UI_ACT_CHANGE_SHOW, self.changeShow, self);
        g_ui.addEventListener(event_key.UI_ACT_SEL_ELE, self.onEleSelect, self);
        g_ui.addEventListener(event_key.UI_ACT_SEL_CLEAR, (evt: Event) => {
            self.clearSelect();
        },self);
        g_ui.addEventListener(event_key.UI_ACT_SEL_ELES, (evt: Event) => {
            let self = this;
            let eles = evt.data;
            if (eles.length >= 2)
            {
                self._points.length = 0;

                let key1 = self.m_mindata.getKeyByidx(eles[0]);
                let key2 = self.m_mindata.getKeyByidx(eles[eles.length-1]);
                let p1 = self.m_mindata.getPerData(key1);
                let p2 = self.m_mindata.getPerData(key2);
                self._points.push(p1);
                self._points.push(p2);
                self.dispatch(event_key.UI_SHOW_BLOCKS, self._points);
            }
            else if (eles.length == 1 ){
                self._points.length = 0;
                let key = self.m_mindata.getKeyByidx(eles[0]);
                let p = self.m_mindata.getPerData(key);
                self._points.push(p);
                self.dispatch(event_key.UI_SHOW_BLOCKS, self._points);
            }
            else{

            }
        }, self);
        
        //g_ui.addEventListener(event_key.UI_ACT_ADD_POINT, (evt: Event) => {
        //    let self = this;
        //    self.addPoint(evt.data.idx); // idx
        //}, self);
        //g_ui.addEventListener(event_key.UI_ACT_DEL_POINT, (evt: Event) => {
        //    let self = this;
        //    self.delPoint(evt.data.idx); // idx
        //}, self);
        //g_ui.addEventListener(event_key.UI_ACT_ADD_LINE, (evt: Event) => {
        //    let self = this;
        //    self.addLine(evt.data);
        //}, self);
        //g_ui.addEventListener(event_key.UI_ACT_DEL_LINE, (evt: Event) => {
        //    let self = this;
        //    self.delLine(evt.data);
        //}, self);

        //g_ui.addEventListener(event_key.UI_ACT_SEL_POINT_FLAG, (evt: Event) => {
        //    if (self._selectPointFlag) {
        //        self.setSelPointFlag(false);
        //    }
        //    else {
        //        self.setSelPointFlag(true);
        //    }
        //}, self);
        //---------------------------------
        g_ui.addEventListener(event_key.UI_ACT_TURN_MARKLINE_LABEL, (evt: Event) => {
            if (self._showMarkLineValue == self.SHOW_DISTANCE)
            {
                self._showMarkLineValue = self.SHOW_MAX_DIFF_PRICE;
            }
            else
            {
                self._showMarkLineValue = self.SHOW_DISTANCE;
            }
            self.refresh();
        },self);
        g_ui.addEventListener(event_key.UIACT_MIN_DATA_SET_PARAMS, self.setParams, self);
        g_ui.addEventListener(event_key.UIACT_MIN_DATA_SHOW, (evt: Event) => {
            self.show();
        }, self);


        //---------------------------------
        //---------------------------------
        self.m_main.g_mgrEvent.addGlobleKeyEvent(_key_board.DEL ,((evt:any)=>{
            self.onKeyDel();
        }).bind(self));
        self.m_main.g_mgrEvent.addGlobleKeyEvent(_key_board.ARW_DOWN,((evt:any)=>{
            self.onKeyDown();
        }).bind(self));
        self.m_main.g_mgrEvent.addGlobleKeyEvent(_key_board.ARW_UP, ((evt:any)=>{
            self.onKeyUp();
        }).bind(self));
    }

    private onKeyDel()
    {
        let self = this;
        if (self._points.length<=0) 
        {
            return;
        }
        else if (self._points.length==1) 
        {
            self.delPoint(self._points[0].idx)
        }
        else if (self._points.length==2) 
        {
           self.delLine(self._points);
        }
    }

    private onKeyUp()
    {
        this.transMarkPoint();
    }
    private onKeyDown()
    {
        this.transMarkPoint();
    }

    private transMarkPoint()
    {
//getMarkPoint
        let self = this;
        if (self._points.length!=1) 
        {
            return;
        }
        let p = self.m_mindata.getMarkPoint(self._points[0].idx);
        if (!p)
        {
            return ;
        }
        if (p.valueidx == HIGHT_PRICE_IDX)
        {
            self.m_mindata.transPointValueIdx(p.idx,p.valueidx, LOW_PRICE_IDX);
        }
        else 
        {
            self.m_mindata.transPointValueIdx(p.idx,p.valueidx, HIGHT_PRICE_IDX);
        }
        self.refresh();
    }

    private clearSelect()
    {
        let self = this;
        self._points.length = 0;
        self.dispatch(event_key.UI_SHOW_BLOCKS, self._points);
    }

    private _mbmFlag:boolean = false;
    private changeShow(d:any)
    {
        let self = this;
        self._dealData.length = 0;
        self._mbmFlag = !self._mbmFlag;
        self.refresh();
    }

    private _dealData:any[] = [];
    private async showDealData(d:any)
    {
        let self = this;
        if (!self._mbmFlag)
        {
            return null;
        }
        let data =await g_dealdata.getData();
        data = data.result;
        console.log(data);
        self._dealData.length = 0;
        for (let i=0;i<data.length;i++)
        {
            let n = data[i];
            if (n[DEAL_IDX_ID] != self._id)
            {
                continue;
            }
            let timestr = "";
            timestr +=  n[DEAL_IDX_TRADETIME_DATE].substr(0,4); 
            timestr +=  "-";
            timestr +=  n[DEAL_IDX_TRADETIME_DATE].substr(4,2); 
            timestr +=  "-";
            timestr +=  n[DEAL_IDX_TRADETIME_DATE].substr(6,2); 
            timestr +=  "T";
            self._dealData.push(
                {
                    InstrumentID: n[DEAL_IDX_ID]// 合约代码
                    , Price: n[DEAL_IDX_PRICE] //成交价格
                    , TradeTime: timestr + n[DEAL_IDX_TRADETIME] +"+08:00" //时间 
                    , Direction: n[DEAL_IDX_DIRECTION]//买卖方向
                    , CombOffsetFlag: 0 //开平标记
                }
            );
        }
        if (self._dealData.length <= 0)
        {
            console.log("id["+self._id+"] no deal data!");
            return;
        }
        self.m_mindata.tryAddDealData(self._id,self._dealData);
        self.refresh();
        return null;
    }


    private fmtShowData(d:any)
    {
        let self = this;
        return self._mbmFlag ? 
            self.getOptionMBMData(d) : self.getOptionKData(d);
        
    }
    private getOptionKData(showdata:any)
    {
        let self = this;
        if (self._h_fmt)
        {
            self._h_fmt.reset();
        }
        else{
            self._h_fmt = new H_fmt_echarts();
        }
        let fmt_data = showdata.datafmt;
        let opdata = self._h_fmt 
            .setTitle("data_k") 
            .setCategoryData(fmt_data.categoryData)
            .setValuesCandlestick(fmt_data.values,{name:"d-k",dataraw:showdata.dataraw,marklines:showdata.marklines,markpoints:showdata.markpoints})
            .setValuesAddLine(fmt_data.linevalues_5d,{name:"ma5"})
            .setValuesAddLine(fmt_data.linevalues_10d,{name:"ma10"})
            .setValuesAddLine(fmt_data.linevalues_20d,{name:"ma20"})
            .setValuesAddLine(fmt_data.linevalues_30d,{name:"ma30"})
            .setToolCallback(self.onToolCallback.bind(self))
            .setShowMarkLineLabelFunc(self.showMarkLineLabelFunc.bind(self))
            .getOptions();

        console.log("logicmindata getdata!");
        return opdata;
    }
    private getOptionMBMData(showdata:any)
    {
        let self = this;
        if (self._h_fmt)
        {
            self._h_fmt.reset();
        }
        else{
            self._h_fmt = new H_fmt_echarts();
        }
        let fmt_data = showdata.datafmt;
        let opdata = self._h_fmt 
            .setTitle("data_mbm")
            .setToolBox(false) 
            .setCategoryData(fmt_data.categoryData)
            .setValuesAddLine(fmt_data.linevalues,{name:"mbm",dataraw:showdata.dataraw,markpoints:showdata.lineMarkpoints})
            .getOptions();

        console.log("logicmindata getdata!");
        return opdata;
    }


    private showMarkLineLabelFunc(params:any)
    {
        /**
         * params:
                componentType: 'series',
                // 系列类型
                seriesType: string,
                // 系列在传入的 option.series 中的 index
                seriesIndex: number,
                // 系列名称
                seriesName: string,
                // 数据名，类目名
                name: string,
                // 数据在传入的 data 数组中的 index
                dataIndex: number,
                // 传入的原始数据项
                data: Object,
                // 传入的数据值。在多数系列下它和 data 相同。在一些系列下是 data 中的分量（如 map、radar 中）
                value: number|Array|Object,
                // 坐标轴 encode 映射信息，
                // key 为坐标轴（如 'x' 'y' 'radius' 'angle' 等）
                // value 必然为数组，不会为 null/undefied，表示 dimension index 。
                // 其内容如：
                // {
                //     x: [2] // dimension index 为 2 的数据映射到 x 轴
                //     y: [0] // dimension index 为 0 的数据映射到 y 轴
                // }
                encode: Object,
                // 维度名列表
                dimensionNames: Array<String>,
                // 数据的维度 index，如 0 或 1 或 2 ...
                // 仅在雷达图中使用。
                dimensionIndex: number,
                // 数据图形的颜色
                color: string, 
         */
        let self = this;
        let label = "";
        let value = params.data.info;
        if (self._showMarkLineValue == self.SHOW_DISTANCE)
        {
            label = Math.abs(value[0] - value[1]).toString();
        }
        else if (self._showMarkLineValue == self.SHOW_MAX_DIFF_PRICE)
        {
            let p1 = self.m_mindata.getPerDataByidx(value[0]);
            let p2 = self.m_mindata.getPerDataByidx(value[1]);
            
            label = Math.abs(
               Math.max(p1.v[HIGHT_PRICE_IDX],p2.v[HIGHT_PRICE_IDX]) - Math.min(p1.v[LOW_PRICE_IDX],p2.v[LOW_PRICE_IDX])
            ).toString();
        }
        return label;
    }
    private onToolCallback(evtkey:event_key)
    {
        let self = this;
        let pts = self._points;
        switch (evtkey)
        {
            case event_key.UI_ACT_ADD_POINT:
                if (pts.length>0)
                {
                    self.addPoint(pts[0].idx); // idx
                }
            break;
            case event_key.UI_ACT_DEL_POINT:
                if (pts.length>0)
                {
                    self.delPoint(pts[0].idx); // idx
                }
            break;
            case event_key.UI_ACT_ADD_LINE:
                if (pts.length>1)
                {
                    self.addLine(pts); // 
                }
            break;
            case event_key.UI_ACT_DEL_LINE:
                if (pts.length>1)
                {
                    self.delLine(pts); // 
                }
            break;
            default:
                console.error("onToolCallback["+evtkey+"] todo");
        }
        //g_ui.addEventListener(event_key.UI_ACT_ADD_POINT, (evt: Event) => {
        //    let self = this;
        //    self.addPoint(evt.data.idx); // idx
        //}, self);
        //g_ui.addEventListener(event_key.UI_ACT_DEL_POINT, (evt: Event) => {
        //    let self = this;
        //    self.delPoint(evt.data.idx); // idx
        //}, self);
        //g_ui.addEventListener(event_key.UI_ACT_ADD_LINE, (evt: Event) => {
        //    let self = this;
        //    self.addLine(evt.data);
        //}, self);
        //g_ui.addEventListener(event_key.UI_ACT_DEL_LINE, (evt: Event) => {
        //    let self = this;
        //    self.delLine(evt.data);
        //}, self);
    }

    private addLine(points:any) {
        let self = this;
        if (points.length != 2) {
            return;
        }
        self.m_mindata.addLine(
            points[0].idx,
            HIGHT_PRICE_IDX ,
            points[1].idx,
            HIGHT_PRICE_IDX);
        self.clearSelect();
        self.refresh();
        self.setSelPointFlag(false);
    }
    private delLine(points:any) {
        let self = this;
        if (points.length != 2) {
            console.error("on del line err, points.length != 2");
            return;
        }
        self.m_mindata.delLine(
            points[0].idx,
            points[1].idx)

        self.clearSelect();
        self.refresh();
        self.setSelPointFlag(false);
    }

    private trySelectingPoint(p: any) {
        let self = this;
        //if (!self._selectPointFlag) {
        //    return;
        //}
        for (let i = self._points.length - 1; i >= 0; i--) {
            if (p.idx == self._points[i].idx) {
                self._points.slice(i,1); 
                self.dispatch(event_key.UI_SHOW_BLOCKS, self._points);
                return;
            }
        }
        if (self._points.length>=2)
        {
            self._points.shift();
        }
        self._points.push(p);
        self.dispatch(event_key.UI_SHOW_BLOCKS, self._points);
    }
    private addPoint(idx:number) {
        let self = this;
        let key = self.m_mindata.getKeyByidx(idx);
        let p = self.m_mindata.getPerData(key);
        self.m_mindata.addPoint(p.idx, HIGHT_PRICE_IDX )
        //self.m_mindata.addPoint(p.idx, LOW_PRICE_IDX)
        self.clearSelect();
        self.refresh();
    }
    private delPoint(idx:number) {
        let self = this;
        self.m_mindata.delPoint(idx);
        self.clearSelect();
        self.refresh();
    }

    private setSelPointFlag(v: boolean) {
        //let self = this;
        //self._selectPointFlag= v;
        //if (!self._selectPointFlag) {
        //    self._points.length = 0;
        //}
        //self.dispatch(event_key.UI_SELECT_POINT_FLAG, v);
    }


    public async getData(): Promise<any> {
        let self = this;
        let d = await self.m_mindata.getData(
            self._id,
            self._date_st,
            self._date_ed,
            self._timeCount);
        console.log("logictick getdata!");
        return d;
    }

    public setParams(evt:Event)
    {
        let self = this;
        let d = evt.data;
        self._timeCount = parseInt(d.timeCount);
        self._timeType = d.timeType;
        self._id = d.id;
        self._date_st = d.date_st;
        self._date_ed = d.date_ed;
    }

    public async show() {
        let self = this;
        let d = await this.getData();
        if (!d)
        {
            return;
        }
        let v = self.fmtShowData(d);
        self.m_main.g_logicCurrdata.setConfig(self._id, self._timeCount); 
        //self.dispatch(event_key.LGACT_MIN_DATA_SHOW, d);
        self.dispatch(event_key.UI_ECHARTS_DATA_SHOW, v);
    }

    public refresh() {
        let self = this;
        let d = self.m_mindata.getShowData();
        if (!d)
        {
            return ;
        }
        let v = self.fmtShowData(d);
        self.dispatch(event_key.UI_SHOW_BLOCKS, self._points);
        self.dispatch(event_key.UI_ECHARTS_DATA_SHOW, v);
    }


    private onEleSelect(evt: any) {// params.value为数组,第一个值为数据在总数据数组中的下标
        let self = this;
        let params = evt.data;
        console.log(params)

        if (params.componentType == "series") {
            self.onSelectPointIdx(params.data[0]);
        }
        else if (params.componentType == "markPoint") {
            let key = params.data.coord[0]; 
            let p = self.m_mindata.getPerData(key);
            self.trySelectingPoint(p); 
        }
        else if (params.componentType == "markLine") {
            let info = params.data.info;
            let p1 = self.m_mindata.getPerDataByidx(info[0]);
            let p2 = self.m_mindata.getPerDataByidx(info[1]);
            self._points.length = 0;
            self._points.push(p1);
            self._points.push(p2);
            self.dispatch(event_key.UI_SHOW_BLOCKS, self._points);
        }
    }
    private onSelectPointIdx(idx: number) {
        let self = this;
        let key = self.m_mindata.getKeyByidx(idx);
        let p = self.m_mindata.getPerData(key);
        
        //single show
        //self.dispatch(event_key.UI_SHOW_BLOCK, p);
        self.trySelectingPoint(p); 
    }


    private onCurrData(evt: any) {
        let self = this;
        self.refresh();
        //self.dispatch(event_key.UI_ECHARTS_DATA_SHOW, v);
    }

}