import path from 'path';
import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { merge } from 'webpack-merge';
import checkNodeEnv from '../scripts/check-node-env';
import baseConfig from './webpack.config.base';
import webpackPaths from './webpack.paths';

if (process.env.NODE_ENV === 'production') {
    checkNodeEnv('development');
}

const configuration: webpack.Configuration = {
    devtool: 'inline-source-map',

    mode: 'development',

    target: 'electron-preload',

    entry: path.join(webpackPaths.srcMainPath, 'preload.ts'),

    output: {
        path: webpackPaths.dllPath,
        filename: 'preload.js',
    },

    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode: process.env.ANALYZE === 'true' ? 'server' : 'disabled',
        }),

        new webpack.EnvironmentPlugin({
            NODE_ENV: 'development',
        }),

        new webpack.LoaderOptionsPlugin({
            debug: true,
        }),
    ],

    node: {
        __dirname: false,
        __filename: false,
    },

    watch: true,
};

export default merge(baseConfig, configuration);
