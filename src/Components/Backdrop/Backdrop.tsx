import { useCart } from "../../Containers/Cart/CartContext";
import "./backdrop.scss";

const Backdrop = () => {
  const { cartContainerIsExpanded, toggleCartContainer } = useCart();

  const handleToggleCartContainer = () => {
    toggleCartContainer();
  };

  return (
    <div
      onClick={handleToggleCartContainer}
      className={`backdrop ${cartContainerIsExpanded ? " is-active" : ""}`}
    ></div>
  );
};

export default Backdrop;
