import React, { useState, useRef } from 'react';
import CanvasComponent from './components/CanvasComponent';
import ControlPanel from './components/ControlPanel';
import { drawOnCanvas } from './utils/CanvasUtils';
import { saveBrushDataToJson } from './services/BrushDataService';
import Logger from './utils/Logger';

const App = () =>
{
    const [isBrushActive, setBrushActive] = useState( false );
    const [brushStrokes, setBrushStrokes] = useState( [] );

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
        console.debug( 'Drawing on canvas', { event, canvas, context } );
        drawOnCanvas( event, canvas, context, isBrushActive, brushColor, setBrushStrokes );
    };

    const handleSave = () =>
    {
        console.info( 'Saving brush data' );
        saveBrushDataToJson( brushStrokes );
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
