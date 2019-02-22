<template>
  <div class="login-header">
    <div class="main-box">
      <header>
        <div class="app-con">
          <img
            src="@/assets/appicon.png"
            alt=""
          >
          <span class="app-name">接龙圈</span>
        </div>
        <div>
          <!-- <router-link to="/">首页</router-link> -->
          <!-- <router-link
            style="margin:0 40px;"
            to="/index"
          >商户端下载</router-link>
          <router-link to="about">关于我们</router-link> -->
        </div>
      </header>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      menus: [
        // {text:"首页",active:true, },
        // {text:"商户端下载",active:false},
        // {text:"关于我们",active:false},
      ]
    };
  },
  computed: {},
  methods: {},
  mounted() {},
  created() {}
};
</script>
<style lang="less" scope>
.login-header {
  .router-link-exact-active {
    color: #1bac19;
  }
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
