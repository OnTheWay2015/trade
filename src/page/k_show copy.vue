<template>
  <div id="k_show">
        <el-popover ref="popover_account" trigger="click" width="600">
            <el-table :data="accountList">
                <el-table-column label="用户名">
                        <el-input v-model="scope.row.userName"/>
                </el-table-column>
                <el-table-column label="密码">
                        <el-input type="password" v-model="scope.row.password"/>
                </el-table-column>
                <el-table-column label="操作">
                        <el-button icon="delete" size="small" type="danger" @click.native.prevent="deleteAccount(scope.$index)"> 删除
                        </el-button>
                </el-table-column>
            </el-table>
            <el-button @click.native.prevent="addAccount"> 增加
            </el-button>
            <el-button @click.native.prevent="saveAccount"> 保存
            </el-button>
        </el-popover>
        <el-popover ref="popover_tree" trigger="click">
            <el-tree :data='allLines' node-key='label' :props='props' show-checkbox @check-change='changeLineShow'>
            </el-tree>
        </el-popover>
        <el-popover ref="popover_keyPoint" trigger="click" width="600">
            <el-table :data="allKeyPoint">
                <el-table-column label="关键日期" prop="date" sortable=""  width="120">
                        <el-icon name="time" />
                        <span> {{scope.row.date}}
                        </span>
                </el-table-column>
                <el-table-column label="合约" prop="instrument" width="100"/>
                <el-table-column label="触发条件">
                        <el-input v-model="scope.row.condition">
                            <el-button slot="append" icon="check" @click.native.prevent="applyCondition(scope.$index)"> 
                            </el-button>
                        </el-input>
                </el-table-column>
                <el-table-column label="操作" width="80">
                        <el-button icon="delete" size="small" type="danger" @click.native.prevent="deleteKeyPoint(scope.$index) "> 移除
                        </el-button>
                </el-table-column>
            </el-table>
        </el-popover>
        <el-popover ref="popover_sandTable" trigger="click" width="300">
            <div id="block">
                <el-slider v-model="sandLength" show-input="" @change="onSandChange"/>
                <el-table :data="sandCandle" height="300">
                    <el-table-column label="沙盘数据">
                            <span> {{scope.row.date}}
                            </span>
                    </el-table-column>
                    <el-table-column label="操作">
                            <el-button type="text" size="small" @click.native.prevent="deleteSand(scope.$index)"> 移除
                            </el-button>
                    </el-table-column>
                </el-table>
            </div>
        </el-popover>
        <el-dialog title="上传数据" v-model="uploadVisible">
            <el-upload drag :action="uploadLdayAction" :on-success="onUploadSuccess">
                <div> 将文件拖到此处，或
                </div> 
            </el-upload>
        </el-dialog>
        <div id="titlebar">
                <el-button v-popover:popover_account="" size="small"> 账户设置
                            </el-button>
                <el-button v-popover:popover_sandTable=""  size="small"> 沙盘推演
                            </el-button>
                <el-autocomplete  size="small" class="inline-input" v-model="selectInstrument" :fetch-suggestions="querySearch" placeholder="请输入合约" @select="handleSelect"/>
                <el-button @click="anQuery"  size="small"> 查询
                            </el-button>
                <el-button @click="save"  size="small"> 保存
                            </el-button>
                <el-button v-popover:popover_tree=""  size="small"> 隐藏选中
                            </el-button>
                <el-button v-popover:popover_keyPoint=""  size="small"> 关注点
                            </el-button>
                <el-radio-group v-model="radioShowLineKey" @change="onChangeShowLineKey" size="small" style="vertical-align:top">
                    <el-radio-button label="tradeDayCount" > 交易日:{{brushMessage.tradeDayCount}}
                    </el-radio-button>
                    <el-radio-button label="naturalDayCount"> 自然日:{{brushMessage.naturalDayCount}}
                    </el-radio-button>
                    <el-radio-button label="delta"> 点差:{{brushMessage.delta}}
                    </el-radio-button>
                    <el-radio-button label="deltaRate"> 振幅:{{brushMessage.deltaRate}}%
                    </el-radio-button>
                    <el-radio-button label="deltaAvg"> 平均点差:{{brushMessage.deltaAvg}}
                    </el-radio-button>
                    <el-radio-button label="deltaAvgRate"> 平均振幅:{{brushMessage.deltaAvgRate}}%
                    </el-radio-button>
                </el-radio-group>
        </div>
                
        <div id="main">
            <div id="mainLeft">
                <div id="chart"  style="width: 600px;height:400px;"/>
                <div id="bottom">
                    <el-row>
                        <el-col :span="4">
                            <el-select v-model="currentAccount.userName" placeholder="选择账户" @change="onChangeCurrentAccount">
                                <el-option v-for="item in accountList" :label="item.userName" :value="item.userName" />
                            </el-select>
                            <span> {{['断开', '连接中', '已连接', '登录成功', '登录失败'][currentAccount.state]}}
                            </span>
                            <el-button :visible="currentAccount.state==4" @click.native.prevent="reLogin" size="small"> 重新登录
                            </el-button>
                            <el-button  @click.native.prevent="refleshAccountState" size="small"> 刷新
                            </el-button>
                            <el-select v-model="currentAccount.selectedInstrument" placeholder="选择合约" @change="onChangeAccountInstrument">
                                <el-option v-for="item in currentAccount.tradeList" :label="item" :value="item"/>
                            </el-select>
                        </el-col>
                        <el-col :span="20">
                            <el-table :data="currentAccount.history" height='200'>
                             <el-table-column label="时间" prop="time"/>
                             <el-table-column label="方向" prop="direction">
                                    <span> {{scope.row.direction?"买":"卖"}}
                                    </span>
                             </el-table-column>
                             <el-table-column label="数量" prop="volume"/>
                             <el-table-column label="价格" prop="price"/>
                             <el-table-column label="开平" prop="flag"/>
                            </el-table>
                        </el-col>
                    </el-row>
                </div>
            </div>
            
            
            <div id="mainRight">
                <el-row>
                    <el-col :span="12">
                        <span> 最新
                        </span>
                        <span :class="currentMarketData.LastPrice>currentMarketData.PreClosePrice?'red':'green'"> {{currentMarketData.LastPrice}}
                        </span>
                    </el-col>
                    <el-col :span="12">
                        <span> 结算
                        </span>
                        <span class="yellow"> {{currentMarketData.SettlementPrice}}
                        </span>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <span> 涨跌
                        </span>
                        <span :class="currentMarketData.LastPrice>currentMarketData.PreSettlementPrice?'red':'green'"> {{currentMarketData.LastPrice-currentMarketData.PreSettlementPrice}}
                        </span>
                    </el-col>
                    <el-col :span="12">
                        <span> 昨结
                        </span>
                        <span class="yellow"> {{currentMarketData.PreSettlementPrice}}
                        </span>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <span> 幅度
                        </span>
                        <span :class="currentMarketData.LastPrice>currentMarketData.PreSettlementPrice?'red':'green'"> {{  currentMarketData.LastPrice-currentMarketData.PreSettlementPrice * 100 / currentMarketData.PreSettlementPrice }}%
                        </span>
                    </el-col>
                    <el-col :span="12">
                        <span> 开盘
                        </span>
                        <span :class="currentMarketData.OpenPrice>currentMarketData.PreClosePrice?'red':'green'"> {{currentMarketData.OpenPrice}}
                        </span>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <span> 涨停
                        </span>
                        <span class="yellow"> {{currentMarketData.UpperLimitPrice}}
                        </span>
                    </el-col>
                    <el-col :span="12">
                        <span> 最高
                        </span>
                        <span :class="currentMarketData.HighestPrice>currentMarketData.PreClosePrice?'red':'green'"> {{currentMarketData.HighestPrice}}
                        </span>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <span> 跌停
                        </span>
                        <span class="yellow"> {{currentMarketData.LowerLimitPrice}}
                        </span>
                    </el-col>
                    <el-col :span="12">
                        <span> 最低
                        </span>
                        <span :class="currentMarketData.LowestPrice>currentMarketData.PreClosePrice?'red':'green'"> {{currentMarketData.LowestPrice}}
                        </span>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <span> 振幅
                        </span>
                        <span class="yellow"> {{  currentMarketData.HighestPrice-currentMarketData.LowestPrice*100/currentMarketData.LowestPrice}}%
                        </span>
                    </el-col>
                    <el-col :span="12">
                        <span> 点差
                        </span>
                        <span class="yellow"> {{currentMarketData.HighestPrice-currentMarketData.LowestPrice}}
                        </span>
                    </el-col>
                </el-row>
                <el-tag  type="primary"> 横向观察
                </el-tag>
                <el-form ref="form" label-width="90px">
                    <el-form-item label="开始时间">
                        <el-date-picker v-model="watchStartDate" size="mini" type="date" placeholder="选择日期" />
                    </el-form-item>
                </el-form>
                
                
                <div id="hrange">
                    <el-row>
                        <el-col :span="12">
                            <span> 交易日
                            </span>
                            <span> {{watchArea.range.tradeDayCount}}
                            </span>
                        </el-col>
                        <el-col :span="12">
                            <span> 自然日
                            </span>
                            <span> {{watchArea.range.naturalDayCount}}
                            </span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <span> 点差
                            </span>
                            <span> {{watchArea.range.delta}}
                            </span>
                        </el-col>
                        <el-col :span="12">
                            <span> 平均点差
                            </span>
                            <span> {{watchArea.range.deltaAvg}}
                            </span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <span> 振幅
                            </span>
                            <span> {{watchArea.range.deltaRate}}%
                            </span>
                        </el-col>
                        <el-col :span="12">
                            <span> 平均振幅
                            </span>
                            <span> {{watchArea.range.deltaAvgRate}}%
                            </span>
                        </el-col>
                    </el-row>
                </div>

                <el-tag  type="primary">  纵向观察
                </el-tag>

                <el-form :model="watchArea" ref="form" label-width="60px">
                    <el-form-item label="方向">
                        <el-switch on-color="#13CE66" on-text="多" off-text="空" off-color="#FF4949" @change="directionChanged" v-model="watchArea.direction"/>
                    </el-form-item>
                    <el-form-item label="区域">
                        <el-col :span="11">
                        </el-col>
                            <el-input-number v-model="watchArea.startPoint.yAxis" size="small" :controls="false" style="width:70px" />
                        <el-col :span="2"> -
                        </el-col>
                        <el-col :span="11">
                            <el-input-number v-model="watchArea.endPoint.yAxis" size="small" :controls="false" style="width:70px" />
                        </el-col>
                    </el-form-item>
                    <el-form-item label="实时">
                        <el-checkbox v-model="watchArea.autoEndPoint"> 当前
                        </el-checkbox>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmitWatchArea"> 应用
                        </el-button>
                    </el-form-item>
                </el-form>
                
                
                <div class="sb">
                    <span> 亏盈点数
                    </span>
                    <span :class="watchDelta>0?'red':'green'"> {{watchDelta}}
                    </span>
                </div>
                <div class="sb">
                    <span> 亏盈幅度
                    </span>
                    <span :class="watchDelta>0?'red':'green'"> {{watchDeltaRate}}%
                    </span>
                </div>
            </div>
    </div>
  </div>



</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';


@Component
export default class HelloWorld extends Vue {
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
