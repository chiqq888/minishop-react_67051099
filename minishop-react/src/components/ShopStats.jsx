import Icon from "./Icon";

function StatCard({ icon, label, value, unit, onClick }) {
  const content = (
    <>
      <span className="hidden size-[47px] shrink-0 place-items-center rounded-shop bg-shop-surface md:grid">
        <Icon name={icon} className="size-[25px]" />
      </span>
      <div>
        <p className="text-[11px] text-[#737373] sm:text-[13px]">{label}</p>
        <strong className="text-2xl leading-[1.3] font-medium sm:text-[26px]">
          {value}{" "}
          <span className="block text-[10px] font-normal text-[#838383] sm:ml-[5px] sm:inline sm:text-xs">
            {unit}
          </span>
        </strong>
      </div>
    </>
  );
  const classes =
    "flex items-center gap-3 rounded-shop border border-[#e2e2e2] bg-white px-2.5 py-[13px] text-left sm:px-[13px] sm:py-4 md:p-[18px] lg:gap-[17px] lg:px-6 lg:py-5";
  if (onClick) {
    return (
      <button className={`${classes} hover:bg-[#fafafa]`} onClick={onClick}>
        {content}
      </button>
    );
  }
  return <div className={classes}>{content}</div>;
}

function ShopStats({ products, cartCount, onOpenCart }) {
  const categories = [];
  for (const product of products) {
    if (!categories.includes(product.category))
      categories.push(product.category);
  }
  return (
    <section
      className="mt-[22px] mb-[30px] grid grid-cols-3 gap-2.5 sm:mb-11 md:gap-[18px]"
      aria-label="ภาพรวมร้านค้า"
    >
      <StatCard
        icon="box"
        label="สินค้าในร้าน"
        value={products.length}
        unit="รายการ"
      />
      <StatCard
        icon="documents"
        label="หมวดหมู่สินค้า"
        value={categories.length}
        unit="หมวดหมู่"
      />
      <StatCard
        icon="cart"
        label="ตะกร้าของคุณ"
        value={cartCount}
        unit="ชิ้น"
        onClick={onOpenCart}
      />
    </section>
  );
}
export default ShopStats;
