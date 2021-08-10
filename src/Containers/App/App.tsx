import Cart from "../Cart/Cart";
import Routes from "../../Routes/Routes";
import CartContextProvider from "../Cart/CartContext";
import "./app.scss";
import Backdrop from "../../Components/Backdrop/Backdrop";

const App = () => {
  return (
    <div className="page">
      <CartContextProvider>
        <Routes />
        <Cart />
        <Backdrop />
      </CartContextProvider>
    </div>
  );
};

export default App;
