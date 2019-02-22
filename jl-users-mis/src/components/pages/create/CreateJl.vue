<template>
  <div class="create">
    <!-- 预览 -->
    <el-dialog
      :visible.sync="ui.preView.show"
      :before-close="preViewClose"
    >
      <div v-if='ui.preView.data.type == "img"'>
        <img
          style="width:100%"
          :src="ui.preView.data.url.imgUrl ? ui.preView.data.url.imgUrl :  ui.preView.data.url.origin "
          alt=""
        >
      </div>
      <div v-if='ui.preView.data.type == "video"'>
        <video
          style="width:100%;height:500px"
          :src="ui.preView.data.url.video_url ?ui.preView.data.url.video_url : ui.preView.data.url.origin "
          autoplay
          controls="controls"
        >
          浏览器不支持
        </video>
      </div>
    </el-dialog>
    <!-- header -->
    <header-home></header-home>
    <div class="main-box content">
      <!-- 面包屑 -->
      <div class="breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>创建接龙</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 插件 -->
      <div class="plugins-con">
        <!-- 类型插件 -->
        <div class="type-plugin">
          <div class="type-title">
            <span></span>
            <span class="title-text">类型插件</span>
          </div>
          <div class="type-plugin_content">
            <el-dropdown
              @command="selectTypePlugin"
              placement="bottom"
              v-if='!typePlugin.selected'
            >
              <span class="el-dropdown-link">
                <i class="el-icon-plus"></i>添加插件
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  :command="item.type"
                  v-for="(item, index) in typePlugin.pluginList"
                  :key="item.name"
                >{{item.name}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>

            <div
              class="plugin-list"
              v-if="typePlugin.selected"
            >
              <span class="plugin-list_name">{{typePlugin.selectedName}}</span>
              <span
                class="plugin-list_del"
                @click="delTypePlugin"
              >删除</span>
              <!-- <span class="plugin-list_add">添加</span> -->
            </div>
          </div>
        </div>
        <div class="activity-plugin">
          <div class="type-title">
            <span></span>
            <span class="title-text">活动插件</span>
          </div>

          <div
            class="plugin-list"
            v-for="(item, index) in activityPlugin"
          >
            <span class="plugin-list_name">{{item.name}}</span>
            <span
              class="plugin-list_del"
              v-if="item.selected"
              @click="delActivityPlugin(item)"
            >删除</span>
            <span
              class="plugin-list_add"
              v-else
              @click="addActivityPlugin(item)"
            >添加</span>
          </div>
        </div>
        <!-- 活动插件 -->
      </div>
      <!-- 文本编辑器 -->
      <div class="text-edit">

        <div class="edit panel" v-loading='ui.loading'>
          <div class="operate-header">
            <div class="item-con">
              <div class="operate-item">
                <el-upload
                  :with-credentials="true"
                  action="/api/client/game/uploadimg"
                  multiple
                  :show-file-list="false"
                  :before-upload="checkImgFile"
                  :on-success="uploadImgTextSuccess"
                  :on-error="uploadFailCb"
                  name="fileUp"
                >
                  <span class="iconfont icon-photo"></span>
                  <span class="text">图片</span>
                </el-upload>

              </div>
              <div class="operate-item">
                <el-upload
                  :with-credentials="true"
                  action="/api/client/game/uploadmedia"
                  multiple
                  :show-file-list="false"
                  :before-upload="checkVideoFile"
                  :on-success="uploadVideoTextSuccess"
                  :on-error="uploadFailCb"
                  name="fileUp"
                >
                  <span class="iconfont icon-video"></span>
                  <span class="text">视频</span>
                </el-upload>

              </div>
              <div class="operate-item">
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="注：图片+视频不超过9张"
                  placement="top-start"
                >

                  <el-dropdown>
                    <span class="el-dropdown-link">
                      <div>
                        <span class="iconfont icon-more"></span>
                        <span class="text">九宫格</span>
                      </div>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>
                        <el-upload
                          :with-credentials="true"
                          action="/api/client/game/uploadimg"
                          multiple
                          :show-file-list="false"
                          :before-upload="checkImgFileJGG"
                          :on-success="uploadJGGImgSuccess"
                          :on-error="uploadFailCb"
                          name="fileUp"
                        >
                          上传图片
                        </el-upload>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <el-upload
                          :with-credentials="true"
                          action="/api/client/game/uploadmedia"
                          multiple
                          :show-file-list="false"
                          :before-upload="checkVideoFileJGG"
                          :on-success="uploadJGGVideoSuccess"
                          :on-error="uploadFailCb"
                          name="fileUp"
                        >
                          上传视频
                        </el-upload>
                      </el-dropdown-item>
                      <!-- <el-dropdown-item>狮子头</el-dropdown-item> -->
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-tooltip>
              </div>
            </div>
            <div
              v-if="ui.fold"
              @click="foldEdit()"
            >
              <span>展开</span>
              <span></span>
            </div>
            <div
              v-else
              @click="foldEdit()"
            >
              <span>折叠</span>
              <span></span>
            </div>
          </div>
          <!-- 内容容器 -->
          <div
            class="edit-content"
            v-show="!ui.fold"
          >
            <!-- 接龙名称 -->
            <div class="textarea-con border-bottom">
              <el-input
                type="textarea"
                autosize
                placeholder="接龙标题"
                v-model="game_data.game_title"
              >
              </el-input>
            </div>
            <!-- 接龙描述 -->
            <div class="textarea-con border-bottom">
              <el-input
                type="textarea"
                autosize
                placeholder="接龙描述"
                v-model="game_data.game_desc"
              >
              </el-input>
            </div>
            <!-- 图 视频 + 文 -->
            <div
              class="video-img-text textarea-con border-bottom"
              v-for="(item, index) in game_data.game_detail"
            >
              <div
                class="img-con"
                v-for="(subItem, subIndex) in item.list"
              >

                <div v-if="subItem.type == 'img'">
                  <img
                    style="width:14px;heigth:14px"
                    class="delete-icon"
                    @click="delVideoImgText(index, item)"
                    src="@/assets/clean.png"
                    alt=""
                  >
                  <span
                    class="large-img"
                    @click="previewImg(subItem)"
                  >
                    <img
                      style="width:16px;heigth:14px"
                      src="@/assets/view.png"
                      alt=""
                    >
                    查看全图
                  </span>
                  <img
                    :src="subItem.url.imgUrl?subItem.url.imgUrl:subItem.url.origin"
                    alt=""
                  >
                </div>
                <div v-if="subItem.type == 'video'">
                  <img
                    style="width:14px;heigth:14px"
                    class="delete-icon"
                    @click="delVideoImgText(index, item)"
                    src="@/assets/clean.png"
                    alt=""
                  >
                  <span
                    class="large-img"
                    @click="previewImg(subItem)"
                  >
                    <img
                      style="width:16px;heigth:14px"
                      src="@/assets/view.png"
                      alt=""
                    >
                    预览视频
                  </span>
                  <img
                    :src="subItem.url.snapshot_url?subItem.url.snapshot_url:subItem.url.snapshot"
                    alt=""
                  >
                </div>
              </div>
              <el-input
                type="textarea"
                autosize
                placeholder="请填写描述"
                v-model="item.text"
              >
              </el-input>
            </div>
            <!-- 九宫格 图片 + 视频 -->
            <div class="jgg-con">
              <!-- 九宫格视频 -->
              <div
                class="jgg-shell"
                v-for="(item, index) in game_data.video_list"
              >
                <img
                  style="width:14px;heigth:14px"
                  class="delete-icon"
                  @click="delJGGVideo(index, item)"
                  src="@/assets/clean.png"
                  alt=""
                >
                <img
                  style="width:14px;heigth:14px"
                  class="preview-video-icon"
                  @click="jggPreviewVideo(item)"
                  src="@/assets/video-play.png"
                  alt=""
                >
                <img
                  class="jgg-img"
                  :src="item.snapshot_url ? item.snapshot_url : item.img_url.tiny"
                  alt=""
                >
              </div>
              <!-- 九宫格图片 -->
              <div
                class="jgg-shell"
                v-for="(item, index) in game_data.img_list"
              >
                <img
                  style="width:14px;heigth:14px"
                  class="delete-icon"
                  @click="delJGGImg(index, item)"
                  src="@/assets/clean.png"
                  alt=""
                >
                <img
                  class="jgg-img"
                  @click="jggPreviewImg(item)"
                  :src="item.imgUrl ? item.imgUrl : item.origin"
                  alt=""
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 商品插件（类型插件） -->
      <type-plugin ref="typePlugin" v-show="typePlugin.selected"></type-plugin>
      <!-- 支付、物流插件（活动插件） -->
      <activity-plugin ref="activityPlugin"></activity-plugin>
      <!-- 更多设置 -->
      <div class="panel more-setting">
        <div class="title">更多设置</div>
        <div class="setting-form">
          <el-form
            ref="form"
            :model="game_data"
            label-width="120px"
            label-position="left"
            size="mini"
          >
            <el-form-item label="服务电话">
              <el-input
                style="width:220px"
                v-model="game_data.service_phone"
                placeholder="服务电话"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="接龙截止时间"
              required
            >
              <el-date-picker
                v-model="game_data.end_at"
                type="datetime"
                placeholder="接龙截止时间"
                value-format="yyyy-MM-dd HH:mm:ss"
              >
              </el-date-picker>
            </el-form-item>

            <el-form-item
              label="首页可见"
              required
            >
              <el-radio-group v-model="game_data.is_show">
                <el-radio label="1">是</el-radio>
                <el-radio label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item
              label="向粉丝发送消息"
              label-width="130px"
              required
            >
              <el-radio-group v-model="game_data.msg_push">
                <el-radio label="1">是</el-radio>
                <el-radio label="0">否</el-radio>
              </el-radio-group>
              <span class="tip-text">注：可向{{userInfo.fansNum}}个粉丝推送消息</span>
            </el-form-item>

          </el-form>
        </div>
      </div>
    </div>
    <div></div>
    <!-- 底部发布按钮 -->
    <div class="footer-submit">
      <div class='main-box submit-btn-con'>
        <div
          class="lsr-btn deploy-btn mr"
          @click="submitJl"
        >发布接龙</div>
        <div
          class="lsr-btn save-btn "
          @click="saveJl"
        >保存</div>
      </div>
    </div>
  </div>

  </div>
</template>

<script>
import header from "@/components/common/header";
import typePlugin from "@/components/common/typeplugin";
import activityPlugin from "@/components/common/activityplugin";
import uploadMixin from "./uploadMixin";
const moment = require("moment");
import { creatJl, gameDetail } from "@/services/services";
import {
  compareTypePluginData,
  compareActivityPluginData,
  activityPluginInitData,
  typePluginInitData
} from "@/config/createPluginsCon";
import { arrToString } from "@/libs/tool";
import _ from "lodash";
// 状态
const status = {
  save: "1",
  publish: "2",
  del: "3"
};
export default {
  name: "createJl",
  mixins: [uploadMixin],
  computed: {
    typePlugin() {
      return this.$store.state.typePlugin;
    },
    activityPlugin() {
      return this.$store.state.activityPlugin;
    },
    userInfo() {
      return this.$store.state.userInfo;
    },
    getGameDetailImg() {}
  },
  data() {
    return {
      //接龙id
      game_id: "",
      //UI显示和资源
      ui: {
        loading: false,
        fold: false, //面板折叠
        preView: {
          show: false,
          // 预览需要的数据类型 对应 url 取字段
          // {
          //   type:'img | video',
          //   url:{
          //     imgUrl | video_url
          //   }
          // }
          data: {}
        } //预览图片
      },
      //接龙数据
      game_data: {
        game_title: "", //接龙标题
        game_desc: "", //接龙描述
        //首页可见
        is_show: "1",
        //向粉丝推送消息
        msg_push: "0",
        //接龙结束时间
        end_at: "",
        // 图片 视频 + 描述
        game_detail: [],
        //九宫格图片
        img_list: [],
        //九宫格视频
        video_list: [],
        //服务电话
        service_phone: ""
      }
    };
  },
  components: {
    "header-home": header,
    "activity-plugin": activityPlugin,
    "type-plugin": typePlugin
  },
  created() {
    //编辑 复制 待发布 传参game_id
    //TODO: 刺齿判断类型插件是否有初始数据
    if (this.$route.query.game_id) {
      this.game_id = this.$route.query.game_id;
      this.getGameDetail();
    } else {
      this.init();
    }
  },
  destroyed() {
    let _t = this;
    _t.$store.commit("SET_ACTIVITY_PLUGIN_DATA", activityPluginInitData);
    _t.$store.commit("SET_TYPE_PLUGIN_DATA", typePluginInitData);
  },
  methods: {
    getGameDetail() {
      let _t = this;
      gameDetail({ game_id: this.game_id }).then(res => {
        console.log(res);
        _t.game_data.game_title = res.game_info.game_title;
        _t.game_data.game_desc = res.game_info.game_desc;
        _t.game_data.img_list = res.game_info.img_list ?res.game_info.img_list : [];
        _t.game_data.video_list = res.game_info.video_list ? res.game_info.video_list : [];
        _t.game_data.is_show = res.game_info.is_show;
        _t.game_data.msg_push = res.game_info.msg_push;
        _t.game_data.end_at = res.game_info.end_at;
        _t.game_data.service_phone = res.game_info.service_phone;
        _t.game_data.game_detail = res.game_info.game_detail;
        let activityPluginsInitData = [];
        //支付插件数据
        let payData;
        //online_pay == 0 插件不存在
        if (res.game_info.online_pay != 0) {
          payData = {
            type: "payPlugin",
            data: {
              award_list: res.game_info.award_list,
              op_rules: res.game_info.op_rules,
              online_pay: res.game_info.online_pay
            }
          };
          activityPluginsInitData.push(payData);
        }
        //物流插件
        let address_id_arr = [];
        for (let item of res.game_info.delivery_info) {
          address_id_arr.push(item.delivery_address_id);
        }
        //组装物流插件数据
        let logisticsData;
        if (res.game_info.delivery_type > 0) {
          logisticsData = {
            type: "logisticsPlugin",
            data: {
              delivery_address_id: address_id_arr,
              delivery_type: res.game_info.delivery_type,
              delivery_type_status:
                res.game_info.delivery_type == 3
                  ? "2"
                  : res.game_info.delivery_type
            }
          };
          activityPluginsInitData.push(logisticsData);
        }
        _t.initActivityPlugin(activityPluginsInitData);

        if (res.item_list.length > 0) {
          _t.initTypePlugin(res.item_list);
        }
      });
    },

    init() {
      this.initTypePlugin();
      this.initActivityPlugin();
      //设置初始化时间
      this.game_data.end_at = moment()
        .add("5", "day")
        .format("YYYY-MM-DD HH:mm:ss");
    },
    initActivityPlugin(activityPluginData) {
      let _t = this;
      let activityPlugin = compareActivityPluginData(activityPluginData);
      _t.$store.commit("SET_ACTIVITY_PLUGIN_DATA", activityPlugin);
    },
    /**
     * 初始化插件参数可空
     */
    initTypePlugin(typePluginData) {
      let _t = this;
      let typePlugin = compareTypePluginData(typePluginData);
      _t.$store.commit("SET_TYPE_PLUGIN_DATA", typePlugin);
    },
    //选择类型插件
    selectTypePlugin(type) {
      // console.log(type)
      this.typePlugin.selected = true;
      this.typePlugin.selectedName = this.typePlugin.pluginList[type].name;
      this.typePlugin.selectedType = this.typePlugin.pluginList[type].type;

      console.log(this.$store.state.typePlugin);
    },
    //删除类型插件
    delTypePlugin() {
      this.$confirm("确认删除插件及放弃当前编辑?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        // this.commitTypePlugin({
        //   selected: false,
        //   selectedType: "",
        //   selectedName: "",
        //   data: null
        // });
        this.typePlugin.selected = false;
        this.typePlugin.selectedName = "";
        this.typePlugin.selectedType = "";
      });
    },
    //选择活动插件
    addActivityPlugin(item) {
      item.selected = true;
    },
    //删除活动插件
    delActivityPlugin(item) {
      this.$confirm("确认删除插件及放弃当前编辑?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        item.selected = false;
        if (item.type == "payPlugin") {
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
        } else if (item.type == "logisticsPlugin") {
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
        }
      });
    },

    //图+ 文 上传成功
    uploadImgTextSuccess(res, file) {
      // this.imgSrc = URL.createObjectURL(file.raw);
      let tempObj = {
        list: [
          {
            type: "img",
            url: res.body
          }
        ],
        text: ""
      };
      this.game_data.game_detail.push(tempObj);
      console.log(this.game_data.game_detail);
    },
    //视频+文 上传成功
    uploadVideoTextSuccess(res, file) {
      // this.imgSrc = URL.createObjectURL(file.raw);
      res.body.id = res.body.video_id;
      let tempObj = {
        list: [
          {
            type: "video",
            url: res.body
          }
        ],
        text: ""
      };
      this.game_data.game_detail.push(tempObj);
      console.log(this.game_data.game_detail);
    },
    //图上传成功(九宫格)
    uploadJGGImgSuccess(res, file) {
      // this.imgSrc = URL.createObjectURL(file.raw);
      this.game_data.img_list.push(res.body);
      console.log(this.game_data.img_list);
    },
    //视频(九宫格)
    uploadJGGVideoSuccess(res, file) {
      // this.imgSrc = URL.createObjectURL(file.raw);
      this.game_data.video_list.push(res.body);
      console.log(this.game_data.video_list);
    },

    //折叠面板
    foldEdit() {
      this.ui.fold = !this.ui.fold;
    },
    //弹窗关闭前得钩子
    preViewClose(done) {
      this.ui.preView.data = {};
      done();
    },
    // 图 视频 + 文预览图片
    previewImg(item) {
      console.log(item);
      this.ui.preView.show = true;
      this.ui.preView.data = item;
    },
    //九宫格预览视频
    jggPreviewVideo(item) {
      let obj = {
        type: "video",
        url: item
      };
      this.previewImg(obj);
    },
    //九宫格预览图片
    jggPreviewImg(item) {
      let obj = {
        type: "img",
        url: item
      };
      this.previewImg(obj);
    },

    //删除 图文 + 视频文
    delVideoImgText(index, item) {
      this.game_data.game_detail.splice(index, 1);
    },
    //删除 图文 + 视频文
    delJGGImg(index) {
      this.game_data.img_list.splice(index, 1);
    },
    //删除 图文 + 视频文
    delJGGVideo(index) {
      this.game_data.video_list.splice(index, 1);
    },
    //数据组装
    async compareData() {
      let _t = this;
      //校验接龙标题和接龙描述
      let param = {};
      param = Object.assign(param, this.game_data);

      let errMessage = "";
      if (!_t.game_data.game_title) {
        errMessage += "接龙标题为必填项！";
      }
      if (!_t.game_data.game_desc) {
        errMessage += "接龙描述为必填项！";
      }
      if (errMessage) {
        _t.$message({
          message: errMessage,
          type: "warning"
        });
        return;
      }

      //校验类型插件
      let validateTypePlugin = true;
      if (_t.typePlugin.selected) {
        validateTypePlugin = await this.$refs.typePlugin.validateAll();
        // console.log(validateTypePlugin);
      }
      // console.log('validateTypePlugin--->' + validateTypePlugin)
      if(!validateTypePlugin) {
        console.log(validateTypePlugin)
        return Promise.resolve(false);
      };  
      if (validateTypePlugin) {
        param = Object.assign(param, {
          item_list: _t.typePlugin.data ? _t.typePlugin.data : []
        });
      }
      let validateaActivitytPlugin = true;
      //是否存在活动插件
      let ActivityPlugins = [];
      for (const key in _t.activityPlugin) {
        let item = _t.activityPlugin[key];
        if (item.selected) {
          ActivityPlugins.push(item.data);
        }
      }
      
      // 校验活动插件
      if (ActivityPlugins.length > 0 && validateaActivitytPlugin) {
        validateaActivitytPlugin = await this.$refs.activityPlugin.validateAll();
      }
      if(!validateTypePlugin) {
        // console.log(validateTypePlugin)
        return Promise.resolve(false);
      }; 
      //组装活动插件数据
      if (ActivityPlugins.length > 0) {
        for (const item of ActivityPlugins) {
          param = Object.assign({}, param, item);
        }
      }
      //区分阅读接龙
      if (ActivityPlugins.length + (_t.typePlugin.selected ? 1 : 0) == 0) {
        param = Object.assign({}, param, { game_type: 3 });
      }
      //格式化数据
      param = arrToString(param);
      return Promise.resolve(param);
    },
    //发布接龙
    async submitJl() {
      let _t = this;
      let param = await this.compareData();
      if (!param) return
      //区分编辑
      let obj = { status: status.publish };
      if (this.game_id && this.$route.query.isedit == 1) {
        obj = Object.assign({}, obj, { game_id: this.game_id });
      }
      //状态
      param = Object.assign({}, param, obj);
      const loading = this.$loading({
          lock: true,
          text: '拼命发布中..',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
      creatJl(param).then(res => {
        _t.$message({
          showClose: true,
          message: "发布成功！",
          type: "success"
        })
        _t.$router.replace("/home");
      }).finally(()=>{
          loading.close();
        })
    },
    //保存接龙
    async saveJl() {
      let _t = this;
      let param = await this.compareData();
      if (!param) return
      //区分编辑
      let obj = { status: status.save };
      if (this.game_id && this.$route.query.isedit == 1) {
        obj = Object.assign({}, obj, { game_id: this.game_id });
      } 
      //状态
      param = Object.assign({}, param, obj);
       const loading = this.$loading({
          lock: true,
          text: '拼命保存中..',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
      creatJl(param).then(res => {
        
        _t.$message({
          showClose: true,
          message: "保存成功",
          type: "success"
        });
        _t.$router.replace('/home')
      }).finally(()=>{
        loading.close();
      })
    }
  }
};
</script>

<style lang="less" scope>
@import "./createJl";
</style>