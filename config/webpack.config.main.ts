/**
 * 配置 electron main production webpack
 */

import path from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { merge } from 'webpack-merge';
import checkNodeEnv from '../scripts/check-node-env';
import deleteSourceMaps from '../scripts/delete-source-maps';
import baseConfig from './webpack.config.base';
import webpackPaths from './webpack.paths';

checkNodeEnv('production');
deleteSourceMaps();

const configuration: webpack.Configuration = {
    devtool: 'source-map',

    mode: 'production',

    target: 'electron-main',

    entry: {
        main: path.join(webpackPaths.srcMainPath, 'main.ts'),
        preload: path.join(webpackPaths.srcMainPath, 'preload.ts'),
    },

    output: {
        path: webpackPaths.distMainPath,
        filename: '[name].js',
    },

    optimization: {
        minimizer: [
            new TerserPlugin({
                parallel: true,
            }),
        ],
    },

    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode: process.env.ANALYZE === 'true' ? 'server' : 'disabled',
        }),

        new webpack.EnvironmentPlugin({
            NODE_ENV: 'production',
            DEBUG_PROD: false,
            START_MINIMIZED: false,
        }),
    ],
    node: {
        __dirname: false,
        __filename: false,
    },
};

export default merge(baseConfig, configuration);
