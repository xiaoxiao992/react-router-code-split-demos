import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import queryString from 'query-string';
import { notification } from 'antd';
import users, { userList } from '../mock/users';





// 统一拦截请求错误
function checkStatus(response) {

  // console.log('checkStatus', response)
  // return response;

  if (response.status >= 200 && response.status < 300) {
    // 处理 code 不等于 0 的情况
    if (response.data.code !== undefined && response.data.code !== 0) {

      notification.error({
        message: `错误 code : ${response.data.code} - ${response.data.message}`,
        description: `${response.config.url}`,
      });

      const error = new Error(`code:${response.data.code} message: ${response.data.message}`);
      error.response = response.data;
      throw error;
    }

    return response;
  }

  notification.error({
    message: `请求错误 ${response.status}: ${response.config.url}`,
    description: response.statusText,
  });
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

// import MockAdapter from 'axios-mock-adapter';
const axiosInstance = axios.create({
  // baseURL: `${__API_BASE_URL__}`,
  // timeout: 1000,
  // headers: { 'X-Custom-Header': 'foobar' }
});

const api = (url, newOptions) => {

  let _axios = null;

  if (typeof url === 'object')
    _axios = axiosInstance({ ...url });
  else
    _axios = axiosInstance({ url, ...newOptions });

  _axios = _axios
    .then(checkStatus)
    .then(resp => resp)
    .catch(error => {
      console.log(error);
      // throw error;
    });

  return _axios;

}

api.get = (url, newOptions) => api(url, { ...newOptions, method: 'get' });
api.post = (url, newOptions) => api(url, { ...newOptions, method: 'post' });

// mock 数据,设置2秒钟延迟
const mock = new MockAdapter(axiosInstance, { delayResponse: 1000 });

mock.onGet('/api/users').reply(config => {
  return [200, { code: 0, userList, 'message': '删除失败' }];
  return [200, { code: -1, users, 'message': '删除失败' }];
  return [200, { code: 0, users }];
  return [500, { message: "Incorrect user or password" }];

  // if (postData.user === 'admin' && postData.password === '123456') {
  //   return [200, require('./mock/user')];
  // } else {
  //   return [500, { message: "Incorrect user or password" }];
  // }
});

mock.onPost('/api/users/delete').reply(config => {
  // return [200, { code: -1, users, 'message': '删除失败' }];
  return [200, { code: 0, message: '' }];
  return [500, { message: "Incorrect user or password" }];

  // if (postData.user === 'admin' && postData.password === '123456') {
  //   return [200, require('./mock/user')];
  // } else {
  //   return [500, { message: "Incorrect user or password" }];
  // }
});
mock.onGet('/api/appinfo').reply(config => {
  return [200, { code: 0, data: { name: "myApp", title: '我的APP' } }];
})

export default api;