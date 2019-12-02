import React,{ Component }  from 'react';
import { Card, Form, Select, Button , Table, DatePicker, Modal, message} from 'antd';
import axios from '../../axios'
import Utils from '../../utils/utils'
const FormItem = Form.Item
const Option = Select.Option
class Order extends Component {
    state = { 
        list:[],
        orderInfo:{},
        selectedId:'',
        selectedRowKeys:[],
        orderConfirmVisible:false
     }
    params = { 
        page:1
    }
    componentDidMount() {
        this.requestList()
    }

    requestList = () =>{
        let _this = this
        axios.http({
           url:'/order/list' ,
           data:{
               params:{
                   page:this.params.page
               }
           }
        }).then( res =>{
            let list = res.data.list.map( (item,index) =>{
                item.key = index
                return item
            })
            this.setState({
                list,
                pagination:Utils.pagination(res, (current) => {
                    _this.params.page = current
                    _this.requestList()
                })
            })
        })
    }

    handleConfirm = () =>{
        let { selectedRowKeys , selectedId} = this.state
        if(selectedRowKeys.length === 0){
            message.error('请先选择')
        }else{
            axios.http({
                url:'/order/ebike_info',
                data:{
                    params:{
                        order_id:selectedId
                    }
                }
            }).then((res) =>{
                if(res.code === 0){
                    this.setState({
                        orderInfo:res.data.ebike_info,
                        orderConfirmVisible:true
                    })
                }
            }) 
        }
         
    }
    //结束订单
    handleFinishOrder = ( ) =>{
        axios.http({
            url:'/order/finish_order',
            data:{
                params:1
            }
        }).then((res) =>{
            if(res.code === 0){
                message.success(res.message)
                this.setState({
                    orderConfirmVisible:false,
                    selectedRowKeys:[],
                    selectedId:''
                })
                this.requestList()
            }
        })  
    }

    onRowClick = (record,index) =>{
        this.setState({
            selectedRowKeys:[index],
            selectedId:record.id
        })
    }
    handleOrderInfo = () =>{
        let { selectedRowKeys , selectedId} = this.state
        if(selectedRowKeys.length === 0){
            message.error('请先选择')
        }else{
            window.open('/#/common/order/detail/'+ selectedId)
        }
    }
    render() { 
        const { selectedRowKeys } = this.state
        const columns = [{
            title:'订单编号',
            dataIndex:'order_sn'
        },{
            title:'车辆编号',
            dataIndex:'bike_sn'
        },{
            title:'用户名',
            dataIndex:'user_name'
        },{
            title:'手机号码',
            dataIndex:'mobile'
        },{
            title:'里程',
            dataIndex:'distance',
            render(distance){
                return distance/1000+'km'
            }
        },{
            title:'行驶时长',
            dataIndex:'total_time'
        },{
            title:'状态',
            dataIndex:'status'
        },{
            title:'开始时间',
            dataIndex:'start_time'
        },{
            title:'结束时间',
            dataIndex:'end_time'
        },{
            title:'订单金额',
            dataIndex:'total_fee'
        },{
            title:'实付金额',
            dataIndex:'user_pay'
        },]
        const formItemLayout = {
            labelCol:{span:5},
            wrapperCol:{span:10}
        }
        const rowSelection={
            type:'radio',
            selectedRowKeys,
            onChange:(selectedRowKeys,selectedRows) =>{
               this.setState({
                selectedRowKeys,
                selectedId:selectedRows[0].id
               })
            }
        }
        return ( 
           <div>
               <Card>
                   <FilterForm/>
               </Card>
               <Card style={{marginTop:10}}>
                   <Button type="primary" onClick={this.handleOrderInfo}>订单详情</Button>
                   <Button type="primary" style={{marginLeft:10}} onClick={this.handleConfirm}>结束订单</Button>
               </Card>
               <div className="content-wrap">
                    <Table
                        bordered
                        dataSource={this.state.list}
                        columns={columns}
                        pagination={this.state.pagination}
                        rowSelection={rowSelection}
                        onRow={ (record,index) =>{
                            return {
                                onClick:() =>{ 
                                    this.onRowClick(record,index)
                                 }
                            }
                        }}
                    />
               </div>
                <Modal 
                        title="结束订单"
                        visible={this.state.orderConfirmVisible}
                        onCancel={() =>{
                            this.setState({orderConfirmVisible:false})
                        }}
                        onOk={this.handleFinishOrder}
                        width={600}
                >
                    <Form >
                        <FormItem label="车辆编号" {...formItemLayout}>
                            { this.state.orderInfo.bike_sn}
                        </FormItem>
                        <FormItem label="剩余电量" {...formItemLayout}>
                            { this.state.orderInfo.battery+'%'}
                        </FormItem>
                        <FormItem label="行程开始时间" {...formItemLayout}>
                            { this.state.orderInfo.start_time}
                        </FormItem>
                        <FormItem label="当前位置" {...formItemLayout}>
                            { this.state.orderInfo.location}
                        </FormItem>
                    </Form>
                </Modal>
           </div>
         );
    }
}
 
export default Order;

class FilterForm extends Component{
    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <Form layout='inline'>
                <FormItem label="城市">
                    {
                        getFieldDecorator('city_id',{
                            initialValue:'1'
                        })(
                            <Select placeholder="全部" style={{width:100}}>
                                <Option value=''>全部</Option>
                                <Option value="1">重庆市</Option>
                                <Option value="2">北京市</Option>
                                <Option value="3">成都市</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="订单时间">
                    {
                        getFieldDecorator('start_time')(
                            <DatePicker  showTime format="YYYY-MM-DD HH:mm:ss" />
                        )
                    }
                </FormItem>
                <FormItem label="~" colon={false}>
                    {
                        getFieldDecorator('end_time')(
                            <DatePicker  showTime format="YYYY-MM-DD HH:mm:ss" />
                        )
                    }
                </FormItem>
                <FormItem label="订单状态">
                    {
                        getFieldDecorator('status')(
                            <Select placeholder="全部" style={{width:100}}>
                                <Option value=''>全部</Option>
                                <Option value="1">进行中</Option>
                                <Option value="2">结束行程</Option>
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