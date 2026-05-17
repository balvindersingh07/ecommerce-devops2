import { Link } from "react-router-dom";
import { GlassCard } from "../components/ui/GlassCard";
import { Button } from "../components/ui/Button";
import { ProductCard } from "../components/ProductCard";
import { TrendingCarousel } from "../components/TrendingCarousel";
import { useProducts } from "../hooks/useProducts";
import "./Home.css";

export function Home() {
  const { products, categories } = useProducts();
  const trending = products.slice(0, 4);
  const featured = products.slice(0, 3);
  const heroProduct = products[1] ?? products[0];

  return (
    <div className="home">
      <section className="home-hero">
        <div className="container home-hero__grid">
          <div className="home-hero__content">
            <p className="home-hero__eyebrow">Fall / Winter 2026 · Digital drop</p>
            <h1 className="home-hero__title">
              Wear the future.
              <span className="home-hero__title-accent"> Charge the glow.</span>
            </h1>
            <p className="home-hero__lead">
              Glassmorphism meets motion — curated fashion layers and precision
              electronics in one luminous storefront.
            </p>
            <div className="home-hero__cta">
              <Link to="/products">
                <Button variant="primary">Explore collection</Button>
              </Link>
              <Link to="/products?category=gadgets">
                <Button variant="ghost">Gadget vault</Button>
              </Link>
            </div>
          </div>

          <GlassCard elevated className="home-hero__showcase">
            <div className="home-hero__showcase-inner">
              <div className="home-hero__orbit" aria-hidden />
              <img
                src={heroProduct.image}
                alt=""
                className="home-hero__hero-img"
              />
              <div className="home-hero__float-card">
                <span className="home-hero__float-label">Featured</span>
                <strong>{heroProduct.name}</strong>
                <span className="home-hero__float-price">
                  From flagship electronics
                </span>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      <section className="home-section">
        <div className="container">
          <header className="home-section__head">
            <h2>Featured categories</h2>
            <p>Tap a lane — electronics, fashion, or gadgets.</p>
          </header>
          <div className="home-categories">
            {categories.map((c) => (
              <Link
                key={c.id}
                to={`/products?category=${c.id}`}
                className="home-category"
                style={{ "--cat-accent": c.accent }}
              >
                <span className="home-category__icon">{c.icon}</span>
                <span className="home-category__label">{c.label}</span>
                <span className="home-category__tag">{c.tagline}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section home-section--muted">
        <div className="container">
          <header className="home-section__head">
            <h2>Trending now</h2>
            <p>Floating cards with depth — swipe the spotlight.</p>
          </header>
          <TrendingCarousel products={trending} />
        </div>
      </section>

      <section className="home-section">
        <div className="container">
          <div className="home-promo-grid">
            <GlassCard className="home-promo home-promo--wide">
              <div className="home-promo__inner">
                <div>
                  <span className="home-promo__badge">Limited</span>
                  <h3>Neon nights sale</h3>
                  <p>Up to 30% on jackets & wearables.</p>
                </div>
                <Link to="/products?category=fashion">
                  <Button variant="outline">Shop fashion</Button>
                </Link>
              </div>
            </GlassCard>
            <GlassCard className="home-promo">
              <div className="home-promo__inner home-promo__inner--stack">
                <span className="home-promo__badge home-promo__badge--cyan">
                  Tech
                </span>
                <h3>Creator workstation bundle</h3>
                <p>Display + laptop synergy pricing.</p>
                <Link to="/products?category=electronics">
                  <Button variant="ghost">View electronics</Button>
                </Link>
              </div>
            </GlassCard>
          </div>

          <header className="home-section__head home-section__head--tight">
            <h2>Fresh arrivals</h2>
          </header>
          <div className="home-products">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
