function toPolygon(kernel) {
    var pol = [];
    kernel.forEach(function(p) {
        pol.push(p.x);
        pol.push(p.y);
    });
    return pol;
}

function rotatePoint(point, center, angle) {
    angle = (angle) * (Math.PI / 180); // Convert to radians

    var rotatedX = Math.cos(angle) * (point.x - center.x) - Math.sin(angle) * (point.y - center.y) + center.x;
    var rotatedY = Math.sin(angle) * (point.x - center.x) + Math.cos(angle) * (point.y - center.y) + center.y;
    
    return {
        x: rotatedX,
        y: rotatedY
    };
}

function rotateSpine(sp, angle, sp2) {
	var spine = sp;
	spine2 = sp2 || sp; 
	var center = spine.slice(-1)[0];
    for (var i = spine2.length-2; i >= 0; --i){
        spine.push(rotatePoint(spine2[i],center, angle));
    }
    return spine;
}

function reflectPoint(point, l1, l2) {
	var angle = Math.atan((l2.y-l1.y)/(l2.x-l1.x));
    angle = (angle) * (Math.PI / 180); // Convert to radians

    Slope = tan(Angle);
    B = y2 - x2*Slope;
}