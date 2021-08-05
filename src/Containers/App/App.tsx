import Cart from "../Cart/Cart";
import Header from '../../Components/Header/Header';
import Routes from '../../Routes/Routes';
import CartContextProvider from "../Cart/CartContext";

const App = () => {
  return (
    <div className="page">  
        <CartContextProvider>
          <Header />
          <Routes />
          <Cart />
        </CartContextProvider>
    </div>
  )
}

export default App;
