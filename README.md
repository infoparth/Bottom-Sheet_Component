# Interactive Bottom Sheet Component

A responsive and accessible bottom sheet component built with React and TypeScript, featuring smooth animations, multiple snap points, and keyboard controls.

## Features

- 🔄 Multiple snap points (Closed, Half, Full)
- 🎨 Smooth spring animations
- ⌨️ Keyboard controls:
  - `O` - (Shift + 'o') Open the bottom sheet
  - `↑` - Move sheet to next snap point
  - `↓` - Move sheet to previous snap point
  - `Esc` - Close the sheet
- 📱 Responsive design
- 🖱️ Drag and release functionality
- 🎯 Automatic snap to nearest point
- 🎪 Backdrop with blur effect

## Getting Started

### Prerequisites

Make sure you have Node.js (v14 or higher) and npm installed on your machine.

### Installation

1. Clone the repository:

```bash
git clone <your-repository-url>
cd <repository-name>
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or your configured port).

## Usage

### Basic Implementation

```tsx
import { useState } from "react";
import BottomSheet from "./components/BottomSheet";

const SNAP_POINTS = {
  CLOSED: 0.05,
  HALF: 0.5,
  FULL: 1,
};

const App = () => {
  const [sheetPosition, setSheetPosition] = useState(SNAP_POINTS.CLOSED);

  return (
    <div>
      <BottomSheet
        position={sheetPosition}
        setPosition={setSheetPosition}
        title="My Bottom Sheet"
      >
        {/* Your content here */}
      </BottomSheet>
    </div>
  );
};
```

### Props

| Prop          | Type                         | Description                               |
| ------------- | ---------------------------- | ----------------------------------------- |
| `position`    | `number`                     | Current position of the sheet (0.05 to 1) |
| `setPosition` | `(position: number) => void` | Function to update sheet position         |
| `title`       | `string`                     | Title displayed in the sheet header       |
| `children`    | `ReactNode`                  | Content to be displayed in the sheet      |

### Keyboard Controls

The bottom sheet can be controlled using the following keys:

- Press `O` (Shift + 'o') to open the bottom sheet
- Use `↑` Arrow Up to move to the next snap point
- Use `↓` Arrow Down to move to the previous snap point
- Press `Esc` to snap to the nearest point

### Customization

You can customize the appearance by modifying the Tailwind classes in the component. The component uses Tailwind CSS for styling.

## Project Structure

```
src/
├── components/
│   └── BottomSheet.tsx
│   └── TestComponent.tsx
├── hooks/
│   ├── useKeyboardNavigation.ts
├── App.tsx
└── main.tsx
```

## Additional Information

- The component uses CSS transforms for smooth animations
- Implements gesture handling for touch devices
- Adapts to different screen sizes
