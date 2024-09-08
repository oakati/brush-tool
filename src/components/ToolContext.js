import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { ToolActivity, BrushMode } from '../types/ToolMode.ts';

const ToolContext = createContext();

export const ToolContextProvider = ( { children } ) =>
{
    // console.log('Initializing ToolContextProvider');
    const [brushMode, setBrushMode] = useState( BrushMode.NONE );
    const [toolActivity, setToolActivity] = useState( ToolActivity.None );

    const prevStates = useRef( { brushMode, toolActivity } );

    useEffect( () =>
    {
        // console.log('Checking for state changes');
        const changes = {};
        if ( prevStates.current.brushMode !== brushMode )
        {
            changes.brushMode = brushMode;
        }
        if ( prevStates.current.toolActivity !== toolActivity )
        {
            changes.toolActivity = toolActivity;
        }

        if ( Object.keys( changes ).length > 0 )
        {
            console.log( 'State changes:', changes );
        }

        prevStates.current = { brushMode, toolActivity };
    }, [brushMode, toolActivity] );

    // console.log('Rendering ToolContextProvider');
    return (
        <ToolContext.Provider value={{
            brushMode, setBrushMode,
            toolActivity, setToolActivity,
        }}>
            {children}
        </ToolContext.Provider>
    );
};

export const useToolContext = () =>
{
    // console.log('Using ToolContext');
    const context = useContext( ToolContext );
    if ( context === undefined )
    {
        console.error( 'useToolContext must be used within a ToolContextProvider' );
    }
    return context;
};