import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { formatPriceInr } from "../lib/currency";
import { Button } from "../components/ui/Button";
import { GlassCard } from "../components/ui/GlassCard";
import "./Cart.css";

export function Cart() {
  const { items, setQty, remove, subtotal } = useCart();
  const tax = Math.round(subtotal * 0.12);
  const total = subtotal + tax;

  return (
    <div className="cart-page container">
      <h1 className="cart-page__title">Your cart</h1>

      {items.length === 0 ? (
        <GlassCard className="cart-empty">
          <p>Cart is luminous but empty.</p>
          <Link to="/products">
            <Button variant="primary">Browse products</Button>
          </Link>
        </GlassCard>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {items.map((item) => (
              <GlassCard key={item.id} className="cart-line">
                <img src={item.image} alt="" className="cart-line__img" />
                <div className="cart-line__info">
                  <Link to={`/product/${item.id}`} className="cart-line__name">
                    {item.name}
                  </Link>
                  <span className="cart-line__price">{formatPriceInr(item.price)}</span>
                </div>
                <div className="cart-line__qty">
                  <button type="button" onClick={() => setQty(item.id, item.qty - 1)}>
                    −
                  </button>
                  <span>{item.qty}</span>
                  <button type="button" onClick={() => setQty(item.id, item.qty + 1)}>
                    +
                  </button>
                </div>
                <div className="cart-line__line-total">
                  {formatPriceInr(item.price * item.qty)}
                </div>
                <button
                  type="button"
                  className="cart-line__remove"
                  onClick={() => remove(item.id)}
                  aria-label="Remove"
                >
                  ×
                </button>
              </GlassCard>
            ))}
          </div>

          <GlassCard className="cart-summary">
            <h2 className="cart-summary__title">Summary</h2>
            <div className="cart-summary__row">
              <span>Subtotal</span>
              <span className="cart-summary__amount">{formatPriceInr(subtotal)}</span>
            </div>
            <div className="cart-summary__row">
              <span>Est. tax (12%)</span>
              <span className="cart-summary__amount">{formatPriceInr(tax)}</span>
            </div>
            <div className="cart-summary__divider" />
            <div className="cart-summary__row cart-summary__row--total">
              <span>Total</span>
              <span className="cart-summary__total">{formatPriceInr(total)}</span>
            </div>
            <Link to="/checkout">
              <Button variant="primary" className="cart-summary__cta">
                Proceed to checkout
              </Button>
            </Link>
          </GlassCard>
        </div>
      )}
    </div>
  );
}
