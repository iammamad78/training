import { Link, useParams } from "react-router-dom";
import { useProductDetails } from "../context/ProductsContext";
import Loader from "../components/Loader";
import { SiOpenproject } from "react-icons/si";
import { FaArrowLeft } from "react-icons/fa";
import { IoMdPricetag } from "react-icons/io";
import styles from "./ProductsDetailsPage.module.css";

function ProductsDetailsPage() {
  const { id } = useParams();

  const productDetails = useProductDetails(+id);

  if (!productDetails) return <Loader />;

  return (
    <div className={styles.container}>
      <img src={productDetails.image} alt={productDetails.title} />
      <div className={styles.information}>
        <h3>{productDetails.title} </h3>
        <p className={styles.description}>{productDetails.description}</p>
        <p className={styles.category}>
          <SiOpenproject />
          {productDetails.category}
        </p>
        <div>
          <span>
            <IoMdPricetag />
            {productDetails.price}
          </span>
          <Link to="/products">
            <FaArrowLeft />
            <span>Back to Shopping</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductsDetailsPage;
