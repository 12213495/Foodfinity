import React, { useContext } from "react";
import style from "./fooddisplay.module.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const { food_list, search } = useContext(StoreContext);
  const term = (search || "").trim().toLowerCase();

  const filtered = food_list.filter((item) => {
    if (term) {
      const name = (item.name || "").toLowerCase();
      const cat = (item.category || "").toLowerCase();
      const desc = (item.description || "").toLowerCase();
      return name.includes(term) || cat.includes(term) || desc.includes(term);
    }
    return category === "All" || category === item.category;
  });

  return (
    <div className={style.FoodDisplay} id="fooddisplay">
      <h2> Top dishes Near You</h2>
      <div className={style.FoodDisplayList}>
        {filtered.length === 0 ? (
          <p>No dishes found.</p>
        ) : (
          filtered.map((item) => (
            <FoodItem
              key={item._id}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;