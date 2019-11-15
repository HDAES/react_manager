import React, { Component } from 'react'
import { Card , Row ,Col, Modal } from 'antd'

class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    openGallery(imgUrl){
        this.setState({
            visible:true,
            imgUrl
        })
    }

    handleOk = e => {
        this.setState({
            visible: false,
        });
    };
    
    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };
    render() { 
        const imgs = [
            ['1.png','2.png','3.png','4.png','5.png'],
            ['6.png','7.png','8.png','9.png','10.png'],
            ['11.png','12.png','13.png','14.png','15.png'],
            ['16.png','17.png','18.png','19.png','20.png'],
            ['21.png','22.png','23.png','24.png','25.png']
        ]

        const imgList = imgs.map( (list,i) => list.map( (item,o) => 
            <Card
                key={i+''+o}
                style={{marginBottom:10}}
                onClick={this.openGallery.bind(this,'/gallery/'+item )}
                cover={<img src={'/gallery/'+item} alt="React"/>}
            >
                <Card.Meta 
                    title="React Admin"
                    description="I'm HADES"
                />
            </Card>
        ))
        return ( 
            <div className="Card-warp">
                <Row gutter={5}>
                    <Col md={5}>
                        {imgList[0]}
                    </Col>
                    <Col md={5}>
                        {imgList[1]}
                    </Col>
                    <Col md={5}>
                        {imgList[2]}
                    </Col>
                    <Col md={5}>
                        {imgList[3]}
                    </Col>
                    <Col md={4}>
                        {imgList[4]}
                    </Col>
                </Row>

                <Modal
                    width={300}
                    height={500}
                    title="Basic Modal"
                    footer={null}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    >
                   <img src={this.state.imgUrl} alt="" style={{width:'100%'}}/>
                </Modal>
            </div>
         );
    }
}
 
export default Gallery;