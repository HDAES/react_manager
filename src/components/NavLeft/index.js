import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Menu } from 'antd';
import './index.less'
import menuList from '../../config/menuConfig'
import { connect } from 'react-redux'
import { switchMenu } from '../../redux/action'
const { SubMenu } = Menu;
class NavLeft extends Component {
    state = { 
        currentKey:''
     }
    componentDidMount() {
        const menuTreeNode =  this.renderMenu(menuList)
        let currentKey = window.location.pathname
        this.setState({
            menuTreeNode,
            currentKey
        })
    }
    handleClick = ({item ,key}) =>{
        const  { dispatch } = this.props
        dispatch(switchMenu(item.props.title))
        this.setState({
            currentKey:key
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
        const { currentKey} = this.state
        return ( 
            <div className="navleft">
                <div className="logo">
                    <img src="/assets/logo-ant.svg" alt="logo"/>
                    <h1>Hades MS</h1>
                </div>
                
                    <Menu 
                        onClick={this.handleClick}
                        selectedKeys={currentKey}
                        theme="dark" >
                        {this.state.menuTreeNode}
                    </Menu>
                
            </div>
            
         );
    }
}
 
export default connect()(NavLeft);