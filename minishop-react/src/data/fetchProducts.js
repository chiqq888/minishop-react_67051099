import { validateProducts } from "../data/products";

async function fetchProducts(signal) {
  const response = await fetch("https://fakestoreapi.com/products", { signal });
  if (!response.ok) throw new Error("ไม่สามารถโหลดข้อมูลได้");
  const data = await response.json();
  return validateProducts(data);
}
export default fetchProducts;
