import axios, { AxiosRequestConfig } from 'axios';
import { ApiResponse } from '@/core/entities';

// export interface AxiosResponse<T = any>  {
//   data: T;
//   status: number;
//   statusText: string;
//   headers: any;
//   config: AxiosRequestConfig;
//   request?: any;
// }

/**
 * axios拦截器
 */
axios.interceptors.request.use(config => {
  config.url = `/api/${config.url}`;
  return config;
});

/**
 * axios自定义封装
 */
const http = {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return new Promise((resolve, reject) => {
      axios
        .get(url, config)
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            resolve({
              data: res.data.data,
              success: true,
              msg: res.statusText
            });
          } else {
            reject(res);
          }
        })
        .catch(error => reject(error));
    });
  }
};

export default http;
