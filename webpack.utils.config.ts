import { resolve } from "path";
import { DefinePlugin } from "webpack";

type ENV = {
  CLIENT_ID: string;
  COMMERCIAL_ALBUM: string;
  FASHION_ALBUM: string;
  WEDDINGS_ALBUM: string;
  REDESIGN_ALBUM: string;
};

module.exports = (env: ENV) => ({
  entry: {
    utils: "./utils/build.ts",
  },
  target: "node",
  output: {
    path: __dirname,
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new DefinePlugin({
      "process.env": {
        CLIENT_ID: JSON.stringify(env.CLIENT_ID),
        REDESIGN_ALBUM: JSON.stringify(env.REDESIGN_ALBUM),
        // COMMERCIAL_ALBUM: JSON.stringify(env.COMMERCIAL_ALBUM),
        // FASHION_ALBUM: JSON.stringify(env.FASHION_ALBUM),
        // WEDDINGS_ALBUM: JSON.stringify(env.WEDDINGS_ALBUM)
      },
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
});
