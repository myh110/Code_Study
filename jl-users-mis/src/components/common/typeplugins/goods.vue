<template>
  <div class="jl-plugin-goods">
    <div class="part-title">
      <div class="title">
        <span class="title-main">商品</span>
        <span class="title-sub">“*”为必填</span>
      </div>
      <div class="btn-group">
        <a @click="addGoods">添加</a>
        <a @click=deleteGoodsAll()>删除</a>
      </div>
    </div>
    <div class="part-goods">
      <el-form v-for="(item, index) in form" ref="goodsForm" :key="index" :model="item" :rules="rulesTemplate"
        :show-message="false" :inline-message="true" class="goods-form" label-width="80px" @submit.native.prevent>
        <div class="goods-form-left">
          <el-form-item label="商品名称" prop="item_name">
            <el-input v-model="item.item_name" :placeholder="formPlacehoder.item_name"></el-input>
          </el-form-item>
          <el-form-item label="规格" prop="item_unit">
            <el-input v-model="item.item_unit" :placeholder="formPlacehoder.item_unit"></el-input>
          </el-form-item>
          <el-form-item label="价格" prop="item_price">
            <el-input v-model="item.item_price" :placeholder="formPlacehoder.item_price"></el-input>
          </el-form-item>
          <el-form-item label="限购数量" prop="order_limit">
            <el-input v-model="item.order_limit" :placeholder="formPlacehoder.order_limit"></el-input>
          </el-form-item>
          <el-form-item label="库存" prop="inventory_num">
            <el-input v-model="item.inventory_num" :placeholder="formPlacehoder.inventory_num"></el-input>
          </el-form-item>
          <el-form-item label="商品描述" prop="item_desc">
            <el-input type="textarea" rows="3" resize="none" v-model="item.item_desc" :placeholder="formPlacehoder.item_desc"></el-input>
          </el-form-item>
        </div>
        <div class="goods-form-right">
          <el-form-item class="upload-item" label="" label-width="0px">
            <img-view v-show="item.img_list.length>0" class="goods-img" :viewOrigin="imgconfig.viewOrigin" :imgConf="{src: item.imgLocalSrc||(item.img_list[0]&&item.img_list[0].small), origin: item.imgLocalSrc||(item.img_list[0]&&item.img_list[0].origin), width: 100, height: 100}"
              @imgDelete="imgDelete(index)"></img-view>
            <div v-show="item.img_list.length==0">
              <div class="upload">
                <svg class="icon icon-upload-img" aria-hidden="true">
                  <use xlink:href="#icon-photo"></use>
                </svg>
                <span>上传图片</span>
              </div>
              <input ref="formImgUpload" type="file" accept="image/gif,image/jpeg,image/jpg,image/png" @change="handelImgUploadChange($event, index)"
                class="upload-img-input">
            </div>
          </el-form-item>
          <div class="function-area">
            <a @click=deleteGoods(index)>删除该商品</a>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  /**
   * 商品插件
   * props: initData: Array
   * 本实例方法：
   *    getAllData： 返回form Array； 
   *    validateAll：校验内部所有商品，返回promise对象，then 校验通过，catch 校验失败
   * 本组件事件属性：
   *    addGoods：添加了一个商品时出发；
   *    deleteGoods：删除了一个商品时触发，参数（被删除的form-Object）；
   *    deleteGoodsAll：清除所有商品时触发=删除插件，参数（被删除的form - Array）；
   *    imageChange: 图片改变时触发，参数（{改变类型type：1-add,2-delete；改变的商品form：form-Object}）；
   * */
  import ImageView from "@/components/common/img-view";
  import {
    uploadImg
  } from "@/services/services";
  import {
    Loading
  } from 'element-ui';
  export default {
    props: {
      formData: Array
    },
    data() {
      return {
        // form: [],
        formPlacehoder: {
          item_name: '',
          item_unit: '',
          item_price: '',
          order_limit: '',
          inventory_num: '',
          item_desc: '',
          img_list: []
        },
        formTemplate: {
          item_name: '',
          item_unit: '',
          item_price: '',
          order_limit: '',
          inventory_num: '',
          item_desc: '',
          img_list: [],
          imgLocalSrc:''  //本地用，展示图片
        },
        rulesTemplate: {
          item_name: [{
            required: true,
            message: '请填写奖品名称',
            trigger: 'blur'
          }, ],
          item_unit: [],
          item_price: [{
            required: true,
            message: '请填写价格',
            trigger: 'blur'
          }],
          order_limit: [],
          inventory_num: [],
          item_desc: []
        },

        //img config
        imgconfig: {
          viewOrigin: {
            show: true,
            width: 75,
            height: 20,
            icon_width: 12,
            icon_heigth: 10,
            font_size: 12
          }
        }
      }
    },
    computed: {
      form() {
        return this.formData;
      }
    },
    created() {
      //初始化数据 initData
      // console.log(this.form)
      if (!this.form || this.form.length == 0) {
        this.form.push(Object.assign({}, this.formTemplate));
      }
    },
    components: {
      'img-view': ImageView,
    },
    methods: {
      addGoods() {
        this.form.push(Object.assign({}, this.formTemplate));
        this.$emit('addGoods');
      },

      deleteGoods(index) {
        // 只有一个品即删除插件
        if (this.form.length === 1) {
          this.$emit('deleteGoodsAll', this.form);
        } else {
          let dataDeleted = this.form.splice(index, 1);
          this.$emit('deleteGoods', dataDeleted);
        }
      },

      //删除所有品，通知父组件 delete me ~
      deleteGoodsAll() {
        this.$emit('deleteGoodsAll');
      },
      getAllData() {
        return this.form;
      },

      /**
       * 注： 该方法返回一个promis对象
       * then 校验通过
       * catch 校验失败
       * */
      validateAll() {
        return Promise.all([...this.$refs.goodsForm].map(item => {
          return item.validate();
        }));
      },
      handelImgUploadChange($event, index) {
        let file = $event.target.files[0];
        if (file) {
          // this.form[index].image = file;
          // this.form[index].imageUrl = URL.createObjectURL(file);
          //
          let form = new FormData();
          // 文件对象
          form.append("fileUp", file);
          let loadingInstance = Loading.service({
              fullscreen: true,
              background: "rgba(0, 0, 0, 0.8)",
              text: "图片上传中..."
            });
          uploadImg(form).then(res => {
            loadingInstance.close();
            // console.log(this.form[index].img_list)
            this.form[index].img_list = [res.id];
            this.form[index].imgLocalSrc = URL.createObjectURL(file);
            this.$emit('imageChange', {
              type: 1,
              form: this.form
            });
          })
        }
      },

      imgDelete(index) {
        // this.form[index].image = '';
        this.form[index].img_list = [];
        this.form[index].imgLocalSrc = '';
        this.$refs.formImgUpload[index].value = '';
        this.$emit('imageChange', {
          type: 2,
          form: this.form[index]
        });
      }
    },

    watch: {
      //深度监听本插件数据
      form: {
        deep: true,
        handler(val) {
          this.$emit('dataChanged', val);
        }
      }
    },
  }
