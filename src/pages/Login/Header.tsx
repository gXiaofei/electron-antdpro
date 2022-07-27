import type { CSSProperties } from 'react';
import React from 'react';
import styles from './index.less';

export interface HeaderProps {
    logo?: string;
    title?: string;
    subTitle?: string;
    titleStyle?: CSSProperties;
}
const Header: React.FC<HeaderProps> = (props) => {
    const { logo, title, subTitle, titleStyle } = props;
    return (
        <div className={styles.header}>
            {title && (
                <div className={styles.title} style={titleStyle}>
                    {logo && <img src={logo} alt="logo" />}
                    <h1>{title}</h1>
                </div>
            )}
            {subTitle && <p>{subTitle}</p>}
        </div>
    );
};

export default Header;
