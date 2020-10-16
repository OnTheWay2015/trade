let msg_type_def='\
package msg_type_def;\
\
enum e_msg_result_def {\
	e_rmt_unknow = 0; \
	e_rmt_success = 1; \
	e_rmt_fail = 2; \
\
	e_rmt_change_gate = 3;\
	e_rmt_connect_full = 4;\
\
	e_rmt_player_max = 5;\
	\
	e_rmt_has_dial_lottery = 6;   \
\
	e_rmt_error_nickname = 7;     \
	   \
	e_rmt_same_nickname = 8;      \
\
	e_rmt_length_beyond_range = 9;      \
\
	e_rmt_gold_not_enough = 10;         \
	\
	e_rmt_ticket_not_enough = 11;       \
\
	e_rmt_room_full = 12;\
	e_rmt_vip_under = 13;\
	e_rmt_level_under = 14;\
	e_rmt_friend_full = 15;				\
	e_rmt_exists_friend = 16;			\
	e_rmt_player_not_exists = 17;		\
	e_rmt_runout_count = 18;			\
	e_rmt_time_not_arrive = 19;			\
\
	e_rmt_no_can_bet = 20;				\
	e_rmt_bet_index_error = 21;			\
	e_rmt_outof_bet_limit = 22;			\
	e_rmt_no_find_table = 23;			\
\
	e_rmt_pwd_not_same = 24;			\
	e_rmt_format_invalid = 25;			\
	e_rmt_need_set_pwd = 26;			\
	e_rmt_pwd_error = 27;				\
\
	e_rmt_not_find_item = 28;			\
\
	e_rmt_friend_offline = 29;			\
	e_rmt_not_in_game = 30;				\
	e_rmt_cant_buyitem = 31;			\
	e_rmt_cannot_add_self = 32;			\
\
	e_rmt_chat_too_often = 33;			\
	e_rmt_exp_not_enough = 34;			\
	e_rmt_level_max = 35;				\
	e_rmt_cannot_collect = 36;			\
\
	e_rmt_has_bind_phone = 37;			\
	e_rmt_code_error = 38;				\
\
	e_rmt_beyond_limit = 39;			\
	e_rmt_not_bind_phone = 40;			\
\
	e_rmt_cannot_sendto_self = 41;		\
\
	e_rmt_room_notopen = 42;           \
\
	e_rmt_bet_full = 43;               \
\
	e_rmt_game_begun = 44;           \
\
	e_rmt_banker_not_bet = 45;           \
\
	e_rmt_banker_is_full = 46;			\
\
	e_rmt_can_not_leave = 47;			\
\
	e_rmt_has_receive_reward = 48;      \
\
	e_rmt_not_recharge = 49;			\
\
	e_rmt_custom_head_freezing = 50;	\
\
	e_rmt_now_banker_first = 51;		\
\
	e_rmt_has_in_banker_list = 52;		\
	\
	e_rmt_now_is_banker = 53;			\
	e_rmt_is_not_banker = 54;			\
	e_rmt_haven_apply_leave = 55;		\
	e_rmt_banker_not_enough = 56;		\
	e_rmt_banker_betgold_is_full = 57;	\
	e_rmt_other_betgold_is_full = 58;	\
	e_rmt_error_game_state = 59;		\
\
	e_rmt_box_not_exist = 60;		   \
	e_rmt_box_has_opened = 61;		   \
	e_rmt_thank_you_not_enough = 62;   \
\
	e_rmt_now_is_you = 63;			   \
	e_rmt_banker_protect = 64;		   \
	e_rmt_snatch_is_you = 65;			\
	e_rmt_snatch_is_low = 66;			\
\
	e_rmt_last_speaker_not_finish = 67;			\
	e_rmt_speaker_beyond_max_count = 68;		\
\
	e_rmt_roping_over = 69;					\
\
	e_rmt_activity_outofdate = 70;		    \
\
	e_rmt_activity_not_satisfy_cond = 71;		    \
\
	e_rmt_time_over = 72;					\
	e_rmt_not_follow = 73;					\
	e_rmt_not_follow_roping = 74;			\
\
	e_rmt_chip_not_enough = 75;				\
\
	e_rmt_month_card_out_date = 76;		    \
\
	e_rmt_not_follow_prize_claw = 77;		\
\
	e_rmt_no_empty_seat = 78;				\
\
	e_rmt_player_prohibit = 79;			\
\
	e_rmt_can_not_change_table_setting	= 80; \
\
	e_rmt_player_have_no_enough_gold = 81;\
	e_rmt_player_absent_room = 82;\
	e_rmt_player_absent_desk = 83;\
    \
    e_rmt_can_not_leave_bet = 84;\
\
    e_rmt_can_not_bet_hasbet = 85;\
\
    e_rmt_cdk_used = 86;            \
    e_rmt_cdk_none = 87;             \
    e_rmt_cdk_notenough = 88;             \
    e_rmt_cdk_past = 89;             \
	e_rmt_binded_ac = 90;\
	e_rmt_not_bind_ac = 91;\
	e_rmt_betgold_not_enough = 92;         \
	e_rmt_shutdown = 93;         	\
	e_rmt_has_inviter = 94;			\
	e_rmt_not_has_inviter = 95;		\
	e_rmt_binded_bank_card = 96;	\
	e_rmt_not_bind_bank_card = 97;	\
	e_rmt_inviter_error = 98;		\
	e_rmt_suggest_limit = 99;		\
	e_rmt_bank_unopened = 100;		\
	e_rmt_inviter_error_same_device = 101;	\
	e_rmt_bet_count_full = 102;		\
	e_rmt_bet_players_full = 103;	\
	e_rmt_serverid_error = 104;		\
	e_rmt_has_draw = 105;			\
	e_rmt_too_offen = 106;			\
	e_rmt_alipay_exists = 107;		\
	e_rmt_agent_create_team_member_limit = 108;	\
	e_rmt_agent_join_team_member_limit = 109;	\
	e_rmt_room_card_invalid = 110;  \
	e_rmt_room_card_full = 111;  	\
	e_rmt_ac_chest_ts = 112;		\
	e_rmt_pay_product_erro = 113;	\
	e_rmt_third_pay_regtime_err = 114;	\
	e_rmt_third_pay_viplvl_err = 115;	\
	\
	e_rmt_activity_performance_check = 116; \
	e_rmt_activity_timeout = 117; 	\
	e_rmt_activity_apply = 118; 	\
	e_rmt_activity_award = 119; 	\
	e_rmt_player_kick = 120;		\
	e_rmt_withdraw_forbid = 121;	\
	e_rmt_service_not = 122;		\
	e_rmt_withdraw_limit = 123;		\
	e_rmt_server_down = 124;		\
	e_rmt_already_in_game = 125;	\
	e_rmt_pay_bank_not_player = 126;		\
	e_rmt_pay_bank_not_bank_id = 127;		\
	e_rmt_pay_bank_gold_valid = 128;		\
	e_rmt_pay_bank_too_busy = 129;			\
\
\
	e_rmt_guild_not_found = 130;		\
	e_rmt_guild_has_join = 131;			\
	e_rmt_guild_join_cooling = 132;		\
	e_rmt_guild_has_ask = 133;			\
	\
	e_rmt_seat_has_player =  134;		\
\
	e_rmt_guild_not_member = 135;		\
	e_rmt_guild_not_same = 136;			\
	e_rmt_guild_roomcard_not_enough = 137;\
	e_rmt_guild_points_not_enough = 138;\
\
	e_rmt_roomcard_game_err = 139;  	\
	e_rmt_roomcard_social_down = 140;	\
	e_rmt_roomcard_no_guild = 141;		\
	e_rmt_roomcard_wait_guild = 142;	\
	e_rmt_roomcard_gaming = 143;		\
	e_rmt_roomcard_need_continue = 144; \
	e_rmt_roomcard_kicked_player = 145; \
	e_rmt_roomcard_not_enough = 146;	\
	e_rmt_roomcard_game_too_much = 147;	\
	\
	e_rmt_guild_gaming_points = 148;	\
	e_rmt_guild_gaming_kick = 149;		\
	e_rmt_guild_ask_invalid = 150;		\
	e_rmt_guild_gaming_sub_points = 151;	\
}\
\
enum e_user_type{\
	e_user_type1 = 1;			\
	e_user_type2 = 2;		\
	e_user_type3 = 3;			\
	e_user_type4 = 4;		\
	e_user_type5 = 5;	\
	e_user_type6 = 6;			\
	e_user_type7 = 7;			\
	e_user_type8 = 8;	\
	e_user_type9 = 9;	\
	e_user_type10 = 10;	\
}\
enum e_item_type_def{\
	e_itd_gold = 1;			\
	e_itd_ticket = 2;		\
	e_itd_gift = 3;			\
	e_itd_exchange = 4;		\
	e_itd_photoframe = 5;	\
	e_itd_sex = 6;			\
	e_itd_vip = 7;			\
	e_itd_iconcustom = 8;	\
	e_itd_nickname = 9;		\
	e_itd_monthcard = 10;	\
	e_itd_chip = 11;		\
	e_itd_privilege = 15;	\
	e_itd_freegold = 17;\
	e_itd_recharged = 18;	\
	e_itd_withdraw = 19;	\
	e_itd_boxgold = 20;		\
	e_itd_roomcard = 21;	\
	e_itd_guild_id = 22;	\
	e_itd_guild_points = 23;\
	e_itd_points = 24;		\
	e_itd_guild_roomcard = 25;		\
\
	e_itd_firstgift = 99;	\
	e_itd_vip_experience_card = 100; \
}\
\
enum e_sex_def{\
	sex_unknown = 0;	\
	sex_boy = 1;		\
	sex_girl = 2;\
	sex_max = 3;\
}\
\
enum e_roomcard_type{\
	ert_gold = 0;				\
	ert_points = 1;				\
	ert_guild_gold = 2;			\
	ert_guild_points = 3;		\
	\
	ert_none = 99;\
}\
\
enum ENotifyType{\
\
\
\
\
	NotifyTypeSys = 200;			\
	NotifyTypePlayerSpeaker = 199;	\
\
	NotifyTypeWinningPrize = 198;	\
	NotifyTypeImportantConsume = 197;	\
\
	NotifyTypeRobot = 196;			\
}\
\
enum BoxLotteryResult{\
	result_big_prize = 0;     \
	result_samll_prize = 1;   \
	result_thank_you = 2;     \
}'
export default msg_type_def;