</script>

<style lang="less" scope>
  .jl-plugin-goods {
    width: 912px;
    background-color: white;

    .part-title {
      display: flex;
      padding: 17px 24px;
      justify-content: space-between;

      .title-main {
        font-size: 18px;
        color: #333333;
      }

      .title-sub {
        font-size: 14px;
        color: #999999;
        margin-left: 10px;
      }

      .btn-group {
        display: flex;
        justify-content: flex-end;

        a {
          margin-left: 24px;
          font-size: 18px;
          color: #1BAC19;

          &:hover {
            cursor: pointer;
          }
        }
      }
    }

    .part-goods {
      .goods-form {
        border-top: 1px solid #E7E7E7;
        display: flex;
        justify-content: space-between;
        padding: 0 24px;

        .el-form-item {
          margin: 10px 0;
          width: 80%;

          input,
          select,
          textarea {
            /* border: none; */
          }
        }

        .goods-form-left {
          /* display: flex; */
          width: 767px;

          .el-form-item__label {
            color: #333333;
          }
        }

        .goods-form-right {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-direction: column;
          width: 144px;
          margin: 20px 0;
          border-left: 1px solid #E7E7E7;

          .upload {
            position: absolute;
            border: 1px solid #999999;
            border-style: dashed;
            width: 100px;
            height: 100px;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;

            .icon-upload-img {
              width: 30px;
              height: 25.8px;
            }

            span {
              font-size: 14px;
              color: #999999;
              line-height: 20px;
              /* 清除Form-Item的line-height */
            }
          }

          .upload-img-input {
            vertical-align: middle;
            /* input对齐 */
            width: 100px;
            height: 100px;
            margin: 0 auto;
            opacity: 0;
            z-index: 99999;
          }


          .function-area {
            display: flex;
            justify-content: flex-end;

            a {
              font-size: 14px;
              color: #999999;

              &:hover {
                cursor: pointer;
              }
            }

          }
        }
      }
    }
  }
</style>