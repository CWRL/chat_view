const time_hander = (m: number) => {
    let time=new Date(m)
    let year = time.getFullYear()
    let month = (time.getMonth() + 1) > 9 ? (time.getMonth() + 1) : '0' + (time.getMonth() + 1)
    let date = time.getDate() > 9 ? time.getDate() : '0' + time.getDate()
    let houers = time.getHours() > 9 ? time.getHours() : '0' + time.getHours()
    let minit = time.getMinutes() > 9 ? time.getMinutes() : '0' + time.getMinutes()
    let result=`${year}--${month}--${date}  ${houers}:${minit}`
    return result
}
export {time_hander}