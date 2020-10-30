import ByteArray,{Endian} from "./ByteArray"
import EventDispatcher from "./eventdispatch"
import Event from "./event"
import { HTML5WebSocket } from './socket/web/HTML5WebSocket';
import { WebSocket } from './socket/WebSocket';


export default class  NetManager{
        private _pbroot:any;
        private _pbMsgs:any;
        private _conn:connection;
        private _processFuncs:{[key:number]:(m)=>void};
        constructor(){
            this._pbMsgs= {};
            this._processFuncs = {};
        }

        public regProcess(msgid: number, cb: (msg) => void, tar:any): void {
            if (this._processFuncs[msgid] != null) {
                console.error("NetManager regProcess["+msgid+"] dup");
            }
            this._processFuncs[msgid] = cb.bind(tar);
        }

        public unRegProcess(msgid:number):void{
            let rmvkeys = [];
            for (const k in this._processFuncs){
                if (parseInt(k)  == msgid){
                    delete this._processFuncs[ msgid ];
                }
            }
        }

        public isProcessReged(msgid:number):boolean{
            return this._processFuncs[msgid] != null;
        }

        public unRegProcessAbove(msgidAbove:number):void{
            let rmvkeys = [];
            for (const k in this._processFuncs){
                if (parseInt(k)  >= msgidAbove){
                    rmvkeys.push(k);
                }
            }

            for (let i=0,len=rmvkeys.length;i<len;i++){
                delete this._processFuncs[ rmvkeys[i] ];
            }
        }

        private _cbdata:{
                onConnect: any,
                onError: any,
                onClose: any
            } 
        public async init(data?:any): Promise<number> {
            let self = this;
            self._cbdata = data;
            self._conn = new connection(self);
            return 1;
        }

        public addProto(proto: string) {
            let self = this;


            //let pstr = String.fromCharCode.apply(null, new Uint8Array(proto));
            let pstr = proto;
            let m = protobuf.parse(pstr, {keepCase:true});
            if (self._pbroot == null) {
                self._pbroot = m.root;
            } else {
                let root = self._pbroot;
                if ( m.root.name == "" || !root.get(m.root.name)){
                    root.add(m.root);
                }else{
                    console.error("addProto root.add duplicate name :" + m.root.name );
                }
            }
        }

        public transMsgByid(pkgName:string,pkgEnum:string):void{
            let self = this;
            let pt: any = self._pbroot.lookup(pkgName);
            let em: any = self._pbroot.lookup(pkgEnum);
            if (pt== null || em == null){
                console.error("pkg["+pkgName+"] transMsgByid error");
                return;
            }

            for (let k in pt.nested ){
                let p = pt.nested[k];
                if (p.fields == null){
                    continue;
                }
                let fields= p["fields"];
                let fds = fields["packet_id"];
                if (fds == null){
                    continue;
                }
                if (fds.options == null){
                    continue;
                }
                if (fds.options.default == null){
                    continue;
                }
                let id =  fds.options.default;
                if ( typeof(id) == "string" ){
                    //id = fds.defaultValue;
                    id = em.values[id];
                }
                if (id == null){
                    console.error("pkg["+pkgName+"] transMsgByid id null");
                    continue;
                }
                if ( self._pbMsgs[id] != null){
                    console.error("pkg["+pkgName+"] transMsgByid ["+id+"] dup");
                }
                self._pbMsgs[id] = p;
            }
        }
        private createMsg(msgid:number,data?:any):any{
            //let WSMessage: any = root.lookup("wenlipackage.WSMessage");
            //let wsmessage = WSMessage.create({ id: "1", content: "hello", sender: "web", time: new Date().getTime() });
        }

        public sendMsg(msgid:number,m:any):void{
            let self = this;
            if (msgid != 301) console.log("sendMsg["+msgid+"]");
            let MSG:any = self._pbMsgs[msgid];
            if (MSG == null){
                console.error("sendMsg["+msgid+"] error");
                return;
            }
            let msg= MSG.create(m);
            self._conn.send(msgid, msg, MSG);
        }

