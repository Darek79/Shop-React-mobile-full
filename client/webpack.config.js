const path = require('path');
const { HotModuleReplacementPlugin } = require('webpack');
//const { CleanWebpackPlugin } = require('clean-webpack-plugin');
//const HtmlWebpackPlugin =require('html-webpack-plugin')
//const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        loader: 'file-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: (loader) => require('autoprefixer'),
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    hot: true,
    hotOnly: true,
    historyApiFallback: true,
    compress: true,
    port: 8080,
    proxy: {
      '/signin': {
        target: 'http://localhost:3000',
        secure: false,
        changeOrigin: true,
      },
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: { '^/api': '', secure: false },
        changeOrigin: true,
      },
      '/uploads': {
        target: 'http://localhost:3000',
        secure: false,
        changeOrigin: true,
      },
      '/newFall2020': {
        target: 'http://localhost:3000',
        secure: false,
        changeOrigin: true,
      },
      '/men': {
        target: 'http://localhost:3000',
        secure: false,
        changeOrigin: true,
      },
      '/women': {
        target: 'http://localhost:3000',
        secure: false,
        changeOrigin: true,
      },
      '/assets': {
        target: 'http://localhost:3000',
        secure: false,
        changeOrigin: true,
      },
    },
  },
  plugins: [new HotModuleReplacementPlugin()],
  watchOptions: { aggregateTimeout: 2500 },
  devtool: 'source-map',
};
