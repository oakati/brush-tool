// ShapeDrawer.js
export class ShapeDrawer
{
    drawShape( point, context )
    {
        throw new Error( "Method not implemented." );
    }
}

export class CircleDrawer extends ShapeDrawer
{
    constructor()
    {
        super();
        this.previousPoint = null; // Önceki noktayı saklamak için
    }

    drawShape( point, context, color )
    {
        // Çizgi kalınlığını ayarla
        context.lineWidth = 5; // Burada çizgi kalınlığını ayarlıyorsun

        // Eğer önceki bir nokta varsa, o noktayla şu anki nokta arasında bir çizgi çiz
        if ( this.previousPoint )
        {
            context.beginPath();
            context.moveTo( this.previousPoint.x, this.previousPoint.y );
            context.lineTo( point.x, point.y );
            context.strokeStyle = this.addOpacityToColor( color, 0.1 ); // Opacity ekleyerek çiz
            context.stroke();
        }

        // Şu anki noktada bir yuvarlak çiz
        context.beginPath();
        context.arc( point.x, point.y, 3, 0, Math.PI * 2 );
        context.fillStyle = this.addOpacityToColor( color, 0.1 ); // Opacity ekle
        context.fill();

    }

    addOpacityToColor( color, opacity )
    {
        const rgbaColor = color.replace( "rgb", "rgba" ).replace( ")", `, ${opacity})` );
        return rgbaColor;
    }
}

export class RectangleDrawer extends ShapeDrawer
{
    drawShape( point, context, color )
    {
        context.beginPath();
        context.rect( point.x - 10, point.y - 10, 20, 20 );
        context.fillStyle = this.addOpacityToColor( color, 0.5 ); // Opacity eklendi
        context.fill();
    }

    addOpacityToColor( color, opacity )
    {
        const rgbaColor = color.replace( "rgb", "rgba" ).replace( ")", `, ${opacity})` );
        return rgbaColor;
    }
}
