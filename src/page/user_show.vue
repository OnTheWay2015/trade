<template>
  <div id="user_show">
        <el-popover ref="popover_account" trigger="click" width="600">
            <el-table >
                <el-table-column label="用户名">
                        <el-input />
                </el-table-column>
                <el-table-column label="密码">
                        <el-input type="password" />
                </el-table-column>
                <el-table-column label="操作">
                        <el-button icon="delete" size="small" type="danger" @click.native.prevent="deleteAccount()"> 删除
                        </el-button>
                </el-table-column>
            </el-table>
            <el-button @click.native.prevent="addAccount"> 增加
            </el-button>
            <el-button @click.native.prevent="saveAccount"> 保存
            </el-button>
        </el-popover>



<form action="return onformSubmit();">
First name:<br>
<input type="text" name="firstname" value="Mickey">
<br>
Last name:<br>
<input type="text" name="lastname" value="Mouse">
<br><br>
<input type="submit" value="Submit">
</form> 
</div>
</template>
<script lang="ts">



import { Component, Prop, Vue } from 'vue-property-decorator';
import event_key from '../util/event_key'


@Component
export default class user_show extends Vue {
    private _userName!:string;
    private _password!:string;
    private _accountList:any[] = [];
    private _init_():void{
        let self = this;
        let vm:any= self.$root; 
        //(vm as Vue).$on(event_key.UI_ECHARTS_DATA_SHOW, self.onEchartsShow.bind(self) ); 
    }

    private mounted():void {
      console.log("user_show.vue mounted");
      this._init_();
    }
    private deleteAccount()
    {
      console.log("user_show.vue deleteAccount");

    }
    private addAccount()
    {
      console.log("user_show.vue addAccount");

    }
    private saveAccount()
    {
      console.log("user_show.vue saveAccount");
    }


    private onformSubmit()
    {
      console.log("user_show.vue onformSubmit");
    }

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#user_show{
    width:100% ; 
    height:100%;
}
</style>
