import "./banner.css";
import { motion, useAnimation, useInView } from "framer-motion";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useOutletContext } from "react-router-dom";
import { modifyCart } from "../slices/cart_slice";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
const TopBanner = ({ store }) => {
  const url = import.meta.env.VITE_BACKEND_URL;
  const dispatch = useDispatch();
  const [banners, setBanners] = useState([]);
  const [setSidebarState] = useOutletContext();
  const [carouselstate, setCarouselState] = useState(0);
  useEffect(() => {
    getBannerdetails();
  }, []);
  const getBannerdetails = async () => {
    let res = await fetch(`${url}/top-banner`);
    let data = await res.json();
    setBanners(data.topbanner);
  };
  const handleBuyNow = (product_id) => {
    const product = store.products.find((product) => product.id == product_id);
    dispatch(modifyCart({ ...product, quantity: 1 }));
    setSidebarState();
  };
  return (
    <>
      <div className="container-fluid top-banner py-5">
        {banners?.map(
          (banner, index) =>
            index == 0 && (
              <div className="row g-0 " key={index}>
                <div className="col-12 col-md-6">
                  <div className="ps-5">
                    <motion.p
                      animate={{ opacity: 1 }}
                      initial={{ opacity: 0 }}
                      transition={{ delay: 1.4 }}
                      className="banner-small-text"
                    >
                      {banner.title}
                    </motion.p>
                    <motion.h1
                      animate={{ x: "0%", opacity: 1 }}
                      initial={{ x: "-100%", opacity: 0 }}
                      transition={{ delay: 1.6 }}
                      className="text-white banner-large-text"
                    >
                      {banner.large_text}
                    </motion.h1>
                    <motion.p
                      animate={{ x: "0%", opacity: 1 }}
                      initial={{ x: "-100%", opacity: 0 }}
                      transition={{ delay: 1.8 }}
                      className="banner-description"
                    >
                      {banner.small_text}
                    </motion.p>

                    <div className="pb-5">
                      <motion.button
                        animate={{ y: "0%", opacity: 1 }}
                        initial={{ y: "100%", opacity: 0 }}
                        transition={{ delay: 0.3 }}
                        whileHover={{ scale: 1.1 }}
                        className="btn btn-danger px-5 rounded-pill shadow top-banner-button border-0"
                        onClick={() => handleBuyNow(banner.product)}
                      >
                        {banner.button_text}
                      </motion.button>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6 mt-5 mt-md-0">
                  <motion.div
                    className="mx-auto col-10 banner-img-container"
                    animate={{ opacity: 1 }}
                    initial={{ opacity: 0 }}
                    transition={{ delay: 2, duration: 1 }}
                  >
                    <LazyLoadImage
                      src={banner?.image}
                      alt="..."
                      className="banner-image img-fluid"
                      effect="blur"
                    />
                  </motion.div>
                </div>
                <div className="col-md-6 col-sm-12"></div>
              </div>
            )
        )}
      </div>
    </>
  );
};

export default TopBanner;
