import Card from "../components/Card";
import { useProducts } from "../context/ProductsContext";

import styles from "./ProductsPage.module.css";
function ProductsPage() {
  const products = useProducts();
  console.log(products);

  return (
    <div className={styles.container}>
      <div>
        <ul className={styles.products}>
          {products.map((products) => (
            <Card key={products.id} products={products} />
          ))}
        </ul>
      </div>
      <div>Sidebar</div>
    </div>
  );
}

export default ProductsPage;
