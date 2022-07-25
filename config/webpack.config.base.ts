/**
 * webpack基础配置
 */

import webpack from 'webpack';
import { dependencies as externals } from '../release/app/package.json';
import webpackPaths from './webpack.paths';

const configuration: webpack.Configuration = {
    externals: [...Object.keys(externals || {})],

    stats: 'errors-only',

    module: {
        rules: [
            {
                test: /\.[jt]s?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        // 删除此行以在WebPack构建中启用类型检查
                        transpileOnly: true,
                    },
                },
            },
        ],
    },

    output: {
        path: webpackPaths.srcPath,
        // https://github.com/webpack/webpack/issues/1114
        library: {
            type: 'commonjs2',
        },
    },

    resolve: {
        extensions: ['.js', '.ts', '.json'],
        modules: [webpackPaths.srcPath, 'node_modules'],
    },

    plugins: [
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'production',
        }),
    ],
};

export default configuration;
