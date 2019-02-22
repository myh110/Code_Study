<template>
  <div class="mod-plugin-container">
    <plugin-goods ref="plugin" :formData="formData" v-if="pluginList && type==pluginList.goodsPlugin.type"
      @deleteGoodsAll="deleteSelf" @dataChanged="dataChanged"></plugin-goods>
  </div>
</template>

<script>
  /**
   * 类型插件容器： 统一管理类型插件（以下称子插件），方便调用
   * 本组件负责管理vuex与各子插件的交互
   * 数据字段在个插件内部自己管理
   * 
   * 子组件方法调用（暴露子组件的所有方法，定制型接口，具体方法因插件而异）：publicMethods, 参数1：方法名称，...
   * 
   * 
   * 
   * 本管理器的组件开发需要遵守：
   * 注意：所有组件必须深度监听自身数据，并触发dataChanged事件，以便统一管理数据
   * 
   * 所有子插件需要考虑实现的方法实现的方法（从业务角度考虑）：validateAll
   * 所有子插件需要考虑实现的方法实现的事件（从业务角度考虑）：deleteSelf
   * */
  import Goods from "@/components/common/typeplugins/goods";

  export default {
    data() {
      return {
        pluginData: {
          'goodsPlugin': [],
        },
      }
    },
    computed: {
      pluginList() {
        return this.$store.state.typePlugin.pluginList
      },
      type() {
        return this.$store.state.typePlugin.selectedType;
      },
      selectedMe() {
        return this.$store.state.typePlugin.selected;
      },
      //初始化类型插件的数据
      formData() {
        return this.$store.state.typePlugin.data ? this.$store.state.typePlugin.data : this.pluginData[this.$store.state
          .typePlugin.selectedType];
      }
    },
    components: {
      'plugin-goods': Goods,
    },

    methods: {
      //TODO: 此处没有做methodName类型校验，可能会有异常哦，先不管调到啥
      publicMethods(methodName) {
        if (this.$refs.plugin[methodName]) {
          return this.$refs.plugin[methodName]();
        } else {
          throw 'no methods';
        }
        //  this.$refs.plugin[methodName]? return this.$refs.plugin[methodName](): throw 'no methods';
      },
      validateAll() {
        let _t = this;
        return new Promise(function (resolve, reject) {
          _t.$refs.plugin.validateAll().then(values => {
            resolve(true);
          }).catch(reason => {
            resolve(false);
          })
        });
        // return this.$refs.plugin.validateAll();
      },

      deleteSelf() {
        //delete self need confirm
        this.$confirm('确认删除插件及放弃当前编辑?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.commit('SET_TYPE_PLUGIN_DATA', Object.assign(this.$store.state.typePlugin, {
            selected: false,
          }));
        });
        this.$emit('deleteSelf');
      },
      dataChanged(data) {
        this.$store.commit('SET_TYPE_PLUGIN_DATA', Object.assign(this.$store.state.typePlugin, {
          data: data
        }));
      }
    },

    watch: {
      selectedMe(value) {
        if (!value) {
          this.$store.commit('SET_TYPE_PLUGIN_DATA', Object.assign(this.$store.state.typePlugin, {
            selected: false,
            selectedType: "",
            selectedName: "",
            data: null,
          }));
        }
      }
    },
  }
</script>

<style>
</style>