const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: path.resolve(__dirname, './index.tsx'),
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: false,
                            configFile: path.resolve(__dirname, './tsconfig.json'),
                        },
                    },
                ],
            },
        ],
    },
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, '../build/sample'),
        filename: '[name].js',
    },
    devServer: {
        port: 3001,
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        modules: [path.resolve(__dirname, './'), path.resolve(__dirname, '../lib'), path.resolve(__dirname, '../node_modules')],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, './index.html'),
        }),
    ],
};
