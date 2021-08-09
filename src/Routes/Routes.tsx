import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Header from "../Components/Header/Header";
import RestaurantDetailView from "../Containers/RestaurantDetailView/RestaurantDetailView";
import RestaurantOverview from "../Containers/RestaurantOverview/RestaurantOverview";

const Routes = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/restaurants/:id" component={RestaurantDetailView} />
        <Route exact path="/restaurants/">
          <Redirect to="/"></Redirect>
        </Route>
        <Route exact path="/" component={RestaurantOverview} />
      </Switch>
    </Router>
  );
};

export default Routes;
