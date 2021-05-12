import React from 'react';
import {
  Switch,
  Route,
  BrowserRouter,
} from 'react-router-dom';
import Home from '../components/Home/Home';
import Form from '../components/Form/Form';

const Routes = () => (
  <BrowserRouter>
   <Switch>
      <Route exact path="/" component={Home} /> 
      <Route path="/create" component={Form}/>
      <Route path="/edit/:id" component={Form}/>
   </Switch>
  </BrowserRouter>
)


export default Routes;
