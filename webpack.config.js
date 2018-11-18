const path = require('path');
const webpack = require("webpack");

module.exports = env => ({
    entry: {
        application: './js/application.ts',
        utils: "./utils/build.ts"
    },
    target: 'node',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules/,
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'CLIENT_ID': JSON.stringify(env.CLIENT_ID),
                'COMMERCIAL_ALBUM': JSON.stringify(env.COMMERCIAL_ALBUM),
                'FASHION_ALBUM': JSON.stringify(env.FASHION_ALBUM),
                'WEDDINGS_ALBUM': JSON.stringify(env.WEDDINGS_ALBUM),
            }
        })
    ],
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    }
});