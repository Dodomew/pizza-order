import Action from "./actions/actions";

const totalSumOfItems = (state: InitialCartState) => {
  const newState = { ...state };
  newState.itemCount = newState.cart.reduce(
    (total, item) => total + item.quantity,
    0
  );
  newState.total = newState.cart
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  return { ...state, ...newState };
};

const addToCart = (
  payload: { id: number; price: number; name: string },
  state: InitialCartState
) => {
  const { id, price, name } = payload;
  const newState = { ...state }; // copy state to avoid mutating directly
  const isInCart = newState.cart.some((item) => item.menuItemId === id);

  if (isInCart) {
    // only increment corresponding item
    newState.cart = newState.cart.map((item) =>
      item.menuItemId === id
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item
    );
  } else {
    // add new item to state
    newState.cart = [
      ...newState.cart,
      {
        menuItemId: id,
        quantity: 1,
        price: price,
        name: name,
      },
    ];
  }
  // merge copied state with the original state
  return { ...state, ...newState };
};

const removeFromCart = (payload: { id: number }, state: InitialCartState) => {
  const { id } = payload;
  const newState = { ...state };
  const isInCart = newState.cart.some((item) => item.menuItemId === id);

  if (!isInCart) {
    return { ...state, ...newState };
  }

  // if id is not the same, the item should stay in the array
  // if id matches, we decrement by 1. If quantity is now 0, remove it from array.
  newState.cart = newState.cart.map((item) =>
    item.menuItemId === id
      ? {
          ...item,
          quantity: item.quantity - 1,
        }
      : item
  );

  newState.cart = newState.cart.filter((item) => {
    if (item.quantity === 0) return false;
    return true;
  });

  return { ...state, ...newState };
};

export const CartReducer = (
  state: InitialCartState,
  action: Action
): InitialCartState => {
  switch (action.type) {
    case "ADD_TO_CART":
      return addToCart(action.payload, state);
    case "REMOVE_FROM_CART":
      return removeFromCart(action.payload, state);
    case "UPDATE_CART":
      return totalSumOfItems(state);
    default:
      return state;
  }
};
