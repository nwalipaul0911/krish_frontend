import "./banner.css";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { useDispatch } from "react-redux";
import { modifyCart } from "../slices/cart_slice";
import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";

const BottomBanner = ({ store, scrollPosition }) => {
  const url = import.meta.env.VITE_BACKEND_URL;
  const dispatch = useDispatch();
  const [banners, setBanners] = useState([]);
  const [setSidebarState] = useOutletContext();
  const [carouselstate, setCarouselState] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      if (carouselstate < banners.length - 1) {
        setCarouselState(carouselstate + 1);
      } else {
        setCarouselState(0);
      }
    }, 10000);
  });

  useEffect(() => {
    getBannerdetails();
  }, []);
  const getBannerdetails = async () => {
    let res = await fetch(`${url}/bottom-banner`);
    let data = await res.json();
    setBanners(data.bottombanner);
  };
  const handleBuyNow = (product_id) => {
    const product = store.products.find((product) => product.id == product_id);
    dispatch(modifyCart({ ...product, quantity: 1 }));
    setSidebarState();
  };
  return (
    <>
      <div className="container py-5 mb-5 ">
        {banners?.map(
          (banner, index) =>
            index == carouselstate && (
              <div
                className="row g-0 bottom-banner rounded shadow"
                key={index}
              >
                <div className="col-12 col-md-6" >
                  <motion.div
                    className="mx-auto col-7 py-3 banner-img-container"
                    initial={"hidden"}
                    animate={'visible'}
                    variants={{
                      hidden: { x: 100, opacity: 0 },
                      visible: { x: 0, opacity: 1 },
                    }}
                    transition={{ delay: 2, duration: 1 }}
                  >
                    <LazyLoadImage
                      src={banner?.image}
                      alt="..."
                      scrollPosition={scrollPosition}
                      className="banner-image img-fluid"
                      effect="blur"
                      placeholderSrc=""
                    />
                  </motion.div>
                </div>
                <div className="col-md-6 col-12 py-5">
                  <div className="text-center">
                    <span className="footer-banner-small-text text-secondary">
                      {banner.small_text}
                    </span>
                    <h1 className="text-secondary footer-banner-large-text">
                      {banner.large_text}
                    </h1>
                    <p className="footer-banner-description text-secondary">
                      {banner.title}
                    </p>
                  </div>
                  <div
                    className="pt-3 mx-auto"
                    style={{ width: "fit-content" }}
                  >
                    <button
                      className="btn btn-danger rounded-pill px-5"
                      onClick={() => handleBuyNow(banner.product)}
                    >
                      {banner.button_text}
                    </button>
                  </div>
                </div>
              </div>
            )
        )}
      </div>
    </>
  );
};

export default BottomBanner;
