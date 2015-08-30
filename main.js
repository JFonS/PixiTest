// create an new instance of a pixi stage
var stage = new PIXI.Stage(0x000000);

// create a renderer instance
var renderer = PIXI.autoDetectRenderer(800, 800);

// add the renderer view element to the DOM
document.body.appendChild(renderer.view);
requestAnimationFrame(animate);

var kernel = [{
    x: 0,
    y: 0
}, {
    x: 45,
    y: 5
}, {
    x: 10,
    y: 30
}, {
    x: 15,
    y: 35
}, {
    x: 45,
    y: 20
}];

//console.log(translateSpine(kernel, {x: 50, y: 50}));

function expandKernel(kernel, n) {

    n = n || 4;

    var kernel180 = rotateSpine(kernel, kernel.last(), 180);
    kernel180.reverse();
    kernel180.shift();

    var longKernel = kernel.concat(kernel180);

    result = longKernel.clone();

    for (var i = 1; i < n; i++) {
        //console.log(i, result);
        var firstPoint = longKernel[0];
        var lastPoint = result.last();
        var vector = {
            x: lastPoint.x - firstPoint.x,
            y: lastPoint.y - firstPoint.y
        }

        //console.log(firstPoint, lastPoint, vector);

        var tKernel = translateSpine(longKernel, vector);
        longKernel = rotateSpine(tKernel, result.last(), 360 / n);
        var k2 = longKernel.clone();
        k2.shift();

        result = result.concat(k2);
    };

    //console.log("result", result);
    var result = toPolygon(result);
    return result;
}

function getShape(kernel, n, fillColor) {
    n = n || 4;
    var polygon = expandKernel(kernel, n);
    var result = new PIXI.Graphics();
    result.cacheAsBitmap = true;
    result.lineStyle(3, 0x111111, 0);
    result.beginFill(fillColor);
    result.drawPolygon(polygon); //doesn't have a broken corner now
    return result;
}

var n = 5;
var firstPoint = kernel[0];
var lastPoint = kernel.last();
var vector = {
    x: (lastPoint.x - firstPoint.x) * 2,
    y: (lastPoint.y - firstPoint.y) * 2
}

var perp =  {x: vector.y * -1, y: vector.x}
console.log(vector, perp);

var offset = {
    x: 300,
    y: 300
};

for (var i = -n; i <= n; ++i) {
    for (var j = -n; j <= n; ++j) {
        var fillColor = 0xb7d2f7;
        if (xor(i % 2 == 0, j % 2 == 0)) fillColor = 0xf4f4f4;
        var shape = getShape(kernel, 4,fillColor);
        stage.addChild(shape);
        shape.position.set(offset.x + vector.x * i + perp.x * j,offset.y + vector.y * i + perp.y * j);
    }
}



function animate() {

    requestAnimationFrame(animate);

    renderer.render(stage);
}