import "./top_banner.css";
import test_image from "../assets/images/wepik-export-20230730124122ESA6.png";
import { useEffect, useState } from "react";
const TopBanner = () => {
  const [banner, setBanner] = useState({});
  const [bannerImg, setBannerImg] = useState(null)
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
      <div className="container-fluid top-banner py-5">
        <div className="row g-0">
          <div className="col-12 col-md-6 pt-5">
            <div className="ps-5">
              <span className="banner-small-text">{banner.title}</span>
              <h1 className="text-white banner-large-text">
                {banner.large_text}
              </h1>
              <p className="banner-description">{banner.small_text}</p>

              <div className="pt-3">
                <button className="btn btn-danger rounded-pill px-5 shadow">
                  {banner.button_text}
                </button>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="mx-auto">
              <img
                src={test_image}
                alt="..."
                className="banner-image img-fluid"
              />
            </div>
          </div>
          <div className="col-md-6 col-sm-12"></div>
        </div>
      </div>
    </>
  );
};

export default TopBanner;
