// ControlPanel.js
import React from 'react';
import BrushTool from './BrushTool';
import SaveButton from './SaveButton';

const ControlPanel = ( { onActivateBrush, onDeactivateBrush, onSave } ) =>
{
    return (
        <div>
            <BrushTool onActivate={onActivateBrush} onDeactivate={onDeactivateBrush} />
            <SaveButton onSave={onSave} />
        </div>
    );
};

export default ControlPanel;
