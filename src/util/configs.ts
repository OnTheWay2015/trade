let configs = {};

export const HTTP_SERVER:string = "http://106.14.80.181:8000";
export const API_TICK_DATA:string = "/tick_data";
export const API_TICK_DATA_ODS:string = "/tick_data?type=ods";
export const API_MIN_DATA:string = "/trade_date";
//export const API_MIN_DATA:string = "/min_data";
//export const API_MIN_DATA:string = "/min_data?id=au2102&date=20200915&min=10";
//id=au2102&date=20200915&min=10
//export const API_MIN_DATA:string = "/tick_data";
export const API_MIN_DATA_ODS:string = "/min_data?type=ods";



export const TIME_UNIT_MIN:number= 1;
export const TIME_UNIT_HOUR:number= 2;
export const TIME_UNIT_DAY:number= 3;

export default configs;


export enum pack_id{
e_mst_cg2cg_start=444
,e_mst_w2c_player_connect_result
,e_mst_g2c_heartbeat

};