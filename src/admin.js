import React, { Component } from 'react';
import { Row , Col } from 'antd'
import Header from './components/Header'
import Footer from './components/Footer'
import NavLeft from './components/NavLeft'
import { Scrollbars } from 'react-custom-scrollbars';
import './style/common.less'
class Admin extends Component {

    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
           <Row className="container">
               <Col span={3} className="nav-left">
                   <NavLeft />
               </Col>
               <Col span={21} className="main">
                   <Header />
                    <Row className="content">
                        <Scrollbars>
                            {this.props.children}
                        </Scrollbars>
                    </Row>
                   
                   
                    <Footer />
               </Col>
           </Row>
         );
    }
}
 
export default Admin;