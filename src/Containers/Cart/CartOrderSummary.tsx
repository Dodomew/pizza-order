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
      <ul className="cart-order-details__summary">
        <li className="cart-order-details__summary-item">
          <span>Order ID</span>
          <span>{orderId}</span>
        </li>
        <li className="cart-order-details__summary-item">
          <span>Ordered at</span>
          <span>{getDisplayTime(orderedAt)}</span>
        </li>
        <li className="cart-order-details__summary-item">
          <span>Total</span>
          <span>{totalPrice}kr</span>
        </li>
        <li className="cart-order-details__summary-item">
          <span>Status</span>
          <span>{status}</span>
        </li>
        <li className="cart-order-details__summary-item">
          <span>Estimated delivery</span>
          <span>{getDisplayTime(esitmatedDelivery)}</span>
        </li>
      </ul>
    </div>
  );
};

export default CartOrderSummary;
