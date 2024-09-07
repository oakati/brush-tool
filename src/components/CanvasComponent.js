// CanvasComponent.js
import React, { useEffect, useRef, useState } from 'react';
import { initCanvas } from '../utils/CanvasUtils';
import Logger from '../utils/Logger';

const CanvasComponent = ( { imageSrc, onDraw } ) =>
{
    const imageCanvasRef = useRef( null );
    const drawingCanvasRef = useRef( null );
    const [isDragging, setIsDragging] = useState( false );

    useEffect( () =>
    {
        const imageCanvas = imageCanvasRef.current;
        const imageContext = imageCanvas.getContext( '2d' );
        initCanvas( imageCanvas, imageSrc );
        //Logger.info('Canvas initialized with image', imageSrc);

        const drawingCanvas = drawingCanvasRef.current;
        const drawingContext = drawingCanvas.getContext( '2d' );

        const handleMouseDown = ( event ) =>
        {
            Logger.debug( 'Mouse down event', event );
            setIsDragging( true );
            onDraw( event, drawingCanvas, drawingContext );
        };

        const handleMouseMove = ( event ) =>
        {
            if ( isDragging )
            {
                Logger.debug( 'Mouse move event while dragging', event );
                onDraw( event, drawingCanvas, drawingContext );
            }
        };

        const handleMouseUp = () =>
        {
            Logger.debug( 'Mouse up event' );
            setIsDragging( false );
        };

        drawingCanvas.addEventListener( 'mousedown', handleMouseDown );
        drawingCanvas.addEventListener( 'mousemove', handleMouseMove );
        drawingCanvas.addEventListener( 'mouseup', handleMouseUp );

        return () =>
        {
            drawingCanvas.removeEventListener( 'mousedown', handleMouseDown );
            drawingCanvas.removeEventListener( 'mousemove', handleMouseMove );
            drawingCanvas.removeEventListener( 'mouseup', handleMouseUp );
        };
    }, [imageSrc, onDraw, isDragging] );

    return (
        <div style={{ position: 'relative', width: '512px', height: '512px' }}>
            <canvas
                ref={imageCanvasRef}
                width={512}
                height={512}
                style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}
            />
            <canvas
                ref={drawingCanvasRef}
                width={512}
                height={512}
                style={{ position: 'absolute', top: 0, left: 0, zIndex: 2 }}
            />
        </div>
    );
};

export default CanvasComponent;
