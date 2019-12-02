import React, { Component } from 'react';
import { Card ,Form, Select, Button, Input, DatePicker } from 'antd';
const Options = Select.Option
class FilterForm extends Component{


    initFormList = () =>{
        const { formList } = this.props
        const { getFieldDecorator } = this.props.form
        const formItemList = [ ]
        if(formList && formList.length >0){
            formList.forEach( ( item , i) =>{
                let { type,lable,field,placeholder,initialValue,width ,list} = item

                if(type==="时间查询"){
                    const start_time = <Form.Item label='订单时间' key={field}>
                    {
                        getFieldDecorator('start_time')(
                            <DatePicker placeholder="开始时间" showTime format="YYYY-MM-DD HH:mm:ss" />
                        )
                    }
                </Form.Item>
                formItemList.push(start_time) 
                const end_time = <Form.Item label='~' colon={false} key={field}>
                    {
                        getFieldDecorator('end_time')(
                            <DatePicker placeholder="结束时间" showTime format="YYYY-MM-DD HH:mm:ss" />
                        )
                    }
                </Form.Item>
                formItemList.push(end_time) 
                }else if(type === 'INPUT'){
                    const INPUT = <Form.Item label={lable} key={field}>
                        {
                            getFieldDecorator(field)(
                                <Input placeholder={placeholder} />
                            )
                        }
                    </Form.Item>
                    formItemList.push(INPUT)
                }else if(type === 'SELECT'){
                    const SELECT = <Form.Item label={lable} key={field}>
                        {
                            getFieldDecorator(field,{
                                initialValue:initialValue
                            })( 
                                <Select placeholder={placeholder} style={{width:width}}>
                                    {
                                        list.map(a => {
                                            return (
                                            <Options value={a.id} key={a.id}>{a.name}</Options>
                                            )
                                        })
                                    }
                                </Select>
                            )
                        }
                    </Form.Item>
                    formItemList.push(SELECT)
                }
            })
        }
        return formItemList
    }

    handleClick = () =>{
        let filterValue = this.props.form.getFieldsValue()
        //console.log(filterValue)
        //调用 父组件的方法
        this.props.getFilterValue(filterValue)
    }
    render(){
        return (
            <Card>
                <Form layout="inline">
                    { this.initFormList()}
                    <Form.Item>
                        <Button type="primary" onClick={this.handleClick}>确定</Button>
                        <Button style={{margin:'0 10px'}}>取消</Button>
                    </Form.Item>
                </Form>
            </Card>
        )
    }


}
FilterForm = Form.create({})(FilterForm)
export default FilterForm