import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";

function Header({ cartCount, onOpenCart }) {
  const headerRef = useRef(null);
  const [floatingCart, setFloatingCart] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(function (entries) {
      const header = entries[0];
      setFloatingCart(header.boundingClientRect.bottom <= 0);
    });
    observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  let cartPosition = "relative";
  if (floatingCart) {
    cartPosition =
      "fixed top-4 right-[max(5%,calc((100vw-1320px)/2))] z-30 shadow-lg shadow-black/10";
  }

  return (
    <header
      ref={headerRef}
      className="flex min-h-16 items-center justify-between gap-3 border-b border-[#e5e5e5] bg-white px-[max(5%,calc((100vw-1320px)/2))] md:gap-[30px]"
    >
      <a
        className="flex min-h-11 items-center gap-2 text-xl font-semibold tracking-[-.5px]"
        href="#main"
        aria-label="MiniShop กลับไปด้านบน"
      >
        <span className="grid size-8 place-items-center rounded-full bg-[#202020]">
          <Icon name="box" className="size-[18px]" white />
        </span>
        <span>
          MiniShop
          <sup className="ml-0.5 align-top text-[9px] leading-[2.5]">®</sup>
        </span>
      </a>
      <button
        className={`ml-auto flex min-h-11 items-center gap-2 rounded-shop border border-shop-border bg-white px-3 py-[7px] text-xs ${cartPosition}`}
        aria-label={`เปิดตะกร้า ${cartCount} ชิ้น`}
        onClick={onOpenCart}
      >
        <Icon name="cart" className="size-[18px]" />
        <span className="hidden leading-none md:inline">ตะกร้า</span>
        <span
          className="inline-flex h-5 min-w-5 shrink-0 items-center justify-center rounded-md bg-shop-ink px-1 text-[11px] leading-none tabular-nums text-white"
          aria-live="polite"
        >
          <span className="inline-block translate-y-0.5">{cartCount}</span>
        </span>
      </button>
    </header>
  );
}
export default Header;
