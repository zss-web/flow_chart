<template>
  <div id="drawProcessDesign">
    <a-button @click="getData">提交</a-button>
    <FactoryDrawFlow
      @clickNode="clickNode"
      ref="flow"
      :FlowConfig="FlowConfig"
    ></FactoryDrawFlow>
  </div>
</template>
<style lang="less" scoped>
#drawProcessDesign {
  background: #f0f2f5;
}
</style>

<script>
// @ is an alias to /src
export default {
  name: "Home",
  components: {},
  data() {
    return {
      FlowConfig: [
        {
          id: "root",
          groupId: null,
          type: "1",
          title: "所有人",
          content: "请选择",
          isRow: true,
          isRoot: true,
          data: {}
        }
      ]
    };
  },
  created() {
    this.init();
  },
  methods: {
    getData() {
      console.log(this.$refs.flow);
      let res = this.$refs.flow.getResData();
      console.log("这是返回的一维数组", res);
    },
    /**
     * 1、创建一个row length 1
     * 2、创建一个col节点
     * 3、创建一组col length 1
     * return [{pid id type}]
     */
    getNodeArr() {
      this.FlowConfig = this.$refs.flow.getNodeArr();
      return this.FlowConfig;
    },
    init() {
      // this.FlowConfig = this.transform(this.FlowConfig);
    },
    clickNode(node) {
      console.log("当前点击节点", node);
    }
  }
};
</script>
