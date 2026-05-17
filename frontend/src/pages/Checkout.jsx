import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { formatPriceInr } from "../lib/currency";
import { Button } from "../components/ui/Button";
import { GlassCard } from "../components/ui/GlassCard";
import "./Checkout.css";

const steps = [
  { id: "shipping", label: "Shipping" },
  { id: "payment", label: "Payment" },
  { id: "review", label: "Review" }
];

export function Checkout() {
  const { items, subtotal, clear } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [shipping, setShipping] = useState({
    fullName: "",
    address: "",
    city: "",
    postal: ""
  });
  const [payment, setPayment] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: ""
  });

  const tax = Math.round(subtotal * 0.12);
  const total = subtotal + tax;

  function next() {
    setStepIndex((i) => Math.min(i + 1, steps.length - 1));
  }

  function back() {
    setStepIndex((i) => Math.max(i - 1, 0));
  }

  function submitDemo(e) {
    e.preventDefault();
    clear();
    setStepIndex(0);
    setOrderPlaced(true);
  }

  if (orderPlaced) {
    return (
      <div className="checkout-page container">
        <GlassCard className="checkout-empty checkout-empty--success">
          <p>Order confirmed — demo flow complete (no charge).</p>
          <Link to="/products">
            <Button variant="primary">Keep shopping</Button>
          </Link>
        </GlassCard>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="checkout-page container">
        <GlassCard className="checkout-empty">
          <p>Nothing to checkout yet.</p>
          <Link to="/cart">
            <Button variant="primary">Go to cart</Button>
          </Link>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="checkout-page container">
      <h1 className="checkout-page__title">Checkout</h1>

      <div className="checkout-progress" role="navigation" aria-label="Checkout steps">
        {steps.map((s, i) => (
          <button
            key={s.id}
            type="button"
            className={`checkout-progress__step ${i <= stepIndex ? "checkout-progress__step--done" : ""} ${i === stepIndex ? "checkout-progress__step--current" : ""}`}
            onClick={() => setStepIndex(i)}
          >
            <span className="checkout-progress__idx">{i + 1}</span>
            <span className="checkout-progress__label">{s.label}</span>
          </button>
        ))}
      </div>

      <div className="checkout-layout">
        <GlassCard className="checkout-form-card">
          <form onSubmit={stepIndex === 2 ? submitDemo : (e) => e.preventDefault()}>
            {stepIndex === 0 && (
              <div className="checkout-fields">
                <h2>Shipping</h2>
                <label>
                  Full name
                  <input
                    required
                    value={shipping.fullName}
                    onChange={(e) =>
                      setShipping({ ...shipping, fullName: e.target.value })
                    }
                  />
                </label>
                <label>
                  Address
                  <input
                    required
                    value={shipping.address}
                    onChange={(e) =>
                      setShipping({ ...shipping, address: e.target.value })
                    }
                  />
                </label>
                <div className="checkout-fields__row">
                  <label>
                    City
                    <input
                      required
                      value={shipping.city}
                      onChange={(e) =>
                        setShipping({ ...shipping, city: e.target.value })
                      }
                    />
                  </label>
                  <label>
                    Postal code
                    <input
                      required
                      value={shipping.postal}
                      onChange={(e) =>
                        setShipping({ ...shipping, postal: e.target.value })
                      }
                    />
                  </label>
                </div>
              </div>
            )}

            {stepIndex === 1 && (
              <div className="checkout-fields">
                <h2>Payment</h2>
                <p className="checkout-fields__hint">
                  Demo only — no real charges.
                </p>
                <label>
                  Name on card
                  <input
                    required
                    value={payment.cardName}
                    onChange={(e) =>
                      setPayment({ ...payment, cardName: e.target.value })
                    }
                  />
                </label>
                <label>
                  Card number
                  <input
                    required
                    placeholder="4242 4242 4242 4242"
                    value={payment.cardNumber}
                    onChange={(e) =>
                      setPayment({ ...payment, cardNumber: e.target.value })
                    }
                  />
                </label>
                <div className="checkout-fields__row">
                  <label>
                    Expiry
                    <input
                      required
                      placeholder="MM/YY"
                      value={payment.expiry}
                      onChange={(e) =>
                        setPayment({ ...payment, expiry: e.target.value })
                      }
                    />
                  </label>
                  <label>
                    CVV
                    <input
                      required
                      value={payment.cvv}
                      onChange={(e) =>
                        setPayment({ ...payment, cvv: e.target.value })
                      }
                    />
                  </label>
                </div>
              </div>
            )}

            {stepIndex === 2 && (
              <div className="checkout-review">
                <h2>Review</h2>
                <ul>
                  {items.map((i) => (
                    <li key={i.id}>
                      <span>
                        {i.name} × {i.qty}
                      </span>
                      <span>{formatPriceInr(i.price * i.qty)}</span>
                    </li>
                  ))}
                </ul>
                <p className="checkout-review__ship">
                  Ships to: {shipping.fullName}, {shipping.city}
                </p>
              </div>
            )}

            <div className="checkout-actions">
              {stepIndex > 0 && (
                <Button type="button" variant="ghost" onClick={back}>
                  Back
                </Button>
              )}
              {stepIndex < 2 && (
                <Button type="button" variant="primary" onClick={next}>
                  Continue
                </Button>
              )}
              {stepIndex === 2 && (
                <Button type="submit" variant="primary">
                  Place order
                </Button>
              )}
            </div>
          </form>
        </GlassCard>

        <GlassCard className="checkout-side">
          <h3>Order total</h3>
          <div className="checkout-side__row">
            <span>Subtotal</span>
            <span>{formatPriceInr(subtotal)}</span>
          </div>
          <div className="checkout-side__row">
            <span>Tax</span>
            <span>{formatPriceInr(tax)}</span>
          </div>
          <div className="checkout-side__total">
            <span>Total</span>
            <span>{formatPriceInr(total)}</span>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
