import logoTitle from '@/assets/logoTitle.png';
import styles from './index.less';
export default () => {
    return (
        <div className={styles.container}>
            <img alt="head-logo" src={logoTitle} />
        </div>
    );
};
