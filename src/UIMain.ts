import Event from './util/event';
import EventDispatcher from './util/eventdispatch';
import event_key from './util/event_key';

export default class  UIMain extends EventDispatcher 
{
    private _vueRoot:Vue;
    constructor(v:Vue)
    {
        super();
        this._vueRoot = v;
    }

    public start()
    {
        let self = this;
        self._vueRoot.$emit(event_key.UI_RESIZE, {
            width: window.innerWidth
            , height: window.innerHeight
        });
    }
    public init()
    {
        let self = this;
        window.onresize = function(){
            //innerHeight	返回窗口的文档显示区的高度。
            //innerWidth	返回窗口的文档显示区的宽度。
            self._vueRoot.$emit(event_key.UI_RESIZE,{
                width:window.innerWidth
                ,height:window.innerHeight
            });
        }
        self.addEventListener(event_key.UI_ECHARTS_DATA_SHOW, (evt:Event)=>{
            self.onTickShow(evt.data);
        },self);
        self.addEventListener(event_key.UI_ECHARTS_DATA_UPDATE, (evt:Event)=>{
            self.onTickUpdate(evt.data);
        },self);


        self._vueRoot.$on(event_key.UIACT_APP_BTN_K, (data:any)=>{
            self.dispatch(event_key.UIACT_APP_BTN_K,data);
        });
        self._vueRoot.$on(event_key.UIACT_APP_BTN_TICK, (data:any)=>{
            self.dispatch(event_key.UIACT_APP_BTN_TICK,data);
        });
        self._vueRoot.$on(event_key.UIACT_MIN_DATA_SET_PARAMS, (data:any)=>{
            self.dispatch(event_key.UIACT_MIN_DATA_SET_PARAMS,data);
        });
        self._vueRoot.$on(event_key.UIACT_MIN_DATA_SHOW, (data:any)=>{
            self.dispatch(event_key.UIACT_MIN_DATA_SHOW,data);
        });
        
        self._vueRoot.$on(event_key.UIACT_TEST, (data:any)=>{
            self.dispatch(event_key.UIACT_TEST,data);
        });
    }

    private onTickShow(data:any)
    {
        let self = this;
        self._vueRoot.$emit(event_key.UI_ECHARTS_DATA_SHOW,data);
    }

    private onTickUpdate(data:any)
    {
        let self = this;
        self._vueRoot.$emit(event_key.UI_ECHARTS_DATA_UPDATE,data);

    }
}