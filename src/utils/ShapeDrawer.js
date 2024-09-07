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
    drawShape( point, context, color )
    {
        context.beginPath();
        context.arc( point.x, point.y, 10, 0, Math.PI * 2 );
        context.fillStyle = color;
        context.fill();
    }
}

export class RectangleDrawer extends ShapeDrawer
{
    drawShape( point, context, color ) 
    {
        context.beginPath();
        context.rect( point.x - 10, point.y - 10, 20, 20 );
        context.fillStyle = color;
        context.fill();
    }
}
