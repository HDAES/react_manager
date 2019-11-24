import React, { Component } from 'react';
import { Card, Form, Select, Button, Table, Modal } from 'antd';
import axios from '../../axios/index'
import Utils from '../../utils/utils'
const FormItem = Form.Item
const Option = Select.Option
export default class City extends Component {
    state = {
        list:[],
        isShowOpenCity: false
    }

    params = {
        page:1
    }
    
    componentDidMount() {
        this.getList()
    }

    getList(){
        let _this = this
        axios.http({
            url:'/open_city',
            data:{
                params:{
                    page:this.params.page
                }
            }
        }).then( (res) => {
           this.setState({
               list:res.data.list.map( (item,index) => {
                   item.key = index
                   return item
               }),
               pagination:Utils.pagination(res,(current) =>{
                    _this.params.page = current
                    _this.getList()
               })
           })
        })
    }

    //开通城市
    handleOpenCity = () => {
        this.setState({
            isShowOpenCity:true
        })
    }

    handleSubmit = () =>{
        let cityInfo =  this.cityForm.props.form.getFieldsValue()
        console.log(cityInfo)
    }
    render() { 
        const columns = [ {
            title:'城市ID',
            dataIndex:'id'
        },{
            title:'城市名称',
            dataIndex:'name'
        },{
            title:'用车模式',
            dataIndex:'mode'
        },{
            title:'营运模式',
            dataIndex:'op_mode'
        },{
            title:'授权加盟商',
            dataIndex:'franchisee_name'
        },{
            title:'城市管理员',
            dataIndex:'city_admins',
            render(arr){
                return  arr.map( (item) =>{
                    return item.user_name
                }).join(',')
            }
        },{
            title:'城市开通时间',
            dataIndex:'open_time'
        },{
            title:'操作时间',
            dataIndex:'update_time'
        },{
            title:'操作人',
            dataIndex:'sys_user_name'
        }]

        return ( 
            <div>
                <Card>
                    <FilterForm/>
                </Card>
                <Card>
                    <Button type='primary' onClick={this.handleOpenCity}>开通城市</Button>
                </Card>
                <div className="content-wrap">
                    <Table 
                        bordered={true}
                        columns = {columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                    />
                </div>
                <Modal 
                    title="开通城市"
                    visible={this.state.isShowOpenCity}
                    onCancel={()=>{
                        this.setState({
                            isShowOpenCity:false
                        })
                    }}
                    onOk={this.handleSubmit}
                >
                    <ModalForm wrappedComponentRef={ (inst) =>{this.cityForm = inst}}/>
                </Modal>
            </div>
         );
    }
}
 
class FilterForm extends Component{
    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <Form layout="inline">
                <FormItem label='城市'>
                    {
                        getFieldDecorator('city_id')(
                            <Select placeholder="请选择" style={{width:120}}>
                                <Option value="">全部</Option>
                                <Option value="1">重庆市</Option>
                                <Option value="2">北京市</Option>
                                <Option value="3">成都市</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label='用车模式'>
                    {
                        getFieldDecorator('mode')(
                            <Select placeholder='全部' style={{width:130}}>
                                <Option value="">全部</Option>
                                <Option value="1">指定提车点模式</Option>
                                <Option value="2">禁停区模式</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label='运营模式'>
                    {
                        getFieldDecorator('op_mode')(
                            <Select placeholder='全部' style={{width:80}}>
                                <Option value="">全部</Option>
                                <Option value="1">自营</Option>
                                <Option value="2">加盟</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label='加盟商授权状态'>
                    {
                        getFieldDecorator('auth_status')(
                            <Select placeholder='全部' style={{width:80}}>
                                <Option value="">全部</Option>
                                <Option value="1">已授权</Option>
                                <Option value="2">未授权</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem>
                    <Button type="primary" style={{margin:'0 20px'}}>查询</Button>
                    <Button> 重置 </Button>
                </FormItem>
            </Form>
        )
    }
}

FilterForm = Form.create()(FilterForm)

class ModalForm extends Component{
    render(){
        const formItemLayout = {
            labelCol:{ span:5},
            wrapperCol:{span:15}
        }
        const { getFieldDecorator } = this.props.form
        return (
            <Form layout="horizontal">
                <FormItem label="选择城市" {...formItemLayout}>
                    {
                        getFieldDecorator('city_id',{
                            initialValue:'1'
                        })(
                        <Select>
                                <Option value=''>全部</Option>
                                <Option value='1'>重庆市</Option>
                                <Option value='2'>北京市</Option>
                                <Option value='3'>成都市</Option>
                         </Select>
                        )
                    }
                    
                </FormItem>
                <FormItem label='运营模式' {...formItemLayout}>
                    {
                        getFieldDecorator('op_mode')(
                            <Select placeholder='全部' >
                                <Option value="">全部</Option>
                                <Option value="1">自营</Option>
                                <Option value="2">加盟</Option>
                            </Select> 
                        )
                    }              
                                   
                </FormItem>
                <FormItem label='用车模式' {...formItemLayout}>   
                    {
                         getFieldDecorator('mode')(
                            <Select placeholder='全部' style={{width:130}}>
                                <Option value="">全部</Option>
                                <Option value="1">指定提车点模式</Option>
                                <Option value="2">禁停区模式</Option>
                            </Select> 
                         )
                    }               
                    
                </FormItem>
            </Form>
        )
    }
}
ModalForm = Form.create()(ModalForm)