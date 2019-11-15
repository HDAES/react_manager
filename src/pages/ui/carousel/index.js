import React, { Component } from 'react';
import { Card , Carousel } from 'antd'
import Ityped from '../../../components/Ityped'

import '../ui.less'
class demo extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const texts = '当有一组平级的内容。当内容空间不足时，可以用走马灯的形式进行收纳，进行轮播展现。常用于一组图片或卡片轮播。'
        return ( 
            <div >
                <Ityped text={texts} />
                <Card title="文字轮播"  hoverable={true}>
                    <Carousel  autoplay effect="fade">
                        <div>
                            <h3>1</h3>
                        </div>
                        <div>
                            <h3>1</h3>
                        </div>
                        <div>
                            <h3>1</h3>
                        </div>
                    </Carousel>
                </Card>
                <Card title="图片轮播"  hoverable={true} className="slider-warp">
                    <Carousel  autoplay effect="fade" >
                        <div>
                           <img src="/carousel-img/carousel-1.jpg" alt=""/>
                        </div>
                        <div>
                            <img src="/carousel-img/carousel-2.jpg" alt=""/>
                        </div>
                        <div>
                            <img src="/carousel-img/carousel-3.jpg" alt=""/>
                        </div>
                    </Carousel>
                </Card>
            </div>
         );
    }
}
 
export default demo;
