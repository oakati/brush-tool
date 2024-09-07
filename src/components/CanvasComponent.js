import React, { useEffect, useRef } from 'react';
import { initCanvas, drawOnCanvas } from '../utils/CanvasUtils';

const CanvasComponent = ({ imageSrc, onDraw }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    initCanvas(canvas, imageSrc); // Initialize canvas with the 'Lena' image

    const handleMouseDown = (event) => {
      onDraw(event, canvas, context);
    };

    canvas.addEventListener('mousedown', handleMouseDown);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
    };
  }, [imageSrc, onDraw]);

  return <canvas ref={canvasRef} width={512} height={512} />;
};

export default CanvasComponent;
