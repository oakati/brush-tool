import React, { useState, useRef } from 'react';
import CanvasComponent from './components/CanvasComponent';
import ControlPanel from './components/ControlPanel';
import { drawOnCanvas } from './utils/CanvasUtils';
import { saveBrushDataToJson } from './services/BrushDataService';
import Logger from './utils/Logger';

const App = () =>
{
    const [isBrushActive, setBrushActive] = useState( false );
    const brushStrokes = useRef( [] );

    const handleActivateBrush = () =>
    {
        Logger.info( 'Brush activated' );
        setBrushActive( true );
    };

    const handleDeactivateBrush = () =>
    {
        Logger.info( 'Brush deactivated' );
        setBrushActive( false );
    };

    const handleDraw = ( event, canvas, context ) =>
    {
        Logger.debug( 'Drawing on canvas', { event, canvas, context } );
        const brushColor = event.button === 0 ? 'green' : 'red'; // Left-click: green, Right-click: red
        drawOnCanvas( event, canvas, context, isBrushActive, brushColor );
    };

    const handleSave = () =>
    {
        Logger.info( 'Saving brush data' );
        saveBrushDataToJson( brushStrokes.current );
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
                onSave={handleSave}
            />
        </div>
    );
};

export default App;
