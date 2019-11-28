import React, { Component } from 'react';
import moment from 'moment';
import axios from '../../axios'
import { Card, Form, Input, Button, Table, Modal, Radio, Select, DatePicker, message } from 'antd';
import Utils from '../../utils/utils'
const FormItem = Form.Item
const Option = Select.Option
const { TextArea } = Input;
class User extends Component {
    state = { 
        list:[],
        selectedRowKeys:[],
        selectedRows:'',
        tableLoading: false,
        editVisible:false,
        infoVisible:false,
        userInfo:'',
        title:''
     }

    parmas = {
        page : 1
    }
    componentDidMount() {
        this.getUserList()
    }

    //获取user数据
    getUserList = () =>{
        this.setState({
            tableLoading:true
        })
        axios.http({
            url:'/user/list',
            data:{
                params:{
                    page:this.parmas.page
                }  
            }
        }).then( (res) => {
            if(res.code === 0){
                this.setState({
                    tableLoading:false,
                    list:res.data.list.map( (item,index) =>{ 
                        item.key = index
                        return item
                    }),
                    pagination:Utils.pagination( res ,(current) =>{
                        this.parmas.page = current 
                        this.getUserList()
                    })
                })
            }
        })
    }

    handleClickRow = (record,index) =>{
        this.setState({
            selectedRowKeys:[index],
            selectedRows:record
        })
    }

    //编辑弹框
    handleOperating = (type) =>{
        const { selectedRows } = this.state
        if(type === 'edit'){
            if(selectedRows){
                this.setState({
                    editVisible:true,
                    title:'编辑员工',
                    userInfo:selectedRows[0]
                })
            }else{
                message.error('请先选择需要编辑的用户')
            }
        }else if(type === 'create'){
            this.setState({
                editVisible:true,
                userInfo:'',
                title:'创建员工',
            })
        }else if(type === 'info'){
            if(selectedRows){
                this.setState({
                    infoVisible:true,
                    userInfo:selectedRows[0]
                })
            }else{
                message.error('请先选择需要编辑的用户')
            }
            
        }
        
    }
    
    //取消按钮
    handleCancel = () =>{
        this.setState({
            editVisible:false
        })
    }

    //关闭弹框
    cloesModal = () =>{
        this.userForm.props.form.resetFields()
        this.setState({
            editVisible:false
        })
    }
    //确定
    handleSubmit = () =>{
        
        console.log(this.userForm.props.form.getFieldsValue())
    }
    render() { 
        const { selectedRowKeys , editVisible , infoVisible , userInfo } = this.state
        const columns = [{
            title:'id',
            dataIndex:'user_id'
        },{
            title:"用户名",
            dataIndex:'user_name'
        },{
            title:"性别",
            dataIndex:'sex',
            render(sex){
                return sex === 1?'男':'女'
            }
        },{
            title:"状态",
            dataIndex:'status'
        },{
            title:"爱好",
            dataIndex:'hobby'
        },{
            title:"生日",
            dataIndex:'birthday'
        },{
            title:"联系地址",
            dataIndex:'address'
        },{
            title:"手机号",
            dataIndex:'tel'
        }]
        const rowSelection = {
            type:'radio',
            selectedRowKeys,
            onChange:(selectedRowKeys,selectedRows) =>{
                this.setState({
                    selectedRowKeys,
                    selectedRows
                })
            }
        }
        const formItemLayout = {
            labelCol:{span:5},
            wrapperCol:{span:15}
        }
        return ( 
            <div className="user">
               <Card>
                   <FilterForm />
               </Card>
               <Card>
                   <Button type="primary" onClick={() => this.handleOperating('create')} icon="plus"> 创建员工</Button>
                   <Button type="primary" style={{margin:'0 20px'}} onClick={() =>{ this.handleOperating('edit')}} icon="edit"> 编辑员工</Button>
                   <Button type="primary" onClick={() =>{ this.handleOperating('info')}}> 员工详情</Button>
                   <Button type="danger" ghost style={{margin:'0 20px'}}> 删除员工</Button>

                   <Table
                        loading={this.state.tableLoading}
                        bordered
                        style={{marginTop:20}}
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                        rowSelection={rowSelection}
                        onRow ={ (record,index) => {
                            return {
                                onClick:() =>{
                                    this.handleClickRow(record,index)
                                }
                            }
                        }}
                   />
               </Card>
               <Modal
                    width={800}
                    title={this.state.title}
                    visible={editVisible}
                    onCancel={ this.cloesModal}
                    onOk={this.handleSubmit}
                >
                    <EditModel  userInfo={this.state.userInfo}   wrappedComponentRef={ (inst) =>{this.userForm = inst}}/>
                </Modal>
               

               <Modal
                    width={600}
                    title="用户详情"
                    visible={infoVisible}
                    onCancel={ () =>{ this.setState({infoVisible:false})}}
                    onOk={ () =>{ this.setState({infoVisible:false})}}
               >
                   <Form>
                       <FormItem label="姓名" {...formItemLayout}>
                            { userInfo.user_name}
                       </FormItem>
                       <FormItem label="性别" {...formItemLayout}>
                        { userInfo.sex === 1?'男':'女'}
                       </FormItem>
                       <FormItem label="状态" {...formItemLayout}>
                            { userInfo.status }
                       </FormItem>
                       <FormItem label="生日" {...formItemLayout}>
                       { userInfo.birthday }
                       </FormItem>
                       <FormItem label="联系地址" {...formItemLayout}>
                       { userInfo.address }
                       </FormItem>
                       
                   </Form>
               </Modal>
            </div>
         );
    }
}
 
