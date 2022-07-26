import logo from '@/assets/logoTitle.png';
import Footer from '@/components/Footer';
import IconFont from '@/components/IconFont';
import RightContent from '@/components/RightContent';
import { LinkOutlined, SettingOutlined } from '@ant-design/icons';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { SettingDrawer } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { history, Link } from '@umijs/max';
import { ConfigProvider } from 'antd';
import defaultSettings from '../config/defaultSettings';
import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';
let afterRoute = '';

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
    settings?: Partial<LayoutSettings>;
    currentUser?: API.CurrentUser;
    loading?: boolean;
    fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
    const fetchUserInfo = async () => {
        try {
            const msg = await queryCurrentUser();
            return msg.data;
        } catch (error) {
            history.push(loginPath);
        }
        return undefined;
    };
    // 如果不是登录页面，执行
    if (history.location.pathname !== loginPath) {
        const currentUser = await fetchUserInfo();
        return {
            fetchUserInfo,
            currentUser,
            settings: defaultSettings,
        };
    }
    return {
        fetchUserInfo,
        settings: defaultSettings,
    };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
    const links = [
        <Link key="setting" to="/setting">
            <IconFont style={{ fontSize: '16px' }} type="icon-chuanshuliebiao" />
            <span>传输列表</span>
        </Link>,
        <Link key="setting" to="/setting">
            <SettingOutlined />
            <span>系统设置</span>
        </Link>,
    ];

    if (isDev) {
        links.push(
            <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
                <LinkOutlined />
                <span>OpenAPI 文档</span>
            </Link>,
        );
    }

    return {
        logo,
        rightContentRender: () => <RightContent />,
        disableContentMargin: false,
        waterMarkProps: {
            content: initialState?.currentUser?.name,
        },
        pageTitleRender: false,
        footerRender: () => <Footer />,
        onPageChange: () => {
            const { location } = history;
            console.log(history);
            // 如果没有登录，重定向到 login
            if (!initialState?.currentUser && location.pathname !== loginPath) {
                history.push(loginPath);
            }
        },
        iconfontUrl: require('@/assets/iconfont.js'),
        links,
        menuHeaderRender: undefined,
        // 自定义 403 页面
        // unAccessible: <div>unAccessible</div>,
        // 增加一个 loading 的状态
        childrenRender: (children, props) => {
            // if (initialState?.loading) return <Loading />;
            // 修改主题
            // ConfigProvider.config({
            //     theme: {
            //         primaryColor: '#000',
            //     },
            // });
            return (
                <ConfigProvider>
                    {children}
                    {!props.location?.pathname?.includes('/login') && (
                        <SettingDrawer
                            disableUrlParams
                            enableDarkTheme
                            settings={initialState?.settings}
                            onSettingChange={(settings) => {
                                setInitialState((preInitialState) => ({
                                    ...preInitialState,
                                    settings,
                                }));
                            }}
                        />
                    )}
                </ConfigProvider>
            );
        },
        ...initialState?.settings,
    };
};

// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function onRouteChange({ location, clientRoutes, routes, action }) {
    const { pathname } = location;
    if (pathname === '/user/login') {
        window?.electron?.ipcRenderer?.sendMessage('login', [true]);
    } else {
        if (afterRoute === '/user/login') {
            window?.electron?.ipcRenderer?.sendMessage('login', [false]);
        }
    }
    afterRoute = pathname;
}
