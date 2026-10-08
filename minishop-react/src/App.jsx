import { useEffect, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Icon from "./components/Icon";
import ProductList from "./components/ProductList";
import Profile from "./components/Profile";
import Modal from "./components/Modal";
import ProductImage from "./components/ProductImage";
import { validateProducts, formatPrice } from "./data/products";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reload, setReload] = useState(0);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    const timeout = setTimeout(() => controller.abort(), 15000);
    async function loadProducts() {
      try {
        const response = await fetch("https://fakestoreapi.com/products", {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = validateProducts(await response.json());
        if (active) setProducts(data);
      } catch {
        if (active) setError("ไม่สามารถโหลดข้อมูลได้");
      } finally {
        clearTimeout(timeout);
        if (active) setLoading(false);
      }
    }
    loadProducts();
    return () => {
      active = false;
      clearTimeout(timeout);
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

  function addToCart(product) {
    setCart((items) =>
      items.some((item) => item.id === product.id)
        ? items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          )
        : [...items, { ...product, quantity: 1 }],
    );
    setCartCount((count) => count + 1);
    setNotice(`เพิ่ม ${product.title} ลงตะกร้าแล้ว`);
  }

  function changeQuantity(id, delta) {
    setCart((items) =>
      items
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + delta } : item,
        )
        .filter((item) => item.quantity > 0),
    );
    setCartCount((count) => count + delta);
  }

  function removeItem(item) {
    setCart((items) => items.filter((product) => product.id !== item.id));
    setCartCount((count) => count - item.quantity);
  }

  function resetFilters() {
    setSearch("");
    setCategory("All");
    setSort("default");
  }

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];
  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(search.trim().toLowerCase()) &&
      (category === "All" || product.category === category),
  );
  if (sort !== "default")
    filteredProducts.sort((a, b) =>
      sort === "asc" ? a.price - b.price : b.price - a.price,
    );
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <div data-ui="app-shell" className="min-h-screen">
      <a
        data-ui="skip-link"
        className="fixed -top-20 left-5 z-20 rounded-shop bg-[#242424] p-3 text-white focus:top-2.5"
        href="#main"
      >
        ข้ามไปยังเนื้อหา
      </a>
      <Header cartCount={cartCount} onOpenCart={() => setCartOpen(true)} />
      <main
        id="main"
        data-ui="main-content"
        className="mx-auto w-[90%] max-w-[1320px]"
      >
        <div
          data-ui="page-heading"
          className="mt-[26px] mb-[26px] flex items-center justify-between gap-4 min-[541px]:mt-[38px] [&_h1]:mt-[7px] [&_h1]:text-xl [&_h1]:font-medium [&_h1]:tracking-[-.5px] min-[541px]:[&_h1]:text-2xl"
        >
          <div>
            <p
              data-ui="eyebrow"
              className="text-[11px] font-medium tracking-[2px] text-[#717171]"
            >
              YOUR EVERYDAY, SIMPLIFIED
            </p>
            <h1>เลือกสิ่งที่ใช่ ให้ทุกวันของคุณ</h1>
          </div>
          <span
            data-ui="edition"
            className="hidden text-[11px] tracking-[2px] text-[#777] min-[801px]:inline"
          >
            MINISHOP / 2026
          </span>
        </div>
        <Hero />
        <section
          data-ui="stats-grid"
          className="mt-[22px] mb-[30px] grid grid-cols-3 gap-2.5 min-[541px]:mb-11 min-[801px]:gap-[18px]"
          aria-label="ภาพรวมร้านค้า"
        >
          <div
            data-ui="stat-card"
            className="flex items-center gap-3 rounded-shop border border-[#e2e2e2] bg-white px-2.5 py-[13px] text-left min-[541px]:px-[13px] min-[541px]:py-4 min-[801px]:p-[18px] min-[1101px]:gap-[17px] min-[1101px]:px-6 min-[1101px]:py-5 [&_p]:text-[11px] [&_p]:text-[#737373] min-[541px]:[&_p]:text-[13px] [&_strong]:text-2xl [&_strong]:leading-[1.3] [&_strong]:font-medium min-[541px]:[&_strong]:text-[26px] [&_strong_span]:block [&_strong_span]:text-[10px] [&_strong_span]:font-normal [&_strong_span]:text-[#838383] min-[541px]:[&_strong_span]:ml-[5px] min-[541px]:[&_strong_span]:inline min-[541px]:[&_strong_span]:text-xs"
          >
            <div
              data-ui="stat-icon"
              className="hidden size-[47px] shrink-0 place-items-center rounded-shop bg-[#f3f3f3] min-[801px]:grid [&_.icon]:size-[25px]"
            >
              <Icon name="box" />
            </div>
            <div>
              <p>สินค้าในร้าน</p>
              <strong>
                {String(products.length).padStart(2, "0")} <span>รายการ</span>
              </strong>
            </div>
            <span
              data-ui="stat-end"
              className="ml-auto hidden text-[#999] min-[801px]:inline"
            >
              ↗
            </span>
          </div>
          <div
            data-ui="stat-card"
            className="flex items-center gap-3 rounded-shop border border-[#e2e2e2] bg-white px-2.5 py-[13px] text-left min-[541px]:px-[13px] min-[541px]:py-4 min-[801px]:p-[18px] min-[1101px]:gap-[17px] min-[1101px]:px-6 min-[1101px]:py-5 [&_p]:text-[11px] [&_p]:text-[#737373] min-[541px]:[&_p]:text-[13px] [&_strong]:text-2xl [&_strong]:leading-[1.3] [&_strong]:font-medium min-[541px]:[&_strong]:text-[26px] [&_strong_span]:block [&_strong_span]:text-[10px] [&_strong_span]:font-normal [&_strong_span]:text-[#838383] min-[541px]:[&_strong_span]:ml-[5px] min-[541px]:[&_strong_span]:inline min-[541px]:[&_strong_span]:text-xs"
          >
            <div
              data-ui="stat-icon"
              className="hidden size-[47px] shrink-0 place-items-center rounded-shop bg-[#f3f3f3] min-[801px]:grid [&_.icon]:size-[25px]"
            >
              <Icon name="documents" />
            </div>
            <div>
              <p>หมวดหมู่สินค้า</p>
              <strong>
                {String(categories.length - 1).padStart(2, "0")}{" "}
                <span>หมวดหมู่</span>
              </strong>
            </div>
            <span
              data-ui="stat-end"
              className="ml-auto hidden text-[#999] min-[801px]:inline"
            >
              ↗
            </span>
          </div>
          <button
            data-ui="stat-card"
            className="flex items-center gap-3 rounded-shop border border-[#e2e2e2] bg-white px-2.5 py-[13px] text-left min-[541px]:px-[13px] min-[541px]:py-4 min-[801px]:p-[18px] min-[1101px]:gap-[17px] min-[1101px]:px-6 min-[1101px]:py-5 [&_p]:text-[11px] [&_p]:text-[#737373] min-[541px]:[&_p]:text-[13px] [&_strong]:text-2xl [&_strong]:leading-[1.3] [&_strong]:font-medium min-[541px]:[&_strong]:text-[26px] [&_strong_span]:block [&_strong_span]:text-[10px] [&_strong_span]:font-normal [&_strong_span]:text-[#838383] min-[541px]:[&_strong_span]:ml-[5px] min-[541px]:[&_strong_span]:inline min-[541px]:[&_strong_span]:text-xs hover:bg-[#fafafa]"
            onClick={() => setCartOpen(true)}
          >
            <div
              data-ui="stat-icon"
              className="hidden size-[47px] shrink-0 place-items-center rounded-shop bg-[#f3f3f3] min-[801px]:grid [&_.icon]:size-[25px]"
            >
              <Icon name="cart" />
            </div>
            <div>
              <p>ตะกร้าของคุณ</p>
              <strong>
                {String(cartCount).padStart(2, "0")} <span>ชิ้น</span>
              </strong>
            </div>
            <span
              data-ui="stat-end"
              className="ml-auto hidden text-[#999] min-[801px]:inline"
            >
              ↗
            </span>
          </button>
        </section>
        <section
          id="catalog"
          data-ui="catalog"
          className="scroll-mt-6"
          aria-labelledby="catalog-title"
        >
          <div
            data-ui="section-heading"
            className="mb-[23px] flex items-end justify-between gap-[15px] [&_h2]:mt-1.5 [&_h2]:text-2xl [&_h2]:font-medium min-[541px]:[&_h2]:text-[27px] [&>p]:hidden min-[541px]:[&>p]:block"
          >
            <div>
              <p
                data-ui="eyebrow"
                className="text-[11px] font-medium tracking-[2px] text-[#717171]"
              >
                FIND YOUR NEXT FAVORITE
              </p>
              <h2 id="catalog-title">
                สินค้าทั้งหมด{" "}
                <span
                  data-ui="count-badge"
                  className="ml-2 inline-block min-w-[30px] rounded-lg bg-[#e8e8e8] text-center align-middle text-[13px] leading-[26px]"
                >
                  {products.length}
                </span>
              </h2>
            </div>
            <p data-ui="muted" className="text-sm text-[#767676]">
              ของที่ชอบ ในแบบที่เป็นคุณ
            </p>
          </div>
          <div
            data-ui="filter-panel"
            className="rounded-shop border border-[#e3e3e3] bg-white p-4 min-[541px]:p-[22px]"
          >
            <div
              data-ui="search-sort"
              className="flex flex-col gap-3.5 min-[801px]:flex-row min-[801px]:gap-[18px]"
            >
              <div
                data-ui="search-field"
                className="flex min-w-0 flex-1 items-center gap-2 rounded-shop border border-[#dedede] bg-[#fafafa] px-2.5 min-[541px]:gap-3 min-[541px]:px-[15px] [&_input]:w-full [&_input]:min-w-0 [&_input]:border-0 [&_input]:bg-transparent [&_input]:py-[13px] [&_input]:text-sm [&_input]:text-[#242424] [&_input]:placeholder:text-[#858585] min-[541px]:[&_input]:text-base"
              >
                <Icon name="search" />
                <input
                  type="search"
                  aria-label="ค้นหาสินค้า"
                  placeholder="ค้นหาสินค้า เช่น Backpack, Shirt..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </div>
              <label
                data-ui="sort-field"
                className="flex items-center justify-between gap-2.5 text-sm whitespace-nowrap text-[#777]"
              >
                <span>เรียงตาม</span>
                <span className="relative min-w-0 flex-1 min-[801px]:w-[245px] min-[801px]:flex-none">
                  <select
                    className="w-full min-w-0 appearance-none rounded-shop border border-[#dedede] bg-white py-[13px] pr-11 pl-[15px] text-sm text-[#303030]"
                    aria-label="เรียงราคาสินค้า"
                    value={sort}
                    onChange={(event) => setSort(event.target.value)}
                  >
                    <option value="default">แนะนำสำหรับคุณ</option>
                    <option value="asc">Sort Price Low → High</option>
                    <option value="desc">Sort Price High → Low</option>
                  </select>
                  <svg
                    data-ui="sort-chevron"
                    className="pointer-events-none absolute top-1/2 right-4 size-3.5 -translate-y-1/2 text-[#303030]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </span>
              </label>
            </div>
            <div
              data-ui="category-row"
              className="mt-[18px] flex flex-wrap gap-2 min-[541px]:gap-2.5"
              role="group"
              aria-label="กรองหมวดหมู่สินค้า"
            >
              {categories.map((item) => (
                <button
                  key={item}
                  data-ui="category-button"
                  className={`group flex items-center gap-2 rounded-shop border px-[11px] py-2 text-xs min-[541px]:gap-3 min-[541px]:px-3.5 min-[541px]:text-sm ${category === item ? "border-[#242424] bg-[#242424] text-white" : "border-[#e0e0e0] bg-white text-[#696969] hover:bg-[#f4f4f4]"}`}
                  aria-pressed={category === item}
                  onClick={() => setCategory(item)}
                >
                  <span className="leading-none">
                    {item === "All" ? "All · ทั้งหมด" : item}
                  </span>
                  <span
                    data-ui="category-count"
                    className="inline-flex h-5 min-w-5 shrink-0 items-center justify-center text-[11px] leading-none tabular-nums text-[#929292] group-aria-pressed:text-[#bfbfbf]"
                  >
                    <span className="inline-block translate-y-0.5">
                      {item === "All"
                        ? products.length
                        : products.filter(
                            (product) => product.category === item,
                          ).length}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>
          {loading && (
            <div
              data-ui="api-state"
              className="mt-[18px] flex flex-wrap items-center gap-[15px] rounded-shop border border-[#ddd] bg-[#ededed] p-[15px] min-[541px]:flex-nowrap min-[541px]:px-[22px] min-[541px]:py-[18px] [&_strong]:text-[15px] [&_strong]:font-medium [&_p]:mt-[3px] [&_p]:text-xs [&_p]:text-[#666] [&>div]:min-w-0 [&>div]:flex-1 [&>button]:w-full min-[541px]:[&>button]:ml-auto min-[541px]:[&>button]:w-auto [&>button]:text-[13px] [&>button]:whitespace-nowrap"
              role="status"
            >
              <span
                data-ui="spinner"
                className="size-[23px] shrink-0 animate-spin rounded-full border-2 border-[#ccc] border-t-[#222] motion-reduce:animate-none"
              />
              <div>
                <strong>Loading products...</strong>
                <p>กำลังโหลดสินค้าจาก Fake Store API</p>
              </div>
            </div>
          )}
          {error && (
            <div
              data-ui="api-state"
              className="mt-[18px] flex flex-wrap items-center gap-[15px] rounded-shop border border-[#ddd] bg-[#ededed] p-[15px] min-[541px]:flex-nowrap min-[541px]:px-[22px] min-[541px]:py-[18px] [&_strong]:text-[15px] [&_strong]:font-medium [&_p]:mt-[3px] [&_p]:text-xs [&_p]:text-[#666] [&>div]:min-w-0 [&>div]:flex-1 [&>button]:w-full min-[541px]:[&>button]:ml-auto min-[541px]:[&>button]:w-auto [&>button]:text-[13px] [&>button]:whitespace-nowrap"
              role="alert"
            >
              <Icon name="box" />
              <div>
                <strong>{error}</strong>
                <p>
                  โหลดสินค้าจาก Fake Store API ไม่สำเร็จ กรุณาลองใหม่อีกครั้ง
                </p>
              </div>
              <button
                data-ui="button"
                className="inline-flex min-h-[46px] items-center justify-center gap-3 rounded-shop px-[18px] py-2.5 font-medium transition-colors duration-200 motion-reduce:transition-none border border-[#d4d4d4] bg-white text-[#242424] hover:bg-[#f0f0f0]"
                onClick={retry}
              >
                ลองใหม่
              </button>
            </div>
          )}
          <div
            data-ui="results-meta"
            className="flex min-h-[66px] items-center justify-between text-[13px] text-[#767676] [&_strong]:text-[#242424]"
          >
            <p aria-live="polite">
              แสดง <strong>{filteredProducts.length}</strong> จาก{" "}
              {products.length} รายการ
            </p>
            {(search || category !== "All" || sort !== "default") && (
              <button
                data-ui="text-button"
                className="rounded-shop bg-transparent p-[7px] text-[13px] text-[#5d5d5d] underline underline-offset-4"
                onClick={resetFilters}
              >
                ล้างตัวกรอง ↺
              </button>
            )}
          </div>
          {!loading &&
            !error &&
            (filteredProducts.length === 0 ? (
              <div
                data-ui="empty-state"
                className="rounded-shop border border-dashed border-[#cfcfcf] bg-white px-5 py-[65px] text-center [&>.icon]:mx-auto [&>.icon]:mb-[15px] [&>.icon]:size-[45px] [&>.icon]:opacity-50 [&_h3]:text-xl [&_h3]:font-medium [&_p]:mt-[7px] [&_p]:mb-[22px] [&_p]:text-sm [&_p]:text-[#767676]"
              >
                <Icon name="search" />
                <h3>ไม่พบสินค้าที่ค้นหา</h3>
                <p>ลองใช้คำค้นอื่น หรือเลือกหมวดหมู่ทั้งหมด</p>
                <button
                  data-ui="button"
                  className="inline-flex min-h-[46px] items-center justify-center gap-3 rounded-shop px-[18px] py-2.5 font-medium transition-colors duration-200 motion-reduce:transition-none border border-[#242424] bg-[#242424] text-white hover:bg-[#454545] [&_.icon]:brightness-0 [&_.icon]:invert"
                  onClick={resetFilters}
                >
                  ดูสินค้าทั้งหมด
                </button>
              </div>
            ) : (
              <ProductList
                products={filteredProducts}
                onAddToCart={addToCart}
                onViewDetail={setSelectedProduct}
              />
            ))}
        </section>
        <footer
          data-ui="footer"
          className="mt-[38px] border-t border-[#dedede] pb-2 text-base text-[#767676] min-[541px]:mt-[55px]"
        >
          <div
            data-ui="footer-top"
            className="grid grid-cols-1 items-center gap-2.5 border-b border-[#dedede] py-6 min-[801px]:grid-cols-[1fr_auto_1fr] min-[801px]:gap-5"
          >
            <span
              data-ui="footer-brand"
              className="text-[21px] font-semibold tracking-[-.7px] text-[#333]"
            >
              MiniShop
            </span>
            <p
              data-ui="footer-slogan"
              className="text-left text-[11px] min-[801px]:text-center"
            >
              สิ่งที่ใช่ สำหรับทุกวันของคุณ
            </p>
            <strong
              data-ui="footer-tagline"
              className="text-left text-[11px] font-semibold text-[#333] min-[801px]:text-right"
            >
              YOUR EVERYDAY, SIMPLIFIED
            </strong>
          </div>
          <Profile
            studentId="67051099"
            name="Ratchatapong Atteephok"
            university="KING MONGKUT'S INSTITUTE OF TECHNOLOGY LADKRABANG"
          />
        </footer>
      </main>
      {selectedProduct && (
        <Modal
          title="รายละเอียดสินค้า"
          onClose={() => setSelectedProduct(null)}
        >
          <div
            data-ui="detail-layout"
            className="grid grid-cols-1 gap-5 min-[541px]:grid-cols-2 min-[541px]:gap-[30px]"
          >
            <div
              data-ui="detail-image"
              className="grid h-60 min-h-[220px] place-items-center rounded-shop bg-[#f3f3f3] p-[30px] min-[541px]:h-auto min-[541px]:min-h-[300px] [&>img]:max-h-[350px]"
            >
              <ProductImage
                image={selectedProduct.image}
                name={selectedProduct.title}
              />
            </div>
            <div
              data-ui="detail-copy"
              className="[&_h3]:my-2.5 [&_h3]:text-[22px] [&_h3]:leading-[1.5] [&_h3]:font-medium [&>button]:mt-[17px] [&>p:last-of-type]:my-2 [&>p:last-of-type]:text-xs"
            >
              <span
                data-ui="product-category"
                className="min-w-0 text-[10px] font-medium tracking-[.5px] wrap-anywhere text-[#7b7b7b] min-[541px]:text-[11px]"
              >
                {selectedProduct.category}
              </span>
              <h3>{selectedProduct.title}</h3>
              <div
                data-ui="rating"
                className="inline-flex items-center gap-[5px] text-[10px] text-[#656565] min-[541px]:text-xs [&_.icon]:size-3 min-[541px]:[&_.icon]:size-3.5"
              >
                <Icon name="star" />
                <strong>{selectedProduct.rating?.rate ?? "—"}</strong>
                <span>({selectedProduct.rating?.count ?? 0} รีวิว)</span>
              </div>
              <p
                data-ui="detail-price"
                className="my-3.5 text-[30px] font-semibold"
              >
                {formatPrice(selectedProduct.price)}
              </p>
              <p
                data-ui="detail-description"
                className="mb-[15px] text-sm leading-[1.9] text-[#666]"
              >
                {selectedProduct.description}
              </p>
              <button
                data-ui="button"
                className="inline-flex min-h-[46px] items-center justify-center gap-3 rounded-shop px-[18px] py-2.5 font-medium transition-colors duration-200 motion-reduce:transition-none border border-[#242424] bg-[#242424] text-white hover:bg-[#454545] [&_.icon]:brightness-0 [&_.icon]:invert w-full"
                onClick={() => addToCart(selectedProduct)}
              >
                <Icon name="cart" /> Add to Cart
              </button>
            </div>
          </div>
          <p
            data-ui="product-disclaimer"
            className="mt-6 border-t border-[#e4e4e4] pt-4 text-[11px] leading-[1.8] text-[#808080]"
          >
            ข้อมูล และราคาไม่ใช่ของจริง เป็นข้อมูลจาก Fake Store API
          </p>
        </Modal>
      )}
      {cartOpen && (
        <Modal
          title={`ตะกร้าของคุณ (${cartCount} ชิ้น)`}
          onClose={() => setCartOpen(false)}
        >
          {cart.length === 0 ? (
            <div
              data-ui="empty-state"
              className="rounded-shop border border-dashed border-[#cfcfcf] bg-white px-5 py-[65px] text-center [&>.icon]:mx-auto [&>.icon]:mb-[15px] [&>.icon]:size-[45px] [&>.icon]:opacity-50 [&_h3]:text-xl [&_h3]:font-medium [&_p]:mt-[7px] [&_p]:mb-[22px] [&_p]:text-sm [&_p]:text-[#767676]"
            >
              <Icon name="cart" />
              <h3>ตะกร้ายังว่างอยู่</h3>
              <p>เลือกสิ่งที่คุณชอบ แล้วเพิ่มลงตะกร้าได้เลย</p>
              <button
                data-ui="button"
                className="inline-flex min-h-[46px] items-center justify-center gap-3 rounded-shop px-[18px] py-2.5 font-medium transition-colors duration-200 motion-reduce:transition-none border border-[#242424] bg-[#242424] text-white hover:bg-[#454545] [&_.icon]:brightness-0 [&_.icon]:invert"
                onClick={() => {
                  setCartOpen(false);
                }}
              >
                เลือกดูสินค้า
              </button>
            </div>
          ) : (
            <>
              <div data-ui="cart-items" className="flex flex-col">
                {cart.map((item) => (
                  <div
                    data-ui="cart-item"
                    className="flex flex-wrap gap-2.5 border-b border-[#e4e4e4] py-5 min-[541px]:flex-nowrap min-[541px]:gap-[18px] [&_h3]:text-[15px] [&_h3]:font-medium [&_p]:my-1.5 [&_p]:text-[13px] [&_p]:text-[#737373]"
                    key={item.id}
                  >
                    <div
                      data-ui="cart-image"
                      className="h-[90px] w-[68px] shrink-0 rounded-shop bg-[#f4f4f4] p-2.5 min-[541px]:h-[110px] min-[541px]:w-[95px] min-[541px]:p-[15px]"
                    >
                      <ProductImage image={item.image} name={item.title} />
                    </div>
                    <div data-ui="cart-item-info" className="min-w-0 flex-1">
                      <h3>{item.title}</h3>
                      <p>{formatPrice(item.price)} / ชิ้น</p>
                      <div
                        data-ui="quantity-control"
                        className="inline-flex items-center overflow-hidden rounded-shop border border-[#dedede] [&_button]:h-[34px] [&_button]:w-9 [&_button]:bg-[#f7f7f7] [&_span]:px-3 [&_span]:text-sm"
                      >
                        <button
                          aria-label={`ลดจำนวน ${item.title}`}
                          onClick={() => changeQuantity(item.id, -1)}
                        >
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          aria-label={`เพิ่มจำนวน ${item.title}`}
                          onClick={() => changeQuantity(item.id, 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div
                      data-ui="cart-item-end"
                      className="flex w-full items-center justify-between gap-[15px] min-[541px]:w-auto min-[541px]:flex-col min-[541px]:items-end min-[541px]:justify-start [&_strong]:text-[15px] [&_strong]:whitespace-nowrap"
                    >
                      <strong>{formatPrice(item.price * item.quantity)}</strong>
                      <button
                        data-ui="text-button"
                        className="rounded-shop bg-transparent p-[7px] text-[13px] text-[#5d5d5d] underline underline-offset-4"
                        onClick={() => removeItem(item)}
                      >
                        ลบสินค้า
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div
                data-ui="cart-summary"
                className="pt-[25px] [&>div]:flex [&>div]:justify-between [&_strong]:text-[26px] [&>p]:mt-2.5 [&>p]:mb-[23px] [&>p]:text-xs [&>p]:text-[#777]"
              >
                <div>
                  <span
                    data-ui="cart-total-label"
                    className="inline-flex items-center gap-2"
                  >
                    <Icon name="dollar" />
                    รวมทั้งหมด
                  </span>
                  <strong>{formatPrice(cartTotal)}</strong>
                </div>
                <p>ตะกร้าตัวอย่างสำหรับ MiniShop React ไม่มีการชำระเงินจริง</p>
                <button
                  data-ui="button"
                  className="inline-flex min-h-[46px] items-center justify-center gap-3 rounded-shop px-[18px] py-2.5 font-medium transition-colors duration-200 motion-reduce:transition-none border border-[#242424] bg-[#242424] text-white hover:bg-[#454545] [&_.icon]:brightness-0 [&_.icon]:invert w-full"
                  onClick={() => setCartOpen(false)}
                >
                  เลือกซื้อต่อ <span aria-hidden="true">↗</span>
                </button>
              </div>
            </>
          )}
        </Modal>
      )}
      <div
        data-ui="toast"
        className={`fixed bottom-6 left-1/2 z-10 flex w-max max-w-[calc(100%-32px)] -translate-x-1/2 items-center gap-3 rounded-shop bg-[#242424] px-5 py-3.5 text-sm text-white shadow-[0_10px_35px_#0002] transition-[transform,opacity] duration-200 motion-reduce:transition-none [&_.icon]:brightness-0 [&_.icon]:invert [&_span]:max-w-[600px] [&_span]:truncate [&_button]:rounded-shop [&_button]:bg-transparent [&_button]:text-xl [&_button]:text-white ${notice ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-5 opacity-0"}`}
        role="status"
        aria-live="polite"
      >
        {notice && (
          <>
            <Icon name="cart" />
            <span>{notice}</span>
            <button aria-label="ปิดข้อความ" onClick={() => setNotice("")}>
              ×
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
