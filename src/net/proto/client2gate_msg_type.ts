let   client2gate_msg_type ="package client2gate_protocols;enum e_server_msg_type {\
    e_mst_start_c2g = 300;\
	e_mst_c2g_heartbeat = 301;	\
	e_mst_c2g_net_param = 302;\
	e_mst_start_g2c = 400;\
	e_mst_g2c_send_msglist = 401;\
	e_mst_g2c_net_param = 402;\
	e_mst_g2c_shutdown = 403;\
	e_mst_g2c_heartbeat = 404;\
	e_mst_g2c_error_packet = 405;\
	\
	e_mst_cg2cg_start = 444;	\
	\
	e_mst_cgend_index = 500;\
  }  "

export default  client2gate_msg_type;