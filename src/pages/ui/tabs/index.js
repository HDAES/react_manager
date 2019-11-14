import React, { Component } from 'react'
import { Card , Tabs , message , Icon } from 'antd'
import Ityped from '../../../components/Ityped'
const { TabPane } = Tabs
class Message extends Component {
    
    constructor(props){
        super(props)
        this.newTabIndex = 0;
        const panes = [
            { title: 'Tab 1', content: 'Content of Tab 1', key: '1' },
            { title: 'Tab 2', content: 'Content of Tab 2', key: '2' },
            {
              title: 'Tab 3',
              content: 'Content of Tab 3',
              key: '3',
              closable: false,
            },
          ];
        this.state = {
            activeKey: panes[0].key,
            panes,
        }
    }

    onEdit(targetKey, action){
        this[action](targetKey);
    }
    onChange(activeKey){
        this.setState({ activeKey });
    }
    add = () => {
        const { panes } = this.state;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({ title: 'New Tab', content: 'Content of new Tab', key: activeKey });
        this.setState({ panes, activeKey });
      };
    
      remove = targetKey => {
        let { activeKey } = this.state;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
          if (pane.key === targetKey) {
            lastIndex = i - 1;
          }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (panes.length && activeKey === targetKey) {
          if (lastIndex >= 0) {
            activeKey = panes[lastIndex].key;
          } else {
            activeKey = panes[0].key;
          }
        }
        this.setState({ panes, activeKey });
      };


    callback(key){
        message.info(`你选择了第${key}页面`)
    }
   
    render() { 
        const texts = '提供平级的区域将大块内容进行收纳和展现，保持界面整洁。'
        return ( 
            <div className="card-list" >
                <Ityped text={texts} />
                <Card title="Tab页签" className="card-warp" hoverable={true}>
                    <Tabs defaultActiveKey="1" onChange={this.callback.bind(this)}>
                        <TabPane tab="Tab 1" key="1">
                            Content of Tab Pane 1
                        </TabPane>
                        <TabPane tab="Tab 2" key="2">
                            Content of Tab Pane 2
                        </TabPane>
                        <TabPane tab="Tab 3" key="3">
                            Content of Tab Pane 3
                        </TabPane>
                    </Tabs>
                </Card>
                <Card title="Tab带图的页签" className="card-warp" hoverable={true}>
                    <Tabs defaultActiveKey="1" onChange={this.callback.bind(this)}>
                        <TabPane tab={
                            <span>
                                <Icon type="apple"/>
                                Apple
                            </span>
                        } 
                        key="1">
                            Content of Tab Pane 1 -- Apple
                        </TabPane>
                        <TabPane tab={
                            <span>
                                <Icon type="android"/>
                                Android
                            </span>
                        }
                        key="2">
                            Content of Tab Pane 2 -- Android
                        </TabPane>
                    </Tabs>
                </Card>
                <Card title="Tab动态新增删除页签" className="card-warp" hoverable={true}>
                    <Tabs 
                        type="editable-card"
                        activeKey={this.state.activeKey}
                        onChange={this.onChange.bind(this)}
                        onEdit={this.onEdit.bind(this)}
                        >
                         {this.state.panes.map(pane => (
                            <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
                                {pane.content}
                            </TabPane>
                        ))}
                    </Tabs>
                </Card>
            </div>
         );
    }
}
 
export default Message;