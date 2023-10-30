const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "production",
  entry: {
    index: path.resolve(__dirname, "./src/app/index.ts"),
    details: path.resolve(__dirname, "./src/app/movie-detail.ts"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name]-[contenthash].js",
    clean: true,
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
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        // test: /\.scss$/,
        test: /.s?css$/,
        // test: /.(scss|css)$/,
        use: [
          // ? for production
          // MiniCssExtractPlugin.loader,
          // ? for dev
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name]-[contenthash].css",
    }),
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
