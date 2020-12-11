class FlowNode {
  constructor({ nodeType, nodeId, nodeName, groupId, parentGroupId, ...data }) {
    if (nodeType === "1") {
      return {
        id: "root",
        groupId: "root",
        type: "root",
        title: "所有人",
        content: "请选择",
        isRow: true,
        isRoot: true,
        data: {}
      };
    }
    if (nodeType === "5") {
      return null;
    }
    this.data = data;
    this.id = nodeId;
    this.title = nodeName;
    this.type = nodeType;
    this.groupId = groupId;
    this.groupPid = parentGroupId;
  }
}
export { FlowNode };
