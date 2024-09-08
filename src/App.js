import React, { useState, useRef, useCallback, useEffect } from 'react';
import CanvasComponent from './components/CanvasComponent';
import ControlPanel from './components/ControlPanel';
import { drawOnCanvas } from './utils/CanvasUtils';
import Logger from './utils/Logger';

const App = () =>
{
    const [isBrushActive, setBrushActive] = useState( false );

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

    const handleDraw = ( event, x, y, context, brushColor ) =>
    {
        if ( !isBrushActive ) return;
        console.debug( 'Drawing on canvas', { event, context } );

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
