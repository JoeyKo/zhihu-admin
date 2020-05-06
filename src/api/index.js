import axios from 'axios';

import { BASEURL } from './config'

const request = axios.create({
    baseURL: BASEURL,
    withCredentials: true,  
    timeout: 5000,
})

request.interceptors.request.use(
    config => {
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
            return Promise.reject(response)
        }
    },
    error => {
        if(error.response && error.response.status) {
            switch (error.response.status) {
                case 401:
                    break
                case 403:
                    break
                case 404:
                    break
                case 500:
                    break
                default:
                    console.log('其他错误信息')
            }
        }
        return Promise.reject(error)
    }
)

export default request