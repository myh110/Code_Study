<template>
    <div class="contanier">
        <div class="set-head">
            <div class="set-pay">物流方式</div>
            <div @click="delLogPlugin"><a class="set-del" href="javascript:;">删除</a></div>
        </div>
        <div class="set-main">
          <div class="set-item">
              <div class="set-width">提货点自提</div>
              <div>
                  <ul>
                      <el-checkbox-group v-model="checkList" @change="handleCheckedChange">
                          <li class="set-address" v-for="(item,index) in pointArr" :key="index">
                              <el-checkbox :checked="(logTemplate.delivery_address_id.indexOf(item.address_id)!=-1&&logTemplate.delivery_address_id.length>0)?true:false" :label="item.address_id" :id="item.address_id">{{item.short_address +' | '+ item.address}}</el-checkbox>
                          </li>
                      </el-checkbox-group>
                  </ul>
                  <div class="set-add" @click="addAddress">添加自提地址</div>
              </div>
          </div>
        <el-form :model="logTemplate" :rules="rules" ref="logForm" label-width="140px" :label-position="labelPosition"  class="demo-ruleForm">
          <el-form-item label="快递发货" prop="delivery_type_status">
            <el-radio-group v-model="logTemplate.delivery_type_status" @change="gettype">
              <el-radio label="2">是</el-radio>
              <el-radio label="1">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        </div>
        <add-point v-if="isadd" @closepoint="getclose"  @getaddress="getchild"></add-point>
    </div>
</template>
<script>
import addPoint from "@/components/common/activityplugins/addPoint";
import { getPointList } from "@/services/services";

export default {
  props: {
    logData: Object
  },
  data() {
    return {
      radio: "0",
      pointArr: [],
      checkList: [],
      isadd: false,
      labelPosition: "left",
      // logTemplate: {
      //   delivery_address_id: [],
      //   delivery_type: "1",
      //   delivery_type_status: "1"
      // },
      rules: {
        delivery_type_status: [
          { required: true, message: "是否快递发货", trigger: "change" }
        ],
        delivery_address_id: [],
        delivery_type: []
      }
    };
  },
  components: {
    "add-point": addPoint
  },
  methods: {
    addAddress() {
      console.log(1);
      this.isadd = true;
    },
    getclose(data) {
      console.log(data);
      this.isadd = data.isadd;
    },
    handleCheckedChange(value) {
      this.logTemplate.delivery_address_id = value;
      if (this.logTemplate.delivery_address_id.length > 0) {
        if (this.logTemplate.delivery_type_status == "2") {
          this.logTemplate.delivery_type = "3";
        } else {
          this.logTemplate.delivery_type = "1";
        }
      }
      if (this.logTemplate.delivery_address_id.length == 0) {
        if (this.logTemplate.delivery_type_status == "2") {
          this.logTemplate.delivery_type = "2";
        } else {
          this.logTemplate.delivery_type = "";
        }
      }
    },
    getchild(data) {
      this.pointArr.push(data);
      this.isadd = false;
    },
    gettype() {
      this.logTemplate.delivery_type = this.logTemplate.delivery_type_status;
      if (
        this.logTemplate.delivery_type_status == "2" &&
        this.logTemplate.delivery_address_id.length > 0
      ) {
        this.logTemplate.delivery_type = "3";
      }
    },
    delLogPlugin() {
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
              logisticsPlugin: {
                name: "物流方式",
                selected: false,
                type: "logisticsPlugin",
                data: {
                  delivery_type: "1",
                  delivery_type_status: "1",
                  delivery_address_id: []
                }
              }
            })
          );
        })
        .catch(err => {});
    },
    validateAll() {
      console.log(this.$refs.logForm.validate());
      return this.$refs.logForm.validate();
    }
  },
  computed: {
    logTemplate() {
      // return this.$store.state.activityPlugin.logisticsPlugin.data;
      return this.logData;
    },
    logSelected() {
      return this.logSel;
    }
  },
  created() {
    getPointList({}).then(res => {
      this.pointArr = res.address_list;
    });
  },
  watch: {
    logTemplate: {
      deep: true,
      handler(val) {
        this.$emit("logChanged", val);
      }
    },
  }
};
</script>
<style lang="less" scoped>
.contanier {
  width: 912px;
  background: #fff;
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
      font-family: PingFang-SC-Medium;
      font-size: 14px;
      color: #333333;
      display: flex;
      justify-content: flex-start;
      padding: 20px 0;
      .set-width {
        width: 120px;
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
        line-height: 20px;
      }
      .set-address {
        font-family: PingFang-SC-Medium;
        font-size: 14px;
        color: #333333;
        line-height: 20px;
        margin-bottom: 20px;
      }
    }
    .set-height {
      height: 60px;
      line-height: 60px;
      padding: 0;
    }
  }
  // .set-bg {
  //   position: fixed;
  //   left: 0;
  //   top: 0;
  //   width: 100%;
  //   height: 100%;
  //   opacity: 0.5;
  //   background: #000;
  // }
}
</style>

