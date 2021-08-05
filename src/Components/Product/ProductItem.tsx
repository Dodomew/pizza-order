import React from "react";
import { useCart } from "../../Containers/Cart/CartContext";

type ItemProps = {
  id: number;
  name: string;
  price: number;
  topping?: string[];
};

const ProductItem = (item: ItemProps) => {
  const { addToCart } = useCart();

  const handleAddItem = () => {
    console.log("handleAddItem");
    addToCart({ id: item.id, price: item.price, name: item.name });
  };

  return (
    <li key={`product_item_${item.name}_${item.id}`}>
      <h4>{item.name}</h4>
      <p>{item.price}</p>
      {item.topping && item.topping.length ? (
        <ul>
          {item.topping.map((topping) => {
            return (
              <li key={`product_item_${item.name}_${topping}_${item.id}`}>
                {topping}
              </li>
            );
          })}
        </ul>
      ) : null}
      <button onClick={handleAddItem}>Add to cart</button>
    </li>
  );
};

export default ProductItem;
