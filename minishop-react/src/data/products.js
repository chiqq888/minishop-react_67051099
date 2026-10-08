// Validate the response, then keep the original API fields and values.
export function validateProducts(data) {
  if (!Array.isArray(data)) throw new Error("Invalid product response");
  const ids = new Set();
  for (const product of data) {
    if (
      !product ||
      !Number.isFinite(product.id) ||
      ids.has(product.id) ||
      typeof product.title !== "string" ||
      !product.title.trim() ||
      !Number.isFinite(product.price) ||
      product.price < 0 ||
      typeof product.category !== "string"
    )
      throw new Error("Invalid product data");
    ids.add(product.id);
  }
  return data;
}

export function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}
