import React, { Component } from 'react';
import { Card, Form, Select, DatePicker, Button } from 'antd';
const FormItem = Form.Item
const Option = Select.Option
class BikeMap extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="bikemap">
                <Card>
                    <FilterForm />
                </Card>
                <Card>
                    <div>共有100辆车</div>
                    <div id="bikeMap"></div>
                </Card>
            </div>
         );
    }
}
 
export default BikeMap;


class FilterForm extends Component{
    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <Form layout="inline">
                <FormItem label="城市">
                    {
                        getFieldDecorator('city')(
                            <Select placeholder="全部" style={{width:100}}>
                                <Option value="">全部</Option>
                                <Option value="1">重庆</Option>
                                <Option value="2">成都</Option>
                                <Option value="3">背景</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem>
                    {
                        getFieldDecorator('start_time')(
                           <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
                        )
                    }
                </FormItem>
                <FormItem label="~" colon={false}>
                    {
                        getFieldDecorator('end_time')(
                           <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
                        )
                    }
                </FormItem>
                <FormItem label="订单状态" >
                    {
                        getFieldDecorator('status')(
                            <Select placeholder="全部" style={{width:100}}>
                                <Option value="">全部</Option>
                                <Option value="1">进行中</Option>
                                <Option value="2">行程结束</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem  >
                    <Button type="primary" style={{marginRight:20}}>查询</Button>
                    <Button>重置</Button>
                </FormItem>
            </Form>
        )
    }
}

FilterForm = Form.create()(FilterForm)