const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build')
};

const common = {
    entry: {
        app: PATHS.app
    },
    output: {
        path: PATHS.build,
        filename: 'bundle.js'
    }
};

if(TARGET === 'build'){
    module.exports = merge(common, {});
}
if(TARGET === 'start' || !TARGET){
    // start or default
    module.exports = merge(common, {
        devServer: {
            contentBase: PATHS.build,
            historyApiFallback: true,
            hot: true,
            inline: true,
            progress: true,
            stats: 'errors-only',
            host: process.env.HOST,
            port: process.env.PORT
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ]
    });
}