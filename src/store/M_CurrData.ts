import EventDispatcher from "../util/eventdispatch"
import event_key from '@/util/event_key';
import { conn, connection_single } from '@/net/netManager';
import { http } from '@/net/httpHandle';
import { paramsUrlFMT } from '@/util/utils';
import { ACT_WS_URL, HTTP_SERVER_WS, WS_URL } from '@/util/configs';


export class M_CurrData extends EventDispatcher implements conn
{
    constructor()
    {
        super();
        this.init()
    }
    private _net:connection_single;
    private _isConnect:boolean = false;
    private _conf:{uri:string,id:string,period:number};
    private _content:string = "";
    private init() {
        let self = this;
        self._conf = {uri:WS_URL,id:"",period:0};
        self._net = new connection_single(self);
    }

    private connect() 
    {
        let self = this;
        if (self._isConnect)
        {
            return;
        }
        self._net.connect(self._conf.uri);
        
    }

    public onRecv(buf: string) {
        let self = this;
        self._content = buf;
        //console.log(buf);
        self.dispatch(event_key.DATA_ACT_CURR_DATA, self._content);
    }

    public onConnect() {
        let self = this;
        self._isConnect = true;
        if (self._conf.id)
        {
            self.actWS(self._conf.id,self._conf.period);
        }
    }
    public onError() {

    }
    public onClose() {
    }

    public async actWS(id:string, period:number): Promise<any> {
        let self = this;
        self._conf.id = id;
        self._conf.period= period;
        if (!self._isConnect)
        {
            self.connect();
            console.log("actWS try ws connect" );
            return null;
        }
        let args = paramsUrlFMT(["contract_id","period"],[id,period]);
        var info = await http.asyncGet(HTTP_SERVER_WS+ACT_WS_URL+ args);
        console.log("actWS:" + info.msg);
        return null;
    }

    //public getCurrKdata()
    //{
    //   let self = this;
    //   //self.dispatch(event_key.DATA_ACT_DEL_LINE,null);
    //}

}
let g_currdata = new M_CurrData();
export default g_currdata; 