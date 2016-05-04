"use strict";

var path = require("path");
var production = process.env.NODE_ENV === "production";
var webpack = require("webpack");

module.exports = {
  entry: path.join(__dirname, "/app/index.js"),
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["es2015"]
        }
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: "html-loader"
      }
    ]
  },
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "/public")
  },
  plugins: production ? [
    new webpack.DefinePlugin({
      "process.env": {
         NODE_ENV: JSON.stringify("production")
       }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } })
  ] : []
};
