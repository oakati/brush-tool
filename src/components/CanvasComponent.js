// CanvasComponent.js
import React, { useEffect, useRef, useState } from 'react';
import { initCanvas } from '../utils/CanvasUtils';
import Logger from '../utils/Logger';
import { MouseButtonState } from "../types/MouseButtonState.ts"

const CanvasComponent = ( { imageSrc, onDraw } ) =>
{
    const imageCanvasRef = useRef( null );
    const brushLeftCanvasRef = useRef( null );
    const brushRightCanvasRef = useRef( null );
    const [isDragging, setIsDragging] = useState( false );
    const [mouseState, setMouseState] = useState( MouseButtonState.NONE );

    useEffect( () =>
    {
        const imageCanvas = imageCanvasRef.current;
        const brushLeftCanvas = brushLeftCanvasRef.current;
        const brushRightCanvas = brushRightCanvasRef.current;

        if ( !imageCanvas || !brushLeftCanvas || !brushRightCanvas )
        {
            console.error( "One or more canvas refs are null" );
            return;
        }

        const imageContext = imageCanvas.getContext( '2d' );
        const brushLeftContext = brushLeftCanvas.getContext( '2d' );
        const brushRightContext = brushRightCanvas.getContext( '2d' );

        initCanvas( imageCanvas, imageSrc );
        const handleMouseDown = ( event ) =>
        {
            console.debug( 'Mouse down event', event );
            if ( MouseButtonState.LEFT === event.button )
            {
                setMouseState( MouseButtonState.LEFT );
            }
            else if ( MouseButtonState.RIGHT === event.button )
            {
                setMouseState( MouseButtonState.RIGHT );
            }
            else
            {
                setMouseState( MouseButtonState.NONE );
                console.error( 'Unexpected mouseState -> ', mouseState );
                return;
            }

            onDrawWrapper( event );

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

        const onDrawWrapper = ( event ) =>
        {
            if ( MouseButtonState.LEFT === mouseState )
            {
                onDraw( event, brushLeftCanvas, brushLeftContext );
            }
            else if ( MouseButtonState.RIGHT === mouseState )
            {
                onDraw( event, brushRightCanvas, brushRightContext );
            }
            else
            {
                console.error( 'Unexpected mouseState -> ', mouseState );
            }
        }

        const handleMouseUp = () =>
        {
            console.debug( 'Mouse up event' );
            setMouseState( MouseButtonState.NONE );
            setIsDragging( false );
        };

        brushLeftCanvas.addEventListener( 'mousedown', handleMouseDown );
        brushLeftCanvas.addEventListener( 'mousemove', handleMouseMove );
        brushLeftCanvas.addEventListener( 'mouseup', handleMouseUp );

        brushRightCanvas.addEventListener( 'mousedown', handleMouseDown );
        brushRightCanvas.addEventListener( 'mousemove', handleMouseMove );
        brushRightCanvas.addEventListener( 'mouseup', handleMouseUp );

        return () =>
        {
            brushLeftCanvas.removeEventListener( 'mousedown', handleMouseDown );
            brushLeftCanvas.removeEventListener( 'mousemove', handleMouseMove );
            brushLeftCanvas.removeEventListener( 'mouseup', handleMouseUp );

            brushRightCanvas.removeEventListener( 'mousedown', handleMouseDown );
            brushRightCanvas.removeEventListener( 'mousemove', handleMouseMove );
            brushRightCanvas.removeEventListener( 'mouseup', handleMouseUp );

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
            <canvas
                ref={brushRightCanvasRef}
                width={512}
                height={512}
                style={{ position: 'absolute', top: 0, left: 0, zIndex: 3 }}
            />
        </div>
    );
};

export default CanvasComponent;
