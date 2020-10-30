import  LogicBase from "./logicBase"
import  g_tickdata from "../store/M_Tickdata"
import event_key from '@/util/event_key';
import { LogicMain } from '@/logicMain';
export default class LogicTick extends LogicBase 
{
    constructor(m:LogicMain){
        super(m);
    }

    public async getData():Promise<any>
    {
        let d = await g_tickdata.getData();
        console.log("logictick getdata!");
        return d;
    }
    
    public async show()
    {
        let self = this;
        let d = await this.getData();
        self.dispatch(event_key.LGACT_TICK_DATA_SHOW, d);
    }
}