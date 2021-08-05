import React from "react";
import "./cart.scss";
import { useCart } from "./CartContext";

const Cart = () => {
  const { cartContainerIsExpanded, cart, total } = useCart();
  console.log(cart);
  console.log(total);

  return (
    <div className={"cart" + (cartContainerIsExpanded ? " is-expanded" : "")}>
      <h3>Cart</h3>
      {cart && cart.length ? (
        <ul>
          {cart.map((item) => {
            return (
              <li>
                <p>{item.quantity}</p>
                <p>{item.name}</p>
                <p>{item.price}</p>
              </li>
            );
          })}
        </ul>
      ) : null}
      <h4>{total}</h4>
    </div>
  );
};

export default Cart;
