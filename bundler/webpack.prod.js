const path = require('path')
const { merge } = require('webpack-merge')
const commonConfiguration = require('./webpack.common.js')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = merge(
    commonConfiguration,
    {
        mode: 'production',
        output: {
            path: path.resolve(__dirname, '../docs'), 
            filename: '[name].[contenthash].js',
        },
        plugins:
        [
            new CleanWebpackPlugin()
        ]
    }
)