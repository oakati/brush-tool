// BrushDataService.js
import Logger from '../utils/Logger';

export const processBrushData = ( brushStrokes ) =>
{
    console.debug( 'Processing brush data', brushStrokes );
    return brushStrokes.map( stroke => ( {
        x: stroke.x,
        y: stroke.y,
        label: stroke.color === 'green' ? 1 : 0,
    } ) );
};

export const saveBrushDataToJson = ( brushStrokes ) =>
{
    console.info( 'Saving brush data to JSON' );
    const processedData = processBrushData( brushStrokes );
    const jsonData = {
        type: 'brush',
        className: 'myClass',
        points: processedData,
    };

    const blob = new Blob( [JSON.stringify( jsonData )], { type: 'application/json' } );
    const url = URL.createObjectURL( blob );

    const link = document.createElement( 'a' );
    link.href = url;
    link.download = 'brush_data.json';
    link.click();
};
