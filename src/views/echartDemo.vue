<template>
  <div class="echartDemo">
    <echarts-demo
      :areaData="areaData"
      :option="option"
      :cityConfig="cityConfig"
      :areaItems="areaItems"
    ></echarts-demo>
  </div>
</template>

<script>
let mapJson = require("./json/xuzhou.json");
import AreaData from "./js/data";
export default {
  name: "EachartsDom",
  data() {
    return {
      areaData: new AreaData(),
      areaItems: { 丰县: [116.59957, 34.69972] },
      cityConfig: {
        name: "徐州市",
        dataJson: mapJson
      },
      option: {
        backgroundColor: "#02AFDB",
        tooltip: {},
        geo: {
          map: "徐州市",
          roam: true,
          label: {
            normal: {
              show: true,
              textStyle: {
                color: "rgba(0,0,0,0.4)"
              }
            }
          },
          itemStyle: {
            normal: {
              borderColor: "rgba(0, 0, 0, 0.2)"
            },
            emphasis: {
              areaColor: null,
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 20,
              borderWidth: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }
      }
    };
  },
  mounted() {}
};
</script>

<style></style>
