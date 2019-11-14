import React, { Component } from 'react';
import { Row, Col } from 'antd'
class demo extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                <Row gutter={10}>
                    <Col md={12} style={{backgroundColor:'pink'}}>1</Col>
                    <Col md={12} style={{backgroundColor:'red'}}>2</Col>
                </Row>
            </div>
         );
    }
}
 
export default demo;
