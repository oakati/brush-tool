// BrushDataService.js
export const saveBrushDataToJson = ( brushStrokes ) =>
{
    console.info( 'Saving brush data to JSON' );
    const jsonData = {
        type: 'brush',
        className: 'myClass',
        points: brushStrokes,
    };

    const blob = new Blob( [JSON.stringify( jsonData )], { type: 'application/json' } );
    const url = URL.createObjectURL( blob );

    const link = document.createElement( 'a' );
    link.href = url;
    link.download = 'brush_data.json';
    link.click();
};
