import React, { Component } from 'react';
import { Card } from 'antd';
import axios from '../../axios'
import './index.less'
class Detail extends Component {
    state = {  
        info:''
    }

    componentDidMount() {
        let orderId = this.props.match.params.orderId
        if(orderId){
            this.getDetailInfo(orderId)
        }
    }
    getDetailInfo = (orderId) =>{
        axios.http({
            url:'/order/details',
            data:{
                params:{
                    orderId
                }
            }
        }).then( (res) =>{
            if(res.code === 0){
                this.setState({
                    info:res.data
                })
                this.renderMap(res.data)
            }
        })
    }

    renderMap = (res) =>{
        this.map =  new window.BMap.Map('orderDetailMap') 
        this.addMapControl()
        this.drawBikeRoute(res.position_list)
        this.drawServiceArea(res.arealist)
    }
    //添加地图控件
    addMapControl = () =>{
        let map = this.map
        map.addControl(new window.BMap.OverviewMapControl()); 
        map.addControl(new window.BMap.ScaleControl({ anchor:window.BMAP_ANCHOR_TOP_RIGHT}));    
        map.addControl(new window.BMap.NavigationControl({ anchor:window.BMAP_ANCHOR_TOP_RIGHT}));    
       
    }
    //绘制地图
    drawBikeRoute = (positionlist) =>{
        let map = this.map
        let startPoint = ''
        let endPoint = ''
        if(positionlist.length >0){
            let  first = positionlist[0]
            let  last = positionlist[positionlist.length-1]
            startPoint = new window.BMap.Point(first.lon,first.lat)
            let startIcon = new window.BMap.Icon('/assets/start_point.png',new window.BMap.Size(36,42),{ 
                imageSize:new window.BMap.Size(36,42),
                anchor:new window.BMap.Size(36,42)
            })
            let startMarker = new window.BMap.Marker( startPoint ,{ icon: startIcon})
            map.addOverlay(startMarker)

            endPoint = new window.BMap.Point(last.lon,last.lat)
            let endIcon = new window.BMap.Icon('/assets/end_point.png',new window.BMap.Size(36,42),{ 
                imageSize:new window.BMap.Size(36,42),
                anchor:new window.BMap.Size(36,42)
            })
            let endMarker = new window.BMap.Marker( endPoint ,{ icon: endIcon})
            map.addOverlay(endMarker)

            //连接路线图
            let trackPoint = []
            positionlist.forEach((item) => {
                trackPoint.push(new window.BMap.Point(item.lon,item.lat))
            })

            let  polyline = new window.BMap.Polyline(trackPoint,{
                strokeColor:"#1869ad",
                strokeWeight:3,
                strokeOpacity:1
            })
            map.addOverlay(polyline)
            map.centerAndZoom(endPoint, 11);
        }
    }
    //绘制服务区
    drawServiceArea = (arealist) => {
        let map = this.map
        let trackPoint = []
        arealist.forEach((item) => {
            trackPoint.push(new window.BMap.Point(item.lon,item.lat))
        })
        let polygon = new window.BMap.Polygon(trackPoint,{
            strokeColor:"#CE0000",
            strokeWeight:4,
            strokeOpacity:1,
            fillColor:'#FF8605',
            fillOpacity:0.5
        })
        map.addOverlay(polygon)
    }
    render() { 
        const { info } = this.state
        return ( 
                <Card className="detail-card">
                    <div id="orderDetailMap" className="orderDetailMap"></div>
                    <div className="detail-items">
                        <div className="item-title">基础信息</div>
                        <ul className="detail-form">
                            <li>
                                <div className="detail-form-left">用车模式</div>
                                <div className="detail-form-content">{info.mode === 1?'服务区':'停车点'}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">订单编号</div>
                                <div className="detail-form-content">{info.order_sn}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">车辆编号</div>
                                <div className="detail-form-content">{info.bike_sn}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">用户姓名</div>
                                <div className="detail-form-content">{info.user_name}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">手机号码</div>
                                <div className="detail-form-content">{info.mobile}</div>
                            </li>
                        </ul>
                    </div>
                    <div className="detail-items">
                        <div className="item-title">行驶轨迹</div>
                        <ul className="detail-form">
                            <li>
                                <div className="detail-form-left">行驶起点</div>
                                <div className="detail-form-content">{info.start_location}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">行驶终点</div>
                                <div className="detail-form-content">{info.end_location}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">行驶里程</div>
                                <div className="detail-form-content">{info.distance/1000 +'公里'}</div>
                            </li>
                        </ul>
                    </div>
                </Card>
         );
    }
}
 
export default Detail;