import React, { Component } from 'react';
import { Card , Table } from 'antd'
import axios from './../../axios';
class BasicTable extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    componentDidMount() {
        this.request()
    }


    request(){
        axios.http({
            url:'/table/list',
            data:{
                params:{ page:1}
            }
        }).then((res) =>{
           if(res.code === 0){
               this.setState({
                dataSource:res.data.list
               })
           }
        })
    }
    render() { 
        const columns = [{ 
                title:'id',
                dataIndex:'id'
            },{
                title:'用户名',
                dataIndex:'userName'
            },{
                title:'性别',
                dataIndex:'sex',
                render(sex){
                    return sex === 1?'男':'女'
                }
            },{
                title:'状态',
                dataIndex:'state',
                render(state){
                    let config = {
                        '1':'咸鱼一条',
                        '2':'风华浪子',
                        '3':'北大才子一枚',
                        '4':'百度FE',
                        '5':'创业者'
                    }
                    return config[state]
                }
            },{
                title:'爱好',
                dataIndex:'intersest',
                render(intersest){
                    let config = {
                        '1':'唱',
                        '2':'跳',
                        '3':'RAP',
                        '4':'篮球',
                        '5':'爬山',
                        '6':'桌球',
                        '7':'听歌',
                        '8':'Coding'
                    }
                    return config[intersest]
                }
            },{
                title:'生日',
                dataIndex:'birthday'
            },{
                title:'地址',
                dataIndex:'address'
            }
        ]
        return ( 
            <Card title="基础表格">
                <Table
                    bordered
                    dataSource={this.state.dataSource}
                    columns={columns}
                    rowKey={record => record.id}
                    pagination={false}
                />
            </Card>
         );
    }
}
 
export default BasicTable;