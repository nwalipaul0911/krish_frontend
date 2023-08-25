import "../shop/shop.css";
import "./home.css";
import Product from "../shop/product";
import { useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { setProducts } from "../../slices/products_slice";
import { useDispatch } from "react-redux";
import TopBanner from "../../components/top_banner";
import BottomBanner from "../../components/bottom_banner";
import { trackWindowScroll } from "react-lazy-load-image-component";
import product_image from "../../assets/images/product.jpg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { motion } from "framer-motion";
import payment_image from "../../assets/images/cropped-shot-african-american-businessman-paying-with-credit-card-online.jpg";
import delivery_man from "../../assets/images/portrait-young-african-guy-accepts-order-by-phone-motorbike-holding-boxes-with-pizza-sit-his-bike-urban-place.jpg";
import About from "../about/about";
import placeholder from '../../assets/images/placeholder.webp'

const Home = ({ scrollPosition }) => {
  const store = useLoaderData();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(setProducts(store.products));
  }, [store]);
  const currentItems = store.products.slice(0, 8);

  return (
    <>
      <TopBanner store={store} />
      <About />
      <div className="container-fluid">
        <div className="row col-md-10 mx-auto">
          <h1 className="text-center text-dark my-3">Featured Products</h1>
          {currentItems.map((product, index) => (
            <Product
              key={index}
              product={product}
              scrollPosition={scrollPosition}
            />
          ))}
        </div>
      </div>

      <div className="container-fluid p-4 bg-dark my-5 border text-light">
        <h1 className="text-center my-5">Why Krishbeauty?</h1>
        <div className="col-12">
          <div className="container-fluid">
            <div className="row my-4">
              <div className="col-md-6 mb-4">
                <LazyLoadImage
                  effect="blur"
                  src={product_image}
                  alt=""
                  className="img-fluid"
                  placeholderSrc={placeholder}
                />
              </div>
              <div className="col-md-6">
                <h2 className="about-headers">Quality Products</h2>

                <div className="text-justify">
                  <p>
                    At KrishBeauty, we take immense pride in delivering beauty
                    products that exemplify uncompromising quality. Our
                    commitment to excellence drives us to source only the finest
                    ingredients and materials, ensuring that every product that
                    bears the KrishBeauty name is a testament to luxury and
                    efficacy. From meticulously crafted skincare formulas to
                    beautifully pigmented cosmetics, our dedication to quality
                    is unwavering. With KrishBeauty, you're not just receiving
                    products; you're indulging in a premium experience that
                    celebrates the beauty within you. Join us on this journey of
                    exceptional quality and elevate your beauty routine to new
                    heights.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row my-4">
              <div className="col-md-6 order-md-2 mb-4">
                <LazyLoadImage
                  effect="blur"
                  src={payment_image}
                  alt=""
                  className="img-fluid"
                  placeholderSrc={placeholder}
                />
              </div>
              <div className="col-md-6">
                <h2 className="about-headers">Safe and Easy Payment</h2>

                <div className="text-justify">
                  <p>
                    Your peace of mind is our top priority , offering you a safe
                    and secure payment method that ensures every transaction is
                    protected. With advanced encryption and robust security
                    measures in place, you can shop confidently, knowing that
                    your personal and financial information is safeguarded at
                    every step. Rest assured, your trust is our commitment, and
                    we're dedicated to providing you with a worry-free shopping
                    experience where your privacy is respected and your data
                    remains confidential.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row my-4">
              <div className="col-md-6 mb-4">
                <LazyLoadImage
                  effect="blur"
                  src={delivery_man}
                  alt=""
                  className="img-fluid"
                  placeholderSrc={placeholder}
                />
              </div>
              <div className="col-md-6">
                <h2 className="about-headers">Fast Delivery</h2>

                <div className="text-justify">
                  <p>
                    We are committed to providing you with an
                    exceptional shopping experience, and that includes
                    lightning-fast delivery. We understand that waiting for your
                    beauty essentials is not an option, which is why we
                    prioritize speed and efficiency in getting your products to
                    you. Our dedicated logistics network ensures that your
                    orders are processed swiftly and delivered without delay. Your
                    time is valuable, and we're here to make sure you receive
                    your orders promptly, so you can keep looking and feeling
                    your best with minimal wait.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div style={{width:'fit-content'}} className="ms-auto me-5 mb-4">
            <motion.button
              animate={{ y: "0%", opacity: 1 }}
              initial={{ y: "100%", opacity: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.1 }}
              className="btn btn-danger px-5 rounded-pill shadow top-banner-button border-0"
              onClick={()=>navigate('shop')}
            >
              View Products
            </motion.button>
          </div>
        </div>
      </div>

      <BottomBanner store={store} />
    </>
  );
};
export default trackWindowScroll(Home);
