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
                                <Route  component={NoMatch}/>high
                            </Switch>
                        </Admin>
                    } />
                </App>
            </Router>
         );
    }
}
 
export default iRouter;