import md5 from './Crypt';
import Event from './event';
import { HttpMethod } from './HttpMethod';
import { HttpResponseType } from './HttpResponseType';
import { WebHttpRequest } from './web/WebHttpRequest';

    export let ACC: string = "";
    //export let DEFAULT_CHANNEL: string = "440001";
    export let DEFAULT_CHANNEL: string = "149856_107";
    export let DEFAULT_AGENTID: string = "71";
   export let DEFAULT_PACKAGETP: string = "";
   export let DEFAULT_IP: string = "";
    
    export let WEB_LOGIN_IP: string = "http://192.168.1.11:8611";
    export const NET_KEY: string = "5C4BEE401828DF1D920F9CFD323C9AFA";


   export module http {
        export interface ILoadShow {
            showBusy();
            hideBusy();
        }

        export let busyUI: ILoadShow;
        export let svrURL: string = "http://192.168.1.11:8611";//test

        export function accLogin(args: { nm: string, channel: string ,agentId:string,hardwareId:string, packAgeTP:string, clientIp:string, urlKey:string}, showBusy: boolean, cb: Function, target: any) {//游客登录
            //let postData = makeSign(args.nm) + "&channel=" + args.channel;
            //reqURL("/Web/WebLogin.aspx", postData, showBusy, cb, target);

            //var postData = args.nm + ':' + args.channel + ':' + args.agentId + ':' + "args.hardwareId" + ':' + "url";
            //var postData = args.nm + ':' + args.channel + ':' +1+ ':' + "args.hardwareId" + ':' + "url";
            
            
            //var postData = args.nm + ':' + args.channel + ':' + args.agentId+ ':' + "url";
            //reqURL("/Web/WebLogin2.aspx", makeSign(postData), showBusy, cb, target);




            let isNative = false;
            var url = md5(args.urlKey);
            if (isNative) {
                var postData = args.nm + ':' + args.channel + ':' + args.agentId + ':' + args.hardwareId + ':' + url + ':' + args.clientIp;
                reqURL("/Web/WebLogin.aspx", makeSign(postData), showBusy, cb, target);
            }
            else {
                var postData = args.nm + ':' + args.channel + ':' + args.agentId + ':' + url + ':' + args.clientIp + ":"+args.packAgeTP;
                reqURL("/Web/WebLogin2.aspx", makeSign(postData), showBusy, cb, target);
            }

        }

        export function checkCode(args: { phone: string }, showBusy: boolean, cb: Function, target: any) {
            let postData = makeSign(args.phone);
            reqURL("/Web/WebCode.aspx", postData, showBusy, cb, target);
        }
        export function regAcc(args: { phone: string, pwd: string, checkcode: string }, showBusy: boolean, cb: Function, target: any) {
            let signedPsw = md5(args.pwd + "NANA1314");
            let data = args.phone + ':' + args.checkcode + ':' + signedPsw;
            reqURL("/Web/WebRegAccount.aspx", makeSign(data), showBusy, cb, target);
        }
        export function loginAcc(args: { phone: string, pwd: string }, showBusy: boolean, cb: Function, target: any) {//账号密码登录
            let signedPsw = md5(args.pwd + "NANA1314");
            let data = args.phone + ':' + signedPsw;
            reqURL("/Web/WebPhoneLogin.aspx", makeSign(data), showBusy, cb, target);
        }
        export function bindAcc(args: { phone: string, pwd: string, nm: string, checkcode: string }, showBusy: boolean, cb: Function, target: any) {
            let signedPsw = md5(args.pwd + "NANA1314");
            let data = args.nm + ':' + args.phone + ':' + args.checkcode + ':' + signedPsw;
            reqURL("/Web/WebBindAccount.aspx", makeSign(data), showBusy, cb, target);
        }

        export function getIp(showBusy: boolean, cb: Function, target: any) {
            reqURL("/Common/GetP.aspx", "", showBusy, cb, target);
        }

        function makeSign(data: any) {
            var sign = md5(data + "8DB1C7CE26C2A748FA3627410DB0FB0F");
            return "data=" + data + "&sign=" + sign;
        }

        export function reqURL(url: string, data: string, showBusy: boolean, cb: Function, target: any): void {
            let request = new WebHttpRequest();
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            //request.responseType = HttpResponseType.TEXT;
            request.responseType = "text";
            request.open(svrURL + url, HttpMethod.POST);
            request.addEventListener(Event.COMPLETE, function (e:Event) {
                if (showBusy && busyUI) busyUI.hideBusy();
                let req = <WebHttpRequest>e.currentTarget;
                let data = JSON.parse(req.response);
                cb.call(target, data);
            }, this);

            request.addEventListener(Event.IO_ERROR, function (e) {
                if (showBusy && busyUI) busyUI.hideBusy();
                cb.call(target,e);
            }, this);

            if (showBusy && busyUI) busyUI.showBusy();

            request.send(data);
        }

    }