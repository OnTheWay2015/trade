import  LogicBase from "./logicBase"
import event_key from '@/util/event_key';
import g_mindata from '@/store/M_MinData';
import Event from '@/util/event';
export default class LogicMinData extends LogicBase 
{


    private _id:string;
    private _date_st:string;
    private _date_ed:string;
    private _timeType:number;
    private _timeCount:number;
    constructor(){
        super();
    }

    public init()
    {
        let self = this;
        self.addEventListener(event_key.LG_MIN_DATA_SET_PARAMS, (evt:Event)=>{
            let d = evt.data;
            self._timeCount=parseInt( d.timeCount);
            self._timeType=d.timeType;
            self._id = d.id;
            self._date_st = d.date_st;
            self._date_ed = d.date_ed;
        },self);

    }
    public async getData():Promise<any>
    {
        let self = this;
        let d = await g_mindata.getData(
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
        self.dispatch(event_key.LGACT_MIN_DATA_SHOW, d);
    }
}