<!--
* @author 肖阳
* @time 2020-9-10
* @dec 添加新增节点按钮
-->
<script>
/* eslint-disable no-unused-vars */
import "./addBox.less";
import { NextNode } from "@/components/DrawFlow/src/components/DrawAddSelectBox/NextNode";
import { HashCode } from "../../utils";
export default {
  name: "AddBox",
  props: {
    nodeConfig: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      boxArr: [
        {
          type: "2",
          value: "审批人",
          isRow: true,
          calssName: "approver",
          icon: "user"
        },
        {
          type: "4",
          value: "抄送人",
          isRow: true,
          calssName: "notifier",
          icon: "highlight"
        },
        {
          type: "3",
          value: "条件分支",
          isRow: false,
          calssName: "route",
          icon: "sliders"
        },
        {
          type: "6",
          value: "流转至",
          isRow: false,
          calssName: "route",
          icon: "sliders"
        }
      ]
    };
  },
  methods: {
    clickSelectBox(item) {
      this.getNexttBox(item);
    },
    getNexttBox(item) {
      const nodeConfig = this.nodeConfig;
      if (item.value === "流转至") {
        this.nodeConfig.isFlowTo = true;
      }
      let { id, prevId, type, isRow } = Object.assign(nodeConfig, item);
      let nextNode = new NextNode({ id, prevId, type, isRow });
      this.$emit("clickSelectBox", nextNode);
    },
    renderAddSBox() {
      return (
        <div class="add-node-popover">
          <div class="add-node-popover-body">
            {this.boxArr.map(item => {
              return (
                <a
                  onClick={() => {
                    this.clickSelectBox(item);
                  }}
                  class={["add-node-popover-item", item.calssName]}
                >
                  <div class="item-wrapper">
                    <a-icon class="iconfont" type={item.icon} />
                  </div>
                  <span>{item.value}</span>
                </a>
              );
            })}
          </div>
        </div>
      );
    }
  },
  render() {
    return this.renderAddSBox();
  }
};
</script>