        public recvMsg(msgid: number, len: number, buf: ByteArray):void{
            let self = this;
            var msgData = self._pbMsgs[msgid];
            //if (msgid < self.e_gate_msg_type.e_mst_cgend_index)
            //{
            //    msgData = self.gateMSG.lookup(self.transIdToTypeString(msgid));
            //}
            //else if (msgid < self.e_world_msg_type.e_mst_cwend_index)
            //{
            //    msgData = self.worldMSG.lookup(self.transIdToTypeString(msgid));
            //}
            //else
            //{
            //   // msgData = _ClientLogic.decodeGameMsg(msgid, inData);
            //}  

            if (msgData == null){
                console.error("decodeMsg["+msgid+"] error!");
                return null;
            }
            //let msg = msgData.decode(buf.position + len);
            let rb = new ByteArray();
            rb.endian = Endian.LITTLE_ENDIAN;
            rb.writeBytes(buf,buf.position,len);
            let aa:any = rb.bytes;
            self._processMsg(msgid,msgData,aa);
        }
        public processMsg(msgid:number, bytes:any):void{
            let self = this;
            var msgData = self._pbMsgs[msgid];

            if (msgData == null){
                console.error("processMsg["+msgid+"] error!");
                return null;
            }
            self._processMsg(msgid,msgData,bytes);
        }
        private _processMsg(msgid:number,msgData:any, bytes:any):void{
            let self = this;
            let p = self._processFuncs[msgid];
            if (msgid != 404) console.log("NetManager _processMsg["+msgid+"]");
            if (p == null){
                console.error("NetManager _processMsg["+msgid+"] no process function");
                return;
            }
            let msg = msgData.decode(bytes);
            p(msg);
        }
        private dumpbuf(b:ByteArray):void{
            let str = "";
            let bb = b.bytes;
            for (let i=0,len=bb.byteLength;i<len;i++){
                let c = bb[i];
                str += c.toString() + ","
            }
            console.log("dumpbuf:" + str);
        }

