const path = require('path');

module.exports = {
  entry: './src/shared/browser.ts',
  mode: 'development',

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'shared-bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
