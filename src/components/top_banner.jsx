import "./top_banner.css";
import test_image from "../assets/images/wepik-export-20230730124122ESA6.png";
const TopBanner = () => {
  const banner_image = test_image;
  const banner_Small_text = "Make-up kit";
  const banner_large_text = "5% discount";
  const banner_percentage = "5";
  const banner_button_text = "Buy now";
  const banner_description = "Show up in style, Use quality product from our store.";

  return (
    <>
      <div className="container-fluid top-banner py-5">
        <div className="row g-0">
          <div className="col-12 col-md-6 pt-5">
            <div className="ps-5">
              <span className="banner-small-text">{banner_Small_text}</span>
              <h1 className="text-white banner-large-text">
                {banner_large_text}
              </h1>
              <p className="banner-description">{banner_description}</p>

              <div className="pt-3">
                <button className="btn btn-danger rounded-pill px-5">
                  {banner_button_text}
                </button>
              </div>
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
          <div className="col-md-6 col-sm-12"></div>
        </div>
      </div>
    </>
  );
};

export default TopBanner;
