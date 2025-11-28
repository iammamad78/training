import { useEffect, useState } from "react";

import { useProducts } from "../context/ProductsContext";
import {
  createQueryObject,
  filterProducts,
  getInitialQuery,
  searchProducts,
} from "../helper/helper";
import Card from "../components/Card";

import Loader from "../components/Loader";
import styles from "./ProductsPage.module.css";
import { useSearchParams } from "react-router-dom";
import SearchBox from "../components/SearchBox";
import Sidebar from "../components/Sidebar";

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
    setQuery(getInitialQuery(searchParams));
  }, [products]);

  // filtering and searching
  useEffect(() => {
    setSearchParams(query);
    setSearch(query.search || "");
    let finalSearch = searchProducts(products, query.search);
    finalSearch = filterProducts(finalSearch, query.category);
    setDisplayed(finalSearch);
  }, [query]);

  return (
    <>
      {/* search section */}
      <SearchBox
        search={search}
        setSearch={setSearch}
        searchHandler={searchHandler}
      />

      <div className={styles.container}>
        {/* Main Section */}
        <div className={styles.products}>
          {!displayed.length && <Loader />}
          {displayed.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>

        {/* categories section */}
        <Sidebar query={query} categoriesHandler={categoriesHandler} />
      </div>
    </>
  );
}

export default ProductsPage;
