import { useCart } from "./CartContext";

const CartCheckoutItem = (item: CartItemProps) => {
  const { addToCart, removeFromCart } = useCart();

  const handleRemoveFromCart = () => {
    removeFromCart({
      id: item.menuItemId,
    });
  };

  const handleAddToCart = () => {
    addToCart({ id: item.menuItemId, price: item.price, name: item.name });
  };

  return (
    <li
      key={`checkout_${item.name}_${item.price}_${item.menuItemId}`}
      className="cart-list-item"
    >
      <div className="cart-list-item__summary">
        <p className="cart-list-item__title">{item.name}</p>
        <p className="cart-list-item__price">{item.price}kr</p>
      </div>
      <div className="cart-list-item__control">
        <button
          onClick={handleRemoveFromCart}
          className="cart-list-item__button cart-list-item__button--sec"
        >
          -
        </button>
        <p className="cart-list-item__quantity">{item.quantity}</p>
        <button
          onClick={handleAddToCart}
          className="cart-list-item__button cart-list-item__button--pri"
        >
          +
        </button>
      </div>
    </li>
  );
};

export default CartCheckoutItem;