export default User;

class FilterForm extends Component{
    handleLogin = () =>{
        console.log('123')
    }
    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <Form layout="inline">
                <FormItem>
                    {
                        getFieldDecorator('user_name')(
                            <Input  placeholder="请输入用户名"/>
                        )
                    }
                </FormItem>
                <FormItem>
                    {
                        getFieldDecorator('user_psw')(
                            <Input  placeholder="请输入密码"/>
                        )
                    }
                </FormItem>
                <Button type="primary" onClick={this.handleLogin}>登录</Button>
            </Form>
        )
    }
}

FilterForm = Form.create({})(FilterForm);


class EditModel extends Component{
    render(){
        const { getFieldDecorator } = this.props.form
        const formItemLayout = {
            labelCol:{span:5},
            wrapperCol:{span:15}
        }
        const userInfo = this.props.userInfo || {}
        return (
            
              <Form >
                  <FormItem label="姓名" {...formItemLayout}>
                      {
                          getFieldDecorator('user_name',{
                            initialValue:userInfo.user_name
                          })(
                              <Input placeholder="请输入姓名"/>
                          )
                      }
                  </FormItem>
                  <FormItem label="性别" {...formItemLayout}>
                      {
                          getFieldDecorator('sex',{
                            initialValue:userInfo.sex
                          })(
                            <Radio.Group>
                                <Radio value={1}>男</Radio>
                                <Radio value={2}>女</Radio>
                            </Radio.Group>   
                          )
                      }
                  </FormItem>
                  <FormItem label="状态" {...formItemLayout}>
                      {
                          getFieldDecorator('status',{
                            initialValue:userInfo.status
                          })(
                            <Select placeholder="全部">
                                <Option value="">全部</Option>
                                <Option value="1">咸鱼一条</Option>
                                <Option value="2">风华浪子</Option>
                                <Option value="3">北大才子一枚</Option>
                                <Option value="4">百度FE</Option>
                                <Option value="5">创业者</Option>
                            </Select>  
                          )
                      }
                  </FormItem>
                  <FormItem label="生日" {...formItemLayout}>
                      {
                          getFieldDecorator('birthday',{
                            initialValue: moment(userInfo.birthday)
                          })(
                            <DatePicker  format="YYYY-MM-DD HH:mm"></DatePicker> 
                          )
                      }
                  </FormItem>
                  <FormItem label="地址" {...formItemLayout}>
                      {
                          getFieldDecorator('address',{
                            initialValue: userInfo.address
                          })(
                            <TextArea placeholder="请输入地址" />
                          )
                      }
                  </FormItem>
              </Form>
        )
    }
}
EditModel = Form.create({})(EditModel);