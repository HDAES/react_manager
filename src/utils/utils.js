export default {
    formateDate(time){
        if(!time) return ''
        let date = new Date(time)
        return date.getFullYear() +'-'+(date.getMonth()+1) + '-' + date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
    },
    pagination(data,callback) {
        return  {
            onChange: (current) =>{
                callback(current)
            },
            current: data.data.page,
            pageSize:data.data.page_size,
            total:data.data.total_count,
            showTotal:()=> `共有${data.data.total_count}条数据`
        }
    }

}