// https://umijs.org/config/
import { defineConfig } from '@umijs/max';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';
import theme from './theme';
const { REACT_APP_ENV, NODE_ENV } = process.env;
const isProd = NODE_ENV === 'production';

export default defineConfig({
    hash: true,
    history: {
        type: 'hash',
    },
    publicPath: isProd ? './' : '/',
    outputPath: './release/app/dist/renderer',
    antd: {},
    request: {},
    initialState: {},
    model: {},
    layout: {
        // https://umijs.org/zh-CN/plugins/plugin-layout
        ...defaultSettings,
    },
    targets: {
        ie: 11,
    },
    // umi routes: https://umijs.org/docs/routing
    routes,
    access: {},
    // Theme for antd: https://ant.design/docs/react/customize-theme-cn
    theme: {
        // 如果不想要 configProvide 动态设置主题需要把这个设置为 default
        // 只有设置为 variable， 才能使用 configProvide 动态设置主色调
        // https://ant.design/docs/react/customize-theme-variable-cn
        'root-entry-name': 'default',
        ...theme,
    },
    ignoreMomentLocale: true,
    proxy: proxy[REACT_APP_ENV || 'dev'],
    manifest: {
        basePath: '/',
    },
    // Fast Refresh 热更新
    fastRefresh: true,
    presets: ['umi-presets-pro'],
});
