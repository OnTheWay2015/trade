import Vue from 'vue'
import LogicBase from './logic/logicBase'
import { ManagerProcess } from './logic/managerProcess';
import event_key from './util/event_key'
import * as utils from './util/utils'

import LogicTick from "./logic/logicTick"
import UIMain from './UIMain';
import Event from './util/event';
import LogicMinData from './logic/logicMinData';

export default class  LogicMain extends LogicBase
{
    private _vueRoot:Vue;
    private _mgrProcess:ManagerProcess;
    private _logicTick:LogicTick;
    private _logicMinData:LogicMinData;
    private _uimain:UIMain;
    constructor(v:Vue)
    {
        super();
        this._vueRoot = v;
    }

    public start()
    {
        let self = this;
        console.log("logicMain start");
        self._mgrProcess.start( utils.FRAME_TM );
        self._uimain.start();

        //self._logicTick.show();
        //self._logicMinData.show();
    }
    public init()
    {
        let self = this;
        self._mgrProcess = new ManagerProcess();
        console.log("logicMain init");
        self.initUI();
        self.initLogic();
    }
    private initLogic()
    {
        let self = this;
        self._logicTick = new LogicTick();
        self._logicMinData= new LogicMinData();

        //init 
        self._logicTick.init()
        self._logicMinData.init();
        
        
        //evnets
        self._logicTick.addEventListener(event_key.LGACT_TICK_DATA_SHOW, (evt:Event)=>{
            self._uimain.dispatch(event_key.UI_ECHARTS_DATA_SHOW, evt.data);
        },self);
        self._logicTick.addEventListener(event_key.LGACT_TICK_DATA_UPDATE, (evt:Event)=>{
            self._uimain.dispatch(event_key.UI_ECHARTS_DATA_UPDATE, evt.data);
        },self);

        
        self._logicMinData.addEventListener(event_key.LGACT_MIN_DATA_SHOW, (evt:Event)=>{
            self._uimain.dispatch(event_key.UI_ECHARTS_DATA_SHOW, evt.data);
        },self);
        self._logicMinData.addEventListener(event_key.LGACT_MIN_DATA_UPDATE, (evt:Event)=>{
            self._uimain.dispatch(event_key.UI_ECHARTS_DATA_UPDATE, evt.data);
        },self);



    }
    
    private initUI()
    {
        let self = this;
        self._uimain = new UIMain(self._vueRoot);
        self._uimain.init();
        
        self._uimain.addEventListener(event_key.UIACT_APP_BTN_K, (evt:Event)=>{
            self._logicMinData.show();
        },self);
        self._uimain.addEventListener(event_key.UIACT_APP_BTN_TICK, (evt:Event)=>{
        self._logicTick.show();
        },self);
       
        self._uimain.addEventListener(event_key.UIACT_MIN_DATA_SET_PARAMS, (evt:Event)=>{
            self._logicMinData.dispatch(event_key.LG_MIN_DATA_SET_PARAMS, evt.data)
        },self);
        self._uimain.addEventListener(event_key.UIACT_MIN_DATA_SHOW, (evt:Event)=>{
            self._logicMinData.show();
        },self);
        

        self._uimain.addEventListener(event_key.UIACT_, (evt:Event)=>{
        },self);
    }



}