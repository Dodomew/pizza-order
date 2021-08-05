import React from 'react';
import Cart from "../Cart/Cart";
import RestaurantOverview from "../RestaurantOverview/RestaurantOverview";
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom'
import RestaurantDetailView from '../RestaurantDetailView/RestaurantDetailView';

const App = () => {
  return (
    <div className="page">
      <Router>
        <Switch>
          <Route exact path="/" component={RestaurantOverview}/> 
          <Route exact path="/restaurants/:uid" component={RestaurantDetailView} />
        </Switch>
      </Router>
      <Cart />
    </div>
  )
}

export default App;
