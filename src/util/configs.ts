let configs = {};
export const HTTP_SERVER_DEAL:string = "http://139.196.45.10:8888"
export const HTTP_SERVER:string = "http://106.14.80.181:8000";
export const HTTP_SERVER_WS:string = "http://106.14.80.181:8800";
export const API_TICK_DATA:string = "/tick_data";
export const API_TICK_DATA_ODS:string = "/tick_data?type=ods";
export const API_MIN_DATA:string = "/trade_date";
export const API_DEAL_DATA:string = "/get_deal_list";
//export const API_MIN_DATA:string = "/min_data";
//export const API_MIN_DATA:string = "/min_data?id=au2102&date=20200915&min=10";
//id=au2102&date=20200915&min=10
//export const API_MIN_DATA:string = "/tick_data";
export const API_MIN_DATA_ODS:string = "/min_data?type=ods";



//export const WS_URL = "ws://106.14.80.181:8800/ws/gofor";
export const WS_URL = "ws://106.14.80.181:8800/ws/jr";
export const ACT_WS_URL = "/ws_notice";// contract_id, period,



//----------
export const MARK_TIME_IDX= 0;
export const START_PRICE_IDX = 1;
export const END_PRICE_IDX = 2;
export const HIGHT_PRICE_IDX = 3;
export const LOW_PRICE_IDX = 4;
export const MARK_TIME_1_IDX= 11;
//----------

export const TIME_UNIT_MIN:number= 1;
export const TIME_UNIT_HOUR:number= 2;
export const TIME_UNIT_DAY:number= 3;
//----------
export const DEAL_IDX_ID:number= 4;//合约代码
export const DEAL_IDX_DIRECTION:number= 5;//买卖方向
export const DEAL_IDX_PRICE:number= 8;//成交价格
export const DEAL_IDX_TRADETIME_DATE:number= 11;// 时间,年月日  
export const DEAL_IDX_TRADETIME:number= 9;// 时间 
export const DEAL_IDX_COFLAG:number= 7;//开平标记



//----------
export default configs;


export enum pack_id{
e_mst_cg2cg_start=444
,e_mst_w2c_player_connect_result
,e_mst_g2c_heartbeat

};