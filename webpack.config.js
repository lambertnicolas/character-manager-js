const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let config = {
  mode: "development",
  entry: ["./src/index.js", "./src/sass/bundle.scss"],
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "./bundle.js",
  },
  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "css/bundle.css",
            },
          },
          // Compile le Sass en CSS
          "sass-loader",
        ],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
};

module.exports = config;
