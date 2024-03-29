import React, { createContext, useContext, useReducer } from "react";

const CartStateContext = createContext(null);
const CartDispatchContext = createContext(null);

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: action._id,
          name: action.name,
          img: action.img,
          price: action.finalPrice,
          qty: action.qty,
          size: action.size,
        },
      ];
    case "REMOVE":
      let newArr = [...state];
      newArr.splice(action.index, 1);
      return newArr;
    case "UPDATE":
      let arr = [...state];
      arr.find((food, index) => {
        if (food.id === action.id) {
          console.log(
            food.qty,
            parseInt(action.qty),
            action.price + food.price
          );
          arr[index] = {
            ...food,
            qty: parseInt(action.qty) + food.qty,
            price: action.price + food.price,
          };
        }
        return arr;
      });
      return arr;
    case "DROP":
      let emptyArray = [];
      return emptyArray;
    default:
      console.log("Error in reduces");
      break;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);
  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
