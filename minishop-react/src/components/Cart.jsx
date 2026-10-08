import Modal from "./Modal";
import ProductImage from "./ProductImage";
import Icon from "./Icon";
import Button from "./Button";
import EmptyState from "./EmptyState";
import { formatPrice } from "../data/products";

function Cart({ items, cartCount, onClose, onChangeQuantity, onRemove }) {
  const total = items.reduce(function (sum, item) {
    return sum + item.price * item.quantity;
  }, 0);

  function renderCart() {
    if (items.length === 0) {
      return (
        <EmptyState
          icon="cart"
          title="ตะกร้ายังว่างอยู่"
          description="เลือกสิ่งที่คุณชอบ แล้วเพิ่มลงตะกร้าได้เลย"
          buttonText="เลือกดูสินค้า"
          onClick={onClose}
        />
      );
    }

    return (
      <>
        <div className="flex flex-col">
          {items.map(function (item) {
            return (
              <div
                key={item.id}
                className="flex flex-wrap gap-2.5 border-b border-[#e4e4e4] py-5 sm:flex-nowrap sm:gap-[18px]"
              >
                <div className="h-[90px] w-[68px] shrink-0 rounded-shop bg-[#f4f4f4] p-2.5 sm:h-[110px] sm:w-[95px] sm:p-[15px]">
                  <ProductImage image={item.image} name={item.title} />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-[15px] font-medium">{item.title}</h3>
                  <p className="my-1.5 text-[13px] text-[#737373]">
                    {formatPrice(item.price)} / ชิ้น
                  </p>
                  <div className="inline-flex items-center overflow-hidden rounded-shop border border-shop-border">
                    <button
                      className="h-[34px] w-9 bg-shop-bg"
                      aria-label={`ลดจำนวน ${item.title}`}
                      onClick={() => onChangeQuantity(item.id, -1)}
                    >
                      −
                    </button>
                    <span className="px-3 text-sm">{item.quantity}</span>
                    <button
                      className="h-[34px] w-9 bg-shop-bg"
                      aria-label={`เพิ่มจำนวน ${item.title}`}
                      onClick={() => onChangeQuantity(item.id, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between gap-[15px] sm:w-auto sm:flex-col sm:items-end sm:justify-start">
                  <strong className="text-[15px] whitespace-nowrap">
                    {formatPrice(item.price * item.quantity)}
                  </strong>
                  <button
                    className="rounded-shop p-[7px] text-[13px] text-[#5d5d5d] underline underline-offset-4"
                    aria-label={`ลบ ${item.title} ออกจากตะกร้า`}
                    onClick={() => onRemove(item)}
                  >
                    ลบสินค้า
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <section className="pt-[25px]" aria-label="สรุปตะกร้า">
          <div className="flex justify-between">
            <span className="inline-flex items-center gap-2">
              <Icon name="dollar" />
              รวมทั้งหมด
            </span>
            <strong className="text-[26px]">{formatPrice(total)}</strong>
          </div>
          <p className="mt-2.5 mb-[23px] text-xs text-[#777]">
            ตะกร้าตัวอย่างสำหรับ MiniShop React ไม่มีการชำระเงินจริง
          </p>
          <Button className="w-full" onClick={onClose}>
            เลือกซื้อต่อ <span aria-hidden="true">↗</span>
          </Button>
        </section>
      </>
    );
  }

  return (
    <Modal title={`ตะกร้าของคุณ (${cartCount} ชิ้น)`} onClose={onClose}>
      {renderCart()}
    </Modal>
  );
}
export default Cart;
