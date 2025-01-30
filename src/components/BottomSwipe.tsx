import React, { useState, useRef, useEffect } from "react";

const SNAP_POINTS = {
  CLOSED: 0.05,
  HALF: 0.5,
  FULL: 1,
};

interface BottomSheetProps {
  position: number;
  setPosition: (position: number) => void;
}

const BottomSheet: React.FC<BottomSheetProps> = ({ position, setPosition }) => {
  // const [position, setPosition] = useState(SNAP_POINTS.FULL);
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

  const handleStart = (e: React.TouchEvent | React.MouseEvent) => {
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    setIsDragging(true);
    startYRef.current = clientY;
    currentYRef.current = clientY;
    setDragPosition(positionRef.current); // Use ref instead of state
    console.log(
      "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
    );
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
    console.log(
      "-------------------------------------------------------------------------------"
    );

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
    console.log(
      "=============================================================="
    );
    console.clear();
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

  console.log("The value of isDragging: ", isDragging);

  return (
    <div className="fixed inset-x-0 bottom-0 z-50">
      <div
        ref={sheetRef}
        className="bg-white rounded-t-xl shadow-lg h-[80vh] touch-none"
        style={{
          transform: `translateY(${(1 - position) * 100}%)`,
          transition: isDragging
            ? "none"
            : "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          cursor: isDragging ? "grabbing" : "grab",
        }}
        onTouchStart={handleStart}
        onTouchMove={handleMove as unknown as React.TouchEventHandler}
        onTouchEnd={handleEnd}
        onMouseDown={handleStart}
        // onMouseOut={handleMove as unknown as React.MouseEventHandler}
      >
        {/* Handle bar */}
        <div className="flex justify-center p-2 w-full cursor-grab active:cursor-grabbing">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
        </div>

        {/* Content */}
        <div className="px-4 pb-4 overflow-y-auto h-full">
          <h2 className="text-xl font-bold mb-4">Bottom Sheet Content</h2>
          <div className="space-y-4">
            <p>
              This is a custom bottom sheet component with smooth animations.
            </p>
            <p>Try dragging it up and down!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomSheet;
