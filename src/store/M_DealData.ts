import EventDispatcher from "../util/eventdispatch"
import event_key from '@/util/event_key';
import { http } from '@/net/httpHandle';
import { paramsUrlFMT } from '@/util/utils';
import { HTTP_SERVER_DEAL,API_DEAL_DATA } from '@/util/configs';


export class M_DealData extends EventDispatcher
{
    constructor()
    {
        super();
        this.init()
    }
    private init() {
        let self = this;
    }
    
    public async getData(): Promise<any> {
        let self = this;
        //let args = paramsUrlFMT(["contract_id","period"],[id,period]);
        var info = await http.asyncGet(HTTP_SERVER_DEAL+API_DEAL_DATA);
        console.log("get Complete data:" + info);
        
        /**
         [
0: 1
1: "rb2101"
2: "106500"
3: "9999"
4: "      342105"
5: "      176793"
6: "SHFE"
7: "SHFE"
8: "0"
9: 3863
10: 1
11: "20201109"
12: "13:36:42"
         ]


1#  InstrumentID 合约代码
9# Price 成交价格
12# TradeTime 时间 
7#Direction 买卖方向
CombOffsetFlag 开平标记

1. EventID INTEGER PRIMARY KEY AUTOINCREMENT
2. InstrumentID CHAR(8),
3. InvestorID CHAR(20), 
4. BrokerID CHAR(8)
5. OrderSysID CHAR(16),
6. TradeID CHAR(16), 
7. ExchangeID CHAR(8), 
8. Direction INTEGER NOT NULL, 
9. OffsetFlag CHAR(8), 
10. Price REAL, 
11. Volume INTEGER NOT NULL
12. TradingDay CHAR(16) NOT NULL, 
13. TradeTime CHAR(16)
         [
        # 合约代码
        # 成交编号
        # 成交价格
        # 订单号
        # 时间
        # 用户帐号
        # 合约代码
        # 报单价格
        # 此报单总手数
        # 剩余未成交手数
        # 已成交手数
        # 交易所日期
        # 订单号
        # 订单状态
        # 订单状态编号
        # 报单引用
        # 会话编号
        # 前置编号
        # 买卖方向 0为多　1为空 注意如果是平仓，这里应该取反
        # 开平方向 0为开　1为平
         ] 


         */
        return info;
    }


}
let g_dealdata= new M_DealData();
export default g_dealdata; 