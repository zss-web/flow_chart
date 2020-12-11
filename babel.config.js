module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  env: {
    debug: {
        sourceMap: true,
        retainLines: true
    }
},
//presets: ['@vue/app'] //@vue/cli-plugin-babel 3.x版本
presets: ['@vue/cli-plugin-babel/preset'] //@vue/cli-plugin-babel 4.x版本
};
