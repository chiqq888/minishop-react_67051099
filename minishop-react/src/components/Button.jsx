function Button({
  children,
  onClick,
  outlined = false,
  compact = false,
  className = "",
  ...props
}) {
  let colors = "border-shop-ink bg-shop-ink text-white hover:bg-[#454545]";
  if (outlined) {
    colors = "border-[#d4d4d4] bg-white text-shop-ink hover:bg-[#f0f0f0]";
  }

  let spacing = "min-h-[46px] gap-3 px-[18px] py-2.5";
  if (compact) {
    spacing =
      "min-h-[42px] gap-1 px-[5px] py-2 text-[11px] sm:min-h-[46px] sm:gap-[7px] sm:px-[7px] sm:py-2.5 sm:text-[13px]";
  }

  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center rounded-shop border font-medium transition-colors duration-200 motion-reduce:transition-none ${colors} ${spacing} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
export default Button;
