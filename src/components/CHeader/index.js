import React, { Component } from 'react';
import './index.less'
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom'
class CHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <Row className="c-header">
                <Col className="logo" span={4}>
                    <img src="/assets/logo-ant.svg" alt="logo" />
                    <div className="lable">Hades通用管理系统</div>
                </Col>
                <Col className="weclome" span={20}>
                    <div >欢迎，Hades</div>
                    <Link to="/" className="quit" >退出</Link>
                </Col>
            </Row>
         );
    }
}
 
export default CHeader;