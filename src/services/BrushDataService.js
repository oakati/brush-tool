export const processBrushData = (brushStrokes) => {
    // Process brush strokes, assigning labels (1 for green, 0 for red)
    return brushStrokes.map(stroke => ({
      x: stroke.x,
      y: stroke.y,
      label: stroke.color === 'green' ? 1 : 0,
    }));
  };
  
  export const saveBrushDataToJson = (brushStrokes) => {
    const processedData = processBrushData(brushStrokes);
    const jsonData = {
      type: 'brush',
      className: 'myClass',
      points: processedData,
    };
  
    const blob = new Blob([JSON.stringify(jsonData)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement('a');
    link.href = url;
    link.download = 'brush_data.json';
    link.click();
  };
  