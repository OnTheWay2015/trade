


let e_obj = {a:123};
let val = 666;
export let val1 = 12345;
class e_class 
{
    public val_v = 123;
    public val= 100;
    public func()
    {
        console.log("e_class func act!");
    }
}

function e_func(){
    console.log("e_func act!");
}


interface F {
    val_v?:number;  //可选属性
    val:number; 
    func():void;
}
class e_class_tpl<T extends F >
{
    public func(x:T)
    {
        console.log("e_class_tpl func act!");
        x.func();
    }
}


export class e_class1  //可在最后 export {...} 综合导出，也可单独加 export导出 
{
    public func()
    {
        console.log("e_class1 func act!");
    }
}




type FF = F;// F 加个 别名 FF

export type FFF = F; //直接导出 F 加的别名 FFF
export type e_class_tpl_t<T extends FF> = e_class_tpl<T>; //e_class_tpl　加个别名 e_class_tpl_t 


export default e_obj;
export {F,FF, e_class, e_class_tpl, e_func,val};


//　在 import 的时候，只有 default 导出的可以单独例出，如 e_obj1,其他的都要放在 { }里 
//import e_obj1, {F,FF,FFF,e_class} from './test/m_export'  //e_obj1　为 export.default, { }里的为其他 export
//import e_obj from './test/m_export'
//import * as XX from './test/m_export'