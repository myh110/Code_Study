<template>
  <div class="common-img-view">
    <!-- <img src="@/assets/bj.jpg"> -->
    <img class="img-main" :style="imgStyle" :src="imgConf.src" />
    <img v-if="deleteConf.show" class="img-delete" :style="deleteStyle" src="@/assets/clean.png" @click="deleteImg" />
    <span v-if="viewOrigin.show" class="img-view" :style="viewStyle" @click="viewOriginImg">
      <img :style="viewIconStyle" src="@/assets/view.png" />
      <span class="text" :style="viewTextStyle">查看全图</span>
    </span>
    <div v-if="maskShow" class="mask" :style="imgStyle" @click="maskClick">
      <slot></slot>
    </div>

    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="imgConf.origin||imgConf.src" alt="">
    </el-dialog>
  </div>
</template>

<script>
  /**
   * 这是一个扩展的img UI组件 ：纯展示图片，实现删除图片（事件自己处理），预览原图，遮罩等
   * 全屏mask用slot，自定义 - TODO：可能还要完善
   * 配置参数： 参考下面的props： imgConf，deleteConf，viewOrigin，maskShow；均有默认值，传值请传全部属性
   * eg: <img-view v-show="item.imageUrl" class="goods-img" :viewOrigin="imgconfig.viewOrigin" :imgConf="{src: item.imageUrl, width: 100, height: 100}"
              @imgDelete="imgDelete(index)"></img-view>
   * 
   * 事件： 
   *  imgDelete - 参数：imgConf
   *  maskClick - 遮罩点击
   * */
  export default {
    props: {
      //图片配置
      imgConf: {
        default () {
          return {
            src: '',
            origin: '',
            width: 100,
            height: 100,
          }
        }
      },
      //右上角删除图标配置
      deleteConf: {
        default () {
          return {
            show: true,
            width: 20
          }
        }
      },
      viewOrigin: {
        default () {
          return {
            show: true,
            width: 96,
            height: 30,
            icon_width: 16,
            icon_heigth: 14,
            font_size: 14
          }
        }
      }, //是否查看大图 - 右下角查看图标
      maskShow: {
        default: false
      }, //图片下面的mask - 传入显示内容，如：”插入描述“
    },
    data() {
      console.log(this.imgConf.height)
      return {
        // deleteSize: 10,
        deleteStyle: {
          width: this.deleteConf.width + 'px',
          height: this.deleteConf.width + 'px',
          top: -this.deleteConf.width / 2 + 'px',
          left: (this.imgConf.width - this.deleteConf.width / 2) + 'px',
        },
        imgStyle: {
          width: this.imgConf.width + 'px',
          height: this.imgConf.height + 'px',
        },
        viewStyle: {
          width: this.viewOrigin.width + 'px',
          height: this.viewOrigin.height + 'px',
        },
        viewIconStyle: {
          width: this.viewOrigin.icon_width + 'px',
          height: this.viewOrigin.icon_heigth + 'px',
        },
        viewTextStyle: {
          'font-size': this.viewOrigin.font_size + 'px'
        },
        dialogVisible: false,
        dialogImageUrl: ''

      }
    },
    methods: {
      viewOriginImg() {
        console.log('viewOriginImg')
        this.dialogVisible = true;
      },
      deleteImg() {
        this.$emit('imgDelete', this.imgConf);
      },
      maskClick() {
        this.$emit('maskClick', this.imgConf);
        console.log('maskClick')
      }
    },
  }
</script>

<style lang="less" scope>
  .common-img-view {
    position: relative;
    width: 100px;
    height: 100px;

    .img-main {
      width: 100px;
      height: 100px;
    }

    .img-delete {
      position: absolute;
    }

    .img-view {
      position: absolute;
      bottom: 0;
      right: 0;
      background: rgba(51, 51, 51, 0.40);
      display: flex;
      justify-content: space-around;
      align-items: center;
      cursor: pointer;

      .text {
        color: #FFFFFF;
      }
    }

    .mask {
      position: absolute;
      opacity: 0.23;
      background: #000000;
      color: white;
      top: 0;
      left: 0;
    }
  }
</style>