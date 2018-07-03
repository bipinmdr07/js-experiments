class Bird {
    constructor(props) {
        this.x = props.x;
        this.y = props.y;
        this.xVelocity = 1;
        this.yVelocity = 0;
        this.gravity = 0.2;
        this.time = 0;
        this.$element = props.$element;

        this.init();
    }

    init() {
        this.$element.style.left = this.x + 'px';
        this.$element.style.top = this.y + 'px';
    }

    updateBirdPosition() {
        this.time += 0.1;
        this.y = (-this.yVelocity * this.time + 1 / 2 * this.gravity * this.time * this.time);
        // this.y += 0.1;
        this.$element.style.top = this.y + 'px';
        this.$element.style.left = this.x + 'px';
    }

    setUpwardAcceleration() {
        console.log(this.y);
        this.yVelocity = 5;
        this.time = 0;
    }
}