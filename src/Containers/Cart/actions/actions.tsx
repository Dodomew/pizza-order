type AddToCart = {
  type: "ADD_TO_CART";
  payload: {
    id: number;
  };
};

type Action = AddToCart;

export default Action;
