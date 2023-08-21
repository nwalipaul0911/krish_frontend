import { useDispatch } from "react-redux";
import { modifyCart } from "../../slices/cart_slice";
import "./product.css";
import { useNavigate } from "react-router-dom";
import { motion, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import {
  LazyLoadImage,
  trackWindowScroll,
} from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Product = ({ product, scrollPosition, shopRef }) => {
  const viewRef = useRef(null);
  const isInView = useInView(viewRef, { once: true });
  const mainControls = useAnimation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView]);
  const handleCartIncrement = (e) => {
    e.stopPropagation();
    dispatch(modifyCart({ ...product, quantity: 1 }));
  };
  const handleProductNav = () => {
    navigate(`/products/${product.id}`);
  };
  return (
    <div ref={viewRef} className={`col-md-3 col-6`}>
      <motion.div
        variants={{ hidden: { opacity: 0, rotate:45 }, visible: { opacity: 1, rotate:0 } }}
        initial="hidden"
        animate={mainControls}
        className="col"
      >
        <motion.div
          className="card col-10 mx-auto product-card my-4"
          onClick={handleProductNav}
          whileHover={{ scale: 1.05 }}
        >
          <LazyLoadImage
            src={`${product.image}`}
            alt="..."
            effect="blur"
            className="img-fluid card-img shadow"
            placeholderSrc=""
            scrollPosition={scrollPosition}
          />

          <div className="pt-2">
            <div className=" text-center">
              <div>
                <small className="">{product.name}</small>
              </div>

              <small className="fw-bold">N {product.price}</small>
            </div>

            <div className="mx-auto">
              <button
                className="btn btn-sm btn-outline-dark rounded-0 col-12 product-button"
                onClick={(e) => handleCartIncrement(e)}
              >
                Add to cart
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Product;
