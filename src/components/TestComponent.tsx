const TestComponent = () => {
  return (
    <>
      <div className="px-6 pb-6 overflow-y-auto h-full">
        <div className="space-y-6 py-4">
          <div className="bg-gray-50 p-4 rounded-xl">
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              Section 1
            </h3>
            <p className="text-gray-600 leading-relaxed">
              This is an enhanced bottom sheet component with smooth animations
              and improved UI.
            </p>
          </div>

          <div className="bg-blue-50 p-4 rounded-xl">
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              Section 2
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Try dragging it up and down, or use the control buttons on the
              right!
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-50 p-4 rounded-xl">
                <h4 className="font-medium text-gray-800 mb-1">Card {i}</h4>
                <p className="text-sm text-gray-600">
                  Sample content for card {i}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TestComponent;
