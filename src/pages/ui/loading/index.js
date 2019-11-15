import React, { Component } from 'react';
import { Card , Icon , Spin, Alert ,Switch} from 'antd'
import Ityped from '../../../components/Ityped'
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
        const texts = '页面局部处于等待异步数据或正在渲染过程时，合适的加载动效会有效缓解用户的焦虑。'
        const icon = <Icon type="loading" style={{fontSize:'20px'}}/>
        return ( 
            <div className="card-list">
                <Ityped text={texts} />
                <Card title="spin的用法" className="card-warp" hoverable={true}>
                    <Spin size="small"/>
                    <Spin style={{margin:'0 10px'}}/>
                    <Spin size="large"/>
                    <Spin indicator={icon} style={{margin:'0 10px'}} />
                </Card>

                <Card title="内容遮罩" className="card-warp" hoverable={true}>
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