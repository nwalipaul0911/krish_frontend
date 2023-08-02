import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Shop from "../pages/shop/shop";
import Checkout from "../pages/checkout/checkout";
import Order from "../pages/order/order";
import Item from "../pages/product/item"
import App from "../App.jsx";
const Route = () => {
  const url = import.meta.env.VITE_BACKEND_URL
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          index: true,
          element: <Shop />,
          loader: async () => {
            const res = await fetch(`${url}/products`);
            if (res.status == 200) {
              const data = await res.json();
              return data;
            }
          },
        },
        {
          path: "checkout",
          element: <Checkout />,
        },
        {
          path: "order",
          element: <Order />,
        },
        {
          path: 'products/:id',
          element: <Item />
        }
      ],
    },
  ]);
  return (
    <RouterProvider router={routes}>
      <App />
    </RouterProvider>
  );
};

export default Route;
