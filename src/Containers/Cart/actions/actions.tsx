type AddToCart = {
  type: "ADD_TO_CART";
  payload: {
    id: number;
    quantity: number;
  };
};

type Action = AddToCart;

export default Action;
