// BrushTool.js
import React, { useState } from 'react';

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
