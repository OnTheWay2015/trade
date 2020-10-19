import  LogicBase from "./logicBase"
import event_key from '@/util/event_key';
import Event from '@/util/event';
import LogicMain from '@/logicMain';
import g_mindata, { M_Mindata } from '@/store/M_MinData';
import { END_PRICE_IDX } from '@/util/configs';
import { UIMain } from '@/UIMain';
export default class LogicMinData extends LogicBase 
{


    private _id:string;
    private _date_st:string;
    private _date_ed:string;
    private _timeType:number;
    private _timeCount:number;
    protected m_ui:UIMain;
    protected m_mindata:M_Mindata;
    constructor(m:LogicMain){
        super(m);
    }

    //---------------------
    private _points:any[]=[];
    private _selectlineFlag:boolean = false;
    //---------------------

    public init()
    {
        let self = this;
        self.m_ui = self.m_main.g_uimain;
        self.m_mindata =  g_mindata;
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

        self.m_ui.addEventListener(event_key.UI_ACT_SEL_POINT, (evt: Event) => {
            let self = this;
            let idx = evt.data;
            let key = self.m_mindata.getKeyByidx(idx);
            let p = self.m_mindata.getPerData(key);
            let match = false;

            if (self._selectlineFlag) {
                for (let i = self._points.length - 1; i >= 0; i--) {
                    if (p.idx == self._points[i].idx) {
                        match = true;
                        break;
                    }
                }
            }
            else {
                if (self.m_mindata.getMarkPoint(idx)) {
                    match = true;
                }
            }
            if (match) {
                self.delPoint(key);
            }
            else {
                self.addPoint(key);
            }
        }, self);


        self.m_ui.addEventListener(event_key.UI_ACT_DEL_LINE,(evt:Event)=>{
            let self = this;
            self.delLine();
        },self);

        self.m_ui.addEventListener(event_key.UI_ACT_SEL_LINE_FLAG,(evt:Event)=>{
            if (self._selectlineFlag)
            {
                self.setSelLineFlag(false);
            }
            else{
                self.setSelLineFlag(true);
            }
        },self);
        //---------------------------------
        self.m_ui.addEventListener(event_key.UIACT_MIN_DATA_SET_PARAMS, (evt:Event)=>{
            let d = evt.data;
            self._timeCount=parseInt( d.timeCount);
            self._timeType=d.timeType;
            self._id = d.id;
            self._date_st = d.date_st;
            self._date_ed = d.date_ed;
        },self);
        self.m_ui.addEventListener(event_key.UIACT_MIN_DATA_SHOW, (evt:Event)=>{
            self.show();
        },self);
        //---------------------------------

        //self.addEventListener(event_key.LG_MIN_DATA_SET_PARAMS, (evt:Event)=>{
        //},self);
    }


    private addLine()
    {
    }
    private delLine()
    {
        let self = this;
        self._selectlineFlag = false;
        //sendmsg
        //test
        if (self._points.length != 2) {
            console.error("on del line err, points.length != 2");
            return;
        }
        self.m_mindata.delLine(
            self._points[0].idx,
            self._points[1].idx)

        self.refresh();
    }

    private addPoint(key:string)
    {
        let self = this;

        let p = self.m_mindata.getPerData(key);
        if (self._selectlineFlag) {
            for (let i = self._points.length-1; i >= 0; i--) {
                if (p.idx == self._points[i].idx) {
                    return;
                }
            }
            self._points.push(p);
            if (self._points.length >= 2) {
                self.m_mindata.addLine(
                    self._points[0].idx,
                    END_PRICE_IDX,
                    self._points[1].idx,
                    END_PRICE_IDX);
                self.refresh();
                self.setSelLineFlag(false);
            }
        }
        else {//send msg                    
            //test
            self.m_mindata.addPoint(p.idx, END_PRICE_IDX)
            self.refresh();
        }
    }
    private delPoint(key:string)
    {
        let self = this;
        let p = self.m_mindata.getPerData(key);
        if (self._selectlineFlag) {
            for (let i = self._points.length-1; i >= 0; i--) {
                if (p.idx == self._points[i].idx) {
                    self._points.splice(i, 1);
                    break;
                }
            }
        }
        else {//send msg                    
            //test
            self.m_mindata.delPoint(p.idx);
            self.refresh();
        }
    }

    private setSelLineFlag(v:boolean)
    {
        let self = this;
        self._selectlineFlag = v; 
        if (!self.setSelLineFlag)
        {
            self._points.length  = 0;
        }
        //dispath
    }
    public async getData():Promise<any>
    {
        let self = this;
        let d = await self.m_mindata.getData(
            self._id,
            self._date_st,
            self._date_ed,
            self._timeCount);
        console.log("logictick getdata!");
        return d;
    }
    
    public async show()
    {
        let self = this;
        let d = await this.getData();
        //self.dispatch(event_key.LGACT_MIN_DATA_SHOW, d);
        self.m_ui.dispatch(event_key.UI_ECHARTS_DATA_SHOW, d);
    }
    
    public refresh()
    {
        let self = this;
        let d = self.m_mindata.getShowData();
        self.m_ui.dispatch(event_key.UI_ECHARTS_DATA_SHOW, d);
    }
}