import { useSelector } from "react-redux";
import { useCallback, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import brand_logo from "../assets/images/krish_logo-removebg-preview.png";
import "./navbar.css";

const Navbar = ({ setSidebarState }) => {
  const cart_items = useSelector((state) => state.cart.value);
  const products = useSelector((state) => state.products.value);
  const [searchParam, setSearchParam] = useState("");
  const navigate = useNavigate();
  const searchResult = useCallback(
    products.filter(
      (a) => searchParam && a.name.includes(searchParam),
      products
    ),
    [searchParam]
  );
  const search_results_panel =
    searchResult.length > 0 ? "search-panel-open" : "search-panel-close";
  return (
    <>
      <div className="d-flex bg-dark jusitfy-content-between col-md-12 col-sm-none py-2 ">
        <div className="ps-5 col-6">
          <div className="row">
            <motion.a
              whileHover={{ scale: 1.5 }}
              href="https://www.facebook.com/krishbeauty"
              target="_blank"
              className="col-2"
            >
              <i className="fa-brands fa-facebook text-secondary"></i>
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.5 }}
              href="https://www.tiktok.com/@krish_beauti"
              target="_blank"
              className="col-2"
            >
              <i className="fa-brands fa-tiktok text-secondary"></i>
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.5 }}
              href="https://www.instagram.com/krish_beauty/"
              target="_blank"
              className="col-2"
            >
              <i className="fa-brands fa-instagram text-secondary"></i>
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.5 }}
              href="https://wa.me/2349037399585"
              target="_blank"
              className="col-2"
            >
              <span className="fa-brands fa-whatsapp text-secondary"></span>
            </motion.a>
          </div>
        </div>
        <div className="position-relative ms-auto me-5">
          <i
            className="fa-solid fa-cart-shopping cart-toggler text-white"
            onClick={setSidebarState}
            title="Open cart"
          ></i>
          <motion.span
            animate={{ scale: [1, 0.5, 1] }}
            initial={{ scale: 0 }}
            transition={{}}
            className="badge bg-danger rounded-pill position-absolute top-0"
          >
            {cart_items.length}
          </motion.span>
        </div>
      </div>

      <nav className="navbar navbar-expand-lg bg-body-tertiary py-1 shadow">
        <div className="container-fluid">
          <NavLink to="/" className="navbar-brand ms-md-5" href="#">
            <img src={brand_logo} alt="Krishbeauty" className="brand-logo" />
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse pb-4 pb-md-0" id="navbarNav">
            <ul className="navbar-nav ms-md-auto my-3 me-3">
              <li className="nav-item">
                <NavLink
                  to="/"
                  className="nav-link custom-nav-link"
                  aria-current="page"
                  href="#"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/shop"
                  className="nav-link custom-nav-link"
                  href="#"
                >
                  Shop
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/contact"
                  className="nav-link custom-nav-link"
                  href="#"
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>

          <form className="d-flex position-relative search-container col-md-3 col-12 mt-3 mt-md-0">
            <input
              className="form-control me-2 search"
              type="text"
              placeholder="Search"
              aria-label="Search"
              value={searchParam}
              onChange={(e) => setSearchParam(e.target.value)}
            />
            <div
              className={`col-12 search-results bg-light py-2 ${search_results_panel} shadow`}
            >
              <ul className="p-0">
                {searchResult.map((item, index) => (
                  <li
                    key={index}
                    className="search-item py-1 ps-3 nav-link"
                    onClick={() => {
                      navigate(`/products/${item.id}`);
                      setSearchParam("");
                    }}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          </form>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
