import { TbListDetails, TbShoppingBagCheck } from "react-icons/tb";

import { Link } from "react-router-dom";
import { shortenText } from "../helper/helper";

import styles from "./Card.module.css";

function Card({ products }) {
  const { id, image, title, price } = products;

  if (!products) return <p>Loading</p>;
  return (
    <div className={styles.card}>
      <img src={image} alt={title} />
      <div>
        <h3>{shortenText(title)}</h3>
        <p>{price} $</p>
      </div>
      <div className={styles.actions}>
        <span>
          <Link to={`/products/${id}`}>
            <TbListDetails />
          </Link>
        </span>
        <div>
          <button>
            <TbShoppingBagCheck />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
