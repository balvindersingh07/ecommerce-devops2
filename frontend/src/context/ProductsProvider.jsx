import { useEffect, useMemo, useState } from "react";
import {
  categories as staticCategories,
  products as staticProducts
} from "../data/catalog";
import { ProductsContext } from "./products-context.js";

const apiBase = (import.meta.env.VITE_BACKEND_URL || "").replace(/\/$/, "");

function buildUrl(path) {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${apiBase}${p}`;
}

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState(staticProducts);
  const [categories] = useState(staticCategories);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState("static");
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(buildUrl("/api/products"));
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!cancelled && Array.isArray(data) && data.length > 0) {
          setProducts(data);
          setSource("api");
          setFetchError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setProducts(staticProducts);
          setSource("static");
          setFetchError(err.message);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo(
    () => ({
      categories,
      products,
      loading,
      source,
      fetchError,
      getProductById: (id) => products.find((p) => p.id === id)
    }),
    [categories, products, loading, source, fetchError]
  );

  return (
    <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
  );
}
