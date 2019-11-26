import React, { Component } from 'react';
import CHeader from './components/CHeader';
import { Row } from 'antd';

class Common extends Component {
   
    render() { 
        return ( 
            <div className="common">
                <CHeader />
                <Row>{this.props.children}</Row>
            </div>
         );
    }
}
 
export default Common;