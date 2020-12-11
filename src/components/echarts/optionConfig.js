export default class EchartsOptions {
  constructor() {
    return {
      backgroundColor: "#02AFDB",
      tooltip: {},
      geo: {
        map: "北京",
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
    };
  }
}
