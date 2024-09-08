import React, { useState, useEffect } from 'react';
import { ToolActivity } from '../types/ToolMode.ts';
import { useToolContext } from './ToolContext';

const ToolButtonBase = ( { icon: Icon, label, activityType } ) =>
{
    // console.log('Rendering ToolButtonBase component');
    const [isMouseOverThis, setisMouseOverThis] = useState( false );
    const { toolActivity, setToolActivity } = useToolContext();

    useEffect( () =>
    {
        // console.log('Setting up keydown event listener');
        const handleKeyDown = ( event ) =>
        {
            if ( event.key === 'Escape' ) 
            {
                // console.log('Escape key pressed, setting tool activity to None');
                setToolActivity( ToolActivity.None );
            }
        };

        window.addEventListener( 'keydown', handleKeyDown );

        return () =>
        {
            // console.log('Removing keydown event listener');
            window.removeEventListener( 'keydown', handleKeyDown );
        };
    }, [] );

    const handleMouseOver = ( e ) =>
    {
        // console.log('Mouse over event triggered');
        e.currentTarget.style.backgroundColor = '#696969';
        setisMouseOverThis( true );
    };

    const handleMouseOut = ( e ) =>
    {
        // console.log('Mouse out event triggered');
        e.currentTarget.style.backgroundColor = '#404040';
    };

    const handleMouseDown = ( e ) =>
    {
        // console.log('Mouse down event triggered');
        e.currentTarget.style.backgroundColor = '#585858';
    };

    const handleMouseUp = ( e ) =>
    {
        // console.log('Mouse up event triggered');
        e.currentTarget.style.backgroundColor = isMouseOverThis ? '#696969' : '#404040';
    };

    // console.log(`Rendering button for ${label} with activity type ${activityType}`);
    return (
        <button
            className={`tool-button ${activityType === toolActivity ? 'active' : ''}`}
            onClick={() =>
            {
                // console.log(`Setting tool activity to ${activityType}`);
                setToolActivity( activityType );
            }}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            disabled={activityType === toolActivity}
        >
            <Icon className="tool-icon" />
            <label className="tool-label">
                {label}
            </label>
        </button>
    );
};

export default ToolButtonBase;