import React, { useState, useRef, useCallback, useEffect } from 'react';
import CanvasComponent from './components/CanvasComponent';
import ControlPanel from './components/ControlPanel';
import { drawOnCanvas } from './utils/CanvasUtils';
import { saveBrushDataToJson } from './services/BrushDataService';
import Logger from './utils/Logger';

const App = () =>
{
    const [isBrushActive, setBrushActive] = useState( false );
    const [brushStrokes, setBrushStrokes] = useState( [] );

    const handleKeyPress = useCallback((e) => {
        //console.log('Key pressed:', e.key);

        function handleSave()
        {
            console.info( 'Saving brush data' );
            saveBrushDataToJson( brushStrokes );
        };

        if (e.key === 's' || e.key === 'S') {
            handleSave();
        }
    }, [brushStrokes]);

    useEffect(() => {
        //console.info('Adding keydown event listener');
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            //console.info('Removing keydown event listener');
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleKeyPress]);

    const handleActivateBrush = () =>
    {
        console.info( 'Brush activated' );
        setBrushActive( true );
    };

    const handleDeactivateBrush = () =>
    {
        console.info( 'Brush deactivated' );
        setBrushActive( false );
    };

    const handleDraw = ( event, canvas, context, brushColor ) =>
    {
        if ( !isBrushActive ) return;
        console.debug( 'Drawing on canvas', { event, canvas, context } );

        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        setBrushStrokes( prevStrokes => [
            ...prevStrokes,
            { x, y, label: 'green' === brushColor ? 1 : 0 }
        ] );

        drawOnCanvas( event.type, x, y, context, brushColor );
    };

    return (
        <div>
            <CanvasComponent
                imageSrc="https://upload.wikimedia.org/wikipedia/en/7/7d/Lenna_%28test_image%29.png"
                onDraw={handleDraw}
            />
            <ControlPanel
                onActivateBrush={handleActivateBrush}
                onDeactivateBrush={handleDeactivateBrush}
            />
        </div>
    );
};

export default App;
