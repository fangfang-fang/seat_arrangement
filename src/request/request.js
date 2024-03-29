import axios from 'axios'

const request = axios.create({
    // baseURL: 'http://localhost:9090',
    // baseURL: 'http://61.164.81.125:9090',
    timeout: 10000

})

// request 拦截器
request.interceptors.request.use(config => {

    config.headers['Content-Type'] = 'application/json;charset=utf-8';
    config.headers['token'] = localStorage.getItem("token");  // 设置请求头

    return config
}, error => {
    return Promise.reject(error)
});

// response 拦截器
request.interceptors.response.use(
    response => {
        let res = response.data;
        // 如果是返回的文件
        if (response.config.responseType === 'blob') {
            return res
        }
        // 兼容服务端返回的字符串数据
        if (typeof res === 'string') {
            res = res ? JSON.parse(res) : res
        }
        return res;
    },
    error => {
        return Promise.reject(error)
    }
)

export default request

