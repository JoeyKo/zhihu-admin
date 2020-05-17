import axios from 'axios';
import { message, notification } from 'antd'

import { BASEURL } from './config'

const request = axios.create({
    baseURL: BASEURL, 
    timeout: 5000,
})

request.interceptors.request.use(
    config => {
        config.headers.Authorization = localStorage.getItem('token')
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

request.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return Promise.resolve(response.data)
        } else {
            return Promise.reject(response.data)
        }
    },
    error => {
        if(error.response && error.response.status) {
            switch (error.response.status) {
                case 401:
                    message.warning('请登录！')
                    break
                case 403:
                    break
                case 404:
                    notification['error']({
                        message: error.response.data.error.title,
                        description: error.response.data.error.message,
                    });
                    break
                case 500:
                    notification['error']({
                        message: error.response.data.error.title,
                        description: error.response.data.error.message,
                    });
                    break
                default:
                    message.error('其他错误信息')
            }
        }
        return Promise.reject(error.response)
    }
)

export default request