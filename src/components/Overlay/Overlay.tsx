import { ReactNode, useEffect } from "react";

interface OverlayInte {
  children: ReactNode;
  onClose: () => void;
}

function Overlay({ children, onClose }: OverlayInte) {
  const handleEscClose = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleEscClose);
    return () => {
      window.removeEventListener("keydown", handleEscClose);
    };
  }, []);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 "
    >
      <div
        className="relative max-w-[80%] max-h-[80%] bg-white p-4 rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default Overlay;
