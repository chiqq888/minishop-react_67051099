import box from "../assets/box-minimalistic-svgrepo-com.svg";
import cart from "../assets/cart-3-svgrepo-com.svg";
import documents from "../assets/documents-svgrepo-com.svg";
import dollar from "../assets/dollar-minimalistic-svgrepo-com.svg";
import letter from "../assets/letter-svgrepo-com.svg";
import medal from "../assets/medal-ribbon-svgrepo-com.svg";
import mention from "../assets/mention-circle-svgrepo-com.svg";
import search from "../assets/minimalistic-magnifer-svgrepo-com.svg";
import star from "../assets/star-svgrepo-com.svg";
import user from "../assets/user-rounded-svgrepo-com.svg";
import avatar from "../assets/user-circle-svgrepo-com.svg";

const icons = {
  box,
  cart,
  documents,
  dollar,
  letter,
  medal,
  mention,
  search,
  star,
  user,
  avatar,
};
function Icon({ name, className = "" }) {
  return (
    <img
      className={`icon size-[22px] shrink-0 grayscale brightness-[.45] ${className}`}
      src={icons[name] || box}
      alt=""
      aria-hidden="true"
    />
  );
}
export default Icon;
