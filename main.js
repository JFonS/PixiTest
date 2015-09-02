// create an new instance of a pixi stage
var stage = new PIXI.Container();

// create a renderer instance
var renderer = PIXI.autoDetectRenderer(window.innerWidth, Math.max(550,window.innerHeight)-20);

window.onresize = function (event){
    var w = window.innerWidth;
    var h = Math.max(550,window.innerHeight)-20;

    //this part resizes the canvas but keeps ratio the same
    renderer.view.style.width = w + "px";
    renderer.view.style.height = h + "px";

    //this part adjusts the ratio:
    renderer.resize(w,h);
    setTimeout(redraw,300);
}

// add the renderer view element to the DOM
document.body.appendChild(renderer.view);
renderer.backgroundColor = 0xdfdfdf;
//requestAnimationFrame(animate);

var kernel = [{
    x: 0,
    y: 0
}, {
    x: 10,
    y: 10
},{
    x: 5,
    y: 30
},{
    x: 10,
    y: 30
}];

var sides = 4;


function redraw(){
    var container = drawTiled(kernel, sides, {x: 0, y: 250}, {x: window.innerWidth, y: 500});
    stage.addChild(container);

    renderer.render(stage);
}

redraw();

/*function animate() {
    requestAnimationFrame(animate);
    renderer.render(stage);
}*/
