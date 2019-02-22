<template>
  <div class="activityplugin">
    <div v-for="(item, index) in activityPlugin" :key="index" >
    <pay-set  v-if="item.selected && item.type=='payPlugin'" ref="payplugin" :payData="payData" @payChanged="payChanged"></pay-set>
    <log-set v-if="item.selected&& item.type=='logisticsPlugin'" ref="logplugin" :logData="logData"   @logChanged="logChanged"></log-set>
    </div>
    </div>
</template>
<script>
import payset from "@/components/common/activityplugins/payset";
import logistics from "@/components/common/activityplugins/logistics";
export default {
  data() {
    return {
      pluginData: {
        data: {}
        // logisticsPlugin: {}
      }
    };
  },
  computed: {
    payData() {
      return this.$store.state.activityPlugin.payPlugin.data;
    },
    // paySel() {
    //   return this.$store.state.activityPlugin.payPlugin.data;
    // },

    logData() {
      return this.$store.state.activityPlugin.logisticsPlugin.data;
    },
    activityPlugin() {
      return this.$store.state.activityPlugin;
    }
  },
  components: {
    "pay-set": payset,
    "log-set": logistics
  },
  methods: {
    validateAll() {
      let _t = this;
      if (_t.$store.state.activityPlugin.payPlugin.selected) {
        _t.validatePay();
      }
      if (_t.$store.state.activityPlugin.logisticsPlugin.selected) {
        _t.validateLog();
      }
    },
    validatePay() {
      let _t = this;
      return new Promise(function(resolve, reject) {
        _t.$refs.payplugin[0]
          .validateAll()
          .then(values => {
            resolve(true);
          })
          .catch(reason => {
            resolve(false);
          });
      });
    },
    validateLog() {
      let _t = this;
      return new Promise(function(resolve, reject) {
        _t.$refs.logplugin[0]
          .validateAll()
          .then(values => {
            resolve(true);
          })
          .catch(reason => {
            resolve(false);
          });
      });
    },
    payChanged(data) {
      this.$store.commit(
        "SET_ACTIVITY_PLUGIN_DATA",
        Object.assign(this.$store.state.activityPlugin, {
          payPlugin: {
            data: data,
            name: "支付设置",
            selected: "true",
            type: "payPlugin"
          }
        })
      );
    },
    logChanged(data) {
      console.log(222, data);
      this.$store.commit(
        "SET_ACTIVITY_PLUGIN_DATA",
        Object.assign(this.$store.state.activityPlugin, {
          logisticsPlugin: {
            data: data,
            name: "物流方式",
            selected: "true",
            type: "logisticsPlugin"
          }
        })
      );
    },
  }
};
</script>
<style lang="less" scoped>
.actplugin {
  /* width: 1200px; */
  /* margin: 0 auto; */
  .plugin-item {
    margin-bottom: 20px;
  }
}
</style>