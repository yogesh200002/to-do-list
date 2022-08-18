const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.ttf$/i,
        type: 'asset/resource',
        dependency: { not: ['url'] },
      },
      {
        test: /\.svg$/i,
        use: [
          {
            loader: 'svg-inline-loader'
          }
        ],
      },
      {
        test: /\.jpg$/i,
        type: 'asset/resource'
      },
      {
        test: /\.png$/i,
        loader: 'url-loader'
      },
    ],
  },
};