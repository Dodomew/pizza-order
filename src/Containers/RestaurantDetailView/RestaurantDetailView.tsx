import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRestaurantMenu, getSingleRestaurant } from "../../api/endpoints";
import ProductItem from "../../Components/Product/ProductItem";
import { useCart } from "../Cart/CartContext";
import "./restaurantDetail.scss";
import "../../Components/Product/product.scss";

const RestaurantDetailView = () => {
  const [menu, setMenu] = React.useState<RestaurantMenuProps[]>([]);
  const [name, setName] = React.useState("");
  const { id } = useParams<{ id: string }>();
  const { setRestaurantId } = useCart();

  useEffect(() => {
    let componentIsMounted = true;

    getSingleRestaurant(id).then((restaurant) => {
      if (componentIsMounted) {
        setName(restaurant.name);
      }
    });

    getRestaurantMenu(id).then((menu) => {
      if (componentIsMounted) {
        setMenu(menu);
        setRestaurantId({ id });
      }
    });

    return () => {
      componentIsMounted = false;
    };
  }, [id, setRestaurantId]);

  return (
    <div className="restaurant-detail">
      <h2 className="restaurant-detail__header">{name}</h2>
      {menu && menu.length ? (
        <ul className="product-list">
          {menu.map((menuItem) => {
            return (
              <ProductItem
                {...menuItem}
                key={`product_item_${menuItem.name}_${menuItem.id}`}
              />
            );
          })}
        </ul>
      ) : null}
    </div>
  );
};

export default RestaurantDetailView;
