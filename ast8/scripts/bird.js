class Bird {
    constructor(props) {
        this.x = props.x;
        this.y = props.y;
        this.width = props.width;
        this.height = props.height;
        this.xVelocity = 1;
        this.yVelocity = 5;
        this.gravity = 10;
        this.time = 0;
        this.$bird = props.$bird;
        this.$element = props.$element;
        this.theta = Math.atan(this.yVelocity / this.xVelocity);

        this.init();
    }

    init() {
        this.$element.style.left = this.x + 'px';
        this.$element.style.top = this.y + 'px';
    }

    updateBirdPosition() {
        this.time += 0.01;
        let netAddingTerm = - this.yVelocity * this.time + 1 / 2 * this.gravity * this.time * this.time;
        this.y += netAddingTerm;

        if (this.y < 0) {
            this.y = 0;
        }

        if (this.y + this.width > 600) {
            this.y = 600 - this.width;
        }
        this.theta = Math.atan(netAddingTerm / this.xVelocity) * 180 / Math.PI;

        this.$element.style.top = this.y + 'px';
        this.$element.style.left = this.x + 'px';
        this.$bird.style.transform = "rotate(" + this.theta + "deg)";
    }

    setUpwardAcceleration() {
        this.yVelocity = 5;
        this.time = 0.00;
    }

    checkCollision(walls) {
        let topWall = walls[0];
        let bottomWall = walls[1];

        if (this.x + this.width > topWall.x && this.y < topWall.y + topWall.height && this.x < topWall.x + topWall.width
            || this.x + this.width > bottomWall.x && this.y + this.width > bottomWall.y && this.x < bottomWall.x + bottomWall.width){
            console.log("google");
            return true;
        }

        return false;
    }
}