import Vue from 'vue'
import LogicBase from './logic/logicBase'
import { ManagerProcess } from './logic/managerProcess';
import event_key from './util/event_key'
import * as utils from './util/utils'

//import LogicTick from "./logic/logicTick"
import Event from './util/event';
import LogicMinData from './logic/logicMinData';
import g_ui, { UIMain } from './UIMain';

export default class  LogicMain extends LogicBase
{
    private _vueRoot:Vue;
    private _mgrProcess:ManagerProcess;
    //private _logicTick:LogicTick;
    public g_logicMinData:LogicMinData;
    public g_uimain:UIMain;
    constructor(v:Vue)
    {
        super(null);
        this._vueRoot = v;
    }

    public start()
    {
        let self = this;
        console.log("logicMain start");
        self._mgrProcess.start( utils.FRAME_TM );
        self.g_uimain.start();

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
        self.g_logicMinData= new LogicMinData(self);

        //init 
        self.g_logicMinData.init();
        
        


    }
    
    private initUI()
    {
        let self = this;
        self.g_uimain = g_ui;
        self.g_uimain.init(self._vueRoot);
        
        self.g_uimain.addEventListener(event_key.UIACT_APP_BTN_K, (evt:Event)=>{
            self.g_logicMinData.show();
        },self);
       
        

        self.g_uimain.addEventListener(event_key.UIACT_, (evt:Event)=>{
        },self);
    }



}