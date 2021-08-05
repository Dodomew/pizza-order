import Action from "./actions/actions";

type CartItemProps = {
  menuItemId: number;
  quantity: number;
};

interface InitialState {
  cart: CartItemProps[] | [];
  checkout: boolean;
}

export const CartReducer = (
  state: InitialState,
  action: Action
): InitialState => {
  const { type, payload } = action;

  switch (type) {
    case "ADD_TO_CART":
      console.log(payload);
      const newCart: CartItemProps[] = state.cart;
      const itemAlreadyExists = newCart.find(
        (item) => item.menuItemId === action.payload.id
      );

      if (itemAlreadyExists) {
        console.log("+1");
        itemAlreadyExists.quantity++;
      } else {
        console.log("new");
        newCart.push({
          menuItemId: action.payload.id,
          quantity: 1,
        });
      }

      console.log({ ...state, cart: newCart });

      return {
        ...state,
        cart: newCart,
      };

    default:
      return state;
  }
};
