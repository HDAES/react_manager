import React, { Component } from 'react';
import BaseForm from '../../components/BaseForm'
class Rich extends Component {
    state = {  }

    formList = [
        {
            type:'INPUT',
            lable:'用户名',
            field:'name',
            placeholder:'请输入用户名'
        },
        {
            type:'SELECT',
            lable:'城市',
            field:'city',
            placeholder:'全部',
            initialValue:'1',
            width:100,
            list:[{id:'0',name:'全部'},{id:'1',name:'重庆市'},{id:'2',name:'成都市'},{id:'3',name:'上海市'}]
        },
        {
            type:'时间查询',
            
            
        },
        {
            type:'SELECT',
            lable:'订单状态',
            field:'status',
            placeholder:'全部',
            initialValue:'1',
            width:100,
            list:[{id:'0',name:'全部'},{id:'1',name:'进行中'},{id:'2',name:'结束行程'}]
        },
    ]
    getFilterValue = (value) =>{
        console.log(value)
    }
    render() { 
        return ( 
            <div>
                <BaseForm formList={this.formList} getFilterValue={this.getFilterValue}/>
            </div>
         );
    }
}
 
export default Rich;