import { useCallback, useMemo, useReducer } from "react";
import { CartContext } from "./cart-context.js";

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const existing = state.items.find((i) => i.id === action.product.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === action.product.id
              ? { ...i, qty: i.qty + (action.qty || 1) }
              : i
          )
        };
      }
      return {
        items: [
          ...state.items,
          { ...action.product, qty: action.qty || 1 }
        ]
      };
    }
    case "SET_QTY": {
      const qty = Math.max(1, action.qty);
      return {
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, qty } : i
        )
      };
    }
    case "REMOVE":
      return {
        items: state.items.filter((i) => i.id !== action.id)
      };
    case "CLEAR":
      return { items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const addToCart = useCallback((product, qty = 1) => {
    dispatch({ type: "ADD", product, qty });
  }, []);

  const setQty = useCallback((id, qty) => {
    dispatch({ type: "SET_QTY", id, qty });
  }, []);

  const remove = useCallback((id) => {
    dispatch({ type: "REMOVE", id });
  }, []);

  const clear = useCallback(() => {
    dispatch({ type: "CLEAR" });
  }, []);

  const totalItems = useMemo(
    () => state.items.reduce((s, i) => s + i.qty, 0),
    [state.items]
  );

  const subtotal = useMemo(
    () => state.items.reduce((s, i) => s + i.price * i.qty, 0),
    [state.items]
  );

  const value = useMemo(
    () => ({
      items: state.items,
      addToCart,
      setQty,
      remove,
      clear,
      totalItems,
      subtotal
    }),
    [state.items, addToCart, setQty, remove, clear, totalItems, subtotal]
  );

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

