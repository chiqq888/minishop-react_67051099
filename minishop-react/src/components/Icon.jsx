import box from "../assets/box-minimalistic-svgrepo-com.svg";
import cart from "../assets/cart-3-svgrepo-com.svg";
import documents from "../assets/documents-svgrepo-com.svg";
import dollar from "../assets/dollar-minimalistic-svgrepo-com.svg";
import medal from "../assets/medal-ribbon-svgrepo-com.svg";
import search from "../assets/minimalistic-magnifer-svgrepo-com.svg";
import star from "../assets/star-svgrepo-com.svg";

const icons = {
  box,
  cart,
  documents,
  dollar,
  medal,
  search,
  star,
};
function Icon({ name, className = "size-[22px]", white = false }) {
  let color = "brightness-[.45]";
  if (white) color = "brightness-0 invert";
  return (
    <img
      className={`shrink-0 grayscale ${color} ${className}`}
      src={icons[name] || box}
      alt=""
      aria-hidden="true"
    />
  );
}
export default Icon;
