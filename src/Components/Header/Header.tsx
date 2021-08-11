import { useCart } from "../../Containers/Cart/CartContext";
import { Link } from "react-router-dom";
import "./header.scss";

const Header = () => {
  const { toggleCartContainer, itemCount } = useCart();
  return (
    <div className="header">
      <Link to={"/"} className="header__logo">
        Umain Pizzas
      </Link>
      <button className="header__button" onClick={toggleCartContainer}>
        <span className="header__itemcount">{itemCount}</span>
      </button>
    </div>
  );
};

export default Header;
