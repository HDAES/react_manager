import React, { Component  } from 'react';
import { Card , Button, Icon, Radio } from 'antd'
import Ityped from '../../../components/Ityped'
import '../ui.less'

const ButtonGroup = Button.Group;
class Buttons extends Component {
    constructor(props){
        super(props)
        this.state ={
            loading:true,
            size:'default'
        }
        this.handleChangeSzie = this.handleChangeSzie.bind(this)
        this.handleCloesLoading = this.handleCloesLoading.bind(this)
    }

    handleCloesLoading(){
        this.setState({
            loading:false
        })
    }
    handleChangeSzie(e){
        this.setState({
            size: e.target.value
        })
    }
    render() { 
        const texts = '标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。'
        return ( 
            <div className="card-list">
                <Ityped text={texts} />
                <Card title="基础按钮" className="card-warp" hoverable={true}>
                    <Button type="primary">Primary</Button>
                    <Button>Default</Button>
                    <Button type="dashed">Dashed</Button>
                    <Button type="danger">Danger</Button>
                    <Button disabled>button</Button>
                    <Button type="link">Link</Button>
                </Card>
                <Card title="图形按钮" hoverable={true} className="card-warp">
                    <Button icon="plus">创建</Button>
                    <Button icon="edit">编辑</Button>
                    <Button icon="delete">删除</Button>
                    <Button icon="search" shape="circle"></Button>
                    <Button icon="search" type="primary">搜索</Button>
                    <Button icon="download" type="primary">下载</Button>    
                </Card>
                <Card title="Loading按钮" hoverable={true} className="card-warp">
                    <Button type="primary" loading={this.state.loading}>Loading</Button>
                    <Button type="primary" shape="circle" loading={this.state.loading}></Button>
                    <Button loading={this.state.loading}>点击加载</Button>
                    <Button shape="circle" loading={this.state.loading}></Button>
                    <Button type="primary" onClick={this.handleCloesLoading}>关闭</Button>  
                </Card>
                <Card title="按钮组" hoverable={true} className="card-warp">
                    <ButtonGroup>
                        <Button type="primary" className="no-right-margin">
                            <Icon type="left" />
                            Go back
                        </Button>
                        <Button type="primary">
                            Go forward
                            <Icon type="right" />
                        </Button>
                    </ButtonGroup>
                </Card>
                <Card title="按钮尺寸" hoverable={true} className="card-warp">
                    <Radio.Group value={this.state.size} onChange={this.handleChangeSzie}>
                        <Radio value="small">小</Radio>
                        <Radio value="default">中</Radio>
                        <Radio value="large">大</Radio>
                    </Radio.Group>
                    <Button type="primary" size={this.state.size}>Primary</Button>
                    <Button size={this.state.size}>Default</Button>
                    <Button type="dashed" size={this.state.size}>Dashed</Button>
                    <Button type="danger" size={this.state.size}>Danger</Button>
                    <Button disabled size={this.state.size}>button</Button>
                    <Button type="link" size={this.state.size}>Link</Button>
                </Card>
            </div>
         )
    }
}
 
export default Buttons;