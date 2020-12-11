<template>
  <div
    class="TreeRight"
    v-if="showTree"
  >
    <div class="childs">
      <div
        class="child"
        v-for="(item,index) in list"
        :key="item.id +'-child-'+index"
      >
        <div
          class="child-item"
          :style="{marginRight: item.children && item.children.length > 1 ? '20px' :''}"
        >
          <div
            class="childname"
            :id="item"
          >
            <div
              class="content-box"
              :ref="item.id"
              :id="item.id"
            >
              {{item.id}}
              <p
                v-for="(itemshow,index3) in showfields"
                :key="'itemshow'+index3"
              >{{itemshow.name}}{{item[itemshow.key]}}</p>
            </div>
            <div style="width:30px"></div>
          </div>
          <div :style="{width: item.children  ? '160px' :''}"></div>
        </div>
        <!-- 递归组件展示子节点 -->
        <div
          class="child-children"
          v-if="item.children && item.children.length"
        >
          <RightTree
            :list="item.children"
            :showfields="showfields"

          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LeaderLine from 'leader-line-vue'
export default {
    name: 'RightTree',
    components: {},
    data() {
        return {
            domready: false,
            lines: [], 
        }
    },
    create(){
    },
    props: {
        list: {
            type: Array,
            default: () => [],
        },
        showfields: {
            type: Array,
            default: () => [],
        },
       
    },
    mounted() {
        this.$nextTick(() => {
            this.domready = true
            //绘制箭头
            this.drawArrowLine()
        }) 
    },
    computed:{
        /**
         * 是否展示树计算属性
         */
        showTree(){
            return this.list && this.list.length
        },
    },
    beforeDestroy(){
        /**
         * 离开页面时销毁所有line
         */
        if(this.lines && this.lines.length){
            this.lines.forEach(line => {
                line.remove()
            })
        }
    },
    methods: {
      // linechange(){
      //     console.log('aa');
      // },
        /**
         * 递归绘制箭头
         */
        drawArrowLine(){
            this.drawLeaderLine(this.list)
        },
        /**
         * 根据上下级关系绘制线条
         */
        drawLeaderLine(list){
            list.forEach(element => {
                let start =  document.getElementById(element.id)
                if(element.children && element.children.length){
                    element.children.forEach(child => {
                        let line = LeaderLine.setLine(start,  document.getElementById(child.id))
                        line.color = 'rgba(30, 130, 250, 0.5)'
                        line.path = 'grid'
                        line.size = 3
                        line.setOptions({
                            dash: {animation: true},
                        })
                        this.lines.push(line)

                        //路线变大
                        document.getElementById('upButton').addEventListener('click', function() {
                          if (line.size < 10) { line.size++; }
                        }, false);
                        //路线变小
                        document.getElementById('downButton').addEventListener('click', function() {
                          if (line.size > 2) { line.size--; }
                        }, false);
                        //切换路线
                          let num=0;
                        document.getElementById('cutButton').addEventListener('click', function() {
                          num++;
                          switch (num) {
                            case 0:
                              line.path = 'grid'
                              break;
                             case 1:
                              line.path = 'straight'
                              break;
                               case 2:
                              line.path = 'arc'
                              break;
                               case 3:
                              line.path = 'fluid'
                              break;
                                case 4:
                              line.path = 'magnet'
                              break;
                            default:
                              line.path = 'grid'
                              break;
                          }
                          if (num > 4) {
                            num =0
                          }
                        }, false);

                        
                    })
                    this.drawLeaderLine(element.children)
                }
            })
        },
    },
}
</script>

<style lang="less" scoped>

  .TreeRight {
    p {
      margin: 0;
      font-size: 13px;
    }
    display: flex;
    .childs {
      .child {
        display: flex;
        background-color: #fff;
        .child-item {
          display: flex;
          align-items: center;
          margin: 10px 0;
          .childname {
            cursor: pointer;
            height: 100%;
            display: flex;
            align-items: center;
            width: 220px;
            text-align: center;
            justify-content: center;
            position: relative;
            padding: 10px 0;
            .content-box {
              text-align: left;
              border: 1px solid #e8e8e8;
              padding: 10px;
              height: 100px;
              border-radius: 2px;
              width: 100%;
              box-shadow: 0 2px 4px 0 rgba(181, 181, 181, 0.7);
            }
            .position-arrow {
              position: absolute;
              left: -22px;
            }
          }
          .childarrow {
            height: 100%;
            display: flex;
            align-items: center;
          }
        }
      }
      .child-children {
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
    }
  }
</style>
