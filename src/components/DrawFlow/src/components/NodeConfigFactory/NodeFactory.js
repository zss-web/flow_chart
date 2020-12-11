/* eslint-disable no-unused-vars */
/**
 * @author 肖阳
 * @time 2020-9-10
 * @dec 各种节点类
 */
import { HashCode } from "../../utils";
export class Node {
  nodeId;
  type;
  childNode;
  title = "title";
  content = "content";
  conditionNodes;
  constructor({ id, type, isRow }) {
    this.groupId = id;
    this.id = HashCode();
    this.type = type;
    this.content += this.id;
    this.isRow = isRow;
  }
}
export class ConditionNode {
  title = "title";
  data = {};
  constructor({ groupId, type, id, isRow }) {
    this.id = HashCode();
    this.groupId = groupId;
    this.type = type;
    this.content += this.id;
    this.groupPid = id;
    this.isRow = isRow;
  }
}
export class RowNode extends Node {
  data = {};
  constructor({ id, type, isRow }) {
    super({ id, type, isRow });
  }
}
export class CopyNode {
  title = "标题";
  id = HashCode();
  content = "内容";
  data = {};
  constructor({ id, childNode, ...node }) {
    return Object.assign(node, this);
  }
}
