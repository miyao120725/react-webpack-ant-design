import axios from "axios"
const DEFAULT_TIMEOUT = 5000;

// axios.defaults.timeout = DEFAULT_TIMEOUT;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// axios.defaults.baseURL = '//hi3.mop.com/ajax/';

const url="//sandbox.mop.com/domain-cloud"

const axiosHttp={
    appHttp:data=>{
        return axios({
            url: url + '/novelSuspend/getNovelSuspendPage',
            method: 'post',
            params: data,
            contentType: false,
            processData: false
        })
    },
    homeHttp:data=>{
        return axios({
            url: '/api/mdi/index.html',
            method: 'get',
            params: data,
            contentType: false,
            processData: false
        })
    },
    listHttp:data=>{
        return axios({
            url: '/dev/wapmdi/data.html',
            method: 'get',
            params: data,
            contentType: false,
            processData: false
        })
    }
}
export default axiosHttp