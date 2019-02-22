<template>
  <div class="home" v-show='userInfo.headimgurl'>
    <header-home></header-home>
    <div class="container">
      <el-container>
        <el-aside class="aside" width="250px">
          <el-menu  default-active="1">
            <el-menu-item index="1"><i class="iconfont icon-home-selected1"></i>首页</el-menu-item>
            <el-menu-item index="2" @click="keepDraft(draftJl)"><i class="iconfont icon-pc-new"></i>创建接龙</el-menu-item>
          </el-menu>
        </el-aside> 
        <el-container>
          <el-main class="main">
      <div class="allstyle">
        <div class="total">销售统计</div>
        <ul class="saletotal">
          <li>
            <p>¥ {{userInfo.orderSumPrice}}</p>
            <span>日销售额</span>
          </li>
          <li>
            <p>{{userInfo.viewUsers}}人</p>
            <span>日访问量</span>
          </li>
          <li>
            <p>{{userInfo.orderTotal}}单</p>
            <span>日成单量</span>
          </li>
        </ul>
      </div>
      <div class="allstyle" v-if="draftJl.length>0">
        <div class="total">草稿箱</div>
        <div class="content">
           <div class="fj">
            <div class="saveimg"><img :src="draftJl[i].game_info.user_info.headimgurl"/></div>
            <div class="detail">
              <div class="userinfo">
                <span class="username">{{draftJl[i].game_info.user_info.nickname}}</span>
                <span class="usertime">{{draftJl[i].game_info.publish_at}}</span>
              </div>
              <div class="usertitle">{{draftJl[i].game_info.game_title}}</div>
              <div class="imgs">
                <viewer>
                  <img v-for="(item,index) in draftJl[i].game_info.img_list" :class="index<4?'':'hide'" :src="item.medium" :key="index" >
                </viewer>
              </div>
            </div>
          </div>
          <div class="show">
            <ul class="orderstatus">
              <li @click="delDraftjl(draftJl[i].game_info.game_id,0)"><a href="javascript:void(0);">删除</a></li>
              <li  @click="editjl(draftJl[i].game_info.game_id)"> <a href="javascript:void(0);">编辑</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="allstyle">
        <div class="total">已发布</div>
          <ul class="jlcontent" v-if="gameList.length>0">
            <li v-for="(item,index) in gameList" :key="index" @mouseover="overShow(index)" @mouseout="outHide(index)" class="content" >
              <div class="fj">
                <div class="saveimg"><img :src="item.game_info.user_info.headimgurl"/></div>
                <div class="detail">
                  <div class="userinfo">
                    <span class="username">{{item.game_info.user_info.nickname}}</span>
                    <span class="usertime">{{item.game_info.publish_at}}</span>
                  </div>
                  <div class="usertitle">{{item.game_info.game_title}}</div>
                  <div class="imgs">
                    <viewer >
                      <img v-for="(src,index) in item.game_info.img_list" :class="index<4?'':'hide'" :src="src.medium" :key="index" >
                    </viewer>
                  </div>
                <div class="detail">
                  <span class="usertime">{{item.game_info.user_sign_num}}</span>
                  <span class="jling">{{item.game_info.game_sale_status}}</span>
                </div>
              </div>
            </div>
            <div :class="[flag[index]? 'show' : 'hide' ]" >
              <ul class="orderstatus" v-if="item.game_info.status=='结束'">
                <li @click="deljl(item.game_info.game_id,1)"><a href="javascript:void(0);">删除</a></li>
                <li @click="copyjl(item.game_info.game_id)"> <a href="javascript:void(0);">复制接龙</a></li>
              </ul>
              <ul class="orderstatus" v-if="item.game_info.status!='结束'">
                <li @click="gameover(item.game_info.game_id)"> <a href="javascript:void(0);"> 立即结束</a></li>
                <li @click="deljl(item.game_info.game_id,1)"><a href="javascript:void(0);">删除</a></li>
                <li @click="editjl(item.game_info.game_id)"> <a href="javascript:void(0);">编辑</a></li>
              </ul>
            </div>
            </li>
          </ul>
            <el-pagination  class="page"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="20"
            layout="prev, pager, next, jumper"
            :total="num">
           </el-pagination>    
      </div> 
    </el-main>
    </el-container> 
      </el-container>
    </div>
  </div>
</template>
<script>
import header from "@/components/common/header";
import Vue from "vue";
import Viewer from "@/plugins/viewer";
import { deleteJl, getmyList, jlEnd } from "@/services/services";
Viewer.setDefaults({
  Options: {
    inline: true,
    button: true,
    navbar: true,
    title: false,
    toolbar: false,
    tooltip: false,
    movable: false,
    zoomable: false,
    rotatable: false,
    scalable: false,
    transition: false,
    fullscreen: false,
    keyboard: true,
    url: "data-source"
  }
});

