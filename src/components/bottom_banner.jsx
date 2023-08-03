import "./bottom_banner.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import test_image from "../assets/images/wepik-export-20230730124122ESA6.png";
import { useSelector, useDispatch } from "react-redux";
import { modifyCart } from "../slices/cart_slice";

const BottomBanner = ({ store }) => {
  const banner_image = test_image;
  const [banner, setBanner] = useState({});
  const [bannerImg, setBannerImg] = useState(null);
  const product = store.products.find((product) => product.id == banner.product);
  const url = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    getBannerdetails();
  }, []);
  const getBannerdetails = async () => {
    let res = await fetch(`${url}/bottom-banner`);
    let data = await res.json();
    setBanner(data.bottombanner[0]);
  };
  return (
    <>
      <div className="container py-5 mb-5 ">
        <div className="row g-0 bottom-banner rounded shadow">
          <div className="col-12 col-md-3 pt-5 ">
            <div className="ps-5">
              <span className="footer-banner-small-text text-secondary">
                {banner.small_text}
              </span>
              <h1 className="text-white footer-banner-large-text">
                {banner.large_text}
              </h1>
              <p className="footer-banner-description text-danger">
                {banner.title}
              </p>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="mx-auto">
              <img
                src={product?.image}
                alt="..."
                className="banner-image img-fluid"
              />
            </div>
          </div>
          <div className="col-md-3 col-12 py-5">
            <div className="ps-5">
              <span className="footer-banner-small-text text-secondary">
                {banner.small_text}
              </span>
              <h1 className="text-white footer-banner-large-text">
                {banner.large_text}
              </h1>
              <p className="footer-banner-description text-secondary">
                {banner.small_text}
              </p>
            </div>
            <div className="pt-3 mx-auto" style={{ width: "fit-content" }}>
              <button
                className="btn btn-danger rounded-pill px-5"
                onClick={() => {
                  navigate(`/order`);
                  dispatch(modifyCart({...product, quantity:1}));
                }}
              >
                {banner.button_text}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BottomBanner;
