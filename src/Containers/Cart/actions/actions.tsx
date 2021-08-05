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

type Action = AddToCart | removeFromCart | UpdateCart;

export default Action;
