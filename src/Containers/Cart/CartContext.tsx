import React, { createContext, useReducer } from "react";
import { CartReducer } from "./CartReducer";

type Props = {
  children: React.ReactNode;
};

interface ContextMethods {
  addToCart(payload: { id: number; price: number; name: string }): void;
  removeFromCart(payload: { id: number }): void;
  toggleCartContainer(): void;
}

interface CartContextProps extends InitialCartState, ContextMethods {
  cartContainerIsExpanded: boolean;
}

export const CartContext = createContext<CartContextProps>({
  cart: [],
  checkout: false,
  cartContainerIsExpanded: false,
  total: "0",
  itemCount: 0,
  addToCart: (payload: { id: number; price: number; name: string }) => null,
  removeFromCart: (payload: { id: number }) => null,
  toggleCartContainer: () => null,
});

const CartContextProvider = ({ children }: Props) => {
  const [cartContainerIsExpanded, setCartContainer] = React.useState(false);
  const InitialState: InitialCartState = {
    cart: [],
    checkout: false,
    total: "0",
    itemCount: 0,
  };

  const [state, dispatch] = useReducer(CartReducer, InitialState);

  const addToCart = (payload: { id: number; price: number; name: string }) => {
    dispatch({
      type: "ADD_TO_CART",
      payload,
    });

    dispatch({
      type: "UPDATE_CART",
    });
  };

  const removeFromCart = (payload: { id: number }) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload,
    });

    dispatch({
      type: "UPDATE_CART",
    });
  };

  const toggleCartContainer = () => {
    setCartContainer(!cartContainerIsExpanded);
  };

  const contextValues = {
    addToCart,
    removeFromCart,
    toggleCartContainer,
    cartContainerIsExpanded,
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
