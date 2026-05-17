import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { useCart } from "../hooks/useCart";
import { formatPriceInr } from "../lib/currency";
import { Button } from "../components/ui/Button";
import { GlassCard } from "../components/ui/GlassCard";
import "./ProductDetail.css";

const reviews = [
  { user: "Aisha K.", rating: 5, text: "Materials feel unreal — shimmer without weight." },
  { user: "Dev M.", rating: 4, text: "Packed well, insane unboxing glow. Battery life 👌" },
  { user: "Chris L.", rating: 5, text: "Returned two other brands. This is the keeper." }
];

export function ProductDetail() {
  const { id } = useParams();
  const { getProductById, products, loading } = useProducts();
  const product = getProductById(id);
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  if (loading) {
    return (
      <div className="detail container detail--empty">
        <GlassCard className="detail__missing">
          <p>Loading product…</p>
        </GlassCard>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="detail container detail--empty">
        <GlassCard className="detail__missing">
          <p>Product not found.</p>
          <Link to="/products">Back to shop</Link>
        </GlassCard>
      </div>
    );
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

  return (
    <div className="detail container">
      <div className="detail__grid">
        <GlassCard elevated className="detail__visual">
          <div className="detail__stage">
            <div className="detail__rim" aria-hidden />
            <img src={product.image} alt="" className="detail__img" />
          </div>
        </GlassCard>

        <div className="detail__info">
          <p className="detail__crumb">
            <Link to="/products">Shop</Link>
            <span aria-hidden> / </span>
            <span>{product.category}</span>
          </p>
          <h1 className="detail__title">{product.name}</h1>
          <div className="detail__meta">
            <span className="detail__price">{formatPriceInr(product.price)}</span>
            <span className="detail__rating">
              ★ {product.rating}
              <span className="detail__reviews">({product.reviews} reviews)</span>
            </span>
          </div>
          <p className="detail__desc">{product.description}</p>

          <div className="detail__buy">
            <label className="detail__qty">
              <span className="visually-hidden">Quantity</span>
              <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))}>
                −
              </button>
              <input
                type="number"
                min="1"
                value={qty}
                onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
              />
              <button type="button" onClick={() => setQty((q) => q + 1)}>
                +
              </button>
            </label>
            <Button
              variant="primary"
              className="detail__add glow-btn"
              onClick={() => addToCart(product, qty)}
            >
              Add to cart — glow
            </Button>
          </div>

          <GlassCard className="detail__shipping">
            <strong>Ships today</strong>
            <span>Carbon-neutral packaging · track in-app</span>
          </GlassCard>
        </div>
      </div>

      <section className="detail-reviews">
        <h2>Reviews & ratings</h2>
        <div className="detail-reviews__grid">
          {reviews.map((r, i) => (
            <GlassCard key={i} className="detail-review">
              <div className="detail-review__stars">{"★".repeat(Math.round(r.rating))}</div>
              <p className="detail-review__text">{r.text}</p>
              <span className="detail-review__user">— {r.user}</span>
            </GlassCard>
          ))}
        </div>
      </section>

      {related.length > 0 && (
        <section className="detail-related">
          <h2>You may also like</h2>
          <div className="detail-related__grid">
            {related.map((p) => (
              <Link key={p.id} to={`/product/${p.id}`} className="detail-related__card">
                <img src={p.image} alt="" />
                <span>{p.name}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
