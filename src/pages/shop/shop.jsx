import "./shop.css";
import Product from "./product";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { setProducts } from "../../slices/products_slice";
import { useDispatch } from "react-redux";
import TopBanner from "../../components/top_banner";
import BottomBanner from "../../components/bottom_banner";
import ReactPaginate from "react-paginate";
const Shop = () => {
  const [store, setStore] = useState(useLoaderData());
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setProducts(store.products));
  }, [store]);
  const itemsPerPage = 4;
  const [itemOffset, setItemOffset] = useState(0);
  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = store.products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(store.products.length / itemsPerPage);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % store.products.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <TopBanner />
      <div className="container py-5">
        <div className="row col-md-10 mx-auto">
          <h1 className="text-center text-dark my-4">Our Products</h1>
          {currentItems.map((product, index) => (
            <Product key={index} product={product} />
          ))}
        </div>
        <ReactPaginate
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          activeLinkClassName="active"
          renderOnZeroPageCount={null}
        />
      </div>
      <BottomBanner />
    </>
  );
};
export default Shop;
