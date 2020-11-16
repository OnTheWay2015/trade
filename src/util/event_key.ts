enum event_key  {
    //DATA_="DATA_" //send data 
    DATA_ACT_="DATA_ACT_" //data send out
    //------------------
   
    ,DATA_ACT_ADD_POINT = "DATA_ACT_ADD_POINT "
    ,DATA_ACT_ADD_LINE= "DATA_ACT_ADD_LINE"
    ,DATA_ACT_SEL_LINE_FLAG= "DATA_ACT_SEL_LINE_FLAG"
    
    ,DATA_ACT_DEL_POINT = "DATA_ACT_DEL_POINT "
    ,DATA_ACT_DEL_LINE= "DATA_ACT_DEL_LINE"
    ,DATA_ACT_CURR_DATA= "DATA_ACT_CURR_DATA"
    //------------------
    ,LG_="LG_" //send logic 
    ,LGACT_="LGACT_" //logic send out
   
    //------------------
    ,LGACT_TICK_DATA_SHOW="LGACT_TICK_DATA_SHOW"
    ,LGACT_TICK_DATA_UPDATE ="LGACT_TICK_DATA_UPDATE"
    ,LGACT_MIN_DATA_SHOW="LGACT_MIN_DATA_SHOW"
    ,LGACT_MIN_DATA_UPDATE ="LGACT_MIN_DATA_UPDATE"
    ,LGACT_CURR_DATA="LGACT_CURR_DATA"
    //------------------
    
    ,LG_MIN_DATA_SET_PARAMS="LG_MIN_DATA_SET_PARAMS"
    
    //------------------
    ,UI_="UI_" //send ui
    ,UIACT_="UIACT_" //ui send out
    
    //------------------
    ,UI_RESIZE="UI_RESIZE"
    ,UI_ECHARTS_DATA_SHOW="UI_ECHARTS_DATA_SHOW"
    ,UI_ECHARTS_DATA_UPDATE ="UI_ECHARTS_DATA_UPDATE"
    ,UI_SELECT_LINE="UI_SELECT_LINE"
    //,UI_SELECT_POINTS="UI_SELECT_POINTS"
    //,UI_SELECT_POINT_FLAG="UI_SELECT_POINT_FLAG"
    ,UI_SHOW_BLOCKS="UI_SHOW_BLOCKS"
    //------------------
    ,UIACT_TEST="UIACT_TEST"
    ,UIACT_APP_BTN_K="UIACT_APP_BTN_K" 
    ,UIACT_APP_BTN_TICK="UIACT_APP_BTN_TICK" 
    ,UIACT_MIN_DATA_SET_PARAMS="UIACT_MIN_DATA_SET_PARAMS" 
    ,UIACT_MIN_DATA_SHOW="UIACT_MIN_DATA_SHOW" 



    ,UI_ACT_SEL_CLEAR= "UI_ACT_SEL_CLEAR"
    ,UI_ACT_DEAL_DATA="UI_ACT_DEAL_DATA" 
    ,UI_ACT_CHANGE_SHOW= "UI_ACT_CHANGE_SHOW"
    ,UI_ACT_SEL_ELE= "UI_ACT_SEL_ELE"
    ,UI_ACT_SEL_ELES= "UI_ACT_SEL_ELES"
    ,UI_ACT_ADD_LINE= "UI_ACT_ADD_LINE"
    ,UI_ACT_DEL_LINE= "UI_ACT_DEL_LINE"
    ,UI_ACT_ADD_POINT= "UI_ACT_ADD_POINT"
    ,UI_ACT_DEL_POINT= "UI_ACT_DEL_POINT"
    ,UI_ACT_TURN_MARKLINE_LABEL= "UI_ACT_TURN_MARKLINE_LABEL"
    
    ,UI_ACT_SEL_POINT_FLAG= "UI_ACT_SEL_POINT_FLAG"
    
    //,UI_ACT_DEL_POINT = "UI_ACT_DEL_POINT "
    ,UI_ACT_OPSTATE_CLICK= "UI_ACT_OPSTATE_CLICK"
    //------------------
    ,UI_ACT_TOOL_TODO= "UI_ACT_TOOL_TODO"

    //------------------
};

//.faq cant export
export enum _key_board {
    ENTER = 13,
    DEL = 46,
    ARW_DOWN = 40,
    ARW_UP= 38,
};

export const KEY_BOARD_ENTER = 13;
export const KEY_BOARD_DEL= 46;
export const KEY_BOARD_ARW_DOWN= 40;
export const KEY_BOARD_ARW_UP= 38;


export default event_key;  