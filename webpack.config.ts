import { resolve } from "path";

export default () => ({
  entry: "./js/application.ts",
  output: {
    path: resolve(__dirname, "public"),
    filename: "application.js",
  },
  target: "web",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".scss", ".js"],
  },
  devtool: "source-map",
  devServer: {
    publicPath: "/dist/",
    host: "192.168.1.48",
  },
});
