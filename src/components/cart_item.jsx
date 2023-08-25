import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./cart_item.css";
import { modifyCart } from "../slices/cart_slice";
import { useMemo } from "react";
import { removeFromCart } from "../slices/cart_slice";
const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const subtotal = useMemo(() => item.price * item.quantity, [item]);
  useEffect(() => {
    subtotal == 0 ? dispatch(removeFromCart(item)) : null;
  }, [subtotal]);

  return (
    <>
      <div className="cart-item col-10 mx-auto my-3 position-relative pb-3">
        <i
          className="fa-solid fa-x position-absolute top-0 end-0 cart-item-control"
          onClick={() => dispatch(removeFromCart(item))}
          title="Remove from cart"
        ></i>
        <div className="container-fluid">
          <div className="row">
            <div className="col-4">
              <img src={item.image} alt="..." className="img-fluid" />
            </div>
            <div className="col-8">
              <div className="card-item-footer">
                <small className="item-name" style={{ display: "block" }}>
                  {item.name}
                </small>
                <small className="text-dark my-2" style={{ display: "block" }}>
                  <span className="fw-bold">N{subtotal}</span>
                  
                  <span className="text-secondary ms-3">N{item.price}/unit</span>
                </small>
                <div className="mb-3">
                  <input
                    type="number"
                    name="quantity"
                    id="quantity"
                    className="cart-item-increment"
                    value={item.quantity}
                    onChange={(e) =>
                      dispatch(
                        modifyCart({ ...item, quantity: e.target.value })
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
