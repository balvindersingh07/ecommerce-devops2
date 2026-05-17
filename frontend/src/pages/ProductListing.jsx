import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { filterProductsFrom } from "../data/catalog";
import { ProductCard } from "../components/ProductCard";
import { GlassCard } from "../components/ui/GlassCard";
import { useProducts } from "../hooks/useProducts";
import "./ProductListing.css";

export function ProductListing() {
  const { products, categories } = useProducts();
  const [params, setParams] = useSearchParams();
  const category = params.get("category") || "all";
  const minPrice = params.get("minPrice");
  const maxPrice = params.get("maxPrice");
  const minRating = params.get("minRating");

  const filtered = useMemo(
    () =>
      filterProductsFrom(products, {
        category: category === "all" ? null : category,
        minPrice: minPrice ? Number(minPrice) : null,
        maxPrice: maxPrice ? Number(maxPrice) : null,
        minRating: minRating ? Number(minRating) : null
      }),
    [products, category, minPrice, maxPrice, minRating]
  );

  function setFilter(key, value) {
    const next = new URLSearchParams(params);
    if (value === "" || value == null) {
      next.delete(key);
    } else {
      next.set(key, String(value));
    }
    setParams(next);
  }

  return (
    <div className="listing container">
      <header className="listing__head">
        <h1 className="listing__title">Shop</h1>
        <p className="listing__subtitle">
          Filter the grid — glass cards with hover depth.
        </p>
      </header>

      <div className="listing__layout">
        <aside className="listing__filters" aria-label="Filters">
          <GlassCard className="filters">
            <h2 className="filters__title">Filters</h2>

            <div className="filters__group">
              <span className="filters__label">Category</span>
              <select
                className="filters__select"
                value={category}
                onChange={(e) => setFilter("category", e.target.value)}
              >
                <option value="all">All</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="filters__group">
              <span className="filters__label">Price (INR)</span>
              <div className="filters__row">
                <input
                  type="number"
                  placeholder="Min"
                  className="filters__input"
                  value={minPrice ?? ""}
                  onChange={(e) => setFilter("minPrice", e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Max"
                  className="filters__input"
                  value={maxPrice ?? ""}
                  onChange={(e) => setFilter("maxPrice", e.target.value)}
                />
              </div>
            </div>

            <div className="filters__group">
              <span className="filters__label">Minimum rating</span>
              <input
                type="range"
                min="3"
                max="5"
                step="0.5"
                className="filters__range"
                value={minRating ?? "3"}
                onChange={(e) => setFilter("minRating", e.target.value)}
              />
              <span className="filters__hint">{minRating ?? "3"} ★ & up</span>
            </div>

            <button
              type="button"
              className="filters__reset"
              onClick={() => setParams(new URLSearchParams())}
            >
              Reset filters
            </button>
          </GlassCard>
        </aside>

        <div className="listing__grid">
          {filtered.length === 0 ? (
            <GlassCard className="listing__empty">
              <p>No products match. Try widening price or rating.</p>
            </GlassCard>
          ) : (
            filtered.map((p) => <ProductCard key={p.id} product={p} />)
          )}
        </div>
      </div>
    </div>
  );
}
