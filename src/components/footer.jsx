import "./footer.css";
import brand_logo from "../assets/images/krish_logo-removebg-preview.png";
const Footer = () => {
  return (
    <>
      <div className="container-fluid bg-dark py-5">
        <div className="row">
          <div className="col-12 col-md-4">
            <div className="col-8 ms-md-auto mt-4 mt-lg-0">
              <img src={brand_logo} alt="" className="img-fluid footer-img" />
              <p className="text-muted text-center bg-dark mb-0">
                All rights reserved. &copy; {" "}
                {new Date().getFullYear()}
              </p>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="col-8 ms-lg-auto text-muted mt-4 mt-lg-0">
              <h5 className="text-muted mb-3">Our Store</h5>

              <p>
                Address: Lzp023 lozinko plaza beside rivers gate tradefair
                complex
              </p>
              <p>Mon-Fri: 8am-7pm</p>
              <p>Sat-Sun: 8am-5pm</p>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="col-8 mx-lg-auto text-muted mt-4 mt-lg-0">
              <h5 className="text-muted mb-3">Customer Service</h5>
              <p>Tel: 09037399585</p>
              <p>Email: Krishibeauty@gmail.com</p>
              <div className="d-flex justify-content-between ">
                <a href="" className="text-muted">
                  <span className="fa-brands fa-facebook"></span>
                </a>
                <a href="" className="text-muted">
                  <span className="fa-brands fa-instagram"></span>
                </a>
                <a href="" className="text-muted">
                  <span className="fa-brands fa-tiktok"></span>
                </a>
                <a href="" className="text-muted">
                  <span className="fa-brands fa-twitter"></span>
                </a>
                <a href="" className="text-muted">
                  <span className="fa-brands fa-whatsapp"></span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
