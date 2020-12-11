import EchartsDemo from "./echartsSimple";
/* istanbul ignore next */
EchartsDemo.install = function(Vue) {
  Vue.component(EchartsDemo.name, EchartsDemo);
};
export default EchartsDemo;
