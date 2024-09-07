import React, { useState, useRef } from 'react';
import CanvasComponent from './components/CanvasComponent';
import ControlPanel from './components/ControlPanel';
import { drawOnCanvas } from './utils/CanvasUtils';
import { saveBrushDataToJson } from './services/BrushDataService';

const App = () => {
  const [isBrushActive, setBrushActive] = useState(false);
  const brushStrokes = useRef([]);

  const handleActivateBrush = () => {
    setBrushActive(true);
  };

  const handleDeactivateBrush = () => {
    setBrushActive(false);
  };

  const handleDraw = (event, canvas, context) => {
    const brushColor = event.button === 0 ? 'green' : 'red'; // Left-click: green, Right-click: red
    drawOnCanvas(event, canvas, context, isBrushActive, brushColor);

    brushStrokes.current.push({
      x: event.clientX,
      y: event.clientY,
      color: brushColor,
    });
  };

  const handleSave = () => {
    saveBrushDataToJson(brushStrokes.current);
  };

  return (
    <div>
      <CanvasComponent
        imageSrc="https://upload.wikimedia.org/wikipedia/en/7/7d/Lenna_%28test_image%29.png"
        onDraw={handleDraw}
      />
      <ControlPanel
        onActivateBrush={handleActivateBrush}
        onDeactivateBrush={handleDeactivateBrush}
        onSave={handleSave}
      />
    </div>
  );
};

export default App;
