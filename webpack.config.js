const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");

var config = Object.assign({}, config, {
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader"
          }
        ]
      },
      {
        test: /\.(woff2?|jpe?g|png|gif|ico|svg)$/,
        use: "file-loader?name=./images/[name].[ext]"
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
    modules: ["node_modules", "src"],
    alias: {
      "_variables.sass": path.resolve(__dirname, "./src/styles/_variables.sass")
    }
  },
  output: {
    path: __dirname + "/dist",
    publicPath: "/",
    filename: "bundle.js"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CopyPlugin([
      {
        from: path.resolve(__dirname, "./src/styles/_style.css"),
        to: path.resolve(__dirname, "./dist/_style.css")
      }
    ])
  ],
  devServer: {
    contentBase: "./dist",
    hot: true,
    port: 3001
  }
});

module.exports = config;
