import "./bottom_banner.css";
import { useState, useEffect } from "react";
import test_image from "../assets/images/wepik-export-20230730124122ESA6.png";

const BottomBanner = () => {
  const banner_image = test_image;
  const [banner, setBanner] = useState({});
  const [bannerImg, setBannerImg] = useState(null);
  const url = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    getBannerdetails();
  }, []);
  const getBannerdetails = async () => {
    let res = await fetch(`${url}/top-banner`);
    let data = await res.json();
    setBanner(data.topbanner[0]);
  };
  return (
    <>
      <div className="container py-5 mb-5 ">
        <div className="row g-0 bottom-banner rounded shadow">
          <div className="col-12 col-md-3 pt-5 ">
            <div className="ps-5">
              <span className="footer-banner-small-text">
                {banner.small_text}
              </span>
              <h1 className="text-white footer-banner-large-text">
                {banner.large_text}
              </h1>
              <p className="footer-banner-description">{banner.title}</p>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="mx-auto">
              <img
                src={banner_image}
                alt="..."
                className="banner-image img-fluid"
              />
            </div>
          </div>
          <div className="col-md-3 col-12 py-5">
            <div className="ps-5">
              <span className="footer-banner-small-text">
                {banner.small_text}
              </span>
              <h1 className="text-white footer-banner-large-text">
                {banner.large_text}
              </h1>
              <p className="footer-banner-description">{banner.small_text}</p>
            </div>
            <div className="pt-3 mx-auto" style={{ width: "fit-content" }}>
              <button className="btn btn-danger rounded-pill px-5">
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
