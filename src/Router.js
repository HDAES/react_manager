import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import App from './App'
import Admin from './admin'
import Button from './pages/ui/button'
import Modals from './pages/ui/models'
import Loadings from './pages/ui/loading'
import Notice from './pages/ui/notice'
import NoMatch from './pages/nomatch'
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
                                <Route  component={NoMatch}/>
                            </Switch>
                        </Admin>
                    } />
                </App>
            </Router>
         );
    }
}
 
export default iRouter;