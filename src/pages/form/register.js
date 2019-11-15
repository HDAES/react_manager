import React, { Component } from 'react';
import { Card, Form, Input, Radio, InputNumber, Select, Switch, DatePicker, TimePicker, Upload ,message ,Icon, Button, Checkbox} from 'antd';
import moment from 'moment';

const FormItme = Form.Item
const RadioGroup = Radio.Group
const Option  = Select.Option;
const TextArea = Input.TextArea

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  
  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }


class Register extends Component {
    state = {
        loading: false,
    }
    handleSubmit = () =>{
        this.props.form.validateFields( (err,value) =>{
            console.log(value)
        })
    }
    handleChange = info => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {

            //console.log(info.fileList[0].response)
          // Get this url from response in real world.
          getBase64(info.file.originFileObj, imageUrl =>
            this.setState({
              imageUrl,
              loading: false,
            }),
          );
        }
      };
    render() { 
        const uploadButton = (
            <div>
              <Icon type={this.state.loading ? 'loading' : 'plus'} />
              <div className="ant-upload-text">Upload</div>
            </div>
          );
        const { imageUrl } = this.state;
        const { getFieldDecorator } = this.props.form;
        const FormItemLayout = {
            labelCol:{
                xs:24,
                sm:4
            },
            wrapperCol:{
                xs:24,
                sm:12
            }
        }
        const offsetLayout = {
            wrapperCol:{
                sx:24,
                sm:{
                    span:12,
                    offset:4
                }
            }
        }
        return (  
            <div>
                <Card title="注册表单">
                    <Form>
                        <FormItme label="用户名" {...FormItemLayout}>
                            { 
                                getFieldDecorator('userName',{
                                    initialValue:'',
                                    rules:[{required: true, message: 'Please input your username!'}]
                                })(
                                    <Input placeholder="请输入用户名"/>
                                )
                            }
                        </FormItme>
                        <FormItme label="密码" {...FormItemLayout}>
                            { 
                                getFieldDecorator('userPwd',{
                                    initialValue:'',
                                    rules:[{required: true, message: 'Please input your userPwd!'}]
                                })(
                                    <Input type="password" placeholder="请输入密码"/>
                                )
                            }
                        </FormItme>
                        <FormItme label="性别" {...FormItemLayout}>
                            { 
                                getFieldDecorator('sex',{
                                    initialValue:'1',
                                })(
                                    <RadioGroup>
                                        <Radio value="1">男</Radio>
                                        <Radio value="2">女</Radio>
                                    </RadioGroup>
                                )
                            }
                        </FormItme>
                        <FormItme label="年龄" {...FormItemLayout}>
                            { 
                                getFieldDecorator('age',{
                                    initialValue:18,
                                })(
                                    <InputNumber />
                                )
                            }
                        </FormItme>
                        <FormItme label="当前状态" {...FormItemLayout}>
                            { 
                                getFieldDecorator('state',{
                                    initialValue:'2',
                                })(
                                    <Select>
                                        <Option value="1">咸鱼一条</Option>
                                        <Option value="2">风华浪子</Option>
                                        <Option value="3">北大才子一枚</Option>
                                        <Option value="4">百度FE</Option>
                                        <Option value="5">创业者</Option>
                                    </Select>
                                )
                            }
                        </FormItme>
                        <FormItme label="爱好" {...FormItemLayout}>
                            { 
                                getFieldDecorator('interest',{
                                    initialValue:['1','2','3','4'],
                                })(
                                    <Select mode="multiple">
                                        <Option value="1">唱</Option>
                                        <Option value="2">跳</Option>
                                        <Option value="3">RAP</Option>
                                        <Option value="4">篮球</Option>
                                        <Option value="5">爬山</Option>
                                        <Option value="6">桌球</Option>
                                        <Option value="7">听歌</Option>
                                        <Option value="8">Coding</Option>
                                    </Select>
                                )
                            }
                        </FormItme>
                        <FormItme label="是否已婚" {...FormItemLayout}>
                            { 
                                getFieldDecorator('isMarried',{
                                    valuePropName:'checked',
                                    initialValue:true,
                                })(
                                    <Switch />
                                )
                            }
                        </FormItme>
                        <FormItme label="生日" {...FormItemLayout}>
                            { 
                                getFieldDecorator('birthday',{
                                    initialValue:moment('2018-08-08 12:00:59')
                                })(
                                    <DatePicker 
                                        showTime
                                        format="YYYY-MM-DD HH:mm:ss"
                                    />
                                )
                            }
                        </FormItme>
                        <FormItme label="联系地址" {...FormItemLayout}>
                            { 
                                getFieldDecorator('address',{
                                    initialValue:'Sheikh Mohammed bin Rashid Boulevard Dubai'
                                })(
                                    <TextArea
                                        autoSize={{minRows:2,maxRows:5}}
                                    />
                                )
                            }
                        </FormItme>
                        <FormItme label="早起时间" {...FormItemLayout}>
                            { 
                                getFieldDecorator('time',{
                                    
                                })(
                                    <TimePicker />
                                )
                            }
                        </FormItme>
                        <FormItme label="头像" {...FormItemLayout}>
                            {
                                getFieldDecorator('avatar',{
                                    valuePropName: 'fileList',
                                    getValueFromEvent: (e) => {
                                        if (Array.isArray(e)) {
                                          return e;
                                        }
                                        return e && e.fileList;
                                    }
                                })(
                                    <Upload
                                        name="avatar"
                                        listType="picture-card"
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                        beforeUpload={beforeUpload}
                                        onChange={this.handleChange}
                                    >
                                            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                    </Upload> 
                                )
                            }
                            
                        </FormItme>
                        <FormItme {...offsetLayout}>
                            { 
                                getFieldDecorator('isagree',{
                                    valuePropName:'checked',
                                    initialValue:true,
                                })(
                                   <Checkbox>同意相关政策</Checkbox>
                                )
                            }
                        </FormItme>
                        <FormItme  {...offsetLayout}>
                            <Button onClick={this.handleSubmit}>注册</Button>
                        </FormItme>
                    </Form>
                </Card>
            </div>)
        ;
    }
}
 
export default Form.create()(Register);