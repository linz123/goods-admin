import {
    LockOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Alert, message } from 'antd';
import React, { useState } from 'react';
import { ProFormText, LoginForm } from '@ant-design/pro-form';
import { useIntl, history, FormattedMessage, SelectLang } from 'umi';
import Footer from '@/components/Footer';
import { login } from '@/services/api/index';

import styles from './index.less';

const LoginMessage: React.FC<{
    content: string;
}> = ({ content }) => (
    <Alert
        style={{
            marginBottom: 24,
        }}
        message={content}
        type="error"
        showIcon
    />
);

const Login: React.FC = () => {
    const [showError, setShowError] = useState<boolean>(false);
    const intl = useIntl();

    const handleSubmit = async (values: API.LoginParams) => {
        try {
            // 登录
            const res = await login({ ...values });
            if (res.code === 200) {
                message.success(intl.formatMessage({
                    id: 'pages.login.success',
                    defaultMessage: '登录成功！',
                }));
                localStorage.setItem('currentUser', JSON.stringify({
                    username: values.username,
                    token: res.data.token
                }))
                /** 此方法会跳转到 redirect 参数所在的位置 */
                if (!history) return;
                const { query } = history.location;
                const { redirect } = query as { redirect: string };
                setTimeout(() => {
                    history.push(redirect || '/');
                })
                return;
            }
            console.log(res);
            // 如果失败去设置用户错误信息
            setShowError(true);
        } catch (error) {
            const defaultLoginFailureMessage = intl.formatMessage({
                id: 'pages.login.failure',
                defaultMessage: '登录失败，请重试！',
            });
            message.error(defaultLoginFailureMessage);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.lang} data-lang>
                {SelectLang && <SelectLang />}
            </div>
            <div className={styles.content}>
                <LoginForm
                    logo={<img alt="logo" src="/logo.svg" />}
                    title="Ant Design"
                    subTitle={intl.formatMessage({ id: 'pages.layouts.userLayout.title' })}
                    initialValues={{
                        autoLogin: true,
                    }}
                    onFinish={async (values) => {
                        await handleSubmit(values as API.LoginParams);
                    }}
                >
                    {showError && (
                        <LoginMessage
                            content={intl.formatMessage({
                                id: 'pages.login.accountLogin.errorMessage',
                                defaultMessage: '账户或密码错误',
                            })}
                        />
                    )}
                    <ProFormText
                        name="username"
                        fieldProps={{
                            size: 'large',
                            prefix: <UserOutlined className={styles.prefixIcon} />,
                        }}
                        placeholder={intl.formatMessage({
                            id: 'pages.login.username.placeholder',
                            defaultMessage: '用户名',
                        })}
                        rules={[
                            {
                                required: true,
                                message: (
                                    <FormattedMessage
                                        id="pages.login.username.required"
                                        defaultMessage="请输入用户名!"
                                    />
                                ),
                            },
                        ]}
                    />
                    <ProFormText.Password
                        name="password"
                        fieldProps={{
                            size: 'large',
                            prefix: <LockOutlined className={styles.prefixIcon} />,
                        }}
                        placeholder={intl.formatMessage({
                            id: 'pages.login.password.placeholder',
                            defaultMessage: '密码',
                        })}
                        rules={[
                            {
                                required: true,
                                message: (
                                    <FormattedMessage
                                        id="pages.login.password.required"
                                        defaultMessage="请输入密码！"
                                    />
                                ),
                            },
                        ]}
                    />
                </LoginForm>
            </div>
            <Footer />
        </div>
    );
};

export default Login;
