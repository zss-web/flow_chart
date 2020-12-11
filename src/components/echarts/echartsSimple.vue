<template>
  <div class="echartDemo">
    <div class="wrap">
      <div id="map" style="width: 100%; height: 800px;">
        <div :style="{ height: '400px', width: '100%' }" ref="myEchart"></div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import "echarts/map/js/province/beijing";
import AreaData from "./data";
import EchartsOption from "./optionConfig";
export default {
  name: "EchartsDemo",
  props: {
    areaData: {
      type: Array,
      default() {
        return new AreaData();
      }
    },
    option: {
      type: Object,
      default() {
        return new EchartsOption();
      }
    },
    colorList: {
      type: Array,
      default() {
        return ["#F4E001", "#F0805A", "#26C0C0"];
      }
    },
    cityConfig: {
      type: Object,
      default() {
        return {
          name: "北京市",
          dataJson: null
        };
      }
    },
    areaItems: {
      type: Object,
      default() {
        return {
          东城区: [116.418757, 39.937544],
          西城区: [116.366794, 39.910309],
          朝阳区: [116.486409, 39.991489],
          丰台区: [116.286968, 39.863642],
          石景山区: [116.170445, 39.974601],
          海淀区: [116.280316, 40.039074],
          门头沟区: [115.905381, 40.009183],
          房山区: [115.701157, 39.735535],
          通州区: [116.758603, 39.802486],
          顺义区: [116.753525, 40.128936],
          昌平区: [116.235906, 40.318085],
          大兴区: [116.338033, 39.658908],
          怀柔区: [116.607122, 40.524272],
          平谷区: [117.112335, 40.244783],
          密云区: [116.943352, 40.477362],
          延庆区: [115.985006, 40.465325]
        };
      }
    }
  },
  beforeDestroy() {
    this.myChart.off("click");
  },
  data() {
    return {
      wrap: null, //包裹框
      drawBar: null, // 柱状图
      barWrap: null,
      shaDe: null, // 遮挡层
      myChart: null,
      // 地区坐标
      selfAreaItems: {},
      selfAreaData: new AreaData(),
      selfOption: new EchartsOption()
    };
  },

  mounted() {
    this.init();
  },
  methods: {
    loadMap(mapName, data) {
      if (data) {
        console.log(mapName, data, "mapName, datamapName, data");
        echarts.registerMap(mapName, data);
      }
    },
    init() {
      // console.log(mapJson, "mapJsonmapJson");

      this.selfAreaData = JSON.parse(JSON.stringify(this.areaData));
      this.selfOption = JSON.parse(JSON.stringify(this.option));
      this.selfColor = JSON.parse(JSON.stringify(this.colorList));
      this.selfOption = JSON.parse(JSON.stringify(this.option));
      this.myChart = echarts.init(this.$refs.myEchart);
      if (this.cityConfig.dataJson) {
        console.log(this.cityConfig);
        this.loadMap(this.cityConfig.name, this.cityConfig.dataJson);
      }
      this.selfAreaItems = JSON.parse(JSON.stringify(this.areaItems));
      window.onresize = this.myChart.resize;

      this.myChart.setOption(this.selfOption);
      // 拖拽跟缩放重置
      let throttledRenderEachCity = this.throttle(this.renderItems, 0);
      this.myChart.on("geoRoam", throttledRenderEachCity);
      this.renderItems();
      this.itemonClick();
    },
    // 缩放和拖拽
    throttle(fn, delay, debounce) {
      let currCall;
      let lastCall = 0;
      let lastExec = 0;
      let timer = null;
      let diff;
      let scope;
      let args;
      delay = delay || 0;
      function exec() {
        lastExec = new Date().getTime();
        timer = null;
        fn.apply(scope, args || []);
      }

      let cb = function() {
        currCall = new Date().getTime();
        scope = this;
        args = arguments;
        diff = currCall - (debounce ? lastCall : lastExec) - delay;

        clearTimeout(timer);

        if (debounce) {
          timer = setTimeout(exec, delay);
        } else {
          if (diff >= 0) {
            exec();
          } else {
            timer = setTimeout(exec, -diff);
          }
        }

        lastCall = currCall;
      };

      return cb;
    },
    // 填充 地图点位
    renderItems() {
      let option = Object.assign(this.selfOption, {
        xAxis: [],
        yAxis: [],
        grid: [],
        series: [],
        tooltip: {
          trigger: "item",
          axisPointer: {
            type: "none"
          }
        }
      });
      this.selfAreaData.forEach((item, idx) => {
        let nodeCoord = this.selfAreaItems[item.areaName];
        let coord = this.myChart.convertToPixel("geo", nodeCoord);
        let titleItems = item.DateItems.map(i => i.title);
        let itemData = item.DateItems.map(i => Number(i.value));
        console.log(item, this.selfAreaItems, coord);
        if (coord) {
          option.xAxis.push({
            id: idx + item.areaName,
            gridId: idx + item.areaName,
            type: "category",
            name: item.areaName,
            nameLocation: "middle",
            nameGap: 3,
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: "#666"
              }
            },
            data: titleItems,
            z: 100
          });
          option.yAxis.push({
            id: idx + item.areaName,
            gridId: idx + item.areaName,
            type: "value",
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "red"
              }
            },
            min: 0,
            max: "dataMax"
          });
          option.grid.push({
            id: idx + item.areaName,
            width: 30,
            height: 40,
            left: coord[0] - 15,
            top: coord[1] - 15,
            z: 100
          });
          option.series.push({
            id: idx + item.areaName,
            type: "bar",
            xAxisId: idx + item.areaName,
            yAxisId: idx + item.areaName,
            barGap: 0,
            barCategoryGap: 0,
            data: itemData,
            z: 100,
            itemStyle: {
              normal: {
                color: params => {
                  // build a color map as your need.
                  let color = this.selfColor[params.dataIndex];
                  return color;
                }
              },
              opacity: 0,
              emphasis: {
                label: {
                  show: false
                }
              }
            }
          });
        }
      });
      this.myChart.setOption(option);
    },
    // 点击显示柱状图
    itemonClick() {
      this.myChart.on("click", e => {
        if (e.componentSubType == "bar") {
          this.barWrap = document.createElement("div");
          this.drawBar = document.createElement("div");
          this.wrap = document.getElementsByClassName("wrap")[0];
          // 先清除所有柱状图
          // $(".tongJiTu").remove();
          // 创建遮挡层
          this.creatWrap();
          // 创建柱状图容器
          this.barWrap.id = "bar-wrap";
          this.barWrap.className = "bar-wrap";
          this.drawBar.className = "zhuzhuang";
          let divX = this.getMousePos()["x"];
          let divY = this.getMousePos()["y"];
          this.barWrap.setAttribute(
            "style",
            `width: 350px; height: 180px;border: 1px solid #ccc;position:absolute;top: ${divY}px;left:${divX}px`
          );
          this.drawBar.setAttribute("style", `width: 100%; height: 100%`);
          // 创建柱状图
          this.wrap.appendChild(this.barWrap);
          this.barWrap.appendChild(this.drawBar);
          this.zhuZhuangTu(e);
          // // 点击遮挡层消失
          this.clearWrap();
        }
        return;
      });
    },
    // 获取横纵坐标
    getMousePos(e) {
      e = event || window.event;
      let x = e.clientX;
      let y = e.clientY;
      return { x, y };
    },
    // 生成柱状图
    zhuZhuangTu(e) {
      let index = e.seriesIndex;
      let bar = echarts.init(this.drawBar);
      let xTitle = this.selfAreaData[index].DateItems.map(i => i.title);
      let yValue = this.selfAreaData[index].DateItems.map(i => i.value);
      let option = {
        backgroundColor: "rgba(255,255,255,.3)",
        legend: {
          data: xTitle
        },
        xAxis: [
          {
            type: "category",
            data: xTitle
          }
        ],
        yAxis: [
          {
            splitLine: {
              show: false
            },
            type: "value"
          }
        ],
        series: [
          {
            type: "bar",
            itemStyle: {
              normal: {
                color: function(params) {
                  let colorList = ["#F75D5D", "#59ED4F", "#4C91E7"];
                  return colorList[params.dataIndex];
                },
                label: {
                  show: true,
                  position: "top",
                  textStyle: {
                    color: "#000"
                  }
                }
              }
            },
            data: yValue
          }
        ]
      };
      bar.setOption(option);
    },
    // 生成遮挡层
    creatWrap() {
      this.shaDe = document.createElement("div");
      this.shaDe.className = "shaDe";
      this.wrap.appendChild(this.shaDe);
    },
    // 去掉遮挡层
    clearWrap() {
      this.shaDe.addEventListener(
        "click",
        () => {
          this.shaDe.remove();
          this.barWrap.remove();
          this.drawBar.remove();
          return false;
        },
        false
      );
    }
  }
};
</script>

<style lang="less">
.shaDe {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
}
</style>
