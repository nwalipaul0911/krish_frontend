import { useDispatch } from "react-redux";
import { modifyCart } from "../../slices/cart_slice";
import "./product.css";
import { useNavigate } from "react-router-dom";
import { motion, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import "react-lazy-load-image-component/src/effects/blur.css";

const Product = ({ product, scrollPosition }) => {
  const viewRef = useRef(null);
  const isInView = useInView(viewRef, { once: true });
  const mainControls = useAnimation();
  const hoverControls = useAnimation();
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
        variants={{
          hidden: { opacity: 0, rotate: 45, x: 30 },
          visible: { opacity: 1, rotate: 0, x: 0 },
        }}
        onMouseEnter={() => hoverControls.start("hovering")}
        onMouseLeave={() => hoverControls.start("normal")}
        initial="hidden"
        animate={mainControls}
        transition={{ delay: 1 }}
        className="col border"
      >
        <motion.div
          className="card product-card"
          onClick={handleProductNav}
          onMouseEnter={() => hoverControls.start("hovering")}
          onMouseLeave={() => hoverControls.start("normal")}
        >
          <div className="card-img rounded-0">
            <motion.img
              src={`${product.image}`}
              alt="..."
              effect="blur"
              className="img-fluid"
              placeholderSrc=""
              scrollPosition={scrollPosition}
              variants={{ normal: { scale: 0.8 }, hovering: { scale: 1 } }}
              animate={hoverControls}
              transition={{ type: "tween"}}
            />
          </div>

          <div className="py-2 card-body">
            <div className="">
              <div>
                <small className="text-secondary">{product.name}</small>
              </div>

              <i className="">N {product.price}</i>
            </div>

            <div className="mx-auto">
              <button
                className="btn btn-sm btn-danger rounded-pill col-12 product-button mt-2"
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
