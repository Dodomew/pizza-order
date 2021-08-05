interface AddToCart {
  type: "ADD_TO_CART";
  payload: {
    id: number;
  };
}

interface ToggleCartContainer {
  type: "TOGGLE_CART_CONTAINER";
}

type Action = AddToCart | ToggleCartContainer;

export default Action;
