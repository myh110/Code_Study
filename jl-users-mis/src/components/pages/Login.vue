<template>
  <div class="login">
    <login-header></login-header>
    <div
      class="mask"
      v-show="modal"
    >
      <div class="mask_con">
        <div
          id='login_container'
          class="login_container"
        ></div>
        <div
          class="closeMask"
          @click="closeMoadl"
        >
          <i class="el-icon-close"></i>关闭
        </div>
      </div>
    </div>
    <div class="main-box content">
      <div class="content-left">
        <div class="">做最实用的</div>
        <div>社群电商平台</div>

        <div
          class="wx-login-btn"
          @click="wxLoginInit"
        >微信扫码登录</div>
      </div>
      <div class="phone-con">
        <img
          src="@/assets/pnone.png"
          alt=""
        >
      </div>
    </div>
    <footer><span>© 2018lsh123.com 版权所有</span> <span>京ICP备16037185号-1</span> <span>北京市海淀区中关村南大街甲56号方圆大厦优客工场 | 用户隐私策略</span></footer>
  </div>
</template>
<script>
import LoginHeader from "@/components/common/login-header";
import { fetchUserInfo , login} from "@/services/services";
import storage from "@/libs/storage.js";
export default {
  components: {
    LoginHeader
  },
  data() {
    return {
      modal: false
    };
  },
  computed: {},
  methods: {
    wxLogin() {
      let _t = this;
      // this.$store.commit("UPDATE_LOGIN_STATUS", true);
      _t.interval = setInterval(() => {
        if(storage.cookie.get('wxErrMsg')){
          _t.$message({
            message: '请先注册成为接龙圈的用户！',
            type: "warning"
          });
          _t.closeMoadl()
        }
        fetchUserInfo()
          .then(res => {
            _t.$store.dispatch("updateUserInfo", res);
            _t.$store.dispatch("setLoginStatus", true);
            _t.$router.push({
              path: "/home"
            });

            clearInterval(_t.interval);
          })
          .catch(e => {
            // console.log(e)
          });
      }, 2000);
    },
    closeMoadl(){
      let _t = this;
      _t.modal = false;
      clearInterval(_t.interval);
    },
    wxLoginInit() {
      let _t = this;
      //登录区分线上线下
      if (process.env.NODE_ENV === "development") {
        login().then(res => {
          // console.log(res);
          _t.$store.dispatch("updateUserInfo", res);
          _t.$store.dispatch("setLoginStatus", true);
          _t.$router.push({
            path: "/home"
          });
        });
      } else {
        _t.modal = true;
        console.log('wxErrMsg----->'+storage.cookie.get('wxErrMsg'))
        console.log('uid----->'+storage.cookie.get('uid'))
        storage.cookie.del('wxErrMsg')
        storage.cookie.del('uid')
        _t.wxLogin();
        var obj = new WxLogin({
          self_redirect: true,
          id: "login_container",
          appid: "wx3f8a58d37b02dcd1",
          scope: "snsapi_login",
          redirect_uri: encodeURIComponent(
            "http://up.jielongquan.com/api/client/wechat/callback"
          ),
          state: "",
          style: "",
          href: ""
        });
      }
    }
  },
  mounted() {
    // let height = document.documentElement.clientHeight;
    // let contentHeight = height - 180;
    // document.getElementsByClassName("content")[0].style.height = contentHeight + "px";

    
  },
  created() {}
};
</script>
<style lang="less" scope>
@import "../../style/mixin";

.login {
  height: 100%;
  background: url("../../assets/bj.jpg") no-repeat;
  background-size: cover;
  .mask {
    opacity: 0.9;
    background: #ffffff;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    .mask_con {
      .ctt();
    }
    .closeMask {
      text-align: center;
      font-size: 14px;
      color: #333333;
      letter-spacing: 1.4px;
    }
  }
  .content {
    // min-height: 710px;
    height: calc(100vh - 100px);
    box-sizing: border-box;
    font-size: 40px;
    color: #333333;
    line-height: 60px;
    display: flex;
    justify-content: space-between;
    // padding-bottom: 80px;
    .phone-con {
      align-self: flex-end;
    }
    img {
      width: 646px;
      height: 623px;
    }
    .content-left {
      .wx-login-btn {
        background-image: linear-gradient(-90deg, #72c84e 0%, #33b932 99%);
        border-radius: 100px;
        font-size: 30px;
        color: #ffffff;
        letter-spacing: 1.07px;
        text-align: center;
        margin-top: 50px;
        cursor: pointer;
      }
      div:nth-of-type(1) {
        margin-top: 200px;
        position: relative;
        &::after {
          content: "";
          display: block;
          width: 100px;
          height: 2px;
          background: #333333;
          position: absolute;
          top: 50%;
          right: -30%;
        }
      }
    }
  }
  footer {
    height: 80px;
    line-height: 80px;
    text-align: center;
    font-size: 16px;
    color: #666666;
    background: #ffffff;
    box-shadow: 0 -7px 30px 0 rgba(0, 0, 0, 0.05);
    // margin-top: -80px;
    span {
      margin-left: 20px;
    }
  }
}
</style>
