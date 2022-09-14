const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var cssPath = "css/main.css";

module.exports = {
  entry: {
    index: "./src/index.js",
  },
  module: {
    rules: [
      {
        test: /\.js$|jsx/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[hash:base64:5]",
                exportLocalsConvention: "dashes",
              },
            },
          },
          "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: "asset",
        generator: {
          filename: "images/[hash][ext]",
        },
      },
      {
        test: /\.svg$/i,
        type: "asset/inline",
      },
      {
        test: /\.(mp3|wav)$/i,
        type: "asset/resource",
        generator: {
          filename: "audio/[hash][ext]",
        },
      },
    ],
  },
  resolve: {
    fallback: {
      path: false,
      os: false,
      util: false,
      assert: false,
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: cssPath,
      linkType: "text/css",
    }),
  ],
};
