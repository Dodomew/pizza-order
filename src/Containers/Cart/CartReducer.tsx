import Action from "./actions/actions";

const totalSumOfItems = (cart: CartItemProps[]) => {
  let itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  let total = cart
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);
  return { itemCount, total };
};

const addToCart = (
  payload: { id: number; price: number; name: string },
  state: InitialCartState
) => {
  const { id, price, name } = payload;
  const isInCart = state.cart.some((item) => item.menuItemId === id);
  const newState = { ...state }; // copy state to avoid mutating directly

  if (isInCart) {
    // only increment corresponding item
    newState.cart = newState.cart.map((item) =>
      item.menuItemId === id
        ? {
            menuItemId: item.menuItemId,
            quantity: item.quantity + 1,
            price: item.price,
            name: item.name,
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
  const isInCart = state.cart.some((item) => item.menuItemId === id);

  if (!isInCart) {
    return { ...state };
  }

  const newState = { ...state };

  // if id is not the same, the item should stay in the array
  // if id matches, we decrement by 1. If quantity is now 0, remove it from array.
  newState.cart = state.cart.filter((item) => {
    if (item.menuItemId === id) {
      item.quantity--;
      if (item.quantity === 0) {
        return false;
      }
    }
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
      let newState = removeFromCart(action.payload, state);
      return newState;
    case "UPDATE_CART":
      return {
        ...state,
        ...totalSumOfItems(state.cart),
      };
    default:
      return state;
  }
};
