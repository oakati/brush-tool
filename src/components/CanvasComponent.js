// CanvasComponent.js
import React, { useEffect, useRef, useState } from 'react';
import { initCanvas } from '../utils/CanvasUtils';
import Logger from '../utils/Logger';
import { MouseButtonEnum, MouseButtonGroupState } from "../types/MouseButton.ts"
import { BrushMode } from "../types/BrushMode.ts"

const CanvasComponent = ( { imageSrc, onDraw } ) =>
{
    const imageCanvasRef = useRef( null );
    const brushLeftCanvasRef = useRef( null );
    const [isDragging, setIsDragging] = useState( false );
    const [lastBrushMode, setLastBrushMode] = useState( BrushMode.KEEP );

    useEffect( () =>
    {
        const imageCanvas = imageCanvasRef.current;
        const brushLeftCanvas = brushLeftCanvasRef.current;

        if ( !imageCanvas || !brushLeftCanvas )
        {
            console.error( "One or more canvas refs are null" );
            return;
        }

        const brushLeftContext = brushLeftCanvas.getContext( '2d' );

        initCanvas( imageCanvas, imageSrc );
        const handleMouseDown = ( event ) =>
        {
            console.debug( 'Mouse down event', event );

            if ( MouseButtonEnum.Main === event.button )
            {
                setLastBrushMode( BrushMode.KEEP );
            }
            else if ( MouseButtonEnum.Secondary === event.button )
            {
                setLastBrushMode( BrushMode.REMOVE );
            }

            //onDrawWrapper( event );

            setIsDragging( true );
        };

        const handleMouseMove = ( event ) =>
        {
            if ( isDragging )
            {
                console.debug( 'Mouse move event while dragging', event );
                onDrawWrapper( event );
            }
        };

        const handleMouseUp = ( event ) =>
        {
            console.debug( 'Mouse up event' );
            onDrawWrapper( event );
            setIsDragging( false );
        };

        const handleContextmenu = e => {
            e.preventDefault()
        }

        function onDrawWrapper( event )
        {
            let brushColor = 'black';

            if ( BrushMode.KEEP === lastBrushMode )
            {
                brushColor = 'green';
            }
            else if ( BrushMode.REMOVE === lastBrushMode )
            {
                brushColor = 'red';
            }

            onDraw( event, brushLeftCanvas, brushLeftContext, brushColor );
        }

        brushLeftCanvas.addEventListener( 'mousedown', handleMouseDown );
        brushLeftCanvas.addEventListener( 'mousemove', handleMouseMove );
        brushLeftCanvas.addEventListener( 'mouseup', handleMouseUp );
        brushLeftCanvas.addEventListener( 'contextmenu', handleContextmenu );

        return () =>
        {
            brushLeftCanvas.removeEventListener( 'mousedown', handleMouseDown );
            brushLeftCanvas.removeEventListener( 'mousemove', handleMouseMove );
            brushLeftCanvas.removeEventListener( 'mouseup', handleMouseUp );
            brushLeftCanvas.removeEventListener( 'contextmenu', handleContextmenu );

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
                ref={brushLeftCanvasRef}
                width={512}
                height={512}
                style={{ position: 'absolute', top: 0, left: 0, zIndex: 2 }}
            />
        </div>
    );
};

export default CanvasComponent;
