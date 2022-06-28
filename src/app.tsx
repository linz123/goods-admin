import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import type { RequestConfig, RunTimeLayoutConfig } from 'umi';
import { history } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import defaultSettings from '../config/defaultSettings';
import Interceptor from '@/services/interceptor'
const loginPath = '/user/login';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
    loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
    settings?: Partial<LayoutSettings>;
    currentUser?: API.CurrentUser | null;
    loading?: boolean;
}> {
    const user = localStorage.getItem('currentUser');
    return {
        currentUser: user ? JSON.parse(user) : null,
        settings: defaultSettings,
    };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, refresh, setInitialState }) => {
    return {
        rightContentRender: () => <RightContent />,
        disableContentMargin: false,
        // 水印
        waterMarkProps: {
            content: initialState?.currentUser?.username,
        },
        footerRender: () => <Footer />,
        onPageChange: () => {
            // refresh => 重新执行 getInitialState 方法
            localStorage.getItem('currentUser') && !initialState?.currentUser && refresh()
            // 如果没有登录，重定向到 login
            const { location } = history;
            if (!localStorage.getItem('currentUser') && location.pathname !== loginPath) {
                history.push(loginPath);
            }
        },
        menuHeaderRender: undefined,
        // 自定义 403 页面
        // unAccessible: <div>unAccessible</div>,
        // 增加一个 loading 的状态
        childrenRender: (children, props) => {
            if (initialState?.loading) return <PageLoading />;
            return (
                <>
                    {children}
                </>
            );
        },
        ...initialState?.settings,
    };
};

// request 全局拦截器
export const request: RequestConfig = Interceptor;
