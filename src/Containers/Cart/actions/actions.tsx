interface AddToCart {
  type: "ADD_TO_CART";
  payload: {
    id: number;
    price: number;
    name: string;
  };
}

interface removeFromCart {
  type: "REMOVE_FROM_CART";
  payload: {
    id: number;
  };
}

interface UpdateCart {
  type: "UPDATE_CART";
}

interface PlaceOrder {
  type: "PLACE_ORDER";
  payload: {
    orderDetails: OrderDetails;
  };
}

interface GetRestaurantId {
  type: "GET_RESTAURANT_ID";
}

interface SetRestaurantId {
  type: "SET_RESTAURANT_ID";
  payload: {
    restaurantId: string;
  };
}

interface EmptyCart {
  type: "EMPTY_CART";
}

type Action =
  | AddToCart
  | removeFromCart
  | UpdateCart
  | EmptyCart
  | PlaceOrder
  | GetRestaurantId
  | SetRestaurantId;

export default Action;
