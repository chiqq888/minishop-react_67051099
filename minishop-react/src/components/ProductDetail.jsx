import Modal from "./Modal";
import ProductImage from "./ProductImage";
import Icon from "./Icon";
import Button from "./Button";
import { formatPrice } from "../data/products";

function ProductDetail({ product, onClose, onAddToCart }) {
  function handleAddToCart() {
    onAddToCart(product);
  }

  return (
    <Modal title="รายละเอียดสินค้า" onClose={onClose}>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-[30px]">
        <div className="grid h-60 min-h-[220px] place-items-center rounded-shop bg-shop-surface p-[30px] sm:h-auto sm:min-h-[300px]">
          <ProductImage
            image={product.image}
            name={product.title}
            className="max-h-[350px]"
          />
        </div>
        <div>
          <span className="text-[10px] font-medium tracking-[.5px] text-[#7b7b7b] sm:text-[11px]">
            {product.category}
          </span>
          <h3 className="my-2.5 text-[22px] leading-[1.5] font-medium">
            {product.title}
          </h3>
          <div className="inline-flex items-center gap-[5px] text-[10px] text-[#656565] sm:text-xs">
            <Icon name="star" className="size-3 sm:size-3.5" />
            <strong>{product.rating?.rate ?? "—"}</strong>
            <span>({product.rating?.count ?? 0} รีวิว)</span>
          </div>
          <p className="my-3.5 text-[30px] font-semibold">
            {formatPrice(product.price)}
          </p>
          <p className="my-2 text-xs leading-[1.9] text-[#666]">
            {product.description}
          </p>
          <Button className="mt-[17px] w-full" onClick={handleAddToCart}>
            <Icon name="cart" white />
            Add to Cart
          </Button>
        </div>
      </div>
      <p className="mt-6 border-t border-[#e4e4e4] pt-4 text-[11px] leading-[1.8] text-[#808080]">
        ข้อมูล และราคาไม่ใช่ของจริง เป็นข้อมูลจาก Fake Store API
      </p>
    </Modal>
  );
}
export default ProductDetail;
