import React from "react";
import { postOrder } from "../../api/endpoints";
import "./cart.scss";
import CartCheckoutItem from "./CartCheckoutItem";
import { useCart } from "./CartContext";

const Cart = () => {
  const { cartContainerIsExpanded, cart, total, placeOrder, getRestaurantId } =
    useCart();

  const handlePlaceOrder = async () => {
    const restaurantId = getRestaurantId();
    const newCart = cart.map((item) => {
      return {
        menuItemId: item.menuItemId,
        quantity: item.quantity,
      };
    });

    const body = { cart: newCart, restaurantId: restaurantId };

    const requestOptions: RequestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };

    const orderDetails = await postOrder(requestOptions);

    placeOrder({ orderDetails });
  };

  return (
    <div className={"cart" + (cartContainerIsExpanded ? " is-expanded" : "")}>
      <h3>Cart</h3>
      {cart && cart.length ? (
        <>
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
          <button onClick={handlePlaceOrder}>Place order</button>
        </>
      ) : null}
      <h4>{total}</h4>
    </div>
  );
};

export default Cart;
