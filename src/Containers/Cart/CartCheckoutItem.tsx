import React from "react";
import { useCart } from "./CartContext";

const CartCheckoutItem = (item: CartItemProps) => {
  const { removeFromCart } = useCart();

  const handleRemoveFromCart = () => {
    removeFromCart({
      id: item.menuItemId,
    });
  };

  return (
    <li key={`checkout_${item.name}_${item.price}_${item.menuItemId}`}>
      <p>{item.quantity}</p>
      <p>{item.name}</p>
      <p>{item.price}</p>
      <button onClick={handleRemoveFromCart}>Remove</button>
    </li>
  );
};

export default CartCheckoutItem;
