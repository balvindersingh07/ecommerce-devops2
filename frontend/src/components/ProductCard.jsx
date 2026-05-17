import { Link } from "react-router-dom";
import { GlassCard } from "./ui/GlassCard";
import { formatPriceInr } from "../lib/currency";
import "./ProductCard.css";

export function ProductCard({ product, compact }) {
  return (
    <GlassCard className={`product-card-wrap ${compact ? "product-card-wrap--compact" : ""}`}>
      <Link to={`/product/${product.id}`} className="product-card">
        <div className="product-card__scene">
          <div className="product-card__inner">
            <div className="product-card__glow" aria-hidden />
            <img
              src={product.image}
              alt=""
              className="product-card__img"
              loading="lazy"
            />
            <div className="product-card__overlay">
              <span className="product-card__badge">{product.category}</span>
              <span className="product-card__preview">Quick view →</span>
            </div>
          </div>
        </div>
        <div className="product-card__meta">
          <h3 className="product-card__name">{product.name}</h3>
          <div className="product-card__row">
            <span className="product-card__price">{formatPriceInr(product.price)}</span>
            <span className="product-card__rating">★ {product.rating}</span>
          </div>
        </div>
      </Link>
    </GlassCard>
  );
}
