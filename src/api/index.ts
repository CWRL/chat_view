import {request} from '../request'
interface downloadfiles_type{
    file_name:string,
    file_type:string
}
export const downloadfiles=(data:downloadfiles_type)=>request({method:'post',url:'user/download_files',responseType:'blob',data})