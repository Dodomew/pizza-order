import React from "react";
import { useCart } from "../../Containers/Cart/CartContext";
import "./product.scss";

type ItemProps = {
  id: number;
  name: string;
  price: number;
  topping?: string[];
};

const ProductItem = (item: ItemProps) => {
  const { addToCart } = useCart();

  const handleAddItem = () => {
    addToCart({ id: item.id, price: item.price, name: item.name });
  };

  return (
    <li key={`product_item_${item.name}_${item.id}`} className="product-item">
      <div className="product-item__content">
        <h4 className="product-item__title">{item.name}</h4>
        {item.topping && item.topping.length ? (
          <div className="product-item__info">
            <ul className="product-item__info-list">
              {item.topping.map((topping, index, arr) => {
                return (
                  <li
                    key={`product_item_${item.name}_${topping}_${item.id}`}
                    className="product-item__info-item"
                  >
                    {arr.length - 1 === index ? `${topping}` : `${topping}, `}
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}
        <p className="product-item__price">{item.price}kr</p>
      </div>
      <button onClick={handleAddItem} className="product-item__button">
        <div
          className="product-item__media"
          style={{
            backgroundImage: "url(https://via.placeholder.com/640x480)",
          }}
        ></div>
      </button>
    </li>
  );
};

export default ProductItem;
