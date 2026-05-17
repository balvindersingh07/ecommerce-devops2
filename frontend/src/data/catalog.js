import catalog from "@shared/catalog.json";

export const categories = catalog.categories;
export const products = catalog.products;

export function getProductById(id) {
  return products.find((p) => p.id === id);
}

export function filterProductsFrom(list, { category, minPrice, maxPrice, minRating }) {
  return list.filter((p) => {
    if (category && category !== "all" && p.category !== category) return false;
    if (minPrice != null && p.price < minPrice) return false;
    if (maxPrice != null && p.price > maxPrice) return false;
    if (minRating != null && p.rating < minRating) return false;
    return true;
  });
}

/** Default catalog list (bundled JSON). Prefer `filterProductsFrom` + `useProducts().products` in UI. */
export function filterProducts(opts) {
  return filterProductsFrom(products, opts);
}
