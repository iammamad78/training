import { useEffect, useState } from "react";

import { FaListUl } from "react-icons/fa";
import { ImSearch } from "react-icons/im";
import { useProducts } from "../context/ProductsContext";
import {
  createQueryObject,
  filterProducts,
  searchProducts,
} from "../helper/helper";
import Card from "../components/Card";

import Loader from "../components/Loader";
import styles from "./ProductsPage.module.css";
import { useSearchParams } from "react-router-dom";

function ProductsPage() {
  const products = useProducts();
  const [displayed, setDisplayed] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();

  const searchHandler = () => {
    setQuery((query) => createQueryObject(query, { search }));
  };

  const categoriesHandler = (e) => {
    const { tagName } = e.target;
    const category = e.target.innerText.toLowerCase();

    if (tagName !== "LI") return;
    setQuery((query) => createQueryObject(query, { category }));
  };

  // showing all products initially
  useEffect(() => {
    setDisplayed(products);
  }, [products]);

  // filtering and searching
  useEffect(() => {
    setSearchParams(query);
    let finalSearch = searchProducts(products, query.search);
    finalSearch = filterProducts(finalSearch, query.category);
    setDisplayed(finalSearch);
    console.log(finalSearch);
  }, [query]);

  return (
    <>
      {/* search section */}
      <div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase().trim())}
        />
        <button onClick={searchHandler}>
          <ImSearch />
        </button>
      </div>

      <div className={styles.container}>
        {/* Main Section */}
        <div className={styles.products}>
          {!displayed.length && <Loader />}
          {displayed.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>

        {/* categories section */}
        <div>
          <div>
            <FaListUl />
            <p>Categories</p>
          </div>
          <ul onClick={categoriesHandler}>
            <li>All</li>
            <li>Electronics</li>
            <li>Jewelery</li>
            <li>Men's Clothing</li>
            <li>Women's Clothing</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default ProductsPage;
