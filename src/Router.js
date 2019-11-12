import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import App from './App'
import Admin from './admin'
import Button from './pages/ui/button'
class iRouter extends Component {
   
    render() { 
        return ( 
            <Router>
                <App>
                    <Route path="/admin" render ={ () =>
                        <Admin>
                            <Route path = "/admin/ui/buttons" component={Button}/>
                        </Admin>
                    } />
                </App>
            </Router>
         );
    }
}
 
export default iRouter;