const { merge } = require("webpack-merge");
const path = require("path");
const common = require("./common.js");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");

var filePath = {
  js: "js/[name].bundle.js",
  img: "images/[hash][ext]",
};

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",
  output: {
    filename: filePath.js,
    path: path.resolve(__dirname, "../dist/assets"),
    assetModuleFilename: filePath.img,
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(ttf|woff|eot|woff2|otf|webp)$/,
        type: "asset/resource",
        generator: {
          filename: "fonts/[hash][ext]",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, "../src/", "index.html"),
      filename: path.resolve(__dirname, "../dist/", "index.html"),
      inject: "body",
    }),
  ],
  optimization: {
    runtimeChunk: {
      name: "runtime",
    },
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        minimizerOptions: {
          level: {
            1: {
              roundingPrecision: "all=3,px=5",
            },
          },
        },
        minify: CssMinimizerPlugin.cleanCssMinify,
      }),
      new TerserPlugin(),
      /* new ImageMinimizerPlugin({
        minimizer: {
          filename: "optimized-[name][ext]",
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 7 }],
            ],
          },
        },
      }), */
    ],
  },
});
