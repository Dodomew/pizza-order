import React from "react";
import { useCart } from "../../Containers/Cart/CartContext";
import "./backdrop.scss";

const Backdrop = () => {
  const { cartContainerIsExpanded } = useCart();

  return (
    <div
      className={`backdrop ${cartContainerIsExpanded ? " is-active" : ""}`}
    ></div>
  );
};

export default Backdrop;
