import Vue from 'vue'
import axios from 'axios'
axios.defaults.baseURL = "https://open.duyiedu.com";
axios.interceptors.request.use(function (config) {
    // console.log(config)
    config.params={
        ...config.params,
        appkey: "gs511__1570201022235"
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

export default axios;





