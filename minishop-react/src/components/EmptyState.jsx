import Icon from "./Icon";
import Button from "./Button";

function EmptyState({ icon, title, description, buttonText, onClick }) {
  return (
    <div className="rounded-shop border border-dashed border-[#cfcfcf] bg-white px-5 py-[65px] text-center">
      <Icon name={icon} className="mx-auto mb-[15px] size-[45px] opacity-50" />
      <h3 className="text-xl font-medium">{title}</h3>
      <p className="mt-[7px] mb-[22px] text-sm text-shop-muted">
        {description}
      </p>
      <Button onClick={onClick}>{buttonText}</Button>
    </div>
  );
}
export default EmptyState;
