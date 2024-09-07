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

export const drawOnCanvas = ( event, canvas, context, isBrushActive, brushColor ) =>
{
    if ( !isBrushActive ) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    console.debug( 'Drawing on canvas', { x, y, brushColor } );
    context.save();
    shapeDrawer.drawShape( { x, y }, context, brushColor );

    if ( 'mouseup' === event.type )
    {
        shapeDrawer.previousPoint = null;
    }
    else
    {
        shapeDrawer.previousPoint = { x, y };
    }

    context.restore();
};
