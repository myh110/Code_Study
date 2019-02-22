<template>
  <div class="addcont" ref="adddiv">
    <div class="addpoint" >
      <div class="set-head ">
        <div class="set reward">添加自提点</div>
        <div class="set imgs" @click="close"> <img src="../../../..//src/assets/close.png" alt=""/></div>
      </div>

        <div class="set item">
            <div class="set width">名称</div>
            <div><input v-model="short_address" class="set input" type="text" placeholder="请填写自提点名称"/></div>
        </div>
        <div class="set item">
            <div class="set width">位置</div>
            <div><input v-model="address" class="set input" type="text" placeholder="请填写自提点详细地址"/></div>
        </div>
        <div class="set sure" @click="pointSure">确定</div>
    </div>
  </div>
</template>
<script>
import { creatPoint } from "@/services/services";

export default {
  //   props: ["short_address","address"],
  data() {
    return {
      short_address: "",
      address: ""
    };
  },
  methods: {
    pointSure() {
      let _t = this;
      if (_t.short_address == "" || _t.address == "") {
        _t.$alert("自提名称和详细地点输入不完整，请重新输入", "提示", {
          confirmButtonText: "确定",
          callback: action => {
            // _t.$message({
            //   type: "info",
            //   message: `action: ${action}`
            // });
          }
        });
        return;
      }
      creatPoint({
        short_address: _t.short_address,
        address: _t.address,
        type: 1
      }).then(res => {
        let obj = {};
        obj.short_address = res.short_address;
        obj.address = res.address;
        obj.address_id = res.address_id;
        _t.$emit("getaddress", obj);
      });
      this.$refs.adddiv.style.display = "none";
    },
    close() {
      let _t = this,
        obj = {};
      obj.isadd = false;
      _t.$emit("closepoint", obj);
    }
  }
};
</script>
<style lang="less" scoped>
.addcont {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2000;
  text-align: center;
  padding-top: 15%;
  .addpoint {
    display: inline-block;
    text-align: left;
    width: 370px;
    height: 240px;
    background: #ffffff;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    border-radius: 2px;
    padding: 0 24px;
    border: 1px solid #e7e7e7;
    .set-head {
      display: flex;
      justify-content: space-between;
    }
    .set {
      font-family: PingFang-SC-Medium;
      font-size: 14px;
    }
    .item {
      height: 40px;
      line-height: 40px;
      color: #333333;
      display: flex;
      justify-content: flex-start;
      padding: 0 16px;
      .width {
        padding-right: 32px;
      }
      .input {
        background: #f9f9f9;
        border-radius: 2px;
        color: #999999;
        padding: 0 8px;
        margin-left: 8px;
        height: 36px;
        width: 222px;
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
      color: #999999;
      margin-bottom: 18px;
    }
    .sure {
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-size: 18px;
      color: #1bac19;
      // border: 1px solid #1bac19;
    }
  }
}
</style>

