import { FaListUl } from "react-icons/fa";

import styles from "./Sidebar.module.css";
import { categories } from "../constants/list";

function Sidebar({ query, categoriesHandler }) {
  return (
    <div className={styles.sidebar}>
      <div>
        <FaListUl />
        <p>Categories</p>
      </div>
      <ul onClick={categoriesHandler}>
        {categories.map((item) => (
          <li
            key={item.id}
            className={
              query.category === item.type.toLowerCase()
                ? styles.selected
                : null
            }
          >
            {item.type}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
