import { LogicMain } from '@/logicMain';
import ByteArray from '@/net/ByteArray';
import { conn, connection_single } from '@/net/netManager';
import LogicBase from './logicBase';

export default class LogicNet extends LogicBase implements conn 
{
    private _net: connection_single;
    constructor(m: LogicMain) {
        super(m);
    }

    public init() {
        let self = this;
        self._net = new connection_single(self);
    }

    public connect(uri:string) 
    {
        let self = this;
        self._net.connect(uri);
    }

    public onRecv(buf:ByteArray) {
        console.log(buf.toString());
    }

    public onConnect() {
    }
    public onError() {

    }
    public onClose() {
    }

}