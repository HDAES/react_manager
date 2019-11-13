import React, { Component } from 'react';

import { Card , Icon , Spin, Alert ,Switch} from 'antd'
import '../ui.less'
class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            loading:true
         }
         this.bindleChangeLoading = this.bindleChangeLoading.bind(this)
    }
   
    bindleChangeLoading(e){
        this.setState({
            loading:e
        })
    }
    render() { 
        const icon = <Icon type="loading" style={{fontSize:'20px'}}/>
        return ( 
            <div>
                <Card title="spin的用法" className="Card-warp">
                    <Spin size="small"/>
                    <Spin style={{margin:'0 10px'}}/>
                    <Spin size="large"/>
                    <Spin indicator={icon} style={{margin:'0 10px'}} />
                </Card>

                <Card title="内容遮罩" className="Card-warp">
                    <Alert
                        message="React"
                        description="欢迎来到React高级教程"
                        type="info"
                    />
                   
                    <Spin>
                        <Alert
                            message="React"
                            description="欢迎来到React高级教程"
                            type="warning"
                        />
                    </Spin>

                    <Spin tip="加载中" spinning={this.state.loading} >
                        <Alert
                            message="React"
                            description="欢迎来到React高级教程"
                            type="warning"
                        />
                    </Spin>
                    <Switch checked={this.state.loading} onChange={this.bindleChangeLoading} />
                </Card>
            </div>
         );
    }
}
 
export default Loading;