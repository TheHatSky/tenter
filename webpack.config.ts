import path = require("path");

export default () => ({
  entry: "./js/application.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "application.js"
  },
  target: "node",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".scss", ".js"]
  },
  devtool : 'source-map',
  devServer: {
    publicPath: '/dist/',
    host: '192.168.1.41'
  }
});
