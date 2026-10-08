import Icon from "./Icon";
import Button from "./Button";
import ProductImage from "./ProductImage";
import { formatPrice } from "../data/products";

function ProductCard({
  name,
  price,
  image,
  icon,
  category,
  rating,
  onAddToCart,
  onViewDetail,
}) {
  return (
    <article className="overflow-hidden rounded-shop border border-[#e2e2e2] bg-white transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[0_8px_24px_#00000009] motion-reduce:transition-none">
      {/* รูปภาพสินค้า */}
      <button
        className="relative block h-[175px] w-full bg-[#f1f1f1] px-4 pt-7 pb-[15px] sm:h-[230px] sm:p-7 max-xs:h-[235px]"
        onClick={onViewDetail}
        aria-label={`ดูรายละเอียด ${name}`}
      >
        <ProductImage image={image} name={name} icon={icon} />

        <span className="absolute top-[9px] left-[9px] rounded-md border border-[#e8e8e8] bg-white/90 px-2 py-[3px] text-[8px] tracking-[1px] text-[#6b6b6b] sm:top-[13px] sm:left-[13px] sm:text-[9px]">
          FAKE STORE
        </span>
      </button>

      {/* รายละเอียดสินค้า */}
      <div className="p-[13px] sm:p-5">
        {/* หมวดหมู่ และ คะแนนรีวิว */}
        <div className="mb-2.5 flex items-start justify-between gap-1 sm:gap-2.5">
          <span className="min-w-0 text-[10px] font-medium tracking-[.5px] wrap-anywhere text-[#7b7b7b] sm:text-[11px]">
            {category}
          </span>

          <span className="inline-flex items-center gap-[5px] text-[10px] text-[#656565] sm:text-xs">
            <Icon name="star" className="size-3 sm:size-3.5" />
            {rating?.rate ?? "—"}
          </span>
        </div>

        {/* ชื่อสินค้า */}
        <h3
          title={name}
          className="h-[42px] line-clamp-2 text-sm font-medium leading-[1.5] sm:h-12 sm:text-base"
        >
          {name}
        </h3>

        {/* ราคาสินค้า */}
        <p className="my-3 text-[21px] font-semibold tracking-[-.5px] sm:mt-[13px] sm:mb-[18px] sm:text-[22px]">
          {formatPrice(price)}
        </p>

        {/* ปุ่มแอคชัน */}
        <div className="flex gap-1.5 sm:gap-[9px]">
          {/* ปุ่มเพิ่มเข้าตะกร้า */}
          <Button compact className="flex-1" onClick={onAddToCart}>
            <Icon name="cart" className="hidden size-[18px] sm:block" white />
            Add to Cart
          </Button>

          {/* ปุ่มดูรายละเอียดแบบย่อ */}
          <button
            className="grid w-[34px] shrink-0 place-items-center rounded-shop border border-[#dcdcdc] bg-white hover:bg-[#f2f2f2] sm:w-[46px]"
            aria-label={`View Detail ${name}`}
            title="View Detail"
            onClick={onViewDetail}
          >
            <Icon name="documents" />
          </button>
        </div>

        {/* ลิงก์ดูรายละเอียด */}
        <button
          className="flex w-full items-center justify-between rounded-shop bg-transparent pt-3 text-[11px] text-[#727272]"
          onClick={onViewDetail}
        >
          View Detail <span aria-hidden="true">↗</span>
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
