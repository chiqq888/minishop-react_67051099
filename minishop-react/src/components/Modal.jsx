import { useEffect, useId, useRef } from "react";

function Modal({ title, children, onClose }) {
  const ref = useRef(null);
  const titleId = useId();
  useEffect(() => {
    const dialog = ref.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);
  return (
    <dialog
      ref={ref}
      data-ui="modal"
      className="m-auto max-h-[calc(100dvh-48px)] w-[min(820px,calc(100%-32px))] overflow-y-auto rounded-shop border border-[#dedede] bg-white p-5 text-[#242424] min-[541px]:p-7 backdrop:bg-black/50 backdrop:backdrop-blur-sm"
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          const bounds = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < bounds.left ||
            event.clientX > bounds.right ||
            event.clientY < bounds.top ||
            event.clientY > bounds.bottom
          )
            onClose();
        }
      }}
    >
      <div
        data-ui="modal-heading"
        className="mb-[25px] flex items-center justify-between gap-[15px] [&_h2]:text-[19px] [&_h2]:font-medium min-[541px]:[&_h2]:text-[22px]"
      >
        <h2 id={titleId}>{title}</h2>
        <button
          data-ui="close-button"
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
