import React, { Component , Fragment } from 'react';
import { Card , Button , notification  } from 'antd'
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
        return ( 
            <Fragment>
                <Card title="通知提示框" className="Card-warp">
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
                <Card title="通知提示框" className="Card-warp">
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
            </Fragment>
         );
    }
}
 
export default Notice;