Object.prototype.clone = function() {
    var newObj = JSON.parse(JSON.stringify(this))
    return newObj;
};

Array.prototype.last = function() {
    return this.slice(-1)[0];
}

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

function rotateSpine(sp, center, angle) {
    var spine = [];
    sp.forEach(function(p){
        spine.push(rotatePoint(p, center, angle));
    });
    return spine;
}

function translateSpine(sp, vector) {
    var spine = sp.clone();
    spine.forEach(function(p){
        p.x += vector.x;
        p.y += vector.y;
    });
    return spine;
}