import React, { useState } from 'react';
import CanvasComponent from './components/CanvasComponent';
import { drawOnCanvas } from './utils/CanvasUtils';
import { ToolActivity } from './types/ToolMode.ts';
import { useToolContext } from './components/ToolContext';
import { ToolButtonBrush, ToolButtonPolygon } from './components/ToolButtonVariants.js';
const App = () =>
{
    const { toolActivity } = useToolContext();
    const handleDraw = ( event, x, y, context, brushColor ) =>
    {
        if ( ToolActivity.None === toolActivity ) return;
        console.debug( 'Drawing on canvas', { event, context } );

        drawOnCanvas( event.type, x, y, context, brushColor );
    };

    return (
        <div>
            <CanvasComponent
                imageSrc="https://upload.wikimedia.org/wikipedia/en/7/7d/Lenna_%28test_image%29.png"
                onDraw={handleDraw}
            />
            <ToolButtonBrush />
            <ToolButtonPolygon />
        </div>
    );
};

export default App;
