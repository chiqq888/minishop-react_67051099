import { useState } from "react";
import Icon from "./Icon";

function ProductImage({ image, name, icon, className = "" }) {
  const [failedImage, setFailedImage] = useState("");

  if (image && failedImage !== image) {
    return (
      <img
        className={`h-full w-full object-contain mix-blend-multiply ${className}`}
        src={image}
        alt={name}
        loading="lazy"
        onError={() => setFailedImage(image)}
      />
    );
  }

  return (
    <div
      className="flex h-full min-h-20 w-full flex-col items-center justify-center gap-2.5 text-[30px]"
      role="img"
      aria-label={name}
    >
      {icon || <Icon name="box" className="size-10" />}
      <span className="text-xs text-[#888]">ไม่มีภาพสินค้า</span>
    </div>
  );
}
export default ProductImage;
