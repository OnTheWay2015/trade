let msg_info_def='\
import "msg_type_def.proto";\
\
package msg_info_def;\
\
\
message msg_account_info{\
	optional int32 aid = 1;				\
	optional string channelId = 2;		\
	optional string nickname = 3;		\
	optional int64 gold = 4;			\
	optional int32 viplvl = 5;			\
	optional int32 vipexp = 6;			\
	\
	optional string icon_custom = 8;	\
	optional int32 sex = 9;				\
	optional int32 Ticket = 14;			\
	optional int32 curPhotoFrameId = 16; \
	repeated int32 payids = 19;						 \
	optional bool isSafeDepositBoxPwdEmpty = 20;	 \
	optional int64 safeBoxGold = 21;					 \
	optional int32 collected = 22;					\
	optional int32 updateNicknameCount = 26;			\
	optional bool isBindMobilePhone = 27;	            \
	optional int32 create_time = 36;			\
	optional int32 Privilege = 44;				\
	optional int32 lastGameId = 46;							\
	optional bool isFormal = 47 [default = false];			\
	optional string BindInfo = 48;			\
	optional string RealName = 49;			\
	optional int32 Recharged = 52;							\
	optional int32 inviter_id = 53;			\
	optional int32 water = 54;				\
	optional int32 inviter_reward_count = 55;	\
	optional int32 withdraw = 56;			\
	optional bool sevenday_done = 57;		\
	repeated int32 quest_list = 58;			\
	optional int32 limit_time_photo = 59;	\
	optional string ipinfo = 60;			\
	optional int64 inviter_reward = 61;		\
	optional int64 performance = 62;		\
	optional int32 ts_ac_bind = 63;			\
	optional bool can_bind_alipay = 64;		\
	optional string cs_token = 65;			\
	optional int64 LogOutTime = 66;			\
	optional string bindphone = 67;			\
	optional int64 room_card = 68;			\
	optional int32 guild_id = 69;			\
	optional int32 guild_points = 70;		\
	optional int32 req_join_guild_time = 71;\
	optional string acctype = 72;			\
	optional string wechat_headimg = 73;	\
	optional int32 flag_agent_status = 74;	\
	optional string GuildWeChat = 75;		\
}\
\
message msg_account_info_ex{\
	optional bool is_robot = 1 [default = false];	\
	optional int64 free_gold = 2;					\
	optional int64 profit = 3;						\
}\
\
\
message msg_item\
{\
	optional int32 id = 1;		\
	optional int32 count = 2;	\
}\
\
\
message msg_quest_info\
{\
	optional int32 questid = 1;		\
	optional int32 count = 2;		\
	optional bool received = 3;		\
	optional int32 dayNumber = 4;	\
}\
\
\
message msg_gold_info	\
{\
	optional int32 playerid = 1;	\
	optional int32 gameid = 2;		\
	optional int32 roomid = 3;		\
	optional int32 ts = 4;			\
	optional int32 count = 5		[default = 0];	\
	optional int64 gold_bet = 6		[default = 0];	\
	optional int64 gold_win = 7 	[default = 0];	\
	optional int64 gold_lose = 8	[default = 0];	\
	optional int64 performance = 9	[default = 0];	\
	optional int64 profit = 10		[default = 0];	\
}\
\
\
message msg_activity_info{\
	repeated msg_gold_info golds = 1;	\
}\
\
\
message msg_roomcard_config{\
	optional int32 game_id = 1;		\
	repeated int32 base_gold = 2;	\
	repeated int32 duration = 3;	\
	repeated int32 model = 4;		\
	repeated int32 type = 5;		\
	repeated int32 rate_limit = 6;	\
	repeated int32 rounds = 7;		\
	repeated int32 cost_count = 8;	\
	repeated int32 player_count = 9;\
	repeated int32 small_blind = 10;\
	repeated int32 big_blind = 11;	\
	repeated int32 hua_gold = 12;	\
	repeated int32 gold_condition = 13;	\
	optional msg_type_def.e_roomcard_type room_type = 14;		\
}\
\
\
message msg_sel_roomcard_config{\
	optional int32 game_id = 1;		\
	optional int32 base_gold = 2;	\
	optional int32 duration = 3;	\
	optional int32 model = 4;		\
	repeated int32 type = 5;		\
	optional int32 rate_limit = 6;	\
	optional int32 rounds = 7;		\
	optional int32 cost_count = 8;	\
	optional int32 player_count = 9;\
	optional int32 small_blind = 10;\
	optional int32 big_blind = 11;	\
	optional int32 hua_gold = 12;	\
	optional int32 gold_condition = 13;	\
}\
\
\
message msg_gold_record{\
	optional string log_id = 1;			\
	optional int32 game_id = 2;			\
	optional int32 room_id = 3;			\
	optional string room_id_txt = 4;	\
	optional int32 room_name_type = 5;	\
	optional int64 old_gold = 6;		\
	optional int64 new_gold = 7;		\
	optional int64 add_gold = 8;		\
	optional int64 bet_gold = 9;		\
	optional int64 win_gold = 10;		\
	optional int64 profit_gold = 11;	\
	optional int32 reason = 12;			\
	optional int64 log_time = 13;		\
}'

export default msg_info_def;