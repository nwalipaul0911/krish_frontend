import { useDispatch } from "react-redux";
import { modifyCart } from "../../slices/cart_slice";
import { useState } from "react";
import test_image from "../../assets/images/wepik-export-20230730124122ESA6.png";
import "./product.css"

const Product = ({ product }) => {
  const dispatch = useDispatch()
  const image_src = test_image
  return (
    <>
      <div className="col-6 col-md-3">
        <div className="card col-10 mx-auto product-card my-4">
          <img src={image_src} alt="" className="img-fluid card-img" />

          <div className="pt-2">
            <div className="text-center">
              <div>
                <i className="">{product.name}</i>
              </div>

              <small className="fw-bold">N {product.price}</small>
            </div>

            <div className="mx-auto">
              <button className="btn btn-outline-dark rounded-0 col-12 product-button" onClick={e=>dispatch(modifyCart({...product, quantity:1}))}>
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
