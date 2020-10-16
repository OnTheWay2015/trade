import Vue from 'vue'
import root from './page/Root.vue'
//import store from './store'
//element-ui
import ElementUI from 'element-ui';
//import 'element-ui/lib/theme-chalk/index.css';
import LogicMain from "./logicMain"

//-------------
//import echarts from 'echarts'
//Vue.prototype.$echarts = echarts //通过Vue.prototype 将echarts保存为全局变量。原则上$echarts可以为任意变量名。

import NetManager from './net/netManager';
import client2gate_msg_type from './net/proto/client2gate_msg_type';
import client2gate_protocols from './net/proto/client2gate_protocol';
import msg_info_def from './net/proto/msg_info_def';
import msg_type_def from './net/proto/msg_type_def';
import { ACC, DEFAULT_AGENTID, DEFAULT_CHANNEL, DEFAULT_IP, DEFAULT_PACKAGETP, http, NET_KEY } from './net/httpHandle';
import { pack_id } from './util/configs';
import md5 from './net/Crypt';
var _testpb = () => {

  let p_NetMgr: NetManager;
  async function testpb(ip: string) {
    p_NetMgr = new NetManager();

    await p_NetMgr.init({
      onConnect: onConnect,
      onError: onError,
      onClose: onClose,
    });

    await p_NetMgr.addProto(msg_type_def);
    await p_NetMgr.addProto(client2gate_protocols);
    await p_NetMgr.addProto(msg_info_def);

    await p_NetMgr.addProto(client2gate_msg_type);

    p_NetMgr.transMsgByid("client2gate_protocols", "client2gate_protocols.e_server_msg_type");


    //reg callback
    p_NetMgr.regProcess(pack_id.e_mst_cg2cg_start, msgOnStart, null);
    p_NetMgr.regProcess(pack_id.e_mst_w2c_player_connect_result,
      msgOnPlayConnect, null);
    //p_NetMgr.regProcess(pack_id.e_mst_g2c_heartbeat, msgOnHeartBeat,
    //     null);


    p_NetMgr.connect(ip);

  }



  //------------------------
  function onConnect() {

  }
  function onError() {

  }
  function onClose() {

  }
  //------------------------


  function msgOnStart(msg: any): void {
    let data = _loginData;
    let m = {
      account: data.acc,
      token: data.info,/*token*/
      sign: md5(data.acc + data.info + NET_KEY),
      platform: "default",
      login_platform: "web",
      channelid: DEFAULT_CHANNEL,
    }
    console.log("try playConnect");
    //self.sendMsg(
    //    game.NetWorld.e_mst_c2w_player_connect,m);
  }

  function msgOnPlayConnect(msg: any): void {
    console.log("onPlayConnect");
    //this.postEvent(game.EVENT.GAME_CONNECT, msg);
  }
  //------------------------
  function loginVisitor() {
    let _acc = ACC;
    http.accLogin(
      {
        nm: _acc == "" ? "" : _acc
        , channel: DEFAULT_CHANNEL
        , agentId: DEFAULT_AGENTID
        , urlKey: ""
        , hardwareId: ""
        , packAgeTP: DEFAULT_PACKAGETP
        , clientIp: DEFAULT_IP
      },
      false,
      onAccLogin,
      null);
  }
  var _loginData: any;
  function onAccLogin(data?: any): void {
    _loginData = data;
    console.log("acclogin:" + JSON.stringify(data));
    if (!data.ret) {
      console.error("web onAccLogin error[" + data.info + "]");
      return;
    } //gameWebIp":"ws://192.168.1.11:15002/"}
    //this.postEvent(game.EVENT.GAME_LOGIN, data);
    testpb(data.gameWebIp);
  }
  loginVisitor();
}


//_testpb();



let main = () => {
  Vue.config.productionTip = false
  Vue.use(ElementUI);

  let op = {
    //store, //vuex里会创建两个Vue实例. vuex::_watcherVM, vuex::vm
    render: (h: any) => {
      return h(root);
    }
  };
  let com = new Vue(op);

  com.$on("hook:mounted", (evt: any) => {
    console.log("VM com --->hook:mounted");
    let lg = new LogicMain(com);
    lg.init();
    lg.start();
  })

  com.$mount("#app");
};

//main();