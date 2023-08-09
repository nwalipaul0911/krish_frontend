import { useDispatch, useSelector } from "react-redux";
import { useCallback, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import brand_logo from "../assets/images/krish_logo-removebg-preview.png";
import "./navbar.css";

const Navbar = ({ setSidebarState }) => {
  const cart_items = useSelector((state) => state.cart.value);
  const products = useSelector((state) => state.products.value);
  const [searchParam, setSearchParam] = useState("");
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
        <div className="top-bar">
          <div className="top-bar-contact ps-5">
            <i className="text-secondary">
              <i className="fa-solid fa-phone"></i> 09037399585
            </i>
            <i className="text-secondary ms-3">
              <i className="fa-solid fa-envelope"></i> Krishibeauty@gmail.com
            </i>
          </div>
        </div>
        <div className="top-bar col-2 ms-auto">
          <div className="top-bar-icons d-flex justify-content-evenly">
            <a href="https://www.facebook.com/krishbeauty" target="_blank">
              <i className="fa-brands fa-facebook text-secondary"></i>
            </a>
            <a href="https://www.tiktok.com/@krish_beauti" target="_blank">
              <i className="fa-brands fa-tiktok text-secondary"></i>
            </a>
            <a href="https://www.instagram.com/krish_beauty/" target="_blank">
              <i className="fa-brands fa-instagram text-secondary"></i>
            </a>
          </div>
        </div>
      </div>

      <nav className="navbar navbar-expand-lg bg-body-tertiary py-3 shadow">
        <div className="container-fluid">
          <NavLink to="/" className="navbar-brand ms-5" href="#">
            <img src={brand_logo} alt="Krishbeauty" className="brand-logo" />
          </NavLink>
          <form className="d-flex position-relative search-container ms-md-auto me-3">
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
                  <li key={index} className="search-item py-1 ps-3">
                    <Link to={`/products/${item.id}`} className="nav-link">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </form>
          <div className="" id="navbarNav">
            <ul className="navbar-nav ms-auto me-md-5 me-4">
              <li className="nav-item">
                <div className="position-relative">
                  <i
                    className="fa-solid fa-cart-shopping fs-3 cart-toggler"
                    onClick={setSidebarState}
                    title="Open cart"
                  ></i>
                  <span className="badge bg-danger rounded-pill position-absolute top-0">
                    {cart_items.length}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
