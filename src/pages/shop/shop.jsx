import "./shop.css";
import Product from "./product";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { setProducts } from "../../slices/products_slice";
import { useDispatch } from "react-redux";
import TopBanner from "../../components/top_banner";
import BottomBanner from "../../components/bottom_banner";
const Shop = () => {
  const [store, setStore] = useState(useLoaderData());
  const dispatch = useDispatch()
  // useEffect(()=>dispatch(setProducts(store)), [store])

  return (
    <>
      <TopBanner />
      <div className="container py-5">
        <div className="row col-10 mx-auto">
          <h1 className="text-center text-dark my-4">Our Products</h1>
          {store.products.map((product, index) => (
            <Product key={index} product={product} />
          ))}
        </div>
      </div>
      <BottomBanner />
    </>
  );
};
export default Shop;
