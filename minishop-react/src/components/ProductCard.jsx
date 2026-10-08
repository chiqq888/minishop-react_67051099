import Icon from "./Icon";
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
    <article
      data-ui="product-card"
      className="overflow-hidden rounded-shop border border-[#e2e2e2] bg-white transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[0_8px_24px_#00000009] motion-reduce:transition-none"
    >
      <button
        data-ui="product-image-button"
        className="relative block h-[175px] w-full bg-[#f1f1f1] px-4 pt-7 pb-[15px] min-[541px]:h-[230px] min-[541px]:p-7 max-[360px]:h-[235px]"
        onClick={onViewDetail}
        aria-label={`ดูรายละเอียด ${name}`}
      >
        <ProductImage image={image} name={name} icon={icon} />
        <span
          data-ui="source-tag"
          className="absolute top-[9px] left-[9px] rounded-md border border-[#e8e8e8] bg-white/90 px-2 py-[3px] text-[8px] tracking-[1px] text-[#6b6b6b] min-[541px]:top-[13px] min-[541px]:left-[13px] min-[541px]:text-[9px]"
        >
          FAKE STORE
        </span>
        <span
          data-ui="image-arrow"
          className="absolute right-3.5 bottom-3 text-[19px] text-[#747474]"
          aria-hidden="true"
        >
          ↗
        </span>
      </button>
      <div
        data-ui="product-content"
        className="p-[13px] min-[541px]:p-5 [&_h3]:line-clamp-2 [&_h3]:h-[42px] [&_h3]:text-sm [&_h3]:leading-[1.5] [&_h3]:font-medium min-[541px]:[&_h3]:h-12 min-[541px]:[&_h3]:text-base"
      >
        <div
          data-ui="product-topline"
          className="mb-2.5 flex items-start justify-between gap-1 min-[541px]:gap-2.5"
        >
          <span
            data-ui="product-category"
            className="min-w-0 text-[10px] font-medium tracking-[.5px] wrap-anywhere text-[#7b7b7b] min-[541px]:text-[11px]"
          >
            {category}
          </span>
          <span
            data-ui="rating"
            className="inline-flex items-center gap-[5px] text-[10px] text-[#656565] min-[541px]:text-xs [&_.icon]:size-3 min-[541px]:[&_.icon]:size-3.5"
          >
            <Icon name="star" />
            {rating?.rate ?? "—"}
          </span>
        </div>
        <h3 title={name}>{name}</h3>
        <p
          data-ui="product-price"
          className="my-3 text-[21px] font-semibold tracking-[-.5px] min-[541px]:mt-[13px] min-[541px]:mb-[18px] min-[541px]:text-[22px]"
        >
          {formatPrice(price)}
        </p>
        <div
          data-ui="card-actions"
          className="flex gap-1.5 min-[541px]:gap-[9px] [&>button:first-child]:min-h-[42px] [&>button:first-child]:flex-1 [&>button:first-child]:gap-1 [&>button:first-child]:px-[5px] [&>button:first-child]:py-2 [&>button:first-child]:text-[11px] min-[541px]:[&>button:first-child]:min-h-[46px] min-[541px]:[&>button:first-child]:gap-[7px] min-[541px]:[&>button:first-child]:px-[7px] min-[541px]:[&>button:first-child]:py-2.5 min-[541px]:[&>button:first-child]:text-[13px] [&_.icon]:size-[18px] [&>button:first-child_.icon]:hidden min-[541px]:[&>button:first-child_.icon]:block"
        >
          <button
            data-ui="button"
            className="inline-flex min-h-[46px] items-center justify-center gap-3 rounded-shop px-[18px] py-2.5 font-medium transition-colors duration-200 motion-reduce:transition-none border border-[#242424] bg-[#242424] text-white hover:bg-[#454545] [&_.icon]:brightness-0 [&_.icon]:invert"
            onClick={onAddToCart}
          >
            <Icon name="cart" />
            Add to Cart
          </button>
          <button
            data-ui="detail-button"
            className="grid w-[34px] shrink-0 place-items-center rounded-shop border border-[#dcdcdc] bg-white hover:bg-[#f2f2f2] min-[541px]:w-[46px]"
            aria-label={`View Detail ${name}`}
            title="View Detail"
            onClick={onViewDetail}
          >
            <Icon name="documents" />
          </button>
        </div>
        <button
          data-ui="view-detail-link"
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
