import axios from 'axios'
const request= axios.create({
    baseURL:'http://192.168.10.2:5566/',
})
let controllers:any
request.interceptors.request.use((config)=>{
    const controller=new AbortController()
    config.signal=controller.signal
    controllers=controller
    return config
})
export {request,controllers}