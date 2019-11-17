import jsonP from 'jsonp'
import axios from 'axios'
import { Modal } from 'antd'
export default class Axios{
    static jsonp (options) {
        return  new Promise( (resolve,reject) => {
            jsonP(options.url,{
                param:'callback'
            },function(err,response){
                if(response.status === 'success'){
                    resolve(response)
                }else{
                    reject(response.message)
                }  
            })
        })
    }

    static http(options){
        let loading;
        if(options.data && options.data.isShowLoading !== false){
            loading = document.getElementById('ajaxLoading')
            loading.style.display = 'block'
        }
        let baseUrl = 'https://www.easy-mock.com/mock/5dd127f5cf8d630c68faf0b5/react'
        return new Promise( (resolve,reject) => {
            axios({
                url:options.url,
                message:'GET',
                baseURL:baseUrl,
                timeout:5000,
                params:(options.data && options.data.params) || ''
            }).then( (response) =>{
                if(options.data && options.data.isShowLoading !== false){
                    loading = document.getElementById('ajaxLoading')
                    loading.style.display = 'none'
                }
                if(response.status === 200){
                    let res = response.data
                    if(res.code === 0){
                        resolve(res)
                    }else{
                        reject(res)
                        Modal.info({
                            title:'提示',
                            content:res.message
                        })
                    }
                }
            }).catch( err =>{
                if(options.data && options.data.isShowLoading !== false){
                    loading = document.getElementById('ajaxLoading')
                    loading.style.display = 'none'
                }
                Modal.warn({
                    title:'提示',
                    content:err.message
                })
            })
        })
    }
}