function expandKernel(kernel, n) {

    var kernel180 = rotateSpine(kernel, kernel.last(), 180);
    kernel180.reverse();
    kernel180.shift();

    var longKernel = kernel.concat(kernel180);

    result = longKernel.clone();

    for (var i = 1; i < n; i++) {
        //console.log(i, result)
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

    var minX = 0,
        minY = 0;
    result.forEach(function(p) {
        minX = Math.min(p.x, minX);
        minY = Math.min(p.y, minY);
    });

    if (minX < 0) {
        result.forEach(function(p) {
            p.x -= minX;
        });
    }


    if (minY < 0) {
        result.forEach(function(p) {
            p.y -= minY;
        });
    }

    var result = toPolygon(result);
    return result;
}

function getTexture(kernel, n, fillColor) {

    var polygon = expandKernel(kernel, n);
    var result = new PIXI.Graphics();
    result.lineStyle(2, 0x111111, 1);
    result.beginFill(fillColor);
    result.drawPolygon(polygon);
    var bounds = result.getBounds();
    console.log(bounds);
    var texture = new PIXI.RenderTexture(renderer, bounds.width, bounds.height);

    texture.render(result);
    return texture;
}

function drawTiled(kernel, sides, pos, size) {

    //Mask
    var mask = new PIXI.Graphics();
    mask.beginFill();
    mask.drawRect(0, 0, size.x, size.y);
    mask.endFill();

    //Container
    var container = new PIXI.Container();
    container.mask = mask;
    container.position.set(pos.x, pos.y);
    container.addChild(mask);

    //Vector
    if (sides == 6) {
      var firstPoint = kernel[0];
      var lastPoint = kernel.last();
      var vector = {
          x: (lastPoint.x - firstPoint.x) * 2,
          y: (lastPoint.y - firstPoint.y) * 2
      }
      
      var perp = rotatePoint(vector, {x: 0,y: 0}, -360 / sides);
    } else {
      var firstPoint = kernel[0];
      var lastPoint = kernel.last();
      var vector = {
          x: (lastPoint.x - firstPoint.x) * 2,
          y: (lastPoint.y - firstPoint.y) * 2
      }

      var perp = rotatePoint(vector, {x: 0,y: 0}, -360 / sides);
    }
    

    var nX = 25; //Math.ceil(size.x/vector.x);
    var nY = 25; //Math.ceil(size.y/vector.y);

    //Offset
    var offset = {
        x: size.x / 2,
        y: size.y / 2
    };

    //Textures
    var textures = [];
    var fillColor = 0xb7d2f7;
    textures[0] = getTexture(kernel, sides, fillColor);

    fillColor = 0xf4f4f4;
    textures[1] = getTexture(kernel, sides, fillColor);

    var xOff = (nX % 2 == 0) ? 0 : 1;
    var yOff = (nY % 2 == 0) ? 0 : 1;

    for (var i = -nY; i <= nY; ++i) {
        for (var j = -nX; j <= nX; ++j) {
            var texture = 0;

            if (xor((i + xOff) % 2 == 0, (j + yOff) % 2 == 0)) texture = 1;
            var sprite = new PIXI.Sprite(textures[texture]);
            container.addChild(sprite);
            sprite.position.set(offset.x + vector.x * i + perp.x * j, offset.y + vector.y * i + perp.y * j);
        }
    }
    return container;
}