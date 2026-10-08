import { useState } from "react";
import Icon from "./Icon";

function ProductImage({ image, name, icon }) {
  const [failedImage, setFailedImage] = useState("");
  return image && failedImage !== image ? (
    <img
      data-ui="product-image"
      className="h-full w-full object-contain mix-blend-multiply"
      src={image}
      alt={name}
      loading="lazy"
      onError={() => setFailedImage(image)}
    />
  ) : (
    <div
      data-ui="image-placeholder"
      className="flex h-full min-h-20 w-full flex-col items-center justify-center gap-2.5 text-[30px] [&>.icon]:size-10 [&_span]:text-xs [&_span]:text-[#888]"
      role="img"
      aria-label={name}
    >
      {icon || <Icon name="box" />}
      <span>ไม่มีภาพสินค้า</span>
    </div>
  );
}
export default ProductImage;
