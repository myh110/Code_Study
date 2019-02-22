<template>
    <div class="contanier">
      <div class="set-head">
        <div class="set-pay">支付设置</div>
        <div @click="delPayPlugin"><a class="set-del" href="javascript:;">删除</a></div>
      </div>
      <el-form :model="payTemplate" :rules="rules" ref="payForm" label-width="140px" :label-position="labelPosition"  class="demo-ruleForm set-main">
        <el-form-item label="开通线上支付" prop="online_pay">
          <el-radio-group v-model="payTemplate.online_pay">
            <el-radio label="1">是</el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
          <div v-show="payTemplate.online_pay==1">
            <el-form-item label="成团金额" >
              <el-input v-model="payTemplate.op_rules.group_buy_price" style="width: 200px;" placeholder="默认无限制"></el-input>
            </el-form-item>
            <div class="set-item">
            <div class="set-width">分享有奖励</div>            
            <div v-if="payTemplate.award_list.share_rule.money==''||payTemplate.award_list.share_rule.money==undefined" class="set-add" @click="addShare">添加</div>
            <div v-else class="set-edit"> <span class="set-edit">¥{{payTemplate.award_list.share_rule.money}} | {{payTemplate.award_list.share_open==1?'公开奖励规则':'不公开奖励规则'}}</span> <span class="set-add"  @click="addShare">修改</span></div>
          </div>
          <div class="set-item">
            <div class="set-width">参与接龙有惊喜</div>
            <div v-if="payTemplate.award_list.random_rule.max_money==''||payTemplate.award_list.random_rule.max_money==undefined" class="set-add" @click="addPart">添加</div>
            <div v-else class="set-edit"> <span class="set-edit">随机奖励最大金额 ¥{{payTemplate.award_list.random_rule.max_money}}</span> <span class="set-add" @click="addPart">修改</span></div>
          </div>
        </div>
      </el-form>
      <share-reward  v-if="isshare" @closeshare="getshareclose"  @getsharemoney="getshare"></share-reward>
      <party-reward  v-if="isparty"  @closeparty="getpattyclose"  @getrewardmoney="getreward"></party-reward>
    </div>

</template>
<script>
import shareReward from "@/components/common/activityplugins/shareReward";
import partyReward from "@/components/common/activityplugins/partyReward";

export default {
  props: {
    payData: Object
  },
  data() {
    return {
      radio: "0",
      isshare: false,
      isparty: false,
      labelPosition: "left",
      rules: {
        online_pay: [
          { required: true, message: "请选择支付方式", trigger: "change" }
        ],
        op_rules: { group_buy_price: "" },
        award_list: {
          share_rule: {
            money: "" //分享
          },
          random_rule: {
            max_money: "" //  参与奖励
          },
          share_open: "" //公开
        }
      }
    };
  },
  components: {
    "share-reward": shareReward,
    "party-reward": partyReward
  },
  created() {
    if (
      this.payTemplate.award_list == "" ||
      this.payTemplate.award_list.share_rule == undefined ||
      this.payTemplate.award_list.random_rule == undefined
    ) {
      this.payTemplate.award_list = {
        share_rule: {
          money: "" //分享
        },
        random_rule: {
          max_money: "" //  参与奖励
        },
        share_open: "" //公开
      };
    }
    if (this.payTemplate.online_pay != "1") {
      this.payTemplate.op_rules = {
        group_buy_price: ""
      };
    }
  },
  computed: {
    payTemplate() {
      // return this.$store.state.activityPlugin.payPlugin.data
      return this.payData;
    }
  },
  methods: {
    addShare() {
      this.isparty = false;
      this.isshare = true;
    },
    addPart() {
      this.isshare = false;
      this.isparty = true;
    },
    getshare(data) {
      this.isshare = false;
      this.payTemplate.award_list.share_open = data.radio;
      this.payTemplate.award_list.share_rule.money = data.sharemoney;
    },
    getreward(data) {
      this.payTemplate.award_list.random_rule.max_money = data.rewardmoeny;
      this.isparty = false;
    },
    delPayPlugin() {
      let _t = this;
      this.$confirm("确认删除插件及放弃当前编辑?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success"
      })
        .then(result => {
          this.$store.commit(
            "SET_ACTIVITY_PLUGIN_DATA",
            Object.assign(this.$store.state.activityPlugin, {
              payPlugin: {
                name: "支付设置",
                selected: false,
                type: "payPlugin",
                data: {
                  online_pay: "0",
                  op_rules: {
                    group_buy_price: ""
                  },
                  award_list: {
                    share_rule: {
                      money: ""
                    },
                    random_rule: {
                      max_money: ""
                    },
                    share_open: ""
                  }
                }
              }
            })
          );
        })
        .catch(err => {});
    },
    getshareclose(data) {
      this.isshare = data.isshare;
    },
    getpattyclose(data) {
      this.isparty = data.isparty;
    },
    validateAll() {
      return this.$refs.payForm.validate();
    }
  },
  watch: {
    payTemplate: {
      deep: true,
      handler(val) {
        this.$emit("payChanged", val);
      }
    }
  }
};
</script>
<style lang="less" scoped>
.contanier {
  background: #fff;
  width: 912px;
  .set-head {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    height: 60px;
    line-height: 60px;
    font-family: PingFang-SC-Medium;
    font-size: 18px;
    padding: 0 24px;
    border-bottom: 1px solid #e7e7e7;
    .set-pay {
      color: #333333;
    }
    .set-del {
      color: #1bac19;
    }
  }
  .set-main {
    display: flex;
    flex-direction: column;
    padding: 0 24px;
    .set-item {
      height: 60px;
      line-height: 60px;
      font-family: PingFang-SC-Medium;
      font-size: 14px;
      color: #333333;
      display: flex;
      justify-content: flex-start;
      .set-width {
        width: 140px;
      }
      .set-input {
        background: #f9f9f9;
        border-radius: 2px;
        font-family: PingFang-SC-Medium;
        font-size: 14px;
        color: #999999;
        padding: 0 8px;
        margin-left: 8px;
        height: 36px;
        width: 200px;
        border: 1px solid #e7e7e7;
        outline: none; // 去除选中状态边框
      }
      .set-add {
        font-family: PingFang-SC-Medium;
        font-size: 14px;
        color: #1bac19;
      }
      .set-edit {
        font-family: PingFang-SC-Medium;
        font-size: 14px;
        color: #333333;
        padding-right: 16px;
      }
    }
  }
}
</style>
