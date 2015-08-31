// create an new instance of a pixi stage
var stage = new PIXI.Container(0xFF0000);

// create a renderer instance
var renderer = PIXI.autoDetectRenderer(800, 800);

// add the renderer view element to the DOM
document.body.appendChild(renderer.view);
//requestAnimationFrame(animate);

var kernel = [{
    x: 0,
    y: 0
}, {
    x: 10,
    y: 5
},{
    x: 25,
    y: 27
},{
    x: 5,
    y: 15
},{
    x: 5,
    y: 30
},{
    x: 10,
    y: 30
}];

var sides = 4;

var container = drawTiled(kernel, sides, {x: 30, y: 30}, {x: 400, y: 400});
stage.addChild(container);

renderer.render(stage);

/*function animate() {
    requestAnimationFrame(animate);
    renderer.render(stage);
}*/