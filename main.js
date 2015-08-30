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
    x: 50,
    y: 25
}, {
    x: 50,
    y: 50
}, {
    x: 35,
    y: 50
}, {
    x: 40,
    y: 55
}];

//console.log(translateSpine(kernel, {x: 50, y: 50}));

function expandKernel(kernel, n) {

    n = n || 4;

    var kernel180 = rotateSpine(kernel, kernel.last(), 180);
    console.log(kernel180);
    kernel180.reverse();
    kernel180.shift();

    var longKernel = kernel.concat(kernel180);

    var k2 = rotateSpine(longKernel, longKernel.last(), 360/n);
    k2.reverse();
    k2.shift();


    result = longKernel.concat(k2);


    var firstPoint = longKernel.last();
    var lastPoint = result.last();
    var vector = {x: lastPoint.x-firstPoint.x, y:  lastPoint.y-firstPoint.y}
    var k3 = translateSpine(longKernel, vector);
    console.log(k3);
    k3.reverse();
    k3.shift();

    result = result.concat(k3);

    var k4 = rotateSpine(longKernel, longKernel[0], -360/n);
    k4.reverse();
    k4.shift();
    result = result.concat(k4);
  
    console.log("result", result);
    var result = toPolygon(result);
    return result;
}


var result = new PIXI.Graphics();
result.lineStyle(1, 0xFFF000, 1);
result.drawPolygon(expandKernel(kernel, 3)); //doesn't have a broken corner now
stage.addChild(result);
result.position.set(300,300);



function animate() {

    requestAnimationFrame(animate);

    renderer.render(stage);
}


