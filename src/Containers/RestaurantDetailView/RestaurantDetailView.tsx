import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRestaurantMenu } from "../../api/endpoints";
import ProductItem from "../../Components/Product/ProductItem";
import { useCart } from "../Cart/CartContext";

const RestaurantDetailView = () => {
  const [menu, setMenu] = React.useState<RestaurantMenuProps[]>([]);
  const { id } = useParams<{ id: string }>();
  const { setRestaurantId } = useCart();

  useEffect(() => {
    let componentIsMounted = true;

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
      <h1>The menu</h1>
      {menu && menu.length ? (
        <ul>
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
