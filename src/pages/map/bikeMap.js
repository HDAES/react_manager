import React, { Component } from 'react';
import { Card, Form, Select, DatePicker, Button } from 'antd';
import axios from '../../axios'
const FormItem = Form.Item
const Option = Select.Option
class BikeMap extends Component {
    state = {  
        bikemap:{
            total:0
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData = () =>{
        axios.http({
            url:'/bikemap'
        }).then( ( res ) =>{
            if(res.code === 0){
                this.setState({
                    bikemap:res.data
                })
                this.renderMap(res.data)
            }
        }) 
    }

    renderMap = (res) => {
        this.map =  new window.BMap.Map('bikeMap') 
        //添加地图控件
        this.addMapControl()
        //服务区域
        this.drawServiceArea(res.limit_area)
        //绘制车辆
        this.drawBike(res.bikemap)
        //绘制路线
        this.drawBikeRoute( res.bikerouter)
    }
    addMapControl = () => {
        this.map.addControl(new window.BMap.OverviewMapControl()); 
        this.map.addControl(new window.BMap.ScaleControl({ anchor:window.BMAP_ANCHOR_TOP_RIGHT}));    
        this.map.addControl(new window.BMap.NavigationControl({ anchor:window.BMAP_ANCHOR_TOP_RIGHT}));
        this.map.enableScrollWheelZoom(true);    
    }
    drawServiceArea = (limit_area) =>{
        let map = this.map
        let trackPoint = [ ]
        let total_lon = 0
        let totle_lat = 0
        limit_area.forEach( ( item ) =>{
            let altlon = item.split(',')
            total_lon = total_lon + parseFloat(altlon[0]) 
            totle_lat = totle_lat + parseFloat(altlon[1])
            trackPoint.push( new window.BMap.Point(altlon[0],altlon[1]))
        })
        let polygon = new window.BMap.Polygon(trackPoint,{
            strokeColor:"#CE0000",
            strokeWeight:4,
            strokeOpacity:1,
            fillColor:'#FF8605',
            fillOpacity:0.5
        })
        map.addOverlay(polygon)
        //计算中心点
        map.centerAndZoom(new window.BMap.Point(total_lon/limit_area.length,totle_lat/limit_area.length), 11);
    }
    drawBike = ( bilemap ) => {
        let map = this.map
        let icon = new window.BMap.Icon('/assets/bike.jpg',new window.BMap.Size(36,42),{ 
            imageSize:new window.BMap.Size(36,42),
            anchor:new window.BMap.Size(36,42)
        })
        bilemap.forEach( (item) => {
            let altlon = item.split(',')
            let point = new window.BMap.Point(altlon[0],altlon[1])
            map.addOverlay( new window.BMap.Marker(point,{icon}))
        })
    }
    drawBikeRoute = ( bikerouter ) =>{
        let map = this.map
        let trackPoint = [ ]
        let startPoint = new window.BMap.Point(bikerouter[0].split(',')[0], bikerouter[0].split(',')[1])
        let endPoint = new window.BMap.Point(bikerouter[bikerouter.length -1].split(',')[0], bikerouter[bikerouter.length -1].split(',')[1])
        bikerouter.forEach( ( item ) => {
            let altlon = item.split(',')
            trackPoint.push( new window.BMap.Point(altlon[0],altlon[1]))
        })
        let startIcon = new window.BMap.Icon('/assets/start_point.png',new window.BMap.Size(36,42),{ 
            imageSize:new window.BMap.Size(36,42),
            anchor: new window.BMap.Size(18, 42)
        })
        let endIcon = new window.BMap.Icon('/assets/end_point.png',new window.BMap.Size(36,42),{ 
            imageSize:new window.BMap.Size(36,42),
            anchor: new window.BMap.Size(18, 42)
        })
        let startMarker = new window.BMap.Marker( startPoint ,{ icon: startIcon})
        let endMarker = new window.BMap.Marker( endPoint ,{ icon: endIcon})
        map.addOverlay(startMarker)
        map.addOverlay(endMarker)

        //绘制路线

        let  polyline = new window.BMap.Polyline(trackPoint,{
            strokeColor:"#1869ad",
            strokeWeight:3,
            strokeOpacity:1
        })
        map.addOverlay(polyline)
    }
    render() { 
        const { bikemap } = this.state
        return ( 
            <div className="bikemap">
                <Card>
                    <FilterForm />
                </Card>
                <Card>
                    <div>共有{bikemap.total}辆车</div>
                    <div id="bikeMap" style={{height:600}}></div>
                </Card>
            </div>
         );
    }
}
 
export default BikeMap;


class FilterForm extends Component{
    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <Form layout="inline">
                <FormItem label="城市">
                    {
                        getFieldDecorator('city')(
                            <Select placeholder="全部" style={{width:100}}>
                                <Option value="">全部</Option>
                                <Option value="1">重庆</Option>
                                <Option value="2">成都</Option>
                                <Option value="3">背景</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem>
                    {
                        getFieldDecorator('start_time')(
                           <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
                        )
                    }
                </FormItem>
                <FormItem label="~" colon={false}>
                    {
                        getFieldDecorator('end_time')(
                           <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
                        )
                    }
                </FormItem>
                <FormItem label="订单状态" >
                    {
                        getFieldDecorator('status')(
                            <Select placeholder="全部" style={{width:100}}>
                                <Option value="">全部</Option>
                                <Option value="1">进行中</Option>
                                <Option value="2">行程结束</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem  >
                    <Button type="primary" style={{marginRight:20}}>查询</Button>
                    <Button>重置</Button>
                </FormItem>
            </Form>
        )
    }
}

FilterForm = Form.create()(FilterForm)