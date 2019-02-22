<template>
  <el-breadcrumb class="common-breadcrumb">
    <el-breadcrumb-item v-for="item in data" :to="item.to">{{item.name}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
  export default {
    props: ['data'],
    data() {
      return {};
    },

    computed: {},

    watch: {},

    methods: {}
  };
</script>

<style lang="less" scope>
  .common-breadcrumb {
    .is-link {
      color: #1BAC19;
    }
  }
</style>