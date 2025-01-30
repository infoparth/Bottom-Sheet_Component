import { useEffect } from "react";

interface UseKeyboardNavigationProps {
  onEscape?: () => void;
  onArrowUp?: () => void;
  onArrowDown?: () => void;
  onOpen?: () => void;
  enabled?: boolean;
}

export const useKeyboardNavigation = ({
  onEscape,
  onArrowUp,
  onArrowDown,
  onOpen,
  enabled = true,
}: UseKeyboardNavigationProps) => {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "Escape":
          onEscape?.();
          break;
        case "ArrowUp":
          event.preventDefault();
          onArrowUp?.();
          break;
        case "ArrowDown":
          event.preventDefault();
          onArrowDown?.();
          break;
        case "O":
          event.preventDefault();
          onOpen?.();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [enabled, onEscape, onArrowUp, onArrowDown, onOpen]);
};
