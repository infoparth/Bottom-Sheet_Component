import { useState } from "react";
import BottomSheet from "./components/BottomSwipe";
import { ChevronUp, ChevronDown, MoveVertical } from "lucide-react";

const SNAP_POINTS = {
  CLOSED: 0.05,
  HALF: 0.5,
  FULL: 1,
};

const App = () => {
  const [sheetPosition, setSheetPosition] = useState(SNAP_POINTS.CLOSED);

  return (
    <div className="relative min-h-screen">
      <div className="min-h-screen bg-gray-100">
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Main Content</h1>
          <p>Scroll and interact with the bottom sheet below</p>
        </div>
      </div>

      {/* Floating Control Buttons with Tooltips */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-[60]">
        {/* Open Fully */}
        <div className="group relative">
          <button
            onClick={() => setSheetPosition(SNAP_POINTS.FULL)}
            className="p-3 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors duration-200 border border-gray-200 opacity-50 hover:opacity-100"
            aria-label="Open fully"
          >
            <ChevronUp className="w-6 h-6 text-gray-600" />
          </button>
          <span className="absolute right-full top-1/2 -translate-y-1/2 hidden group-hover:flex bg-gray-800 text-white text-xs min-w-[130px] px-3 py-1 rounded-md shadow-md">
            Open Bottom Sheet Fully
          </span>
        </div>

        {/* Open Halfway */}
        <div className="group relative">
          <button
            onClick={() => setSheetPosition(SNAP_POINTS.HALF)}
            className="p-3 opacity-50 hover:opacity-100 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors duration-200 border border-gray-200"
            aria-label="Open halfway"
          >
            <MoveVertical className="w-6 h-6 text-gray-600" />
          </button>
          <span className="absolute right-full top-1/2 -translate-y-1/2 hidden group-hover:flex bg-gray-800 text-white text-xs min-w-[130px] px-3 py-1 rounded-md shadow-md">
            Open Bottom Sheet Halfway
          </span>
        </div>

        {/* Close */}
        <div className="group relative">
          <button
            onClick={() => setSheetPosition(SNAP_POINTS.CLOSED)}
            className="p-3 opacity-50 hover:opacity-100 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors duration-200 border border-gray-200"
            aria-label="Close"
          >
            <ChevronDown className="w-6 h-6 text-gray-600" />
          </button>
          <span className="absolute right-full top-1/2 -translate-y-1/2 hidden group-hover:flex bg-gray-800 text-white text-xs min-w-[100px] px-3 py-1 rounded-md shadow-md">
            Close Bottom Sheet
          </span>
        </div>
      </div>

      {/* Bottom Sheet */}
      <BottomSheet position={sheetPosition} setPosition={setSheetPosition} />
    </div>
  );
};

export default App;
