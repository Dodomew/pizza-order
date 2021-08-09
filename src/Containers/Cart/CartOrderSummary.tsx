import React from "react";

const CartOrderSummary = (props: OrderDetails) => {
  const { orderId, totalPrice, orderedAt, esitmatedDelivery, status } = props;
  return (
    <div className="cart-order-details">
      <p>Your order</p>
      <p>{orderId}</p>
      <p>{orderedAt}</p>
      <p>{status}</p>
      <p>{esitmatedDelivery}</p>
      <p>{totalPrice}</p>
    </div>
  );
};

export default CartOrderSummary;
