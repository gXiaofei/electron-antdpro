import HeaderTitleRender from '@/components/HeaderTitleRender';
import IconFont from '@/components/IconFont';
import RightContent from '@/components/RightContent';
import { SettingOutlined } from '@ant-design/icons';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { history, Link } from '@umijs/max';
import defaultSettings from '../config/defaultSettings';
import ChildrenRender from './pages/ChildrenRender';
import Loading from './pages/loading';
import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/login';
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
        <Link key="setting" to="/transmissionList">
            <IconFont style={{ fontSize: '16px' }} type="icon-chuanshuliebiao" />
            <span>传输列表</span>
        </Link>,
        <Link key="setting" to="/setting">
            <SettingOutlined />
            <span>系统设置</span>
        </Link>,
    ];

    return {
        siderWidth: 200,
        contentStyle: { margin: '15px' },
        menu: {
            autoClose: false,
        },
        breadcrumbRender: false,
        headerTitleRender: () => <HeaderTitleRender />,
        rightContentRender: () => <RightContent />,
        pageTitleRender: false,
        // footerRender: () => <Footer />,
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

        childrenRender: (children, props) => {
            // 增加一个 loading 的状态
            if (initialState?.loading) return <Loading />;
            return <ChildrenRender {...props}>{children}</ChildrenRender>;
            // 修改主题
            // ConfigProvider.config({
            //     theme: {
            //         primaryColor: '#000',
            //     },
            // });
            return (
                // <ConfigProvider>
                <>
                    {children}
                    {/* {!props.location?.pathname?.includes('/login') && (
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
                    )} */}
                </>
                // </ConfigProvider>
            );
        },
        ...initialState?.settings,
    };
};

// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function onRouteChange({ location, clientRoutes, routes, action }) {
    const { pathname } = location;
    if (pathname === '/login') {
        window?.electron?.ipcRenderer?.sendMessage('login', [true]);
    } else {
        if (afterRoute === '/login' || afterRoute === '') {
            window?.electron?.ipcRenderer?.sendMessage('login', [false]);
        }
    }
    afterRoute = pathname;
}
