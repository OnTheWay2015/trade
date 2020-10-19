export const FRAME_TM = 33;

export const GET:string="get";
export const POST:string="post";

export function log(str:string){
    console.log(str);
}
export function notice(str:string){
    console.log(str);
}
export function error(str:string){
    //let e = Error();
    //console.log(e.stack);
    console.error(str);
}

export function deepClone(origin, target){
    var target = target || {},
    toStr = Object.prototype.toString,
    arrStr = "[object Array]";
    for(var prop in origin){
        if(origin.hasOwnProperty(prop)){
            if(origin[prop] !== "null" && typeof(origin[prop]) == "object")
            {
                target[prop] = (toStr.call(origin[prop]) == arrStr) ? [] : {};                    
                deepClone(origin[prop],target[prop]);
        　　}else{
            　　target[prop] = origin[prop];
        　　}
        }
    }
} 
//--------------------------------
export class urlST{
    public isHttps:boolean = false;
    public host:string= "";
    public path:string= "/";
}

export function transURLSt(url: string): urlST | null {
    url = url.toLocaleLowerCase();
    let regHttps = /^[hH]{1}[tT]{2}[pP]{1}[sS]{1}:\/\//;
    let regHttp = /^[hH]{1}[tT]{2}[pP]{1}:\/\//;
    let ret = new urlST();
    if (regHttps.test(url)) {
        ret.isHttps = true;
        url = url.slice(8);
        log("https act!");
    }
    else if (regHttp.test(url)) {
        url = url.slice(7);
        log("http act!");
    }
    else {
        return null;
    }
    let seg = url.indexOf("/");
    if (seg === -1) {
        ret.host = url;
        ret.path = "/";
    }
    else {
        ret.host = url.slice(0, seg);
        ret.path = url.slice(seg);

    }
    return ret;
} 

export function paramsUrlFMT(keys:string[],values:any[])
{   
    if (keys.length <=0)
    {
        return "";
    }
    let params = "?";
    for (let i=0;i<keys.length;i++)
    {
        if (!values[i])
        {
            continue;
        }
        if (params.length ==1)
        {
            params  += (keys[i]+"=" + values[i] );
        }
        else{
            params  += ( "&" +keys[i]+"=" + values[i] );
        }
    }
    return params;

}

export function getGradeid(k: string): number {
    if ( k.indexOf("一") >= 0 ) return 1;
    if ( k.indexOf("二") >= 0 ) return 2;
    if ( k.indexOf("三") >= 0 ) return 3;
    if ( k.indexOf("四") >= 0 ) return 4;
    if ( k.indexOf("五") >= 0 ) return 5;
    if ( k.indexOf("六") >= 0 ) return 6;
    return 0;
}

export function getKindid(k:string):number{

    return 0;
}

export function getExeid(k:string):number{

    return 0;
}

export function dateFMT(d:Date,f:string=null):string{
    let fmt = f? f:'yy-MM-dd hh:mm:ss';
    let o = {
            "M+": d.getMonth() + 1, // 月份
            "d+": d.getDate(), // 日
            "h+": d.getHours(), // 小时
            "m+": d.getMinutes(), // 分
            "s+": d.getSeconds(), // 秒
            "q+": Math.floor((d.getMonth() + 3) / 3), // 季度
            "S": d.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (d.getFullYear() + ""));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;

}

