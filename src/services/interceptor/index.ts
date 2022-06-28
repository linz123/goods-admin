import { notification } from "antd";

const requestInterceptor = (url: string, options: any) => {
    const user = localStorage.getItem("currentUser");
    const token = user ? JSON.parse(user).token : null;
    const headers = {
        "Content-Type": "application/json;charset=UTF-8",
        "Authorization": token
    }
    return { url, options: { ...options, headers } }
};

const responseInterceptor = async (response: any) => {
    try {
        const data = await response.clone().json()
        if (data.code !== 200) {
            notification.error({
                message: '请求错误',
                description: data.message
            })
        }
        return response
    } catch (error) { }

};

export default {
    errorHandler: (error: any) => {
        const { response } = error
        if (response && response.status) {
            const errorText = response.statusText || ''
            const { status, url } = response
            notification.error({
                message: `请求错误 ${status}: ${url}`,
                description: errorText
            })
        } else if (!response) {
            notification.error({
                description: '您的网络发生异常，无法连接服务器',
                message: '网络异常'
            })
        }
        return response
    },
    requestInterceptors: [requestInterceptor],
    responseInterceptors: [responseInterceptor],
};