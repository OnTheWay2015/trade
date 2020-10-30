import { LogicMain } from '@/logicMain';
import UIMain from '@/UIMain';
import EventDispatcher from "../util/eventdispatch"

export default class LogicBase  extends EventDispatcher
{
    protected m_main:LogicMain;
    constructor(m:LogicMain)
    {
        super();
        this.m_main = m;
    }
    public init()
    {//override

    }

}