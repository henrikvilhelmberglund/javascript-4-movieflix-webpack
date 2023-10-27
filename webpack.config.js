const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/app/index.js",
  entry: {
    index: path.resolve(__dirname, "./src/app/index.js"),
    details: path.resolve(__dirname, "./src/app/movie-detail.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name]-[contenthash].js",
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    // open: true,
    watchFiles: { paths: ["src/**/*"], options: { usePolling: false } },
    hot: true,
    liveReload: true,
    port: 3000,
    compress: true,
    historyApiFallback: {
      index: "/movies.html",
    },
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "movies.html",
      template: "./src/app/movies.html",
      inject: true,
      chunks: ["index"],
    }),
    new HtmlWebpackPlugin({
      filename: "movie-details.html",
      template: "./src/app/movie-details.html",
      inject: true,
      chunks: ["details"],
    }),
  ],
};
