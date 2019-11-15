import React, { Component } from 'react'
import { Card , Form ,Input , Button , message, Icon ,Checkbox} from 'antd'
import { Link } from 'react-router-dom'

const FormItem = Form.Item
class Formlogin extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(){
       this.props.form.validateFields((err, values) => {
        console.log(values)
        if (!err) {
          message.success(`${values.userName}恭喜你，你通过本次表单组件学习，你的密码为${values.userPwd}`)
        }
      })
    }
    render() { 
        const { getFieldDecorator } = this.props.form;
        
        return ( 
            <div>
                <Card title="登录行内表单">
                    <Form layout="inline">
                        <FormItem>
                            <Input placeholder="请输入用户名"/>
                        </FormItem>
                        <FormItem>
                            <Input placeholder="请输入密码"/>
                        </FormItem>
                        <FormItem>
                            <Button type="primary">登录</Button>
                        </FormItem>
                    </Form>
                </Card>
                <Card title="登录水平表单" style={{marginTop:10}}>
                    <Form layout="horizontal" style={{width:300}}>
                    <FormItem>
                            { 
                                getFieldDecorator('userName',{
                                    initialValue:'',
                                    rules:[
                                        { required: true, message: 'Please input your username!' },
                                        { min:5,max:10, message: '长度不在范围内' },
                                        { pattern:/^\w+$/g,message:'用户名必须为字母或者数组'}
                                    ]
                                })(
                                    <Input prefix={<Icon type="user" />} placeholder="请输入用户名"/>
                                )
                            } 
                        </FormItem>
                        <FormItem>
                            { 
                                getFieldDecorator('userPwd',{
                                    initialValue:'',
                                    rules:[]
                                })(
                                    <Input prefix={<Icon type="lock" />} placeholder="请输入密码"/>
                                )
                            }  
                        </FormItem>
                        <FormItem>
                            { 
                                getFieldDecorator('remember',{
                                    valuePropName:'checked',
                                    initialValue:true
                                })(
                                    <Checkbox>记住密码</Checkbox>
                                )
                            }  
                            <Link to="#" style={{float:'right'}}>忘记密码</Link>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" onClick={this.handleSubmit}>登录</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
         );
    }
}

export default Form.create()(Formlogin);