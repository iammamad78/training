import { TbListDetails, TbShoppingBagCheck } from "react-icons/tb";

import { Link } from "react-router-dom";
import { shortenText } from "../helper/helper";

import styles from "./Card.module.css";
import { useCart } from "../context/CartContext";

function Card({ product }) {
  const { image, title, price, id } = product;

  const [state, dispatch] = useCart();
  console.log(state);

  const clickHandler = () => {
    dispatch({ type: "INCREASE", payload: product });
  };

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
          <button onClick={clickHandler}>
            <TbShoppingBagCheck />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
