var amp = 6;

function drawKernel(kernel) {
    var result = new PIXI.Container();
    var g = new PIXI.Graphics();
    g.lineStyle(0.5 * amp, 0x111111, 1);
    g.moveTo(0, 0);
    console.log(kernel);
    kernel.forEach(function(p) {
        g.lineTo(amp * p.x, amp * p.y);
        g.moveTo(amp * p.x, amp * p.y);
        result.addChild(newCircle(amp * p.x, amp * p.y, 1 * amp));
    });
    result.addChildAt(g, 0);
    return result;
}

function newCircle(x,y,radius) {
    var circle = new PIXI.Graphics();
    circle.lineStyle(0.2 * amp, 0x111111, 1);
    circle.beginFill(0xFF0000);
    circle.drawCircle(x,y,radius);
    circle.hitArea = new PIXI.Circle(x,y,radius);
    circle.interactive = true;


    circle.mousedown = circle.touchstart = function(data)
        {
    //      data.originalEvent.preventDefault()
            // store a refference to the data
            // The reason for this is because of multitouch
            // we want to track the movement of this particular touch
            this.data = data;
            this.alpha = 0.9;
            this.dragging = true;
            this.sx = this.data.getLocalPosition(circle).x * circle.scale.x;
            this.sy = this.data.getLocalPosition(circle).y * circle.scale.y;      };
        
        // set the events for when the mouse is released or a touch is released
        circle.mouseup = circle.mouseupoutside = circle.touchend = circle.touchendoutside = function(data)
        {
            this.alpha = 1
            this.dragging = false;
            // set the interaction data to null
            this.data = null;
        };
        
        // set the callbacks for when the mouse or a touch moves
        circle.mousemove = circle.touchmove = function(data)
        {
            if(this.dragging)
            {
                // need to get parent coords..
                var newPosition = this.data.getLocalPosition(this.parent);
                // this.position.x = newPosition.x;
                // this.position.y = newPosition.y;
                this.position.x = newPosition.x - this.sx;
                this.position.y = newPosition.y - this.sy;
            }
        }



    return circle;
}