import { DefaultFooter } from '@ant-design/pro-components';
import '@umijs/max';

const Footer: React.FC = () => {
    const defaultMessage = '投行承做助手';
    const currentYear = '2022';
    return (
        <DefaultFooter
            style={{
                background: 'none',
            }}
            copyright={`${currentYear} ${defaultMessage}`}
        />
    );
};

export default Footer;
