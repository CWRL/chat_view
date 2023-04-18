import axios from 'axios'
const request= axios.create({
    baseURL:'http://192.168.10.2:5566/'
})
export {request}