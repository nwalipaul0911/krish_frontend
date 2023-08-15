import { useDispatch } from "react-redux";
import { modifyCart } from "../../slices/cart_slice";
import "./product.css";
import { useNavigate } from "react-router-dom";

const Product = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleCartIncrement = (e) => {
    e.stopPropagation()
    dispatch(modifyCart({ ...product, quantity: 1 }));
  };
  const handleProductNav = () => {
    navigate(`products/${product.id}`);
  };
  return (
    <>
      <div className="col-6 col-md-3">
        <div
          className="card col-10 mx-auto product-card my-4"
          onClick={handleProductNav}
        >
          <img src={`${product.image}`} alt="" className="img-fluid card-img" />

          <div className="pt-2">
            <div className="text-center">
              <div>
                <i className="">{product.name}</i>
              </div>

              <small className="fw-bold">N {product.price}</small>
            </div>

            <div className="mx-auto">
              <button
                className="btn btn-outline-dark rounded-0 col-12 product-button"
                onClick={e=>handleCartIncrement(e)}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
