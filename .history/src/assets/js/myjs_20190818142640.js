import axios from 'axios'

let server = axios.create({
  baseURL: '',
})

server.interceptors.request.use(config => {

})

server.interceptors.response.use(res => {

})

export default 