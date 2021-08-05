import React from 'react';
import Cart from "../Cart/Cart";
import RestaurantOverview from "../RestaurantOverview/RestaurantOverview";
import {Route, BrowserRouter as Router, Switch, Redirect} from 'react-router-dom'
import RestaurantDetailView from '../RestaurantDetailView/RestaurantDetailView';

const App = () => {
  return (
    <div className="page">
      <Router>
        <Switch>
          <Route exact path="/restaurants/:id" component={RestaurantDetailView} />
          <Route exact path="/restaurants/">
            <Redirect to="/"></Redirect>
          </Route>
          <Route exact path="/" component={RestaurantOverview}/> 
        </Switch>
      </Router>
      <Cart />
    </div>
  )
}

export default App;
