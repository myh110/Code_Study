<template>
  <div id="app">
    <transition
      name="router-fade"
      mode="out-in"
    >
      <!-- <keep-alive> -->
        <router-view :key="$route.fullpath"></router-view>
      <!-- </keep-alive> -->
    </transition>
  </div>
</template>

<script>
import Storage from "@/libs/storage";
import { fetchUserInfo, getmyList } from "@/services/services";
export default {
  name: "app",
  data() {
    return {};
  },
  computed: {},
  watch: {},
  components: {},
  created() {
    let _t = this;
    fetchUserInfo().then(res => {
      _t.$store.dispatch("updateUserInfo", res);
      _t.$store.dispatch("setLoginStatus", true);
    });
  }
};
</script>

<style lang="less">
@import "./style/normalize.css";
@import "./style/utility.less";

#app {
  height: 100%;
  .el-header {
    background-color: #ffffff;
  }

  .el-menu {
    background-color: #f5f8f8;
    border-right-width: 0;
  }
}
</style>