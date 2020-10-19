enum event_key  {
    //DATA_="DATA_" //send data 
    DATA_ACT_="DATA_ACT_" //data send out
    //------------------
   
    ,DATA_ACT_ADD_POINT = "DATA_ACT_ADD_POINT "
    ,DATA_ACT_ADD_LINE= "DATA_ACT_ADD_LINE"
    ,DATA_ACT_SEL_LINE_FLAG= "DATA_ACT_SEL_LINE_FLAG"
    
    ,DATA_ACT_DEL_POINT = "DATA_ACT_DEL_POINT "
    ,DATA_ACT_DEL_LINE= "DATA_ACT_DEL_LINE"
    //------------------
    ,LG_="LG_" //send logic 
    ,LGACT_="LGACT_" //logic send out
   
    //------------------
    ,LGACT_TICK_DATA_SHOW="LGACT_TICK_DATA_SHOW"
    ,LGACT_TICK_DATA_UPDATE ="LGACT_TICK_DATA_UPDATE"
    ,LGACT_MIN_DATA_SHOW="LGACT_MIN_DATA_SHOW"
    ,LGACT_MIN_DATA_UPDATE ="LGACT_MIN_DATA_UPDATE"
    //------------------
    
    ,LG_MIN_DATA_SET_PARAMS="LG_MIN_DATA_SET_PARAMS"
    
    //------------------
    ,UI_="UI_" //send ui
    ,UIACT_="UIACT_" //ui send out
    
    //------------------
    ,UI_RESIZE="UI_RESIZE"
    ,UI_ECHARTS_DATA_SHOW="UI_ECHARTS_DATA_SHOW"
    ,UI_ECHARTS_DATA_UPDATE ="UI_ECHARTS_DATA_UPDATE"
    
    //------------------
    ,UIACT_TEST="UIACT_TEST"
    ,UIACT_APP_BTN_K="UIACT_APP_BTN_K" 
    ,UIACT_APP_BTN_TICK="UIACT_APP_BTN_TICK" 
    ,UIACT_MIN_DATA_SET_PARAMS="UIACT_MIN_DATA_SET_PARAMS" 
    ,UIACT_MIN_DATA_SHOW="UIACT_MIN_DATA_SHOW" 



    ,UI_ACT_SEL_POINT = "UI_ACT_ADD_POINT "
    ,UI_ACT_ADD_LINE= "UI_ACT_ADD_LINE"
    ,UI_ACT_SEL_LINE_FLAG= "UI_ACT_SEL_LINE_FLAG"
    
    //,UI_ACT_DEL_POINT = "UI_ACT_DEL_POINT "
    ,UI_ACT_DEL_LINE= "UI_ACT_DEL_LINE"
    //------------------

};

export default event_key;  