import logo from '@/assets/icon.png';
import { login } from '@/services/ant-design-pro/api';
import { ProFormCaptcha, ProFormText } from '@ant-design/pro-components';
import { history, useModel } from '@umijs/max';
import { Alert, Button, Form, message } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import type { HeaderProps } from './Header';
import HeaderContent from './Header';
import styles from './index.less';
type StatusType = 'success' | 'info' | 'warning' | 'error' | undefined;
type ContentType = string | undefined;

type LoginMessageType = {
    content?: ContentType;
    status?: StatusType;
};

type FormType = 'login' | 'forgetPassword' | 'resetPassword';

const LoginMessage: React.FC<{
    status: StatusType;
    content: ContentType;
}> = ({ status, content }) => {
    return (
        <Alert
            style={{
                marginBottom: 24,
            }}
            message={content}
            type={status}
            showIcon
        />
    );
};

const loginProps: HeaderProps = {
    logo,
    title: '投行承做助手',
    titleStyle: { justifyContent: 'center' },
};

const forgetPasswordProps: HeaderProps = {
    title: '找回密码',
    subTitle: '验证码将会发送至你的手机',
};

const resetPassword: HeaderProps = {
    title: '设置新密码',
    subTitle: '密码为8-16位，区分大小写',
};

const Login: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [loginMessage, setLoginState] = useState<LoginMessageType>({});
    const [type, setType] = useState<FormType>('login');
    const [headerProps, setHeaderProps] = useState<HeaderProps>(loginProps);
    const [form] = Form.useForm();
    const { initialState, setInitialState } = useModel('@@initialState');

    useEffect(() => {
        switch (type) {
            case 'login':
                setHeaderProps(loginProps);
                break;
            case 'forgetPassword':
                setHeaderProps(forgetPasswordProps);
                break;
            case 'resetPassword':
                setHeaderProps(resetPassword);
                break;
        }

        setLoginState({});
        // 重置输入信息
        form.resetFields();
    }, [type, form]);

    // 按钮文字
    const submitText: () => string = useCallback(() => {
        switch (type) {
            case 'login':
                return '登录';
            case 'forgetPassword':
                return '下一步';
            case 'resetPassword':
                return '重置密码';
            default:
                return '';
        }
    }, [type]);

    const rightBtnClick = useCallback(() => {
        if (type === 'login') {
            setType('forgetPassword');
        } else {
            // 联系管理员
        }
    }, [type]);

    const fetchUserInfo = async () => {
        const userInfo = await initialState?.fetchUserInfo?.();

        if (userInfo) {
            await setInitialState((s) => ({ ...s, currentUser: userInfo }));
        }
    };

    const handleSubmit = async (values: API.LoginParams) => {
        console.log(values);
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { username, password, mobile, captcha, newPassword, repeatPassword } = values;

        setLoginState({});
        setLoading(true);

        switch (type) {
            case 'login':
                try {
                    // 登录
                    const msg = await login({ ...values, type });

                    if (msg.status === 'ok') {
                        message.success('登录成功！');
                        await fetchUserInfo();
                        window?.electron?.ipcRenderer?.sendMessage('login', [false]);
                        const urlParams = new URL(window.location.href).searchParams;
                        history.push(urlParams.get('redirect') || '/');
                        setLoading(false);
                        return;
                    }
                    setLoginState({
                        status: 'error',
                        content: '账号或者密码错误',
                    });
                    console.log(msg); // 如果失败去设置用户错误信息
                } catch (error) {
                    const defaultLoginFailureMessage = '登录失败，请重试！';
                    console.log(error);
                    message.error(defaultLoginFailureMessage);
                }
                setLoading(false);
                break;
            case 'forgetPassword':
                setType('resetPassword');
                console.log(mobile, captcha);
                break;
            case 'resetPassword':
                console.log(newPassword, repeatPassword);
                break;
        }
    };

    const { status, content } = loginMessage;

    return (
        <div className={styles.container}>
            {/* <div className={styles.drag} /> */}
            <div className={styles.loginBox}>
                <HeaderContent {...headerProps} />
                <Form
                    form={form}
                    onFinish={async (values) => {
                        await handleSubmit(values as API.LoginParams);
                    }}
                >
                    {status && <LoginMessage status={status} content={content} />}
                    {type === 'login' && (
                        <>
                            <ProFormText
                                name="username"
                                fieldProps={{
                                    size: 'large',
                                }}
                                placeholder="请输入账号或手机号: admin"
                                rules={[
                                    {
                                        required: true,
                                        message: '账号或手机号不能为空',
                                    },
                                ]}
                            />
                            <ProFormText.Password
                                name="password"
                                fieldProps={{
                                    size: 'large',
                                }}
                                placeholder="请输入登录密码: password"
                                rules={[
                                    {
                                        required: true,
                                        message: '登录密码不能为空',
                                    },
                                ]}
                            />
                        </>
                    )}
                    {type === 'forgetPassword' && (
                        <>
                            <ProFormText
                                fieldProps={{
                                    size: 'large',
                                }}
                                name="mobile"
                                placeholder="请输入手机号"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入手机号！',
                                    },
                                    {
                                        pattern: /^1\d{10}$/,
                                        message: '手机号格式错误！',
                                    },
                                ]}
                            />
                            <ProFormCaptcha
                                fieldProps={{
                                    size: 'large',
                                }}
                                phoneName="mobile"
                                captchaProps={{
                                    size: 'large',
                                }}
                                placeholder="请输入验证码"
                                captchaTextRender={(timing, count) => {
                                    if (timing) {
                                        return `${count} 获取验证码`;
                                    }
                                    return '获取验证码';
                                }}
                                name="captcha"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入验证码！',
                                    },
                                ]}
                                onGetCaptcha={async (phone) => {
                                    console.log(phone);
                                    // const result = await getFakeCaptcha({
                                    //     phone,
                                    // });
                                    // if (result === false) {
                                    //     return;
                                    // }
                                    setLoginState({
                                        status: 'success',
                                        content: '验证码已发送',
                                    });
                                    message.success('获取验证码成功！验证码为：1234');
                                }}
                            />
                        </>
                    )}
                    {type === 'resetPassword' && (
                        <>
                            <ProFormText.Password
                                name="newPassword"
                                fieldProps={{
                                    size: 'large',
                                }}
                                placeholder="新密码"
                                rules={[
                                    {
                                        required: true,
                                        message: '密码不能为空',
                                    },
                                ]}
                            />
                            <ProFormText.Password
                                name="repeatPassword"
                                fieldProps={{
                                    size: 'large',
                                }}
                                placeholder="再次输入新密码"
                                rules={[
                                    {
                                        required: true,
                                        message: '密码不能为空',
                                    },
                                ]}
                            />
                        </>
                    )}
                    <Button
                        loading={loading}
                        size="large"
                        type="primary"
                        htmlType="submit"
                        style={{ width: '100%' }}
                    >
                        {submitText()}
                    </Button>
                </Form>
                <div className={styles.formFooter}>
                    {type === 'login' ? (
                        <a>oa登录</a>
                    ) : (
                        <a onClick={() => setType('login')}>去登陆</a>
                    )}
                    <a
                        style={{
                            float: 'right',
                        }}
                        onClick={rightBtnClick}
                    >
                        {type === 'login' ? '忘记密码' : '联系管理员'}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Login;
