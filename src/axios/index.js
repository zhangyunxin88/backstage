import axios from 'axios';
import qs from 'qs';
import store from '@/store';

axios.defaults.baseURL = 'http://127.0.0.1:8002';
axios.defaults.headers.common['Authorization'] = store.state.token;

axios.interceptors.request.use(config => {
    if(config.method == 'post'){
        if(!config.data){
            config.data = {};
        }
        config.data = qs.stringify(config.data);
    }
    return config;
}, function (err) {
    return Promise.reject(err);
})

export default axios
