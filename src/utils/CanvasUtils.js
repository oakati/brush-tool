import { CircleDrawer } from '../utils/ShapeDrawer';

const shapeDrawer = new CircleDrawer();

export const initCanvas = (canvas, imageSrc) => {
    const context = canvas.getContext('2d');
    const img = new Image();
    img.src = imageSrc;
  
    img.onload = () => {
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  };
  
  export const drawOnCanvas = (event, canvas, context, isBrushActive, brushColor) => {
    if (!isBrushActive) return;
  
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
  
    context.fillStyle = brushColor;
    shapeDrawer.drawShape({ x, y }, context, brushColor);

  };
  