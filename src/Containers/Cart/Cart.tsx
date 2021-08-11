import React, { useEffect } from "react";
import { postOrder } from "../../api/endpoints";
import "./cart.scss";
import CartCheckoutItem from "./CartCheckoutItem";
import { useCart } from "./CartContext";
import CartOrderSummary from "./CartOrderSummary";

const Cart = () => {
  const [currentOrderDetails, setCurrentOrderDetails] =
    React.useState<OrderDetails>();

  const [isLoading, setIsLoading] = React.useState(false);

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
    setIsLoading(true);
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
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className={"cart" + (cartContainerIsExpanded ? " is-expanded" : "")}>
      <div className="cart__header">
        <h3 className="cart__title">
          {currentOrderDetails ? "Your order" : "Your items"}
        </h3>
        <button onClick={toggleCartContainer} className="cart__close-button">
          X
        </button>
      </div>
      <div className="cart__wrapper">
        <div className="cart__overview">
          {currentOrderDetails ? (
            <CartOrderSummary {...currentOrderDetails} />
          ) : cart && cart.length ? (
            <>
              <ul className="cart__list">
                {cart.map((item) => {
                  return (
                    <CartCheckoutItem
                      {...item}
                      key={`cart_checkout_item_${item.name}_${item.menuItemId}`}
                    />
                  );
                })}
              </ul>
              <div className="cart__summary">
                <div className="cart__sum">
                  <h4 className="cart__total">Total : {total}kr</h4>
                </div>
                <button
                  onClick={handlePlaceOrder}
                  className="cart__order-button"
                  disabled={isLoading}
                >
                  Place order
                </button>
              </div>
            </>
          ) : (
            "Your cart is empty"
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
