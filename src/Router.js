import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import App from './App'
import Admin from './admin'
import Button from './pages/ui/button'
import Modals from './pages/ui/models'
import Loadings from './pages/ui/loading'
import Notice from './pages/ui/notice'
import Message from './pages/ui/message'
import Tabs from './pages/ui/tabs'
import Gallery from './pages/ui/gallery'
import Carousel from './pages/ui/carousel'
import Formlogin from './pages/form/login'
import Register from './pages/form/register'
import Basic from './pages/tables/basicTable'
import HighTable from './pages/tables/highTable';
import NoMatch from './pages/nomatch'
import City from './pages/city';
import Order from './pages/order';
import Common from './common'
import Detail from './pages/order/detail';
import User from './pages/user';
class iRouter extends Component {
   
    render() { 
        return ( 
            <Router>
                <App>
                    <Route path="/admin" render ={ () =>
                        <Admin>
                            <Switch>
                                <Route path = "/admin/ui/buttons" component={Button}/>
                                <Route path = "/admin/ui/modals" component={Modals}/>
                                <Route path = "/admin/ui/loadings" component={Loadings}/>
                                <Route path = "/admin/ui/notification" component={Notice}/>
                                <Route path="/admin/ui/messages" component={Message} />
                                <Route path="/admin/ui/tabs" component={Tabs} />
                                <Route path="/admin/ui/gallery" component={Gallery} />
                                <Route path="/admin/ui/carousel" component={Carousel} />
                                <Route path="/admin/form/login" component={Formlogin} />
                                <Route path="/admin/form/reg" component={Register} />
                                <Route path="/admin/table/basic" component={Basic} />
                                <Route path="/admin/table/high" component={HighTable} />
                                <Route path="/admin/city" component={City} />
                                <Route path="/admin/order" component={Order} />
                                <Route path="/admin/user" component={User} />
                                <Route  component={NoMatch}/>
                            </Switch>
                        </Admin>
                    } />
                    <Route path="/common" render={ () =>
                        <Common>
                            <Switch>
                                <Route path="/common/order/detail/:orderId" component={Detail}/>
                            </Switch>
                        </Common>
                    } />
                </App>
            </Router>
         );
    }
}
 
export default iRouter;