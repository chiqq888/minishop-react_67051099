import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";

function Header({ cartCount, onOpenCart }) {
  const headerRef = useRef(null);
  const [floatingCart, setFloatingCart] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setFloatingCart(entry.boundingClientRect.bottom <= 0),
      { threshold: 0 },
    );
    observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <header
      ref={headerRef}
      data-ui="site-header"
      className="flex min-h-16 items-center justify-between gap-3 border-b border-[#e5e5e5] bg-white px-[max(5%,calc((100vw-1320px)/2))] min-[801px]:gap-[30px]"
    >
      <a
        data-ui="brand"
        className="flex min-h-11 items-center gap-2 text-xl font-semibold tracking-[-.5px] [&_sup]:ml-0.5 [&_sup]:align-top [&_sup]:text-[9px] [&_sup]:leading-[2.5]"
        href="#main"
        aria-label="MiniShop กลับไปด้านบน"
      >
        <span
          data-ui="brand-symbol"
          className="grid size-8 place-items-center rounded-full bg-[#202020] [&_.icon]:size-[18px] [&_.icon]:brightness-0 [&_.icon]:invert"
        >
          <Icon name="box" />
        </span>
        <span>
          MiniShop<sup>®</sup>
        </span>
      </a>
      <button
        data-ui="cart-button"
        className={`ml-auto flex min-h-11 items-center gap-2 rounded-shop border border-[#dedede] bg-white px-3 py-[7px] text-xs [&>.icon]:size-[18px] [&>span:not(:last-child)]:hidden min-[801px]:[&>span:not(:last-child)]:inline ${floatingCart ? "fixed top-4 right-[max(5%,calc((100vw-1320px)/2))] z-30 shadow-lg shadow-black/10" : "relative"}`}
        aria-label={`เปิดตะกร้า ${cartCount} ชิ้น`}
        onClick={onOpenCart}
      >
        <Icon name="cart" />
        <span className="leading-none">ตะกร้า</span>
        <span
          data-ui="cart-count"
          className="inline-flex h-5 min-w-5 shrink-0 items-center justify-center rounded-md bg-[#242424] px-1 text-[11px] leading-none tabular-nums text-white"
          aria-live="polite"
        >
          <span className="inline-block translate-y-0.5">{cartCount}</span>
        </span>
      </button>
    </header>
  );
}
export default Header;
