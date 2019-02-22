<template>
  <div class="header">
    <div class="main-box">
      <header>
        <div class="app-con">
          <img
            src="@/assets/appicon.png"
            alt=""
          >
          <span class="app-name">接龙圈</span>
        </div>
        <div class="user-con">
          <div class="user-head-img"><img
              :src="userInfo.headimgurl"
              alt=""
            ></div>
          <div class="login-out" @click="loginOut">退出</div>
        </div>
      </header>
    </div>
  </div>
</template>
<script>
import {loginout} from "@/services/services";
import storage from "@/libs/storage.js";
export default {
  data() {
    return {};
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    }
  },
  methods: {
    loginOut(){
      let _t = this;
      loginout().then(res=>{
        storage.cookie.del('uid');
        _t.$router.replace({
          path: '/login'
        })
      })
    }
  },
  mounted() {},
  created() {}
};
</script>
<style lang="less" scope>
.header {
  background-color: #fff;
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100px;
    .app-con {
      display: flex;
      justify-content: space-between;
      align-items: center;
      img {
        width: 54px;
        height: 60px;
        margin-right: 8px;
      }
    }
    .user-con {
      display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100px;
      .user-head-img {
        border: 1px solid #999999;
        width: 40px;
        height: 40px;
        border-radius: 100px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .login-out {
        font-size: 18px;
        color: #333333;
        letter-spacing: 0.56px;
        margin-left: 24px;
        cursor: pointer;
      }
    }
    .app-name {
      font-size: 40px;
      color: #333333;
      line-height: 40px;
    }
    a {
      font-size: 18px;
    }
  }
}
</style>
