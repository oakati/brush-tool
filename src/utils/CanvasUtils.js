// CanvasUtils.js
import { CircleDrawer } from '../utils/ShapeDrawer';
import Logger from '../utils/Logger';

const shapeDrawer = new CircleDrawer();

export const initCanvas = ( canvas, imageSrc ) =>
{
    //Logger.info('Canvas initialized with image', imageSrc);
    const context = canvas.getContext( '2d' );
    const img = new Image();
    img.src = imageSrc;

    img.onload = () =>
    {
        context.drawImage( img, 0, 0, canvas.width, canvas.height );
        //Logger.info('Image loaded and drawn on canvas');
    };
};

export const drawOnCanvas = ( eventType, x, y, context, brushColor ) =>
{
    console.debug( 'Drawing on canvas', { x, y, brushColor } );

    shapeDrawer.drawShape( { x, y }, context, brushColor );

    if ( 'mouseup' !== eventType )
    {
        shapeDrawer.previousPoint = { x, y };
    } else
    {
        shapeDrawer.previousPoint = null;
    }
};

