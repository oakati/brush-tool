// CanvasComponent.js
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { initCanvas } from '../utils/CanvasUtils';
import Logger from '../utils/Logger';
import { MouseButtonEnum, MouseButtonGroupState } from "../types/MouseButton.ts"
import { BrushMode } from "../types/BrushMode.ts"
import { AnnotationJSONCreator, Annotation } from '../utils/annotationUtils.js';
import ClassSelectionPopup from './ClassSelectionPopup';
import { saveBrushDataToJson } from '../services/BrushDataService.js';

const CanvasComponent = ( { imageSrc, onDraw } ) =>
{
    const imageCanvasRef = useRef( null );
    const brushCanvasRef = useRef( null );
    const [isDragging, setIsDragging] = useState( false );
    const [lastBrushMode, setLastBrushMode] = useState( BrushMode.KEEP );
    const [jsonCreator, setJsonCreator] = useState( null );
    const [selectedImage, setSelectedImage] = useState( null );
    const [brushStrokes, setBrushStrokes] = useState( [] );
    const [showClassPopup, setShowClassPopup] = useState( false );
    const [classes, setClasses] = useState( [] );

    const handleKeyPress = useCallback( ( e ) =>
    {
        //console.log('Key pressed:', e.key);

        function handleSave()
        {
            console.info( 'Saving brush data' );
            saveBrushDataToJson( brushStrokes );
        };


        if ( e.key === 's' || e.key === 'S' )
        {
            saveAnnotations();
        }
        else if ( e.key === 'Enter' ) 
        {
            setShowClassPopup( true );
        }
    }, [brushStrokes] );

    useEffect( () =>
    {
        //console.info('Adding keydown event listener');
        document.addEventListener( 'keydown', handleKeyPress );
        return () =>
        {
            //console.info('Removing keydown event listener');
            document.removeEventListener( 'keydown', handleKeyPress );
        };
    }, [handleKeyPress] );

    useEffect( () =>
    {
        //console.log('useEffect - selectedImage changed:', selectedImage);
        if ( 1/*selectedImage*/ )
        {
            setJsonCreator( new AnnotationJSONCreator( "imageName" ) );
        } else
        {
            console.warn( 'Selected image is null or undefined' );
        }
    }, [selectedImage] );

    useEffect( () =>
    {
        const imageCanvas = imageCanvasRef.current;
        const brushLeftCanvas = brushCanvasRef.current;

        if ( !imageCanvas || !brushLeftCanvas )
        {
            console.error( "One or more canvas refs are null" );
            return;
        }

        const brushLeftContext = brushLeftCanvas.getContext( '2d' );

        initCanvas( imageCanvas, imageSrc );
        setSelectedImage( "lena" );

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

        const handleContextmenu = e =>
        {
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

            const rect = brushLeftCanvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            setBrushStrokes( prevStrokes => [
                ...prevStrokes,
                { x, y, label: 'green' === brushColor ? 1 : 0 }
            ] );

            onDraw( event, x, y, brushLeftContext, brushColor );
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

    const handleSelectClass = ( selectedClass ) =>
    {
        //console.log('Class selected:', selectedClass);
        if ( jsonCreator )
        {
            const aiMask = new Annotation( "brushTool", brushStrokes, selectedClass );
            jsonCreator.addAnnotation( aiMask );
            //console.debug('Updated JSON:', jsonCreator.generateJSON());
        }
        setShowClassPopup( false );
        //setTempMaskData(null);
    };

    const handleAddNewClass = ( newClass ) =>
    {
        //console.log('Adding new class:', newClass);
        setClasses( prevClasses => [...prevClasses, newClass] );
        handleSelectClass( newClass );
    };

    const saveAnnotations = () => {
        //console.log('Saving annotations');
        if (jsonCreator) {
            const jsonBlob = new Blob([jsonCreator.generateJSON()], { type: 'application/json' });
            const url = URL.createObjectURL(jsonBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${selectedImage.split('/').pop().split('.')[0]}_annotations.json`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <div style={{ position: 'relative', width: '512px', height: '512px' }}>
            <canvas
                ref={imageCanvasRef}
                width={512}
                height={512}
                style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}
            />
            <canvas
                ref={brushCanvasRef}
                width={512}
                height={512}
                style={{ position: 'absolute', top: 0, left: 0, zIndex: 2 }}
            />
            {showClassPopup && (
                <ClassSelectionPopup
                    classes={classes}
                    onSelectClass={handleSelectClass}
                    onAddNewClass={handleAddNewClass}
                    onClose={() => setShowClassPopup( false )}
                />
            )}
        </div>
    );
};

export default CanvasComponent;
