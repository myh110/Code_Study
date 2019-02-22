<template>
  <div class="partycontent"  ref="adddiv">
    <div class="sharereward">
       <div class="set-head ">
        <div class="set reward">参与接龙有惊喜</div>
        <div class="set imgs" @click="close"> <img src="../../../..//src/assets/close.png" alt=""/></div>
      </div>
      <div class="set item">
        <div class="width">随机奖励最大金额</div>
        <div>¥<input required v-model="rewardmoeny" class="set input" type="text" placeholder="请填写奖励金额"/></div>
      </div>
      <div class="set text">注：分享有奖＋随机奖励金额，不超过订单金额</div>
      <div class="set sure" @click="partySure">确定</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "sharereward",
  data() {
    return {
      rewardmoeny: ""
    };
  },
  mounted (){
    this.rewardmoeny = this.max_money;
  },
  computed: {
    max_money() {
      return this.$store.state.activityPlugin.payPlugin.data.award_list
        .random_rule.max_money;
    }
  },
  methods: {
    partySure() {
      let _t = this;
      if (_t.rewardmoeny <= 0) {
        _t.$alert("随机奖励金额请大于0", "提示", {
          confirmButtonText: "确定",
          callback: action => {}
        });
        return;
      }
      let obj = {};
      obj.rewardmoeny = _t.rewardmoeny;
      _t.$emit("getrewardmoney", obj);
      this.$refs.adddiv.style.display = "none";
    },
    close() {
      let _t = this,
        obj = {};
      obj.isparty = false;
      _t.$emit("closeparty", obj);
    }
  }
  // watch: {
  //   max_money() {
  //     this.$store.commit();
  //   }
  // }
};
</script>
<style lang="less" scoped>
.partycontent {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2000;
  text-align: center;
  padding-top: 15%;
}
.sharereward {
  display: inline-block;
  text-align: left;
  width: 370px;
  height: 249px;
  background-color: #ffffff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  border-radius: 2px;
  padding: 0 24px;
  border: 1px solid #e7e7e7;
  .set {
    font-family: PingFang-SC-Medium;
    font-size: 14px;
  }
  .set-head {
    display: flex;
    justify-content: space-between;
  }
  .item {
    height: 60px;
    line-height: 60px;
    color: #333333;
    display: flex;
    justify-content: flex-start;
    margin-bottom: 18px;
    .width {
      width: 140px;
    }
    .input {
      background: #f9f9f9;
      border-radius: 2px;
      color: #999999;
      padding: 0 8px;
      margin-left: 8px;
      height: 36px;
      width: 173px;
      border: 1px solid #e7e7e7;
      outline: none; // 去除选中状态边框
    }
    .add {
      color: #1bac19;
    }
  }
  .reward {
    font-size: 18px;
    color: #333333;
    line-height: 25px;
    padding: 21px 0 14px;
  }
  .imgs {
    padding-top: 15px;
    width: 12px;
    height: 12px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .text {
    line-height: 20px;
    color: #999999;
    margin-bottom: 20px;
  }
  .sure {
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-size: 18px;
    color: #1bac19;
  }
}
</style>

    
    