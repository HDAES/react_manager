import React, { Component } from 'react';
import util from '../../utils/utils'
import Axios from '../../axios'
import './index.less'
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { 
           
         }
    }

    componentDidMount() {
        this.setState({
            name:'Hades'
        })
        setInterval( ()=>{
            let now = util.formateDate(new Date())
            this.setState({
                now
            })
        },1000)
        this.getWeatherApiData()
    }


    getWeatherApiData(){
        let city = '重庆'
        let ak = 'ohA7QHfg0BBrpiY4kyuIAAsD'
        Axios.jsonp({
            url:'http://api.map.baidu.com/telematics/v3/weather?location='+encodeURIComponent(city)+'&output=json&ak='+ak
        }).then( (res) =>{
            if(res.status === 'success'){
                let weathers = res.results[0].weather_data[0]
                this.setState({
                    dayPictureUrl:weathers.dayPictureUrl,
                    weather:weathers.weather
                })
            }
        })
    }

    render() { 
        return ( 
            <div className="header">
                <div className="header-top">
                    <span>欢迎: {this.state.name}</span>
                    {/* <a href="#">退出</a> */}
                </div>
                <div className="header-botton">
                    <div className="breadcrumbs">首页</div>
                    <div className="weather">
                        <span>{this.state.now}</span>
                        <span className="weather-img">
                            <img className="weatherImg" src={this.state.dayPictureUrl} alt=""/>
                            <span>{this.state.weather}</span>
                        </span>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Header;