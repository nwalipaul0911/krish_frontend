import "./cart.css";
import CartItem from "../../components/cart_item";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
const Cart = ({ setSidebarState, cartView }) => {
  const cart_items = useSelector((state) => state.cart.value);

  return (
    <aside className={`cart ${cartView} bg-light shadow`}>
      <div className="container py-4 bg-dark">
        <div className="cart-header row">
          <div className="cart-control-icon-container col-3">
            <i
              className="fa-solid fa-arrow-right text-light"
              onClick={setSidebarState}
            ></i>
          </div>
          <div className="cart-header-text col-9">
            <h4 className="text-light">
              <i className="fa-solid fa-cart-shopping"></i> Cart{" "}
            </h4>
          </div>
        </div>
      </div>
      <div className="container-fluid cart-items-list">
        <div className="row">
          {cart_items.length ? (
            cart_items.map((item, index) => (
              <CartItem key={index} item={item} />
            ))
          ) : (
            <div className="mt-5">
              <p className="text-center"> Cart empty</p>
            </div>
          )}
        </div>
      </div>
      <div className="mx-auto mt-2 pt-2" style={{ width: "fit-content" }}>
        <NavLink
          to="/order"
          className="btn btn-dark order-btn rounded-0"
          onClick={setSidebarState}
        >
          Place Order
        </NavLink>
      </div>
    </aside>
  );
};

export default Cart;
