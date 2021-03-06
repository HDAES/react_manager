import React, { Component } from 'react';
import { Card , Button , Modal} from 'antd'
import Ityped from '../../../components/Ityped'
class Models extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            showModel1:false,
            showModel2:false,
            showModel3:false,
            showModel4:false
         }
       
    }
    handleOpen(type){
        this.setState({
            [type]:true
        })
    }
    handleConfirm(type) {
        Modal[type]({
            title:type,
            maskClosable:true,
            content:`这是一条${type}消息`,
            onOk:()=>{},
            onCancel:() =>{}
        })
    }
    render() { 
        const texts = "需要用户处理事务，又不希望跳转页面以致打断工作流程时，可以使用 Modal 在当前页面正中打开一个浮层，承载相应的操作。"
        return ( 
            <div className="card-list">
                <Ityped text={texts} />
                <Card title="基础模态框" className="card-warp" hoverable={true}>
                    <Button type="primary" onClick={this.handleOpen.bind(this,'showModel1')}>Open</Button>
                    <Button type="primary" onClick={this.handleOpen.bind(this,'showModel2')}>自定义页脚</Button>
                    <Button type="primary" onClick={this.handleOpen.bind(this,'showModel3')}>顶部20px弹框</Button>
                    <Button type="primary" onClick={this.handleOpen.bind(this,'showModel4')}>水平锤子居中</Button>   
                </Card>

                <Card title="基础模态框" className="card-warp" hoverable={true}>
                    <Button type="primary" onClick={this.handleConfirm.bind(this,'info')}>info</Button>
                    <Button type="primary" onClick={this.handleConfirm.bind(this,'success')}>success</Button>
                    <Button type="primary" onClick={this.handleConfirm.bind(this,'error')}>error</Button>
                    <Button type="primary" onClick={this.handleConfirm.bind(this,'warning')}>warning</Button>
                    <Button type="primary" onClick={this.handleConfirm.bind(this,'confirm')}>confirm</Button>   
                </Card>

                <Modal
                    title="React"
                    visible={this.state.showModel1}
                    onCancel={()=>{
                        this.setState({
                            showModel1:false
                        })
                    }}
                    >
                    <p>欢迎你的到来</p>
                </Modal>

                <Modal
                    title="React"
                    visible={this.state.showModel2}
                    okText="好的"
                    cancelText="算了"
                    onCancel={()=>{
                        this.setState({
                            showModel2:false
                        })
                    }}
                    >
                    <p>欢迎你的到来</p>
                </Modal>

                <Modal
                    style={{top:'20px'}}
                    title="React"
                    visible={this.state.showModel3}
                    onCancel={()=>{
                        this.setState({
                            showModel3  :false
                        })
                    }}
                    >
                    <p>欢迎你的到来</p>
                </Modal>

                <Modal
                    title="React"
                    wrapClassName="model-center"
                    visible={this.state.showModel4}
                    onCancel={()=>{
                        this.setState({
                            showModel4  :false
                        })
                    }}
                    >
                    <p>欢迎你的到来</p>
                </Modal>
            </div>
         );
    }
}
 
export default Models;