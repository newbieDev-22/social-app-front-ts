import { useEffect } from "react";
import { createPortal } from "react-dom";
import { IModalProps } from "../data-type/react-type";

export default function Modal({
  width = 30,
  title,
  children,
  open,
  onClose,
}: IModalProps) {
  useEffect(() => {
    const handleEscPress = (e: KeyboardEvent): void => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };

    document.body.addEventListener("keydown", handleEscPress);
    return () => document.body.removeEventListener("keydown", handleEscPress);
  }, [onClose]);

  const modalElement = document.getElementById("modal") as Element;

  return (
    <>
      {open
        ? createPortal(
            <>
              <div className="fixed inset-0 bg-gray-500/40 z-30"></div>
              <div className="fixed inset-0 z-40" onClick={onClose}>
                <div className="flex justify-center items-center min-h-screen">
                  <div
                    className="bg-white rounded-lg shadow-lg"
                    style={{ width: `${width}rem` }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex justify-between items-center p-4 border-b">
                      <h5 className="flex-1 text-2xl font-bold text-center mx-2">
                        {title}
                      </h5>
                      <button className="text-lg" onClick={onClose}>
                        &#10005;
                      </button>
                    </div>
                    <div className="px-6 py-4">{children}</div>
                  </div>
                </div>
              </div>
            </>,
            modalElement
          )
        : null}
    </>
  );
}
