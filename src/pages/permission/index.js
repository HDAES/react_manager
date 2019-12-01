import React, { Component } from 'react';
import { Card, Button, Table, Modal ,Form, Input, Select, message, Tree ,Transfer} from 'antd';
import axios from '../../axios'
import Utils from '../../utils/utils'
import menuConfig from '../../config/menuConfig'
const Option = Select.Option
const {TreeNode} = Tree
class PermissionUser extends Component {
    state = { 
        list:[],
        pagination:'',
        selectedRowKeys:[],
        selectedInfo:'',
        isPermVisible:false,
        isUserVisible:false,
        menuInfo:[],
        mockData:[],
        targetKeys:[]
     }
    
    params = {
        page:1
    }
    componentDidMount() {
        this.getList()
    }

    getList = () => {
        let _this = this
        axios.http({
            url:'/role/list',
            data:{
                params:{ page : this.params.page}
            }
        }).then((res) =>{
            if(res.code === 0){
                let list = res.data.list.map( (item ,index) =>{
                    item.key = index
                    return item
                })
                this.setState({
                    list,
                    pagination:Utils.pagination( res,(current) => {
                        _this.params.page = current
                        _this.getList()
                    })
                })
            }
        })
    }

    rowSelected = (record,index) => {
        this.setState({
            selectedRowKeys:[index],
            selectedInfo:record
        })
    }

    handleSetPerm = () =>{
        const { selectedRowKeys,selectedInfo } = this.state
        if(selectedRowKeys.length === 0){
            message.error('请先选择')
        }else{
            this.setState({
                isPermVisible:true,
                menuInfo:selectedInfo.menus
            })
        }
        
    }

    //用户授权
    handleUserAuth = () =>{
        const { selectedRowKeys,selectedInfo } = this.state
        if(selectedRowKeys.length === 0){
            message.error('请先选择')
        }else{
            this.setState({
                isUserVisible:true,
            })
            this.getRoleUserList(selectedInfo.id)
        }
    }

    //获取用户
    getRoleUserList = (id) =>{
        axios.http({
            url:'/role/user_list',
            data:{
                params:{ id }
            }
        }).then( (res) =>{
            if(res.code === 0){
               
                this.getAuthUserList(res.data.list)
            }
        })
    }

    getAuthUserList = (data) =>{
        const mockData = []
        const targetKeys =[]
        if(data && data.length>0){
            data.forEach( (item,index) =>{
                item.key = index
                item.title = item.user_name
                if(item.status === 1){
                    targetKeys.push(item.key)
                }
                mockData.push(item)
            })
        }
        this.setState({
            mockData,targetKeys
        })
    }
    handlePermEditSubmit = () => {
        console.log(this.form.props.form.getFieldsValue())
        console.log(this.state.menuInfo)
    }
    handleUserSubmit = () =>{
       
    }
    render() { 
        const { pagination , list , selectedRowKeys, isPermVisible , isUserVisible ,selectedInfo ,menuInfo,mockData ,targetKeys} = this.state
        const columns = [{
            title:'角色ID',
            dataIndex:'id'
        },{
            title:'角色名称',
            dataIndex:'role_name'
        },{
            title:'创建时间',
            dataIndex:'create_time'
        },{
            title:'使用状态',
            dataIndex:'status',
            render(status){
                return status === 1?'启用':'停用'
            }
        },{
            title:'授权时间',
            dataIndex:'authorize_time'
        },{
            title:'授权人',
            dataIndex:'authorize_user_name'
        }]
        const rowSelection = {
            type:'radio',
            selectedRowKeys,
            onChange:(selectedRowKeys, selectedRows) =>{
                this.setState({
                    selectedRowKeys,
                    selectedInfo:selectedRows[0]
                })
            }
        }
        return ( 
            <div>
                <Card>
                    <Button type="primary">创建角色</Button>
                    <Button style={{margin:'0 20px'}} onClick={this.handleSetPerm}>设置权限</Button>
                    <Button onClick={this.handleUserAuth}>用户授权</Button>
                </Card>
                <Card>
                    <Table
                        bordered
                        dataSource={list}
                        pagination = { pagination }
                        columns={columns}
                        rowSelection={rowSelection}
                        onRow = {(record,index) =>{
                                return {
                                    onClick:() =>{
                                        this.rowSelected(record,index)
                                    }
                                }
                            }
                        }
                    />
                </Card> 
                <Modal
                    title="设置权限"
                    visible={isPermVisible}
                    width={600}
                    onOk={this.handlePermEditSubmit}
                    onCancel={() =>{
                        this.setState({
                            isPermVisible:false
                        })
                    }}
                >
                    <PermEditForm  
                        detaInfo={selectedInfo} menuInfo={menuInfo} 
                         patchMenuInfo={ (checkedKeys) =>{ this.setState({menuInfo:checkedKeys})}}
                        wrappedComponentRef={(form) => this.form = form}
                    />
                </Modal>
                <Modal
                    title="设置用户"
                    visible={isUserVisible}
                    width={800}
                    onOk={this.handleUserSubmit}
                    onCancel={() =>{
                        this.setState({
                            isUserVisible:false
                        })
                    }}
                >
                    <UserAuthForm  
                        detaInfo={selectedInfo} 
                        mockData = { mockData}
                        targetKeys = { targetKeys}
                        patchUserInfo = { (targetKeys) =>{
                                this.setState({targetKeys})
                        }}
                        wrappedComponentRef={(form) => this.form = form}
                    />
                </Modal>
            </div>
         );
    }
}
 
