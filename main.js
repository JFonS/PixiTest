// create an new instance of a pixi stage
var stage = new PIXI.Stage(0x000000);

// create a renderer instance
var renderer = PIXI.autoDetectRenderer(400, 300);

// add the renderer view element to the DOM
document.body.appendChild(renderer.view);
requestAnimationFrame(animate);

var kernel = [{
    x: 0,
    y: 0
}, {
    x: 10,
    y: 0
}, {
    x: 20,
    y: 20
}, {
    x: 35,
    y: 10
}];

function expandKernel(kernel) {
    
    var longKernel = rotateSpine(kernel,180);
    var polygon = rotateSpine(longKernel, 90);
    console.log(polygon, longKernel);
    polygon = rotateSpine(polygon, 10, longKernel);
    //polygon = rotateSpine(polygon, -90, longKernel);
  

    var result = toPolygon(polygon);
    return result;
}


var result = new PIXI.Graphics();
result.lineStyle(1, 0xFFF000, 1);
result.drawPolygon(expandKernel(kernel)); //doesn't have a broken corner now
stage.addChild(result);
result.position.set(110,110);



function animate() {

    requestAnimationFrame(animate);

    renderer.render(stage);
}


