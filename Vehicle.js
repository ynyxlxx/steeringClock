const zeroVector = new p5.Vector(0, 0);

function Vehicle(x, y) {
    this.pos = createVector(random(width), random(height));
    this.target = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.acc = createVector();
    this.r = 6;
    this.maxSpeed = 20;
    this.maxForce = 1;
    this.senseRange = 50;
    this.burstSpeed = 100;
}

Vehicle.prototype.update = function () {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
}

Vehicle.prototype.show = function () {
    stroke(232, 221, 203);
    strokeWeight(this.r);
    point(this.pos.x, this.pos.y);
}

Vehicle.prototype.behaviour = function () {
    var arr = this.arrive(this.target);
    var mouse = createVector(mouseX, mouseY);
    var flee = this.flee(mouse);

    arr = arr.mult(1);
    flee = flee.mult(5);

    this.applyForce(arr);
    this.applyForce(flee);
}

Vehicle.prototype.applyForce = function (f) {
    this.acc.add(f);
}

Vehicle.prototype.flee = function (target) {
    var desired = p5.Vector.sub(target, this.pos);
    var dst = desired.mag();
    if (dst < this.senseRange) {
        desired.setMag(this.maxSpeed);
        desired.mult(-1);
        var steer = p5.Vector.sub(desired, this.vel);
        steer.limit(this.maxForce);
        return steer;
    }
    else {
        return zeroVector;
    }
}

Vehicle.prototype.arrive = function (target) {
    var desired = p5.Vector.sub(target, this.pos);
    var dst = desired.mag();
    var speed = this.maxSpeed;
    if (dst < 100) {
        var speed = map(dst, 0, 100, 0, this.maxSpeed);
    }
    desired.setMag(speed);
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxForce);
    return steer;
}
