import { useState } from "react";
import BottomSheet from "./components/BottomSheet";
import TestComponent from "./components/TestComponent";
import { ChevronUp, ChevronDown } from "lucide-react";
import { useKeyboardNavigation } from "./hooks/useKeyboardNavigation";

const SNAP_POINTS = {
  CLOSED: 0.05,
  HALF: 0.5,
  FULL: 1,
};

const App = () => {
  const [sheetPosition, setSheetPosition] = useState(SNAP_POINTS.CLOSED);

  useKeyboardNavigation({
    onOpen: () => setSheetPosition(SNAP_POINTS.FULL),

    enabled: sheetPosition === SNAP_POINTS.CLOSED,
  });

  const handleUpArrow = () => {
    if (sheetPosition === SNAP_POINTS.CLOSED) {
      setSheetPosition(SNAP_POINTS.HALF);
    } else if (sheetPosition === SNAP_POINTS.HALF) {
      setSheetPosition(SNAP_POINTS.FULL);
    }
  };

  const handleDownArrow = () => {
    if (sheetPosition === SNAP_POINTS.FULL) {
      setSheetPosition(SNAP_POINTS.HALF);
    } else if (sheetPosition === SNAP_POINTS.HALF) {
      setSheetPosition(SNAP_POINTS.CLOSED);
    }
  };
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="min-h-screen">
        <div className="max-w-4xl mx-auto p-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            Interactive Bottom Sheet
          </h1>
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <p className="text-gray-600 leading-relaxed mb-4">
              This demo showcases a custom bottom sheet implementation with
              smooth animations and multiple snap points.
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <p>• Drag the sheet up and down</p>
              <p>• Use the buttons on the right to control position</p>
              <p>• Click outside to close</p>
            </div>
          </div>
        </div>
      </div>


      <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-[60]">
        <div className="group relative">
          <button
            onClick={() => handleUpArrow()}
            className="p-3 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:bg-white transition-all duration-200 border border-gray-200/50"
            aria-label="Open fully"
          >
            <ChevronUp className="w-6 h-6 text-gray-700" />
          </button>
          <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center bg-gray-900 text-white text-xs px-3 py-2 rounded-lg shadow-lg">
            Open
            <div className="absolute right-[-8px] top-1/2 -translate-y-1/2 w-0 h-0 border-y-[6px] border-y-transparent border-l-[8px] border-l-gray-900"></div>
          </span>
        </div>

        <div className="group relative">
          <button
            onClick={() => handleDownArrow()}
            className="p-3 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:bg-white transition-all duration-200 border border-gray-200/50"
            aria-label="Close"
          >
            <ChevronDown className="w-6 h-6 text-gray-700" />
          </button>
          <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center bg-gray-900 text-white text-xs px-3 py-2 rounded-lg shadow-lg">
            Close
            <div className="absolute right-[-8px] top-1/2 -translate-y-1/2 w-0 h-0 border-y-[6px] border-y-transparent border-l-[8px] border-l-gray-900"></div>
          </span>
        </div>
      </div>

      <BottomSheet
        position={sheetPosition}
        setPosition={setSheetPosition}
        title="Bottom Component"
      >
        <TestComponent />
      </BottomSheet>
    </div>
  );
};

export default App;
