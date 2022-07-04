const webpack = require("webpack");
const path = require("path");

let config = {
  mode: "development",
  entry: ["./src/index.js", "./src/sass/bundle.scss"],
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "./bundle.js",
  },
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
    ],
  },
};

module.exports = config;
