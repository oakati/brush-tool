// BrushTool.js
import React, { useState } from 'react';
import { ToolButtonBrush } from './ToolButtonVariants';
import { ToolButtonPolygon } from './ToolButtonVariants';
import { ToolContextProvider } from './ToolContext';

const BrushTool = ( { onActivate, onDeactivate } ) =>
{
    const [active, setActive] = useState( false );

    const handleActivate = () =>
    {
        console.info( 'Activating brush tool' );
        setActive( true );
        onActivate();
    };

    const handleDeactivate = () =>
    {
        console.info( 'Deactivating brush tool' );
        setActive( false );
        onDeactivate();
    };

    return (
        <div>
            <ToolContextProvider>
                <ToolButtonBrush/>
                <ToolButtonPolygon/>
            </ToolContextProvider>
            <button onClick={handleActivate} disabled={active}>
                Activate Brush
            </button>
            <button onClick={handleDeactivate} disabled={!active}>
                Deactivate Brush
            </button>
        </div>
    );
};

export default BrushTool;
