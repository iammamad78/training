import BasketCard from "../components/BasketCard";
import { useCart } from "../context/CartContext";

function CheckoutPage() {
  const [state, dispatch] = useCart();

  const clickHandler = (type, payload) => {
    dispatch({ type, payload });
  };

  if (state.itemsCounter === 0) {
    return <h2 style={{ textAlign: "center" }}>Your basket is empty</h2>;
  }
  return (
    <div>
      <div>
        {state.selectedItems.map((product) => (
          <BasketCard
            key={product.id}
            product={product}
            clickHandler={clickHandler}
          />
        ))}
      </div>
    </div>
  );
}

export default CheckoutPage;
