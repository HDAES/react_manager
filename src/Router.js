import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch ,Redirect} from "react-router-dom";
import App from "./App";
import Admin from "./admin";
import Button from "./pages/ui/button";
import Modals from "./pages/ui/models";
import Loadings from "./pages/ui/loading";
import Notice from "./pages/ui/notice";
import Message from "./pages/ui/message";
import Tabs from "./pages/ui/tabs";
import Gallery from "./pages/ui/gallery";
import Carousel from "./pages/ui/carousel";
import Formlogin from "./pages/form/login";
import Register from "./pages/form/register";
import Basic from "./pages/tables/basicTable";
import HighTable from "./pages/tables/highTable";
import NoMatch from "./pages/nomatch";
import City from "./pages/city";
import Order from "./pages/order";
import Common from "./common";
import Detail from "./pages/order/detail";
import User from "./pages/user";
import BikeMap from "./pages/map/bikeMap";
import Bar from "./pages/echarts/bar";
import Pie from "./pages/echarts/pie";
import Line from "./pages/echarts/line";
import PermissionUser from "./pages/permission";
import Home from "./pages/home";
class iRouter extends Component {
  render() {
    return (
      <Router>
        <App>
          <Switch>
            <Route path="/common" render={() => (
                <Common>
                  <Route path="/common/order/detail/:orderId" component={Detail}/>
                </Common>
              )}
            />
            <Route path="/" render={() => (
                <Admin>
                  <Switch>
                    <Route path="/ui/buttons" component={Button} />
                    <Route path="/ui/modals" component={Modals} />
                    <Route path="/ui/loadings" component={Loadings} />
                    <Route path="/ui/notification" component={Notice} />
                    <Route path="/ui/messages" component={Message} />
                    <Route path="/ui/tabs" component={Tabs} />
                    <Route path="/ui/gallery" component={Gallery} />
                    <Route path="/ui/carousel" component={Carousel} />
                    <Route path="/form/login" component={Formlogin} />
                    <Route path="/form/reg" component={Register} />
                    <Route path="/table/basic" component={Basic} />
                    <Route path="/table/high" component={HighTable} />
                    <Route path="/city" component={City} />
                    <Route path="/order" component={Order} />
                    <Route path="/user" component={User} />
                    <Route path="/bikeMap" component={BikeMap} />
                    <Route path="/charts/bar" component={Bar} />
                    <Route path="/charts/pie" component={Pie} />
                    <Route path="/charts/line" component={Line} />
                    <Route path="/permission" component={PermissionUser} />
                    <Route path="/home" component={Home} />
                    <Redirect to="/home" />
                    <Route component={NoMatch} />
                  </Switch>
                </Admin>
              )}
            />
          </Switch>
        </App>
      </Router>
    );
  }
}

export default iRouter;
