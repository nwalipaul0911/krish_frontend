import { useSelector, useDispatch } from "react-redux";
import CartItem from "../../components/cart_item";
import { useMemo, useState, useRef, useEffect } from "react";
import { PaystackButton } from "react-paystack";
import { clearCart } from "../../slices/cart_slice";
import { useNavigate } from "react-router-dom";
import "./order.css";
const Order = () => {
  const url = import.meta.env.VITE_BACKEND_URL;
  const cart_items = useSelector((state) => state.cart.value);
  const orderUrl = useRef(null);
  const [formData, setFormData] = useState({
    email: "",
    recipient: "",
    phone: "",
    address: "",
    state: "",
    town: "",
  });
  const [shippingRates, setShippingRates] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleFormData = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  // get town options from state
  const townOptions = shippingRates.filter(
    (rate) => rate.state == formData.state
  );
  // get shipping fee
  const shippingFee = useMemo(() => {
    let curr_rate = shippingRates?.find(
      (rate) => rate.state == formData.state && rate.town == formData.town
    );
    if (curr_rate) {
      return curr_rate.rate;
    }
    return 0;
  }, [formData]);

  // get the subTotal amount of the items in the cart
  const subtotal = useMemo(
    () =>
      cart_items.reduce((prev, curr) => prev + curr.quantity * curr.price, 0),
    [cart_items]
  );
  // Ready total for paystack api
  const amount = shippingFee + subtotal;

  // save the order in the backend database
  const saveOrder = async () => {
    const res = await fetch(`${url}/create_order`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        cart_items: cart_items,
        total_amount: amount,
        shipping: shippingFee,
      }),
    });
    if (res.status == 201) {
      const data = await res.json();
      orderUrl.current = data.slug;
      dispatch(clearCart());
      navigate(`success/${data.slug}`);
    }
  };
  // Get shipping rate from backend
  const getShippingRate = async () => {
    let res = await fetch(`${url}/shipping`);
    if (res.status == 200) {
      let data = await res.json();
      setShippingRates(data);
    }
  };

  // paystack component props for PaystackButton
  const componentProps = {
    email: formData.email,
    amount: amount * 100,
    metadata: {
      recipient: formData.recipient,
      phone: formData.phone,
    },
    publicKey: import.meta.env.VITE_PAYMENT_KEY,
    text: "Pay Now",
    onSuccess: () => {
      saveOrder();
    },
    onClose: () => alert("Wait! You need this oil, don't go!!!!"),
  };
  useEffect(() => {
    getShippingRate();
  }, []);

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
                        <label htmlFor="recipient">Fullname:</label>
                      </div>
                      <div className="col">
                        <input
                          type="text"
                          name="recipient"
                          id="recipient"
                          value={formData.recipient}
                          className="form-control col-10 rounded-0"
                          placeholder="John Doe"
                          onChange={handleFormData}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-3 col-md-2">
                        <label htmlFor="email">E-mail:</label>
                      </div>
                      <div className="col">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={formData.email}
                          className="form-control col-10 rounded-0"
                          placeholder="JohnDoe35@example.com"
                          onChange={handleFormData}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-3 col-md-2">
                        <label htmlFor="phone">Phone:</label>
                      </div>
                      <div className="col">
                        <input
                          type="tel"
                          name="phone"
                          id="phone"
                          value={formData.phone}
                          className="form-control col-10 rounded-0"
                          placeholder="080xxxxxxx1"
                          onChange={handleFormData}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-3 col-md-2">
                        <label htmlFor="address">Address:</label>
                      </div>
                      <div className="col">
                        <input
                          type="text"
                          name="address"
                          id="address"
                          value={formData.address}
                          className="form-control col-10 rounded-0"
                          placeholder="32, example street, example town"
                          onChange={handleFormData}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-3 col-md-2">
                        <label htmlFor="address">State:</label>
                      </div>
                      <div className="col">
                        <select
                          name="state"
                          id="state"
                          defaultValue={formData.state}
                          className="form-control col-10 rounded-0"
                          placeholder="Lagos"
                          onChange={handleFormData}
                        >
                          <option value="------------">-------------</option>
                          {shippingRates.map((rate, index) => (
                            <option key={index} value={rate.state}>
                              {rate.state}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-3 col-md-2">
                        <label htmlFor="address">Town:</label>
                      </div>
                      <div className="col">
                        <select
                          name="town"
                          id="town"
                          value={formData.town}
                          className="form-control col-10 rounded-0"
                          placeholder="Ikeja"
                          onChange={handleFormData}
                        >
                          <option value="------------">-------------</option>
                          {townOptions?.map((rate, index) => (
                            <option key={index} value={rate.town}>
                              {rate.town}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="bg-light border p-2">
                      <div className="row">
                        <div className="col-sm-3 col-md-2">
                          <label htmlFor="shipping" className="">
                            Shipping:
                          </label>
                        </div>
                        <div className="col-auto">
                          <p name="shipping" className="" id="shipping">
                            N {shippingFee}
                          </p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-3 col-md-2">
                          <label htmlFor="subtotal" className="">
                            Subtotal:
                          </label>
                        </div>
                        <div className="col-auto">
                          <p name="subtotal" className="" id="subtotal">
                            N {subtotal}
                          </p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-3 col-md-2">
                          <label htmlFor="total" className="fs-2">
                            Total:
                          </label>
                        </div>
                        <div className="col-auto">
                          <p name="total" className="fs-2" id="total">
                            N {amount}
                          </p>
                        </div>
                      </div>
                    </div>
                  </form>
                  <div className="row mb-3 ">
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
