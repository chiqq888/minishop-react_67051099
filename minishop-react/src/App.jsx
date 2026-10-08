import { useEffect, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ShopStats from "./components/ShopStats";
import ProductCatalog from "./components/ProductCatalog";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import Toast from "./components/Toast";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reload, setReload] = useState(0);
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    async function loadProducts() {
      try {
        const response = await fetch("https://fakestoreapi.com/products", {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("ไม่สามารถโหลดข้อมูลได้");

        const data = await response.json();
        if (!Array.isArray(data)) throw new Error("ข้อมูลสินค้าไม่ถูกต้อง");
        if (active) setProducts(data);
      } catch {
        if (active) setError("ไม่สามารถโหลดข้อมูลได้");
      } finally {
        if (active) setLoading(false);
      }
    }
    loadProducts();
    return () => {
      active = false;
      controller.abort();
    };
  }, [reload]);

  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(""), 2800);
    return () => clearTimeout(timer);
  }, [notice]);

  function retry() {
    setError("");
    setLoading(true);
    setReload((value) => value + 1);
  }

  function openCart() {
    setCartOpen(true);
  }
  function closeCart() {
    setCartOpen(false);
  }
  function closeDetail() {
    setSelectedProduct(null);
  }
  function closeNotice() {
    setNotice("");
  }

  function addToCart(product) {
    setCart(function (items) {
      const exists = items.some((item) => item.id === product.id);
      if (!exists) return [...items, { ...product, quantity: 1 }];

      return items.map(function (item) {
        if (item.id === product.id)
          return { ...item, quantity: item.quantity + 1 };
        return item;
      });
    });
    setCartCount((count) => count + 1);
    setNotice(`เพิ่ม ${product.title} ลงตะกร้าแล้ว`);
  }

  function changeQuantity(id, delta) {
    setCart(function (items) {
      const updatedItems = items.map(function (item) {
        if (item.id === id) return { ...item, quantity: item.quantity + delta };
        return item;
      });
      return updatedItems.filter((item) => item.quantity > 0);
    });
    setCartCount((count) => count + delta);
  }

  function removeItem(item) {
    setCart((items) => items.filter((product) => product.id !== item.id));
    setCartCount((count) => count - item.quantity);
  }

  return (
    <div className="min-h-screen">
      <a
        className="fixed -top-20 left-5 z-20 rounded-shop bg-shop-ink p-3 text-white focus:top-2.5"
        href="#main"
      >
        ข้ามไปยังเนื้อหา
      </a>
      <Header cartCount={cartCount} onOpenCart={openCart} />
      <main id="main" className="mx-auto w-[90%] max-w-[1320px]">
        <div className="mt-[26px] mb-[26px] flex items-center justify-between gap-4 sm:mt-[38px]">
          <div>
            <p className="text-[11px] font-medium tracking-[2px] text-[#717171]">
              YOUR EVERYDAY, SIMPLIFIED
            </p>
            <h1 className="mt-[7px] text-xl font-medium tracking-[-.5px] sm:text-2xl">
              เลือกสิ่งที่ใช่ ให้ทุกวันของคุณ
            </h1>
          </div>
          <span className="hidden text-[11px] tracking-[2px] text-[#777] md:inline">
            MINISHOP / 2026
          </span>
        </div>
        <Hero />
        <ShopStats
          products={products}
          cartCount={cartCount}
          onOpenCart={openCart}
        />
        <ProductCatalog
          products={products}
          loading={loading}
          error={error}
          onRetry={retry}
          onAddToCart={addToCart}
          onViewDetail={setSelectedProduct}
        />
        <Footer />
      </main>
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={closeDetail}
          onAddToCart={addToCart}
        />
      )}
      {cartOpen && (
        <Cart
          items={cart}
          cartCount={cartCount}
          onClose={closeCart}
          onChangeQuantity={changeQuantity}
          onRemove={removeItem}
        />
      )}
      <Toast message={notice} onClose={closeNotice} />
    </div>
  );
}
export default App;
