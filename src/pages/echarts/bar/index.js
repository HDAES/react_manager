import React, { Component } from 'react';
import { Card } from 'antd';
//按需导入
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import echartTheme from '../echartTheme'
import ReactEcharts from 'echarts-for-react'
class Bar extends Component {
    state = {  }
    componentWillMount() {
        echarts.registerTheme('theme',echartTheme)
    }

    getOption = () => {
        let option = {
            title:{
                text:'用户骑行订单'
            },
            tooltip:{
                trigger:'axis'
            },
            xAxis:{
                data:['周一','周二','周三','周四','周五','周六','周日']
            },
            yAxis:{
                type:'value'
            },
            series:[{
                name:'订单量',
                type:'bar',
                data:[1000,2000,3000,4000,3500,2000,1500]
            }]
        }
        return option
    }
    getOption2 = () => {
        let option = {
            title:{
                text:'用户骑行订单'
            },
            legend:{
                data:['ofo','摩拜','小蓝']
            },
            tooltip:{
                trigger:'axis'
            },
            xAxis:{
                data:['周一','周二','周三','周四','周五','周六','周日']
            },
            yAxis:{
                type:'value'
            },
            series:[{
                name:'ofo',
                type:'bar',
                data:[1000,2000,2800,4000,4500,3000,2000]
            },{
                name:'摩拜',
                type:'bar',
                data:[1100,2300,3300,4500,5500,3500,3000]
            },{
                name:'小蓝',
                type:'bar',
                data:[800,1800,2700,3500,4000,3000,2500]
            }]

        }
        return option
    }
    render() { 
        return ( 
            <div>
                <Card title="柱形图表之一">
                    <ReactEcharts 
                        option={this.getOption()}
                        theme='theme'
                        style={{height:500}}
                    />
                </Card>
                <Card title="柱形图表之二" style={{marginTop:10}}>
                    <ReactEcharts 
                        option={this.getOption2()}
                        theme='theme'
                        style={{height:500}}
                    />
                </Card>
            </div>
         );
    }
}
 
export default Bar;