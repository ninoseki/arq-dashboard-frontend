const { defineConfig } = require("@vue/cli-service");

const target = process.env.BACKEND_URL || "http://localhost:8000/";

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/api/*": {
        target,
      },
    },
  },
});
