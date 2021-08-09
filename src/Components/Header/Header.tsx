import React from "react";
import { useCart } from "../../Containers/Cart/CartContext";
import { Link } from "react-router-dom";
import "./header.scss";

const Header = () => {
  const { toggleCartContainer, itemCount } = useCart();
  return (
    <div className="header">
      <Link to={"/"}>LOGO</Link>
      <button className="header__button" onClick={toggleCartContainer}>
        Cart {itemCount}
      </button>
    </div>
  );
};

export default Header;
