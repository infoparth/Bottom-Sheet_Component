import React, { useState, useRef, useEffect } from "react";
import { useKeyboardNavigation } from "../hooks/useKeyboardNavigation";

const SNAP_POINTS = {
  CLOSED: 0.05,
  HALF: 0.5,
  FULL: 1,
};

interface BottomSheetProps {
  position: number;
  setPosition: (position: number) => void;
  title?: string;
  children?: React.ReactNode;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  position,
  setPosition,
  title = "Demo Title",
  children,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState(SNAP_POINTS.FULL);
  const startYRef = useRef(0);
  const currentYRef = useRef(0);
  const positionRef = useRef(SNAP_POINTS.FULL); // Add this to track current position
  const sheetRef = useRef(null);

  // Update positionRef whenever position changes
  useEffect(() => {
    positionRef.current = position;
  }, [position]);

  const findNearestSnapPoint = (currentPosition: number) => {
    return Object.values(SNAP_POINTS).reduce((prev, curr) => {
      const currentDiff = Math.abs(curr - currentPosition);
      const prevDiff = Math.abs(prev - currentPosition);
      return currentDiff < prevDiff ? curr : prev;
    });
  };

  // Keyboard navigation
  useKeyboardNavigation({
    onEscape: () => setPosition(SNAP_POINTS.CLOSED),
    onArrowUp: () => handleSnapPoint("up"),
    onArrowDown: () => handleSnapPoint("down"),

    enabled: position > SNAP_POINTS.CLOSED,
  });

  // Handle snap point navigation
  const handleSnapPoint = (direction: "up" | "down") => {
    const snapPoints = Object.values(SNAP_POINTS).sort((a, b) => a - b);
    const currentIndex = snapPoints.findIndex(
      (point) => point === positionRef.current
    );

    if (direction === "up" && currentIndex < snapPoints.length - 1) {
      setPosition(snapPoints[currentIndex + 1]);
    } else if (direction === "down" && currentIndex > 0) {
      setPosition(snapPoints[currentIndex - 1]);
    }
  };

  // Handle Backdrop Click
  const handleBackdropClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const nearestSnap = findNearestSnapPoint(positionRef.current);
    setPosition(nearestSnap);
  };

  const handleStart = (e: React.TouchEvent | React.MouseEvent) => {
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    setIsDragging(true);
    startYRef.current = clientY;
    currentYRef.current = clientY;
    setDragPosition(positionRef.current); // Use ref instead of state
  };

  const handleMove = (e: TouchEvent | MouseEvent) => {
    if (!isDragging) return;

    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    const delta = (clientY - startYRef.current) / window.innerHeight;
    currentYRef.current = clientY;

    // Calculate new position based on drag
    const newPosition = Math.max(0, Math.min(1, dragPosition - delta));

    // Update both the state and ref
    setPosition(newPosition);
    positionRef.current = newPosition;

    // Prevent default to stop scrolling while dragging
    e.preventDefault();
  };

  const handleEnd = () => {
    if (!isDragging) return;

    setIsDragging(false);

    // Use positionRef for calculating nearest snap point
    const nearestSnap = Object.values(SNAP_POINTS).reduce((prev, curr) =>
      Math.abs(curr - positionRef.current) <
      Math.abs(prev - positionRef.current)
        ? curr
        : prev
    );

    // Animate to nearest snap point
    setPosition(nearestSnap);
    positionRef.current = nearestSnap;
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => handleMove(e);
    const handleMouseUp = () => handleEnd();

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragPosition]);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 z-40 ${
          position > SNAP_POINTS.CLOSED
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => handleBackdropClick}
      />

      <div className="fixed inset-x-0 bottom-0 z-50">
        <div
          ref={sheetRef}
          className="bg-white rounded-t-2xl shadow-lg h-[85vh] touch-none"
          style={{
            transform: `translateY(${(1 - position) * 100}%)`,
            transition: isDragging
              ? "none"
              : "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            cursor: isDragging ? "grabbing" : "grab",
          }}
          onTouchStart={handleStart}
          onTouchMove={handleMove as unknown as React.TouchEventHandler}
          onTouchEnd={handleEnd}
          onMouseDown={handleStart}
        >
          <div className="flex flex-col items-center p-3 border-b border-gray-100">
            <div className="w-12 h-1.5 bg-gray-300 rounded-full mb-2" />
            <div className="w-full flex justify-between items-center px-4">
              <h2 className="text-xl font-bold text-gray-800">{title}</h2>
              <button
                onClick={() => setPosition(SNAP_POINTS.CLOSED)}
                className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="px-6 pb-6 overflow-y-auto h-full">
            <div className="space-y-6 py-4">
              <div
                className="px-6 pb-6 overflow-y-auto h-full"
                role="region"
                aria-labelledby="bottom-sheet-title"
              >
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BottomSheet;
