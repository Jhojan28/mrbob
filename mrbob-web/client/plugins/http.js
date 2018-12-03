import axios from 'axios'
const http = {}
http.install = function (Vue) {
	Vue.prototype.$http = axios.create({
        baseUrl: 'http://localhost:8080'
    })
}

export default http