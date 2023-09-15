import { useSelector } from "react-redux";
import { useParams, useNavigate, useLoaderData } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { modifyCart } from "../../slices/cart_slice";
import { useOutletContext, Link } from "react-router-dom";
import './item.css'

const Item = () => {
  const dispatch = useDispatch();
  const item_id = useParams().id;
  const items = useLoaderData().products;
  const item = items.find((i) => i.id == item_id);
  const more_items = items.filter((x) => item.id !== x.id).slice(0, 8);
  const similar_items = items
    .filter((x) => item.id !== x.id && item.category == x.category)
    .slice(0, 8);
  const [quantity, setQuantity] = useState(1);
  const [setSidebarState] = useOutletContext();
  const handleCartIncrement = () => {
    dispatch(modifyCart({ ...item, quantity: quantity }));
  };
  const handleBuyNow = () => {
    dispatch(modifyCart({ ...item, quantity: quantity }));
    setSidebarState();
  };
  return (
    <div className="container">
      <div className="row my-5">
        <div className="col-md-6">
          <div className="col-10 ms-md-auto rounded card">
            <div className="card-img">
              <img
                src={item.image}
                alt=""
                className="img-fluid"
                style={{ aspectRatio: "1/1" }}
              />
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="col-10 ms-3">
            <div>
              <p>{item.name}</p>
              <small>N {item.price}</small>
              <form className="py-3">
                <div>
                  <label htmlFor="quantity">Quantity</label>
                </div>

                <div>
                  <input
                    type="number"
                    name="quantity"
                    id="quantity"
                    min={1}
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className="mt-3">
              <button
                className="btn btn-dark rounded-0"
                onClick={handleCartIncrement}
              >
                Add to cart
              </button>
              <button
                className="btn btn-danger ms-1 rounded-0"
                onClick={handleBuyNow}
              >
                Buy now
              </button>
            </div>
            <div className="mt-4 col-12">
              <h6>Description</h6>
              <p>
                {item.description.slice(0, 1).toUpperCase() +
                  item.description.slice(1)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h5>Similar products:</h5>
        {similar_items.map((i, index) => (
          <div key={index} className="col-md-2 col-sm-6">
            <Link
              to={`/products/${i.id}`}
              className="card col-10 mx-auto product-card"
            >
              <div className="card-img">
                <img
                  src={i.image}
                  alt=""
                  className="img-fluid"
                  style={{ aspectRatio: "1/1" }}
                />
              </div>
              <div className="card-body">
                <small className="items-link">{i.name}</small>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="row my-3">
        <h5>You may also like:</h5>
        {more_items.map((i, index) => (
          <div key={index} className="col-md-2 col-sm-6">
            <Link
              to={`/products/${i.id}`}
              className="card col-10 mx-auto product-card"
            >
              <div className="card-img">
                <img
                  src={i.image}
                  alt=""
                  className="img-fluid"
                  style={{ aspectRatio: "1/1" }}
                />
              </div>
              <div className="card-body">
                <small className="items-link">{i.name}</small>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Item;
