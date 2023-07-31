import { useState } from "react";
import Navbar from "./components/navbar";
import "./App.css";
import Cart from "./widgets/cart/cart";
import { Outlet } from "react-router-dom";
import Footer from "./components/footer";

function App() {
  const sidebarState = localStorage.getItem("sidebar");
  const [cartView, setCartView] = useState(() =>
    sidebarState ? sidebarState : "cart-hidden"
  );
  const setSidebarState = () => {
    cartView == "cart-hidden"
      ? setCartView("cart-visible")
      : setCartView("cart-hidden");
  };

  return (
    <div className="App">
      <Navbar setSidebarState={setSidebarState} />
      <Cart setSidebarState={setSidebarState} cartView={cartView} />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
