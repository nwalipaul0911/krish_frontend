import "./banner.css";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import test_image from "../assets/images/wepik-export-20230730124122ESA6.png";
import { useDispatch } from "react-redux";
import { useOutletContext } from "react-router-dom";
import { modifyCart } from "../slices/cart_slice";
const TopBanner = ({ store }) => {
  const url = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [banners, setBanners] = useState([]);
  const [setSidebarState] = useOutletContext();
  const [carouselstate, setCarouselState] = useState(0);
  useEffect(() => {
    getBannerdetails();
  }, []);
  useEffect(() => {
    setTimeout(() => {
      if (carouselstate < banners.length - 1) {
        setCarouselState(carouselstate + 1);
      } else {
        setCarouselState(0);
      }
    }, 10000);
  });
  const getBannerdetails = async () => {
    let res = await fetch(`${url}/top-banner`);
    let data = await res.json();
    setBanners(data.topbanner);
  };
  const handleBuyNow = (product_id, index) => {
    const product = store.products.find((product) => product.id == product_id);
    dispatch(modifyCart({ ...product, quantity: 1 }));
    setSidebarState();
    console.log(index);
  };
  return (
    <>
      <div className="container-fluid top-banner py-5">
        {banners?.map(
          (banner, index) =>
            index == carouselstate && (
              <div className="row g-0 " key={index}>
                <div className="col-12 col-md-6 pt-5">
                  <div className="ps-5">
                    <span className="banner-small-text">{banner.title}</span>
                    <h1 className="text-white banner-large-text">
                      {banner.large_text}
                    </h1>
                    <p className="banner-description">{banner.small_text}</p>

                    <div className="pt-3">
                      <button
                        className="btn btn-danger rounded-pill px-5 shadow"
                        onClick={() => handleBuyNow(banner.product, index)}
                      >
                        {banner.button_text}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="mx-auto col-10 banner-img-container">
                    <img
                      src={banner?.image}
                      alt="..."
                      className="banner-image img-fluid"
                    />
                  </div>
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
