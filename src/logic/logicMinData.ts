import  LogicBase from "./logicBase"
import event_key from '@/util/event_key';
import Event from '@/util/event';
import g_mindata, { M_Mindata } from '@/store/M_MinData';
import { HIGHT_PRICE_IDX, LOW_PRICE_IDX } from '@/util/configs';
//import g_ui, { UIMain } from '@/UIMain';
import { LogicMain } from '@/logicMain';
import g_ui from '@/UIMain';
import H_fmt_echarts from '@/util/H_fmt_echarts';
export default class LogicMinData extends LogicBase 
{


    private _h_fmt:H_fmt_echarts;
    private _id: string;
    private _date_st: string;
    private _date_ed: string;
    private _timeType: number;
    private _timeCount: number;
    protected m_mindata: M_Mindata;
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
        g_ui.addEventListener(event_key.UIACT_MIN_DATA_SET_PARAMS, (evt: Event) => {
            let d = evt.data;
            self._timeCount = parseInt(d.timeCount);
            self._timeType = d.timeType;
            self._id = d.id;
            self._date_st = d.date_st;
            self._date_ed = d.date_ed;
        }, self);
        g_ui.addEventListener(event_key.UIACT_MIN_DATA_SHOW, (evt: Event) => {
            self.show();
        }, self);


        //---------------------------------
    }
    private clearSelect()
    {
        let self = this;
        self._points.length = 0;
        self.dispatch(event_key.UI_SHOW_BLOCKS, self._points);
    }
    private getOptionData(showdata:any)
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
            .setTitle("trade_data") 
            .setCategoryData(fmt_data.categoryData)
            .setValuesCandlestick(fmt_data.values,{name:"d-k",dataraw:showdata.dataraw,marklines:showdata.marklines,markpoints:showdata.markpoints})
            .setValuesAddLine(fmt_data.linevalues_5d,{name:"ma5"})
            .setValuesAddLine(fmt_data.linevalues_10d,{name:"ma10"})
            .setValuesAddLine(fmt_data.linevalues_20d,{name:"ma20"})
            .setValuesAddLine(fmt_data.linevalues_30d,{name:"ma30"})
            .setToolCallback(self.onToolCallback.bind(self))
            .getOptions();

        console.log("logicmindata getdata!");
        return opdata;
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

    public async show() {
        let self = this;
        let d = await this.getData();
        let v = self.getOptionData(d);
        //self.dispatch(event_key.LGACT_MIN_DATA_SHOW, d);
        self.dispatch(event_key.UI_ECHARTS_DATA_SHOW, v);
    }

    public refresh() {
        let self = this;
        let d = self.m_mindata.getShowData();
        let v = self.getOptionData(d);
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
        //else if (params.componentType == "markPoint") {
        //    let key = params.data.coord[0]; 
        //    self.delPoint(key);
        //}
    }
    private onSelectPointIdx(idx: number) {
        let self = this;
        let key = self.m_mindata.getKeyByidx(idx);
        let p = self.m_mindata.getPerData(key);
        
        //single show
        //self.dispatch(event_key.UI_SHOW_BLOCK, p);
        self.trySelectingPoint(p); 
    }
}