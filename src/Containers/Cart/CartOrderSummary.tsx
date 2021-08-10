import React from "react";

const CartOrderSummary = (props: OrderDetails) => {
  const { orderId, totalPrice, orderedAt, esitmatedDelivery, status } = props;

  const getDisplayTime = (date: string) => {
    const newDate = new Date(date);
    const hours = newDate.getUTCHours();
    const minutes = newDate.getUTCMinutes();

    return `${hours}:${minutes}`;
  };

  return (
    <div className="cart-order-details">
      <p>Your order</p>
      <p>Order id: {orderId}</p>
      <p>Ordered at : {getDisplayTime(orderedAt)}</p>
      <p>Status: {status}</p>
      <p>Estimated delivery in : {getDisplayTime(esitmatedDelivery)}</p>
      <p>Total: {totalPrice}kr</p>
    </div>
  );
};

export default CartOrderSummary;
