const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');
const MODE = process.env.MODE;

const config = {
    entry: {
        client: [
            './src/style.scss',
            './src/index.js'
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js',
    },
    devServer: {
        contentBase: './',
        publicPath: path.resolve(__dirname, 'dist'),
        compress: true,
        port: 8080
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: 'style.css' }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, 'src')
                ],
                loader: 'babel-loader'
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                loader: 'file-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'css-loader',
                        options: { minimize: true }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: { minimize: true }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: 'inline',
                            plugins: () => [
                                autoprefixer({ browsers: ['last 3 versions'] }),
                            ]
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            includePaths: [ path.resolve(__dirname, "node_modules") ]
                        }
                    }
                ],
                include: [__dirname + '/src/']
            }
        ]
    },
    resolve: {
        modules: [
            'node_modules',
            path.resolve(__dirname, 'src')
        ]
    },
    target: 'web'
};

module.exports = config;
