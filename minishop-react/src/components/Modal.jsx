import { useEffect, useId, useRef } from "react";

function Modal({ title, children, onClose }) {
  const dialogRef = useRef(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  function handleCancel(event) {
    event.preventDefault();
    onClose();
  }

  function handleBackdropClick(event) {
    if (event.target !== event.currentTarget) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const clickedOutside =
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom;
    if (clickedOutside) onClose();
  }

  return (
    <dialog
      ref={dialogRef}
      className="m-auto max-h-[calc(100dvh-48px)] w-[calc(100%-32px)] max-w-[820px] overflow-y-auto rounded-shop border border-shop-border bg-white p-5 text-shop-ink sm:p-7 backdrop:bg-black/50 backdrop:backdrop-blur-sm"
      aria-labelledby={titleId}
      onCancel={handleCancel}
      onClick={handleBackdropClick}
    >
      <div className="mb-[25px] flex items-center justify-between gap-[15px]">
        <h2 id={titleId} className="text-[19px] font-medium sm:text-[22px]">
          {title}
        </h2>
        <button
          className="size-9 shrink-0 rounded-shop bg-[#f1f1f1] text-2xl"
          aria-label="ปิดหน้าต่าง"
          onClick={onClose}
        >
          ×
        </button>
      </div>
      {children}
    </dialog>
  );
}
export default Modal;
