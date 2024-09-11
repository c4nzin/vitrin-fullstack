const { defineConfig } = require('@vue/cli-service');
const config = require('./src/config');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: config.PORT,
    proxy: 'http://localhost:3000',
  },
});
