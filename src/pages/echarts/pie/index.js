import React, { Component } from 'react';
import { Card } from 'antd';
//按需导入
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import echartTheme from '../echartTheme'
import ReactEcharts from 'echarts-for-react'
class Pie extends Component {
    state = {  }
    componentWillMount() {
        echarts.registerTheme('theme',echartTheme)
    }

    getOption = () => {
        let option = {
            title:{
                text:'用户骑行订单',
                x:'center',
            },
            tooltip:{
                formatter:'{a}<br/>{b}:{c}({d}%)'
            },
            legend:{
                orient:'vertical',
                top:10,
                right:10,
                data:['周一','周二','周三','周四','周五','周六','周日']
            },
            series:[{
                name:'订单量',
                type:'pie',
                data:[{
                    value:1000,
                    name:'周一'
                },{
                    value:2000,
                    name:'周二'
                },{
                    value:3000,
                    name:'周三'
                },{
                    value:4000,
                    name:'周四'
                },{
                    value:5000,
                    name:'周五'
                },{
                    value:3000,
                    name:'周六'
                },{
                    value:2000,
                    name:'周日'
                }]
            }]
        }
        return option
    }
    getOption2 = () => {
        let option = {
            title:{
                text:'用户骑行订单',
                x:'center',
            },
            tooltip:{
                formatter:'{a}<br/>{b}:{c}({d}%)'
            },
            legend:{
                orient:'vertical',
                top:10,
                right:10,
                data:['周一','周二','周三','周四','周五','周六','周日']
            },
            series:[{
                name:'订单量',
                type:'pie',
                radius:['50%',"80%"],
                center:['50%','60%'],
                data:[{
                    value:1000,
                    name:'周一'
                },{
                    value:2000,
                    name:'周二'
                },{
                    value:3000,
                    name:'周三'
                },{
                    value:4000,
                    name:'周四'
                },{
                    value:5000,
                    name:'周五'
                },{
                    value:3000,
                    name:'周六'
                },{
                    value:2000,
                    name:'周日'
                }]
            }]
        }
        return option
    }
    getOption3 = () => {
        let option = {
            title:{
                text:'用户骑行订单',
                x:'center',
            },
            tooltip:{
                formatter:'{a}<br/>{b}:{c}({d}%)'
            },
            legend:{
                orient:'vertical',
                top:10,
                right:10,
                data:['周一','周二','周三','周四','周五','周六','周日']
            },
            series:[{
                name:'订单量',
                type:'pie',
                center:['50%','60%'],
                data:[{
                    value:1000,
                    name:'周一'
                },{
                    value:2000,
                    name:'周二'
                },{
                    value:3000,
                    name:'周三'
                },{
                    value:4000,
                    name:'周四'
                },{
                    value:5000,
                    name:'周五'
                },{
                    value:3000,
                    name:'周六'
                },{
                    value:2000,
                    name:'周日'
                }].sort( (a,b) =>{
                    return a.value - b.value
                }),
                roseType:'radius'
            }]
        }
        return option
    }
    render() { 
        return ( 
            <div>
                <Card title="饼图图表之一">
                    <ReactEcharts 
                        option={this.getOption()}
                        theme='theme'
                        style={{height:500}}
                    />
                </Card>
                <Card title="饼图图表之二" style={{marginTop:10}}>
                    <ReactEcharts 
                        option={this.getOption2()}
                        theme='theme'
                        style={{height:500}}
                    />
                </Card>
                <Card title="饼图图表之三" style={{marginTop:10}}>
                    <ReactEcharts 
                        option={this.getOption3()}
                        theme='theme'
                        style={{height:500}}
                    />
                </Card>
            </div>
         );
    }
}
 
export default Pie;