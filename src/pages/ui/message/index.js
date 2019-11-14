import React, { Component } from 'react';
import { Card , Button ,message} from 'antd'
import Ityped from '../../../components/Ityped'

class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    showMessage(type){
        message[type](`这是一条${type}消息`)
    }

    render() { 
        const texts = '可提供成功、警告和错误等反馈信息;顶部居中显示并自动消失，是一种不打断用户操作的轻量级提示方式。'
        return ( 
            <div className="card-list">
                 <Ityped text={texts} />
                 <Card title="全局提示框" className="card-warp" hoverable={true}>
                    <Button type="primary" onClick={this.showMessage.bind(this,'success')}>success</Button>
                    <Button type="primary" onClick={this.showMessage.bind(this,'error')}>error</Button>
                    <Button type="primary" onClick={this.showMessage.bind(this,'info')}>info</Button>
                    <Button type="primary" onClick={this.showMessage.bind(this,'warning')}>warning</Button>
                    <Button type="primary" onClick={this.showMessage.bind(this,'warn')}>warn</Button>
                    <Button type="primary" onClick={this.showMessage.bind(this,'loading')}>loading</Button>
                </Card>
            </div>
         );
    }
}
 
export default Message;