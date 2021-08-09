import React, { useEffect } from "react";
import { postOrder } from "../../api/endpoints";
import "./cart.scss";
import CartCheckoutItem from "./CartCheckoutItem";
import { useCart } from "./CartContext";

const Cart = () => {
  const [currentOrderDetails, setCurrentOrderDetails] =
    React.useState<OrderDetails>();

  const {
    cartContainerIsExpanded,
    cart,
    orderDetails,
    total,
    placeOrder,
    getRestaurantId,
    toggleCartContainer,
  } = useCart();

  useEffect(() => {
    if (orderDetails && orderDetails.orderId) {
      setCurrentOrderDetails(orderDetails);
    }
  }, [orderDetails]);

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

    postOrder(requestOptions)
      .then((orderDetails) => {
        placeOrder({ orderDetails });
      })
      .catch((err) => {
        console.log("An error occured while placing the order.", err);
      });
  };

  return (
    <div className={"cart" + (cartContainerIsExpanded ? " is-expanded" : "")}>
      <h3>Cart</h3>
      <button onClick={toggleCartContainer}>Close cart X</button>
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
      {currentOrderDetails ? (
        <div className="cart-order-details">
          <p>Your order</p>
          <p>{currentOrderDetails.orderId}</p>
          <p>{currentOrderDetails.orderedAt}</p>
          <p>{currentOrderDetails.status}</p>
          <p>{currentOrderDetails.esitmatedDelivery}</p>
        </div>
      ) : null}
    </div>
  );
};

export default Cart;
