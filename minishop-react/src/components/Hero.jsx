import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import laptop from "../assets/hero-laptop-cutout.png";
import headphones from "../assets/hero-headphones-cutout.png";
import backpack from "../assets/hero-backpack-cutout.png";
import watch from "../assets/hero-watch-cutout.png";

const slides = [
  {
    image: laptop,
    name: "Laptop",
    caption: "WORK & CREATE",
    alt: "แล็ปท็อปสีดำ",
  },
  {
    image: headphones,
    name: "Headphones",
    caption: "YOUR FAVORITE SOUND",
    alt: "หูฟังไร้สายสีขาว",
  },
  {
    image: backpack,
    name: "Backpack",
    caption: "TAKE IT EVERYWHERE",
    alt: "กระเป๋าเป้สำหรับใช้ทุกวัน",
  },
  {
    image: watch,
    name: "Smart Watch",
    caption: "EVERY MOMENT MATTERS",
    alt: "สมาร์ตวอทช์",
  },
];

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouching, setIsTouching] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [documentVisible, setDocumentVisible] = useState(
    () => !document.hidden,
  );
  const touchStart = useRef(null);
  const current = slides[currentSlide];
  const slidePositions = [
    "translate-x-0",
    "-translate-x-full",
    "-translate-x-[200%]",
    "-translate-x-[300%]",
  ];
  const autoSliding =
    isPlaying &&
    !isHovered &&
    !isTouching &&
    !hasFocus &&
    !reducedMotion &&
    documentVisible;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    function updateMotion(event) {
      setReducedMotion(event.matches);
    }
    function updateVisibility() {
      setDocumentVisible(!document.hidden);
    }
    media.addEventListener("change", updateMotion);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      media.removeEventListener("change", updateMotion);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  useEffect(() => {
    if (!autoSliding) return;
    const timer = setTimeout(() => {
      setCurrentSlide((index) => (index + 1) % slides.length);
    }, 5000);
    return () => clearTimeout(timer);
  }, [autoSliding, currentSlide]);

  function getDotClass(index) {
    if (index === currentSlide) return "w-[17px] rounded-[5px] bg-shop-ink";
    return "w-[7px] rounded-full bg-[#bdbdbd]";
  }

  function moveSlide(direction) {
    setCurrentSlide(
      (index) => (index + direction + slides.length) % slides.length,
    );
  }
  return (
    <section
      className="grid grid-cols-1 overflow-hidden rounded-shop border border-[#e0e0e0] bg-[#ebebeb] sm:grid-cols-2"
      aria-labelledby="hero-title"
    >
      <div className="p-7 md:p-8 lg:pt-[43px] lg:pr-12 lg:pb-[34px] lg:pl-12">
        <span className="inline-flex min-h-5 items-center gap-[9px] text-[11px] tracking-[2px]">
          <span
            className="size-1.5 shrink-0 rounded-full bg-[#202020]"
            aria-hidden="true"
          />
          <span className="inline-block translate-y-0.5 leading-none">
            THE EVERYDAY COLLECTION
          </span>
        </span>
        <h2
          id="hero-title"
          className="mt-[21px] mb-4 text-[43px] leading-[1.25] font-semibold tracking-[-2px] sm:text-[38px] md:text-[clamp(36px,4vw,58px)]"
        >
          เรียบง่าย.
          <br />
          แต่ครบทุกวัน
          <span className="text-[#858585]">.</span>
        </h2>
        <p className="leading-[1.8] text-[#656565]">
          เทคโนโลยี ไลฟ์สไตล์ และของใช้ที่คุณชอบ
          <br />
          เลือกดูได้ในที่เดียว กับ MiniShop
        </p>
        <a
          className="mt-6 inline-flex min-h-[46px] min-w-[170px] items-center justify-between gap-3 rounded-shop border border-shop-ink bg-shop-ink px-[18px] py-2.5 font-medium text-white transition-colors duration-200 hover:bg-[#454545] motion-reduce:transition-none"
          href="#catalog"
        >
          เลือกดูสินค้า{" "}
          <span className="text-[22px]" aria-hidden="true">
            ↗
          </span>
        </a>
        <div className="mt-[25px] flex min-h-5 items-center gap-2 text-[11px] text-[#6b6b6b] sm:text-xs">
          <Icon name="medal" className="size-[18px]" />
          <span className="min-w-0 translate-y-0.5 leading-[1.5]">
            คัดสรรสิ่งเล็ก ๆ ที่ทำให้วันของคุณดีขึ้น
          </span>
        </div>
      </div>
      <div
        className="relative flex min-w-0 items-center justify-center bg-shop-surface px-[25px] pt-2.5 pb-[95px] sm:pt-6"
        role="region"
        aria-roledescription="carousel"
        aria-label="ภาพไลฟ์สไตล์ MiniShop"
        tabIndex={0}
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse") setIsHovered(true);
        }}
        onPointerLeave={(event) => {
          if (event.pointerType === "mouse") setIsHovered(false);
        }}
        onFocusCapture={() => setHasFocus(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget))
            setHasFocus(false);
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            moveSlide(event.key === "ArrowLeft" ? -1 : 1);
          }
        }}
      >
        <div
          className="w-full min-w-0 touch-pan-y overflow-hidden"
          onTouchStart={(event) => {
            setIsTouching(true);
            touchStart.current = event.touches[0].clientX;
          }}
          onTouchEnd={(event) => {
            setIsTouching(false);
            if (touchStart.current !== null) {
              const delta =
                event.changedTouches[0].clientX - touchStart.current;
              if (Math.abs(delta) > 45) moveSlide(delta < 0 ? 1 : -1);
              touchStart.current = null;
            }
          }}
          onTouchCancel={() => {
            setIsTouching(false);
            touchStart.current = null;
          }}
        >
          <div
            className={`flex w-full transition-transform duration-[450ms] ease-in-out motion-reduce:transition-none ${slidePositions[currentSlide]}`}
          >
            {slides.map((slide, index) => (
              <div
                className="grid h-60 min-w-0 flex-[0_0_100%] grid-cols-[minmax(0,1fr)] grid-rows-[minmax(0,1fr)] place-items-center sm:h-[300px] md:h-[330px] lg:h-[355px] xl:h-[390px]"
                key={slide.name}
                aria-hidden={index !== currentSlide}
              >
                <img
                  className="h-full min-h-0 w-full min-w-0 object-contain select-none"
                  src={slide.image}
                  alt={index === currentSlide ? slide.alt : ""}
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="absolute right-6 bottom-[76px] left-6 flex justify-between gap-2.5 text-[10px] tracking-[1px] text-shop-muted sm:right-[15px] sm:left-[15px] md:right-7 md:left-7">
          <span>
            {String(currentSlide + 1).padStart(2, "0")} / {current.caption}
          </span>
          <span>{current.name}</span>
        </div>
        <div className="absolute right-6 bottom-5 left-6 flex items-center justify-between gap-3 sm:right-7 sm:left-7">
          <div className="flex gap-1" role="group" aria-label="เลือกภาพ Hero">
            {slides.map((slide, index) => (
              <button
                key={slide.name}
                className="grid h-10 w-6 place-items-center rounded-shop"
                aria-label={`แสดงภาพ ${slide.name}`}
                aria-pressed={index === currentSlide}
                onClick={() => setCurrentSlide(index)}
              >
                <span
                  className={`h-[7px] transition-[width,background-color] duration-200 motion-reduce:transition-none ${getDotClass(index)}`}
                />
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button
              className="grid size-10 place-items-center rounded-shop border border-[#d5d5d5] bg-white text-sm hover:border-shop-ink hover:bg-shop-ink hover:text-white"
              aria-label={
                isPlaying ? "หยุดสไลด์อัตโนมัติ" : "เปิดสไลด์อัตโนมัติ"
              }
              aria-pressed={isPlaying}
              onClick={() => setIsPlaying((playing) => !playing)}
            >
              <span aria-hidden="true">{isPlaying ? "Ⅱ" : "▶"}</span>
            </button>
            <button
              className="grid size-10 place-items-center rounded-shop border border-[#d5d5d5] bg-white text-xl hover:border-shop-ink hover:bg-shop-ink hover:text-white"
              aria-label="ภาพก่อนหน้า"
              onClick={() => moveSlide(-1)}
            >
              ←
            </button>
            <button
              className="grid size-10 place-items-center rounded-shop border border-[#d5d5d5] bg-white text-xl hover:border-shop-ink hover:bg-shop-ink hover:text-white"
              aria-label="ภาพถัดไป"
              onClick={() => moveSlide(1)}
            >
              →
            </button>
          </div>
        </div>
        <span
          className="sr-only"
          role="status"
          aria-live={autoSliding ? "off" : "polite"}
        >
          ภาพ {currentSlide + 1} จาก {slides.length}: {current.name}
        </span>
      </div>
    </section>
  );
}
export default Hero;
