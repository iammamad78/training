import { useEffect, useState } from "react";

import { FaListUl } from "react-icons/fa";
import { ImSearch } from "react-icons/im";
import { useProducts } from "../context/ProductsContext";
import { filterProducts, searchProducts } from "../helper/helper";
import Card from "../components/Card";

import Loader from "../components/Loader";
import styles from "./ProductsPage.module.css";

function ProductsPage() {
  const products = useProducts();
  const [displayed, setDisplayed] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState({});

  const searchHandler = () => {
    setQuery((query) => ({ ...query, search }));
    console.log("search");
  };

  const categoriesHandler = (e) => {
    const { tagName } = e.target;
    const categories = e.target.innerText.toLowerCase();

    if (tagName !== "LI") return;
    setQuery((query) => ({ ...query, categories }));
  };

  // showing all products initially
  useEffect(() => {
    setDisplayed(products);
  }, [products]);

  // filtering and searching
  useEffect(() => {
    let finalSearch = searchProducts(products, query.search);
    finalSearch = filterProducts(finalSearch, query.categories);
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
