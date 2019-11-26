import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Menu } from 'antd';
import './index.less'
import menuList from '../../config/menuConfig'

const { SubMenu } = Menu;
class NavLeft extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    componentDidMount() {
        const menuTreeNode =  this.renderMenu(menuList)
        this.setState({
            menuTreeNode
        })
    }
    renderMenu = (data) => {
        return data.map( (item) => {
            if(item.children){
                return (
                    <SubMenu title={item.title} key={item.key}>
                        { this.renderMenu(item.children) }
                    </SubMenu>
                )
            }
            return  <Menu.Item title={item.title} key={item.key}><Link to={item.key}>{item.title}</Link></Menu.Item>
        })
    }
    render() { 
        return ( 
            <div className="navleft">
                <div className="logo">
                    <img src="/assets/logo-ant.svg" alt="logo"/>
                    <h1>Hades MS</h1>
                </div>
                
                    <Menu theme="dark" >
                        {this.state.menuTreeNode}
                    </Menu>
                
            </div>
            
         );
    }
}
 
export default NavLeft;