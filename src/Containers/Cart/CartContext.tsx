import React, { createContext, useReducer } from "react";
import { CartReducer } from "./CartReducer";

type Props = {
  children: React.ReactNode;
};

interface ContextMethods {
  addToCart(payload: { id: number; price: number; name: string }): void;
  removeFromCart(payload: { id: number }): void;
  toggleCartContainer(): void;
  placeOrder(payload: { orderDetails: OrderDetails }): void;
  getRestaurantId(): void;
  setRestaurantId(payload: { id: string }): void;
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
  restaurantId: "",
  orderDetails: {
    orderId: 0,
    totalPrice: 0,
    orderedAt: "",
    esitmatedDelivery: "",
    status: "",
  },
  addToCart: () => null,
  removeFromCart: () => null,
  toggleCartContainer: () => null,
  placeOrder: () => null,
  getRestaurantId: () => null,
  setRestaurantId: () => null,
});

const InitialState: InitialCartState = {
  cart: [],
  checkout: false,
  total: "0",
  itemCount: 0,
  restaurantId: "",
  orderDetails: {
    orderId: 0,
    totalPrice: 0,
    orderedAt: "",
    esitmatedDelivery: "",
    status: "",
  },
};

const CartContextProvider = ({ children }: Props) => {
  const [cartContainerIsExpanded, setCartContainer] = React.useState(false);
  const [restaurantId, setRestaurantIdInState] = React.useState("");

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

  const placeOrder = (payload: { orderDetails: OrderDetails }) => {
    dispatch({
      type: "PLACE_ORDER",
      payload,
    });
  };

  const toggleCartContainer = () => {
    setCartContainer(!cartContainerIsExpanded);
  };

  const setRestaurantId = (payload: { id: string }) => {
    const { id } = payload;
    setRestaurantIdInState(id);
  };

  const getRestaurantId = () => {
    return restaurantId;
  };

  const contextValues = {
    addToCart,
    removeFromCart,
    toggleCartContainer,
    placeOrder,
    getRestaurantId,
    setRestaurantId,
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
