import { useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ onClose, children }: ModalProps) {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  const modalElement = document.querySelector(".modal") as HTMLElement;

  return createPortal(
    <div
      onClick={(event) => {
        if (!(event.target as HTMLElement).closest(".modal-content")) {
          console.log("click");

          onClose();
        }
      }}
      className="fixed w-full h-[100dvh] top-0 left-0 z-30 flex justify-center items-center backdrop-blur-md bg-black/20 "
    >
      <div className="modal-content">{children}</div>
    </div>,
    modalElement
  );
}

// max-h-[calc(100dvh-6rem)]
