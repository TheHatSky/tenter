const path = require('path');

module.exports = {
    entry: './js/application.ts',
    output: {
        path: path.resolve(__dirname, 'js'),
        filename: 'application.js'
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules/,
        }, ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    }
};