import {request} from '../request'
interface downloadfiles_type{
    file_hash:string,
    file_name:string,
    file_path:string,
    file_type:string
}
type upload_event_type=(progressEvent:any)=>void
export const downloadfiles=(data:downloadfiles_type,upload_event:upload_event_type)=>request({method:'post',url:'user/download_files',responseType:'blob',data,onUploadProgress:upload_event})