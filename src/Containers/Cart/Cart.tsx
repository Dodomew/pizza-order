import React from "react";
import "./cart.scss";
import CartCheckoutItem from "./CartCheckoutItem";
import { useCart } from "./CartContext";

const Cart = () => {
  const { cartContainerIsExpanded, cart, total } = useCart();

  return (
    <div className={"cart" + (cartContainerIsExpanded ? " is-expanded" : "")}>
      <h3>Cart</h3>
      {cart && cart.length ? (
        <ul>
          {cart.map((item) => {
            return (
              <CartCheckoutItem
                {...item}
                key={`cart_checkout_item_${item.name}_${item.menuItemId}`}
              />
            );
          })}
        </ul>
      ) : null}
      <h4>{total}</h4>
    </div>
  );
};

export default Cart;