export default PermissionUser;

class PermEditForm extends Component{

    renderTreeNodes = (data) =>{
        return data.map( (item) =>{
                if(item.children){
                    return (
                        <TreeNode title={item.title} key={item.key}>
                            {
                                this.renderTreeNodes(item.children)
                            }
                        </TreeNode>
                    )
                }else{
                    return (
                        <TreeNode title={item.title} key={item.key}>
                            
                        </TreeNode>
                    )
                }
            })
    }

    onCheck = (checkedKeys) =>{
        this.props.patchMenuInfo(checkedKeys)
    }
    render(){
        const { detaInfo ,menuInfo } = this.props
        const { getFieldDecorator} = this.props.form
        const formItemLayout = {
            labelCol:{span:5},
            wrapperCol:{span:10}
        }
        return  (
            <Form layout="horizontal">
                <Form.Item label="角色名称" {...formItemLayout}>
                        <Input disabled placeholder={detaInfo.role_name}/>
                </Form.Item>
                <Form.Item label="状态" {...formItemLayout}>
                    {
                        getFieldDecorator('status',{
                            initialValue:'1'
                        })(
                            <Select>
                                <Option value='1'>启用</Option>
                                <Option value='2'>停用</Option>
                            </Select>
                        )
                    }
                </Form.Item>
            
                <Tree
                    checkable
                    defaultExpandAll
                    onCheck={ (checkedKeys) =>{ this.onCheck(checkedKeys)}}
                    checkedKeys={menuInfo}
                >
                    <TreeNode title="平台权限" key="platform_all">
                        { this.renderTreeNodes(menuConfig)}
                    </TreeNode>
                </Tree>
            </Form>
        )
    }
}

PermEditForm = Form.create()(PermEditForm)

class UserAuthForm extends Component {
    filterOption = (inputValue, option) => option.title.indexOf(inputValue) > -1;
    handleChange = (targetKeys) =>{
        this.props.patchUserInfo(targetKeys)
    }
    render(){
        const { detaInfo ,mockData ,targetKeys} = this.props
        // const { getFieldDecorator} = this.props.form
        console.log(mockData)
        const formItemLayout = {
            labelCol:{span:5},
            wrapperCol:{span:19}
        }
        
        return (
            <Form>
                <Form.Item label="角色名称" {...formItemLayout}>
                        <Input disabled placeholder={detaInfo.role_name}/>
                </Form.Item>
                <Form.Item label="选择用户" {...formItemLayout}>
                       <Transfer
                            listStyle={{width:200,height:400}}
                            titles={['待选用户','已选用户']}
                            showSearch
                            searchPlaceholder="输入用户名"
                            filterOption={this.filterOption}
                            dataSource={mockData}
                            targetKeys={targetKeys}
                            onChange={this.handleChange}
                            render={item => item.title}
                       />

                </Form.Item>
            </Form>
        )
    }
}
UserAuthForm = Form.create()(UserAuthForm)