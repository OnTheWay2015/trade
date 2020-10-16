let  client2gate_protocols ='\
import "client2gate_msg_type.proto";\
import "msg_type_def.proto";\
package client2gate_protocols;\
\
\
message packetc2g_heartbeat {\
	optional e_server_msg_type packet_id = 1 [default = e_mst_c2g_heartbeat];\
}\
\
message packetg2c_heartbeat {\
	optional e_server_msg_type packet_id = 1 [default = e_mst_g2c_heartbeat];\
}\
\
message msg_packet {\
	optional int32 msgid = 1;\
	optional bytes msginfo = 2;\
	}\
\
\
message packet_g2c_send_msglist {\
	optional e_server_msg_type packet_id = 1 [default = e_mst_g2c_send_msglist];\
	repeated msg_packet msgpaks = 3;\
}\
\
message packetg2c_net_param {\
	optional e_server_msg_type packet_id = 1 [default = e_mst_g2c_net_param];\
	optional int32 param_type = 2; \
	optional bytes param1 = 3; \
	optional bytes param2 = 4; \
	optional bool shutdown = 5; \
}\
\
message packetc2g_net_param {\
	optional e_server_msg_type packet_id = 1 [default = e_mst_c2g_net_param];\
	optional int32 param_type = 2; \
	optional bytes param1 = 3; \
	optional bytes param2 = 4; \
}\
\
message packetg2c_shutdown {\
	optional e_server_msg_type packet_id = 1 [default = e_mst_g2c_shutdown];\
}\
\
message packetcg2cg_start {\
	optional e_server_msg_type packet_id = 1 [default = e_mst_cg2cg_start];\
}\
\
message packetg2c_error_packet {\
	optional e_server_msg_type packet_id = 1 [default = e_mst_g2c_error_packet];\
}'

export default client2gate_protocols;