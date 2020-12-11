<!--
* 
* @time 2020-9-10
* @dec  预留接口 主要用在添加新功能 应用场景 多流程
-->
<script>
import { transToTreeDat } from "../utils";

export default {
  name: "FlowFactoryMixin",
  props: {},
  methods: {
    /**
     *  @param data  源数组一维数组
     *  @requires  tree 二维数组
     */
    transformTree(data) {
      return transToTreeDat(data);
    }
  },
  watch: {}
};
</script>

<style>
.branch-wrap {
  display: inline-flex;
  width: 100%;
}
</style>
