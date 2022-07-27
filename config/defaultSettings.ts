import { Settings as LayoutSettings } from '@ant-design/pro-components';

const Settings: LayoutSettings & {
    pwa?: boolean;
    logo?: string;
    headerHeight?: number;
} = {
    navTheme: 'light',
    primaryColor: '#C50808',
    layout: 'mix',
    contentWidth: 'Fluid',
    fixedHeader: true,
    fixSiderbar: true,
    colorWeak: false,
    headerHeight: 56,
    title: '投行承做助手',
    pwa: false,
    iconfontUrl: '',
};

export default Settings;