        public connect(ip:string):void{
            if (this._conn == null){
                console.error("netManager connect["+ip+"] error");
                return;
            }
            this._conn.connect(ip);
        }
        public onConnect():void{
            let self = this;
            console.log("onConnect!");
            if (self._cbdata!= null ){
                self._cbdata.onConnect();
            } 
        }
        public onError():void{
            let self = this;
            console.error("connect error!");
            if (self._cbdata!= null ){
                self._cbdata.onError();
            } 
        }
        public onClose():void{
            let self = this;
            console.log("connect close!");
            if (self._cbdata!= null ){
                self._cbdata.onClose();
            } 
        }
    }
    class connection{
        private _holder:NetManager;
        //private _sock:egret.WebSocket;
        private _sock:WebSocket;
        private _ip:string;
        constructor(n:NetManager){
            this._holder = n;
            this.init();
        }
        private init():void{
            this.createSock();
        }
        private createSock(){
            let self = this;
            if( self._sock ){
                console.error("last connect is not disposed");
                return;
            }
            //egret.EventDispatcher = egret.EventDispatcher;
            //let evt = new EventDispatcher();
            //self._sock = new HTML5WebSocket();
            self._sock = new WebSocket();
            self._sock.type = WebSocket.TYPE_BINARY;
            self._sock.once(Event.CONNECT, self.onConnect, self);
            self._sock.addEventListener( "ioError", self.onErr, self);
            self._sock.once(Event.CLOSE, self.onClose, self); 
        }

        public connect(ip:string):void{
            let self = this;
            console.error("socket connect["+ip+"] ");
          
            if (ip.indexOf("https") >= 0){
                ip = ip.replace("https", "wss");
            } else if (ip.indexOf("http") >= 0){
                ip = ip.replace("http", "ws");
            } else if (ip.indexOf("wss") < 0 && ip.indexOf("ws") < 0  ) {
                console.error(" connect http ["+ ip +"] error");
                return;
            }
            self._ip = ip;
            self._sock.connectByUrl( ip );
            //self._sock.connectByUrl( 'ws://' + self._ip );
            
            //_sock.connectByUrl((URLUtil.isHttps() ? 'wss://' : 'ws://') + Net.ip);
    //function isHttps() {
    //    if (!window.location)
    //        return false;
    //    return window.location.protocol == "https:";
    //}
        }

        private  onConnect(){
            console.log( "net connected" );
            //this._sock.addEventListener( "socketData" /*egret.ProgressEvent.SOCKET_DATA*/, this.onData, this);
            this._sock.addEventListener(  Event.SOCKET_DATA/*egret.ProgressEvent.SOCKET_DATA*/, this.onData, this);
            this._holder.onConnect();
        }

        private  onErr(){
            console.error("connection onErr todo ") ;
            this._holder.onError();
        }

        private  onClose(){
            console.error("connection onClose todo ") 
            this._holder.onClose();
        }
        private onData(){
            let self = this;
            let buf: ByteArray = new ByteArray();
            buf.endian = Endian.LITTLE_ENDIAN;
            self._sock.readBytes(buf);
            let msg = self.PKG_decode( buf );
            self._holder.recvMsg( msg.id, msg.len, buf );
        }
        public send(msgid:number, msg: any, proto: any) {
            var self = this;
            let buffer = proto.encode(msg).finish();
            let msgbuf: ByteArray = new ByteArray(buffer);
            msgbuf.endian = Endian.LITTLE_ENDIAN;

            let buf: ByteArray = new ByteArray();
            buf.endian = Endian.LITTLE_ENDIAN;

            self.PKG_encode(msgid, buffer.length, buf);
            buf.writeBytes(msgbuf);
            self._sock.writeBytes(buf);
            self._sock.flush();
        }

        public dispose():void{
            let self = this;
            //self._sock.removeEventListener(Event.CONNECT, self.onConnect, self);
            //self._sock.removeEventListener("ioError" /*egret.IOErrorEvent.IO_ERROR*/, self.onErr, self);
            //self._sock.removeEventListener(Event.CLOSE, self.onClose, self);
            //self._sock.removeEventListener("socketData" /* egret.ProgressEvent.SOCKET_DATA*/, self.onData, self);
            //self._sock.close();
            self._sock = null;
        }

        //------------------
        private PKG_encode(msgId: number, len: number, buf: ByteArray) {
            buf.writeInt(msgId);
            buf.writeShort(len);
        }

        private PKG_decode(data: ByteArray): { id: number, len: number } {
            let msgId = data.readInt();
            let msgLen = data.readShort();
            return { id: msgId, len: msgLen };
        }
//------------------

    }
    export interface conn {
        onConnect();
        onError();
        onClose();
        onRecv(buf:ByteArray);
    }
    export class connection_single {
        private _holder:conn;
        private _sock:WebSocket;
        private _ip:string;
        constructor(n:any){
            this._holder = n;
            this.init();
        }
        private init():void{
            this.createSock();
        }
        private createSock(){
            let self = this;
            if( self._sock ){
                console.error("last connect is not disposed");
                return;
            }
            //egret.EventDispatcher = egret.EventDispatcher;
            //let evt = new EventDispatcher();
            //self._sock = new HTML5WebSocket();
            self._sock = new WebSocket();
            self._sock.type = WebSocket.TYPE_BINARY;
            self._sock.once(Event.CONNECT, self.onConnect, self);
            self._sock.addEventListener( "ioError", self.onErr, self);
            self._sock.once(Event.CLOSE, self.onClose, self); 
        }

        public connect(ip:string):void{
            let self = this;
            self._ip = ip;
            console.error("socket connect["+ip+"] ");
          
            if (ip.indexOf("https") >= 0){
                ip = ip.replace("https", "wss");
            } else if (ip.indexOf("http") >= 0){
                ip = ip.replace("http", "ws");
            } else if (ip.indexOf("wss") < 0 && ip.indexOf("ws") < 0  ) {
                console.error(" connect http ["+ ip +"] error");
                return;
            }
            self._ip = ip;
            self._sock.connectByUrl( ip );
        }

        private  onConnect(){
            console.log( "net connected" );
            //this._sock.addEventListener( "socketData" /*egret.ProgressEvent.SOCKET_DATA*/, this.onData, this);
            this._sock.addEventListener(  Event.SOCKET_DATA/*egret.ProgressEvent.SOCKET_DATA*/, this.onData, this);
            this._holder.onConnect();
        }

        private  onErr(){
            console.error("connection onErr todo ") ;
            this._holder.onError();
        }

        private  onClose(){
            console.error("connection onClose todo ") 
            this._holder.onClose();
        }
        private onData(){
            let self = this;
            let buf: ByteArray = new ByteArray();
            buf.endian = Endian.LITTLE_ENDIAN;
            self._sock.readBytes(buf);
            self._holder.onRecv( buf );
        }

        public send(buf: ByteArray) {
            var self = this;
            self._sock.writeBytes(buf);
            self._sock.flush();
        }

        public dispose():void{
            let self = this;
            self._sock = null;
        }
    }


