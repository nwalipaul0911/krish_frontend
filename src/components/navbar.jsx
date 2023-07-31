import { useDispatch, useSelector } from "react-redux";
import { useCallback, useState } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";

const Navbar = ({ setSidebarState }) => {
  const cart_items = useSelector((state) => state.cart.value);

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
            <a href="">
              <i className="fa-brands fa-facebook text-secondary"></i>
            </a>
            <a href="">
              <i className="fa-brands fa-twitter text-secondary"></i>
            </a>
            <a href="">
              <i className="fa-brands fa-instagram text-secondary"></i>
            </a>
          </div>
        </div>
      </div>

      <nav className="navbar navbar-expand-lg bg-body-tertiary py-3">
        <div className="container-fluid">
          <NavLink to="/" className="navbar-brand ms-5" href="#">
            Krishbeauty
          </NavLink>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />{" "}
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
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
