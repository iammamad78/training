import { MdDeleteOutline } from "react-icons/md";
import { shortenText } from "../helper/helper";

import styles from "./BasketCard.module.css";

function BasketCard({ product, clickHandler }) {
  return (
    <div className={styles.card}>
      <img src={product.image} alt={product.title} />
      <p>{shortenText(product.title)}</p>
      <div className={styles.actions}>
        {product.quantity === 1 && (
          <button onClick={() => clickHandler("REMOVE_ITEM", product)}>
            <MdDeleteOutline />
          </button>
        )}
        {product.quantity > 1 && (
          <button onClick={() => clickHandler("DECREASE", product)}>-</button>
        )}
        <span>{product.quantity}</span>
        <button onClick={() => clickHandler("INCREASE", product)}>+</button>
      </div>
    </div>
  );
}

export default BasketCard;
