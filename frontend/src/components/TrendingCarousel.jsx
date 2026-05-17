import { useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";
import "./TrendingCarousel.css";

export function TrendingCarousel({ products }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % Math.max(products.length, 1));
    }, 5200);
    return () => clearInterval(id);
  }, [products.length]);

  return (
    <div className="carousel">
      <div className="carousel__track-wrap">
        <div
          className="carousel__track"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {products.map((p) => (
            <div key={p.id} className="carousel__slide">
              <ProductCard product={p} compact />
            </div>
          ))}
        </div>
      </div>
      <div className="carousel__dots" role="tablist" aria-label="Carousel position">
        {products.map((p, i) => (
          <button
            key={p.id}
            type="button"
            role="tab"
            aria-selected={i === index}
            className={`carousel__dot ${i === index ? "carousel__dot--active" : ""}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
