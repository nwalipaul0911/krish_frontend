import "../shop/shop.css";
import Product from "../shop/product";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { setProducts } from "../../slices/products_slice";
import { useDispatch } from "react-redux";
import TopBanner from "../../components/top_banner";
import BottomBanner from "../../components/bottom_banner";
import ReactPaginate from "react-paginate";
import { trackWindowScroll } from "react-lazy-load-image-component";

const Home = ({ scrollPosition }) => {
  const [store, setStore] = useState(useLoaderData());
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setProducts(store.products));
  }, [store]);
  const itemsPerPage = 8;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = store.products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(store.products.length / itemsPerPage);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % store.products.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <TopBanner store={store} />
      <div className="container-fluid py-5">
        <div className="row col-md-10 mx-auto">
          <h1 className="text-center text-dark my-4">Featured Products</h1>
          {currentItems.map((product, index) => (
            <Product
              key={index}
              product={product}
              scrollPosition={scrollPosition}
            />
          ))}
        </div>
      </div>
      <BottomBanner store={store} />

      <div className="container-fluid p-4 bg-light my-5 border">
        <div className="col-10 mx-auto">
          <div className="row">
            <div className="col-md-4 ">
              <i className="fa-solid fa-star fs-2 my-3"></i>

              <h2>Quality Products</h2>

              <div className="text-justify">
                <p>
                  Discover the essence of beauty with our meticulously curated
                  selection of premium products.
                </p>
              </div>
            </div>
            <div className="col-md-4 ">
              <i className="fa-solid fa-credit-card fs-2 my-3"></i>

              <h2>Safe & Easy Payment</h2>

              <div className="text-justify">
                <p>
                  Shop with confidence knowing that your payments are secure and
                  protected.
                </p>
              </div>
            </div>
            <div className="col-md-4 ">
              <i className="fa-solid fa-truck-fast fs-2 my-3"></i>

              <h2>Fast Delivery</h2>

              <div className="text-justify">
                <p>
                  Experience the thrill of fast delivery, bringing your favorite
                  beauty products to your doorstep in no time!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default trackWindowScroll(Home);
