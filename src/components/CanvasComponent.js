import React, { useEffect, useRef, useState } from 'react';
import { initCanvas } from '../utils/CanvasUtils';

const CanvasComponent = ({ imageSrc, onDraw }) => {
  const canvasRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    initCanvas(canvas, imageSrc);

    const handleMouseDown = (event) => {
        setIsDragging(true);
        onDraw(event, canvas, context);
    };

    const handleMouseMove = (event) => {
        if (isDragging) {
            onDraw(event, canvas, context);
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);

    return () => {
        canvas.removeEventListener('mousedown', handleMouseDown);
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseup', handleMouseUp);
    };
}, [imageSrc, onDraw, isDragging]);

  return <canvas ref={canvasRef} width={512} height={512} />;
};

export default CanvasComponent;
