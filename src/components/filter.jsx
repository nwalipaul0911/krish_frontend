import { useEffect, useState } from "react";
import "./filter.css";

const Filter = ({ store, setFiltered, setItemOffset }) => {
  const [categories, setCategories] = useState([]);
  const [currCategory, setCurrCategory] = useState("");
  const url = import.meta.env.VITE_BACKEND_URL;

  const getCategories = async () => {
    const res = await fetch(`${url}/categories`);
    if (res.status == 200) {
      const data = await res.json();
      setCategories(data);
    }
  };
  const handleFilter = (e) => {
    const filtered = store.filter((item) =>
      currCategory
        ? item.category == currCategory
        : item.category == item.category
    );
    setFiltered(filtered);
    setItemOffset(0)
  };
  useEffect(() => {
    categories == "" ? getCategories() : null;
    handleFilter();
  }, [currCategory]);

  return (
    <div className="position-sticky top-0" style={{ maxHeight: "70vh" }}>
      <h5 className="text-center">
        Filter by category <i className="fa-solid fa-filter"></i>
      </h5>
      <hr />
      <a
        className="btn btn-sm btn-outline-secondary rounded-pill px-3"
        onClick={() => setCurrCategory("")}
      >
        All
      </a>
      {categories.map((category, index) => (
        <a
          key={index}
          className="btn btn-sm btn-outline-secondary rounded-pill px-3"
          onClick={() => setCurrCategory(category.id)}
        >
          {category.name}
        </a>
      ))}

      <hr />
    </div>
  );
};

export default Filter;
