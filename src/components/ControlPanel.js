// ControlPanel.js
import React from 'react';
import BrushTool from './BrushTool';

const ControlPanel = ( { onActivateBrush, onDeactivateBrush } ) =>
{
    return (
        <div>
            <BrushTool onActivate={onActivateBrush} onDeactivate={onDeactivateBrush} />
        </div>
    );
};

export default ControlPanel;
