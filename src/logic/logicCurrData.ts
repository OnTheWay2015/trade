import  LogicBase from "./logicBase"
import event_key from '@/util/event_key';
import { LogicMain } from '@/logicMain';
import g_currdata, { M_CurrData } from '@/store/M_CurrData';
import Event from '@/util/event';
import g_mindata from '@/store/M_MinData';
import { stringToDate, stringToDateDEF } from '@/util/utils';
export default class LogicCurrData extends LogicBase 
{
    constructor(m:LogicMain){
        super(m);
    }
    private m_data:M_CurrData;    
    public init() {
        let self = this;
        self.m_data = g_currdata;

        self.m_data.addEventListener(event_key.DATA_ACT_CURR_DATA, self.onCurrData.bind(self),self);
    }
    public setConfig(id:string,period:number)
    {
        let self = this;
        self.m_data.actWS(id,period);
    }

    private onCurrData(evt:Event)
    {
        let self = this;
        let d = evt.data;
        let arr = d.split(",");
        let matchstr = "";
        for (let i=1;i<arr.length;i++)
        {
            let c:string = arr[i];
            if (c.indexOf("Timestamp")>=0)
            {                   
                let idx1 =  c.indexOf("(") + 2;
                c = c.substr(idx1, c.length);
                c = c.substr(0, 19);
                matchstr = c;
                break;
            }
        }
        if (matchstr != "")
        {
            let id= arr[0].substr(2,6);
            //let de = stringToDate(matchstr);
            let de = stringToDateDEF(matchstr);
            //console.log("---------->" + de.toDateString());    
            //console.log("---------->" + de.toISOString());    
            //console.log("---------->" + de.toString());    
            g_mindata.tryAddData(id,[
                de
                ,parseInt(arr[2])
                ,parseInt(arr[3])
                ,parseInt(arr[4])
                ,parseInt(arr[5])
                ,parseInt(arr[6])
            ]);
        }
        else
        {

        }
    }
}