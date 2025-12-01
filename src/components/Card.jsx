import { TbListDetails, TbShoppingBagCheck } from "react-icons/tb";

import { Link } from "react-router-dom";
import { productQuantity, shortenText } from "../helper/helper";

import styles from "./Card.module.css";
import { useCart } from "../context/CartContext";
import { MdDeleteOutline } from "react-icons/md";

function Card({ product }) {
  const { image, title, price, id } = product;

  const [state, dispatch] = useCart();

  const quantity = productQuantity(state, id);
  console.log(quantity);

  const clickHandler = (type) => {
    dispatch({ type, payload: product });
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
          {quantity === 1 && (
            <button onClick={() => clickHandler("REMOVE_ITEM")}>
              <MdDeleteOutline />
            </button>
          )}

          {quantity > 1 && (
            <button onClick={() => clickHandler("DECREASE")}>-</button>
          )}
          {!!quantity && <span>{quantity}</span>}

          {quantity === 0 ? (
            <button onClick={() => clickHandler("ADD_ITEM")}>
              <TbShoppingBagCheck />
            </button>
          ) : (
            <button onClick={() => clickHandler("INCREASE")}>+</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
