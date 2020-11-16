import Vue from 'vue'
import LogicBase from './logic/logicBase'
import { ManagerProcess } from './logic/managerProcess';
import event_key from './util/event_key'
import * as utils from './util/utils'

//import LogicTick from "./logic/logicTick"
import Event from './util/event';
import LogicMinData from './logic/logicMinData';
import LogicCurrData from './logic/logicCurrData';
import g_ui, { UIMain } from './UIMain';
import { ManagerEvent } from './logic/managerEvent';

export class  LogicMain extends LogicBase
{
    private _vueRoot:Vue;
    public g_mgrProcess:ManagerProcess;
    public g_mgrEvent:ManagerEvent;
    //private _logicTick:LogicTick;
    public g_logicMinData:LogicMinData;
    public g_logicCurrdata:LogicCurrData;
    public g_uimain:UIMain;
    //public g_NET:LogicNet;
    constructor()
    {
        super(null);
    }
    public setVueRoot(v:Vue)
    {
        this._vueRoot = v;
    }
    public start()
    {
        let self = this;
        console.log("logicMain start");

        document.onkeydown = (ev:any)=>{
            console.log(ev);
        };
        //$(document).keydown(function(event){
        //    if(event.keyCode == 13){
        //     alert('你按下了Enter'); 
        //    }
        //   });

        self.g_mgrProcess.start( utils.FRAME_TM );
        self.g_mgrEvent.start(null);

        self.g_uimain.start();
        //self._logicTick.show();
        //self._logicMinData.show();
        //self.g_NET.connect(WS_URL);
    }
    public init()
    {
        let self = this;
        self.g_mgrProcess = new ManagerProcess();
        self.g_mgrEvent= new ManagerEvent();
        console.log("logicMain init");

        self.g_mgrProcess.init();
        self.g_mgrEvent.init();

        self.initUI();
        self.initLogic();
    }
    private initLogic()
    {
        let self = this;
        self.g_logicMinData= new LogicMinData(self);
        self.g_logicCurrdata= new LogicCurrData(self);
        //self.g_NET = new LogicNet(self);

        //init 
        self.g_logicMinData.init();
        self.g_logicCurrdata.init();
        //self.g_NET.init();
        
        


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

let g_main = new LogicMain();
export default g_main;