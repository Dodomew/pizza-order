import Action from "./actions/actions";

type CartItemProps = {
  menuItemId: number;
  quantity: number;
};

interface InitialState {
  cart: CartItemProps[];
  checkout: boolean;
}

export const CartReducer = (
  state: InitialState,
  action: Action
): InitialState => {
  const { type, payload } = action;

  switch (type) {
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
            },
          ],
        };
      }

    default:
      return state;
  }
};
