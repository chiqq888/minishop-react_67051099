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

  function moveSlide(direction) {
    setCurrentSlide(
      (index) => (index + direction + slides.length) % slides.length,
    );
  }
  return (
    <section
      data-ui="hero"
      className="grid grid-cols-1 overflow-hidden rounded-shop border border-[#e0e0e0] bg-[#ebebeb] min-[541px]:grid-cols-2"
      aria-labelledby="hero-title"
    >
      <div
        data-ui="hero-copy"
        className="p-7 min-[801px]:p-8 min-[1101px]:pt-[43px] min-[1101px]:pr-12 min-[1101px]:pb-[34px] min-[1101px]:pl-12 [&_h2]:mt-[21px] [&_h2]:mb-4 [&_h2]:text-[43px] [&_h2]:leading-[1.25] [&_h2]:font-semibold [&_h2]:tracking-[-2px] min-[541px]:[&_h2]:text-[38px] min-[801px]:[&_h2]:text-[clamp(36px,4vw,58px)] [&>p]:leading-[1.8] [&>p]:text-[#656565] [&>a]:mt-6 [&>a]:min-w-[170px] [&>a]:justify-between [&>a_span]:text-[22px]"
      >
        <span
          data-ui="hero-label"
          className="inline-flex items-center gap-[9px] text-[11px] tracking-[2px]"
        >
          <span
            data-ui="status-dot"
            className="size-1.5 rounded-full bg-[#202020]"
          />{" "}
          THE EVERYDAY COLLECTION
        </span>
        <h2 id="hero-title">
          เรียบง่าย.
          <br />
          แต่ครบทุกวัน
          <span data-ui="hero-period" className="text-[#858585]">
            .
          </span>
        </h2>
        <p>
          เทคโนโลยี ไลฟ์สไตล์ และของใช้ที่คุณชอบ
          <br />
          เลือกดูได้ในที่เดียว กับ MiniShop
        </p>
        <a
          data-ui="button"
          className="inline-flex min-h-[46px] items-center justify-center gap-3 rounded-shop px-[18px] py-2.5 font-medium transition-colors duration-200 motion-reduce:transition-none border border-[#242424] bg-[#242424] text-white hover:bg-[#454545] [&_.icon]:brightness-0 [&_.icon]:invert"
          href="#catalog"
        >
          เลือกดูสินค้า <span aria-hidden="true">↗</span>
        </a>
        <div
          data-ui="hero-note"
          className="mt-[25px] flex items-center gap-2 text-[11px] text-[#6b6b6b] min-[541px]:text-xs [&_.icon]:size-[18px]"
        >
          <Icon name="medal" /> คัดสรรสิ่งเล็ก ๆ ที่ทำให้วันของคุณดีขึ้น
        </div>
      </div>
      <div
        data-ui="hero-visual"
        className="relative flex min-w-0 items-center justify-center bg-[#f3f3f3] px-[25px] pt-2.5 pb-[95px] min-[541px]:pt-6"
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
          data-ui="hero-slide-window"
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
            data-ui="hero-slide-track"
            className={`flex w-full transition-transform duration-[450ms] ease-in-out motion-reduce:transition-none ${slidePositions[currentSlide]}`}
          >
            {slides.map((slide, index) => (
              <div
                data-ui="hero-slide"
                className="grid h-60 min-w-0 flex-[0_0_100%] grid-cols-[minmax(0,1fr)] grid-rows-[minmax(0,1fr)] place-items-center min-[541px]:h-[300px] min-[801px]:h-[330px] min-[1101px]:h-[355px] min-[1600px]:h-[390px] [&_img]:h-full [&_img]:min-h-0 [&_img]:w-full [&_img]:min-w-0 [&_img]:object-contain [&_img]:select-none"
                key={slide.name}
                aria-hidden={index !== currentSlide}
              >
                <img
                  src={slide.image}
                  alt={index === currentSlide ? slide.alt : ""}
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
        <div
          data-ui="hero-caption"
          className="absolute right-6 bottom-[76px] left-6 flex justify-between gap-2.5 text-[10px] tracking-[1px] text-[#767676] min-[541px]:right-[15px] min-[541px]:left-[15px] min-[801px]:right-7 min-[801px]:left-7"
        >
          <span>
            {String(currentSlide + 1).padStart(2, "0")} / {current.caption}
          </span>
          <span>{current.name}</span>
        </div>
        <div
          data-ui="carousel-controls"
          className="absolute right-6 bottom-5 left-6 flex items-center justify-between gap-3 min-[541px]:right-7 min-[541px]:left-7"
        >
          <div
            data-ui="carousel-dots"
            className="flex gap-1"
            role="group"
            aria-label="เลือกภาพ Hero"
          >
            {slides.map((slide, index) => (
              <button
                key={slide.name}
                data-ui="carousel-dot"
                className={`relative h-10 w-6 rounded-shop bg-transparent after:absolute after:top-1/2 after:left-1/2 after:h-[7px] after:-translate-x-1/2 after:-translate-y-1/2 after:transition-[width,background-color] after:duration-200 motion-reduce:after:transition-none ${index === currentSlide ? "after:w-[17px] after:rounded-[5px] after:bg-[#242424]" : "after:w-[7px] after:rounded-full after:bg-[#bdbdbd]"}`}
                aria-label={`แสดงภาพ ${slide.name}`}
                aria-pressed={index === currentSlide}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
          <div data-ui="carousel-arrows" className="flex gap-2">
            <button
              data-ui="carousel-autoplay"
              className="grid size-10 place-items-center rounded-shop border border-[#d5d5d5] bg-white text-sm hover:border-[#242424] hover:bg-[#242424] hover:text-white"
              aria-label={
                isPlaying ? "หยุดสไลด์อัตโนมัติ" : "เปิดสไลด์อัตโนมัติ"
              }
              aria-pressed={isPlaying}
              onClick={() => setIsPlaying((playing) => !playing)}
            >
              <span aria-hidden="true">{isPlaying ? "Ⅱ" : "▶"}</span>
            </button>
            <button
              data-ui="carousel-button"
              className="grid size-10 place-items-center rounded-shop border border-[#d5d5d5] bg-white text-xl hover:border-[#242424] hover:bg-[#242424] hover:text-white"
              aria-label="ภาพก่อนหน้า"
              onClick={() => moveSlide(-1)}
            >
              ←
            </button>
            <button
              data-ui="carousel-button"
              className="grid size-10 place-items-center rounded-shop border border-[#d5d5d5] bg-white text-xl hover:border-[#242424] hover:bg-[#242424] hover:text-white"
              aria-label="ภาพถัดไป"
              onClick={() => moveSlide(1)}
            >
              →
            </button>
          </div>
        </div>
        <span
          data-ui="sr-only"
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
