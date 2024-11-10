const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    index: "./src/js/index.js",
    styles: "./src/css/main.css"
  },
  output: {
    path: path.resolve(__dirname, './menu'),
    filename: '[name].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  }
}
