import "./footer.css";
import brand_logo from "../assets/images/krish_logo-removebg-preview.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
const Footer = () => {
  return (
    <>
      <div className="container-fluid bg-light pt-5 border">
        <div className="row">
          <div className="col-12 col-md-6 row">
            <div className="col-md-8 ms-md-auto mt-4 mt-lg-0">
              <div className="col-7 mx-auto">
                <img src={brand_logo} alt="" className="img-fluid footer-img" />
              </div>
            </div>
            <div className="col-md-4 text-muted">
              <h5 className="text-dark mb-3">Navigation</h5>
              <ul className="ps-0">
                <li className="nav-item">
                  <Link to="/" className="nav-link pb-3">
                    Home
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/contact" className="nav-link pb-3">
                    Contact Us
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/terms-&-conditions" className="nav-link pb-3">
                    T & C
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className="col-8 ms-lg-auto text-muted mt-4 mt-lg-0">
              <h5 className="text-dark mb-3">Our Store</h5>

              <p>
                Address: Lzp023 lozinko plaza beside rivers gate tradefair
                complex
              </p>
              <p>Mon-Fri: 8am-7pm</p>
              <p>Sat-Sun: 8am-5pm</p>
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className="col-8 mx-lg-auto text-muted mt-4 mt-lg-0">
              <h5 className="text-dark mb-3">Customer Service</h5>
              <p>Tel: 09037399585</p>
              <p>Email: Krishbeauty@gmail.com</p>
              <div className="d-flex justify-content-between ">
                <motion.a
                  whileHover={{ scale: 1.5 }}
                  href="https://www.facebook.com/krishbeauty"
                  target="_blank"
                >
                  <i className="fa-brands fa-facebook text-secondary"></i>
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.5 }}
                  href="https://www.tiktok.com/@krish_beauti"
                  target="_blank"
                >
                  <i className="fa-brands fa-tiktok text-secondary"></i>
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.5 }}
                  href="https://www.instagram.com/krish_beauty/"
                  target="_blank"
                >
                  <i className="fa-brands fa-instagram text-secondary"></i>
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.5 }}
                  href="https://wa.me/2349037399585"
                  target="_blank"
                  className="text-muted"
                >
                  <span className="fa-brands fa-whatsapp"></span>
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="text-light text-center bg-secondary mb-0 px-0">
        All rights reserved. &copy; {new Date().getFullYear()}
      </p>
    </>
  );
};

export default Footer;
