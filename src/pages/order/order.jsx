import { useSelector, useDispatch } from "react-redux";
import CartItem from "../../components/cart_item";
import { useMemo, useState } from "react";
import { PaystackButton } from "react-paystack";
import { clearCart } from "../../slices/cart_slice";
import { useNavigate } from "react-router-dom";
import "./order.css";
const Order = () => {
  const url = import.meta.env.VITE_BACKEND_URL
  const cart_items = useSelector((state) => state.cart.value);
  const [email, setEmail] = useState("");
  const [recipient, setRecipient] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [state, setCustomerState] = useState("");
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const getTotal = (data) => {
    return data
      .reduce((prev, curr) => prev + parseFloat(curr.quantity * curr.price), 0)
      .toFixed(2);
  };
  const subtotal = useMemo(
    () =>
      cart_items
        .reduce(
          (prev, curr) => prev + parseFloat(curr.quantity * curr.price),
          0
        )
        .toFixed(2),
    [cart_items]
  );
  const amount = Math.ceil(subtotal)*100;
  const saveOrder = async()=>{
    const res = await fetch(`${url}/create_order`, {
      method: 'POST',
      headers : {
        'Content-type': 'application/json'
      },
      body : JSON.stringify({
        email : email,
        recipient : recipient,
        phone: phone,
        address: address,
        state: state,
        cart_items: cart_items,
        total_amount: amount
      })
    })
    if(res.status == 201){
      const data = await res.json()
      dispatch(clearCart())
      
      navigate(`success/${data.order.slug}`)
    }
  }
  const componentProps = {
    email,
    amount,
    metadata: {
      recipient,
      phone,
    },
    publicKey: import.meta.env.VITE_PAYMENT_KEY,
    text: "Pay Now",
    onSuccess: () => {
      saveOrder()
    },
    onClose: () => alert("Wait! You need this oil, don't go!!!!"),
  };

  return (
    <>
      <div className="container-fluid  my-5 py-5">
        <div className="row">
          <div className="col-md-4 col-sm-12 order-md-2">
            <div className="col-10 mx-auto">
              <div className="py-2 cart-header">
                <h5 className="text-dark">My Cart</h5>
              </div>
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
          <div className="col-md-8 col-sm-12 ">
            <div className="container-fluid">
              <div className="row">
                <div className="col-10 mx-auto">
                  <div className="py-2 cart-header col-12">
                    <h5 className="text-dark">Checkout form</h5>
                  </div>
                  <form className="col-12 mt-3">
                    <div className="row mb-3">
                      <div className="col-sm-3 col-md-2">
                        <label htmlFor="recipient">Fullname :</label>
                      </div>
                      <div className="col">
                        <input
                          type="text"
                          name="recipient"
                          id="recipient"
                          value={recipient}
                          className="form-control col-10 rounded-0"
                          placeholder="John Doe"
                          onChange={(e) => setRecipient(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-3 col-md-2">
                        <label htmlFor="email">E-mail :</label>
                      </div>
                      <div className="col">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={email}
                          className="form-control col-10 rounded-0"
                          placeholder="JohnDoe35@example.com"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-3 col-md-2">
                        <label htmlFor="phone">Phone :</label>
                      </div>
                      <div className="col">
                        <input
                          type="text"
                          name="phone"
                          id="phone"
                          value={phone}
                          className="form-control col-10 rounded-0"
                          placeholder="080xxxxxxx1"
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-3 col-md-2">
                        <label htmlFor="address">Address :</label>
                      </div>
                      <div className="col">
                        <input
                          type="text"
                          name="address"
                          id="address"
                          value={address}
                          className="form-control col-10 rounded-0"
                          placeholder="32, example street, example town"
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-3 col-md-2">
                        <label htmlFor="address">State :</label>
                      </div>
                      <div className="col">
                        <input
                          type="text"
                          name="state"
                          id="state"
                          value={state}
                          className="form-control col-10 rounded-0"
                          placeholder="Lagos"
                          onChange={(e) => setCustomerState(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-3 col-md-2">
                        <label htmlFor="subtotal" className="fs-3">
                          Total:
                        </label>
                      </div>
                      <div className="col-auto">
                        <p name="subtotal" className="fs-3" id="subtotal">
                          N {subtotal}
                        </p>
                      </div>
                    </div>
                  </form>
                  <div className="row mb-3">
                    <div className="col">
                      <PaystackButton
                        {...componentProps}
                        className="btn form-control btn-dark rounded-0"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
