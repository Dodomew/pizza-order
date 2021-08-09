import Cart from "../Cart/Cart";
import Routes from "../../Routes/Routes";
import CartContextProvider from "../Cart/CartContext";
import "./app.scss";

const App = () => {
  return (
    <div className="page">
      <CartContextProvider>
        <Routes />
        <Cart />
      </CartContextProvider>
    </div>
  );
};

export default App;
