import React, { createContext, useReducer } from "react";
import { CartReducer } from "./CartReducer";

type CartItemProps = {
  menuItemId: number;
  quantity: number;
};

type Props = {
  children: React.ReactNode;
};

interface ContextMethods {
  addToCart(payload: { id: number; quantity: number }): void;
}

interface CartContextProps extends ContextMethods {
  cart: CartItemProps[];
  checkout: boolean;
}

interface InitialState {
  cart: CartItemProps[] | [];
  checkout: boolean;
}

export const CartContext = createContext<CartContextProps>({
  cart: [],
  checkout: false,
  addToCart: (payload: { id: number; quantity: number }) => null,
});

const CartContextProvider = ({ children }: Props) => {
  const InitialState: InitialState = {
    cart: [],
    checkout: false,
  };

  const [state, dispatch] = useReducer(CartReducer, InitialState);

  const addToCart = (payload: { id: number; quantity: number }) => {
    dispatch({
      type: "ADD_TO_CART",
      payload,
    });
  };

  const contextValues = {
    addToCart,
    ...state,
  };

  return (
    <CartContext.Provider value={contextValues}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return React.useContext(CartContext);
};

export default CartContextProvider;
