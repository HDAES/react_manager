import React, { Component } from 'react';
import { Card , Button , notification  } from 'antd'
import Ityped from '../../../components/Ityped'
import '../ui.less'
class Notice extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    openNotification(type,placement){
        if(typeof placement != "string"){
            placement = "topRight"
        }
        notification[type]({
            placement,
            message:`这是一条 ${type} 消息`,
            description:'这是介绍'
        })
    }
    render() { 
        const texts = '在系统四个角显示通知提醒信息。经常用于以下情况：较为复杂的通知内容。带有交互的通知，给出用户下一步的行动点。系统主动推送。'
        return ( 
            <div className="card-list">
                <Ityped text={texts} />
                <Card title="通知提示框" className="card-warp" hoverable={true}>
                    <Button type="primary" onClick={this.openNotification.bind(this,'success')}>
                        success
                    </Button>
                    <Button type="primary" onClick={this.openNotification.bind(this,'error')}>
                        error
                    </Button>
                    <Button type="primary" onClick={this.openNotification.bind(this,'info')}>
                        info
                    </Button>
                    <Button type="primary" onClick={this.openNotification.bind(this,'warning')}>
                        warning
                    </Button>   
                </Card>
                <Card title="通知提示框" className="card-warp" hoverable={true}>
                    <Button type="primary" onClick={this.openNotification.bind(this,'success','topRight')}>
                        右上角
                    </Button>
                    <Button type="primary" onClick={this.openNotification.bind(this,'success','bottomRight')}>
                        右下角
                    </Button>
                    <Button type="primary" onClick={this.openNotification.bind(this,'success','bottomLeft')}>
                        左下角
                    </Button>
                    <Button type="primary" onClick={this.openNotification.bind(this,'success','topLeft')}>
                        左上角
                    </Button>
                </Card>
            </div>
         );
    }
}
 
export default Notice;