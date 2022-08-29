const { merge } = require("webpack-merge");
const path = require("path");
const common = require("./common.js");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    static: path.resolve(__dirname, "../dist"),
    compress: true,
    port: 80,
    open: true,
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, "../src/", "index.html"),
      filename: "index.html",
      inject: "body",
    }),
  ],
  target: "web",
});
