import Action from "./actions/actions";

const totalSumOfItems = (cart: CartItemProps[]) => {
  let itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  let total = cart
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);
  return { itemCount, total };
};

export const CartReducer = (
  state: InitialCartState,
  action: Action
): InitialCartState => {
  switch (action.type) {
    case "ADD_TO_CART":
      const isInCart = state.cart.some(
        (item) => item.menuItemId === action.payload.id
      );

      if (isInCart) {
        // only increment corresponding item
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.menuItemId === action.payload.id
              ? {
                  menuItemId: item.menuItemId,
                  quantity: item.quantity + 1,
                  price: item.price,
                  name: action.payload.name,
                }
              : item
          ),
        };
      } else {
        // add new item to state
        return {
          ...state,
          cart: [
            ...state.cart,
            {
              menuItemId: action.payload.id,
              quantity: 1,
              price: action.payload.price,
              name: action.payload.name,
            },
          ],
        };
      }
    case "REMOVE_FROM_CART":
      return {
        ...state,
      };
    case "UPDATE_CART":
      return {
        ...state,
        ...totalSumOfItems(state.cart),
      };
    default:
      return state;
  }
};
