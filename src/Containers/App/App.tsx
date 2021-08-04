import React from 'react';
import Cart from "../Cart/Cart";
import RestaurantOverview from "../RestaurantOverview/RestaurantOverview";

const App = () => {
  return (
    <div className="page">
      <RestaurantOverview />
      <Cart />
    </div>
  )
}

export default App;
