const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
       clean: true,
       path: path.resolve(__dirname, "dist"),
       filename: "bundle.js",  
       publicPath: "./",
    },
    resolve: {
        extensions: [".js", ".jsx"],
        alias: {
          "components": path.resolve(__dirname, "src/components/"),
          "@styles": path.resolve(__dirname, "src/styles/")
        }
    },
    mode: "production",
    module: {
        rules: [
          {
            test: /\.(js|jsx)$/, 
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
            }
          },
          {
            test: /\.html$/,
            use:  [
               { loader: "html-loader" }
            ] 
          },
          {
            test: /\.(css|scss)$/,
            use: [
              "style-loader",
              "css-loader",
              "sass-loader"
            ]
          }
        ]
    },
    plugins: [
      new HtmlWebpackPlugin({
          template: "./public/index.html",
          filename: "./index.html"
      }),
      new MiniCssExtractPlugin({
        filename: "[name].css"
      })
    ],
    optimization: {
      minimize: true,
      minimizer: [
        new CssMinimizerPlugin(),
        new TerserPlugin(),
      ]
    }
  }