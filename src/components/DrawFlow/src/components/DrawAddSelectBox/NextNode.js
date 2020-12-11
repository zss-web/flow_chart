/**
 * @author 肖阳
 * @time 2020-9-10
 * @dec 下一节点属性
 */
export class NextNode {
  constructor({ id, prevId, type, isRow }) {
    this.id = id;
    this.prevId = prevId;
    this.type = type;
    this.isRow = isRow;
  }
}