export default {
  name: "home",
  data() {
    return {
      currentPage: 1,
      pn: 0,
      rn: 20,
      gameList: [],
      flag: [],
      num: null,
      draftJl: [],
      i: null
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    }
  },
  watch: {},
  components: {
    "header-home": header
  },
  methods: {
    overShow(index) {
      Vue.set(this.flag, index, true);
    },
    outHide(index) {
      Vue.set(this.flag, index, false);
      // this.showText = !this.showText;
    },
    keepDraft(parm) {
      let _t = this;
      if (parm.length > 0) {
        this.$confirm("是否保留草稿箱中的内容？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "success"
        })
          .then(() => {
            _t.$router.push({
              path: "/create",
              query: { game_id: parm[0].game_info.game_id }
            });
          })
          .catch(() => {
            _t.$router.push({ path: "/create", query: {} });
          });
      } else {
        _t.$router.push({ path: "/create", query: {} });
      }
    },
    handleSizeChange(val) {
      let _t = this;
      getmyList({ pn: _t.pn, rn: val, is_publish: 1 }).then(res => {
        _t.gameList = res.game_list;
      });
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      let _t = this;
      getmyList({ pn: _t.rn * (val - 1), rn: _t.rn, is_publish: 1 }).then(
        res => {
          _t.gameList = res.game_list;
        }
      );
      _t.pn = val - 1;
      console.log(`当前页: ${val}`);
    },
    gameover(parm) {
      let _t = this;
      this.$confirm("是否立即结束？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success"
      })
        .then(() => {
          jlEnd({ game_id: parm }).then(res => {
            getmyList({
              pn: _t.pn * 20,
              rn: _t.rn,
              is_publish: 1
            }).then(res => {
              _t.gameList = res.game_list;
              _t.num = parseFloat(res.game_list[0].game_total);
            });
          });
        })
        .catch(() => {});
    },
    deljl(parm, is_publish) {
      let _t = this;
      this.$confirm("是否删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteJl({ game_id: parm }).then(res => {
            getmyList({
              pn: _t.pn * 20,
              rn: _t.rn,
              is_publish: is_publish
            }).then(res => {
              _t.gameList = res.game_list;
              _t.num = parseFloat(res.game_list[0].game_total);
            });
          });
        })
        .catch(() => {});
    },
    delDraftjl(parm, is_publish) {
      let _t = this;
      this.$confirm("是否删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteJl({ game_id: parm }).then(res => {
            getmyList({
              pn: 0,
              rn: 0,
              is_publish: is_publish
            }).then(res => {
              _t.draftJl = res.game_list;
              _t.i = res.game_list.length - 1;
              Vue.set(_t.draftJl, res.game_list.length - 1, res.game_list[ res.game_list.length - 1]);
            });
          });
        })
        .catch(() => {});
    },
    editjl(parm) {
      let _t = this;
      _t.$router.push({ path: "/create", query: { game_id: parm, isedit: 1 } });
    },
    copyjl(parm) {
      let _t = this;
      _t.$router.push({ path: "/create", query: { game_id: parm, isedit: 0 } });
    }
  },
  mounted() {
    let _t = this;
    // getmyList({ pn: 0, rn: 10 }).then(res => {
    //   console.log(11, res);
    // });
  },
  created() {
    let _t = this;
    getmyList({ pn: _t.pn, rn: _t.rn, is_publish: 1 }).then(res => {
      _t.gameList = res.game_list;
      _t.num = parseFloat(res.game_list[0].game_total);
    });
    getmyList({ pn: 0, rn: 0, is_publish: 0 }).then(res => {
      _t.draftJl = res.game_list;
      _t.i = res.game_list.length - 1;
      console.log(_t.i);
    });
  }
};
</script>

<style lang="less" scope>
/* .mod-header{
    background-color: white;
  } */
.home {
  .container {
    width: 1200px;
    margin: 0 auto;
    .aside {
      margin-top: 40px;
    }
    .iconfont {
      margin-right: 10px;
      position: relative;
      bottom: 1.5px;
    }
    a {
      text-decoration: none;
    }
    /* background-color: #F5F8F8; */
    height: 100%;

    .el-menu {
      background-color: #f5f8f8;
      border-right-width: 0;
    }
    .main {
      padding: 0 !important;
      margin-top: 40px;
      .allstyle {
        background: #fff;
        // border-bottom: 1px solid #e7e7e7;
        margin-bottom: 24px;
        .total {
          height: 60px;
          line-height: 60px;
          padding-left: 24px;
          font-family: PingFang-SC-Medium;
          font-size: 18px;
          color: #333333;
          border-bottom: 1px solid #e7e7e7;
        }
        .saletotal {
          height: 180px;
          display: flex;
          justify-content: space-around;
          li {
            align-self: center;
          }
        }
        .jlcontent {
          background: #fff;
        }
        .content {
          padding: 25px 64px 24px 40px;
          // height: 183px;
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #e7e7e7;
          .fj {
            display: flex;
          }
          .detail {
            font-family: PingFang-SC-Medium;
            font-size: 14px;
            line-height: 22px;
            color: #999999;
            padding-right: 8px;
            .userinfo {
              height: 22px;
              .username {
                color: #333333;
                padding-right: 8px;
              }
            }

            .usertitle {
              font-family: PingFang-SC-Medium;
              font-size: 18px;
              color: #333333;
              line-height: 27px;
              width: 450px;
              margin-bottom: 8px;
            }
            .usertime {
              padding-right: 16px;
            }
            .jling {
              font-family: PingFang-SC-Medium;
              font-size: 14px;
              color: #f13838;
              line-height: 22px;
            }
            .imgs {
              img {
                width: 80px;
                height: 80px;
                padding-right: 16px;
              }
            }
          }
          .saveimg {
            display: block;
            width: 40px;
            height: 40px;
            padding-right: 8px;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .show {
            .orderstatus {
              display: flex;
              flex-direction: row;
              align-items: center;
              height: 100%;
              li {
                padding: 0 20px;
                a {
                  font-family: PingFang-SC-Regular;
                  font-size: 18px;
                  letter-spacing: 0.56px;
                  text-align: right;
                  color: #05be02;
                  display: block;
                }
              }
            }
          }
          .hide {
            display: none;
          }
        }
        .page {
          padding: 20px 5px;
          text-align: right;
        }
      }
    }
    .hide {
      display: none;
    }
  }
}
</style>