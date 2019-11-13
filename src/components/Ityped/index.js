import React, { Component } from 'react';
import { Card } from 'antd'
import { init } from 'ityped'
class Itypebd extends Component {
    
    componentDidMount() {
        const strings = new Array(this.props.text)
        const myElement = document.querySelector('#content')
        init(myElement, { 
            strings,
            disableBackTyping:true,
            showCursor: false, 
        })
    }
    render() { 
        return ( 
            <Card title="何时使用" hoverable={true} style={{flexBasis: '100%',marginBottom:20}}>
                <div id="content" style={{height:30}}></div>
            </Card>
         );
    }
}
 
export default Itypebd;