class Wall {
    constructor(props) {
        this.x = props.x;
        this.y = props.y;
        this.velocity = props.velocity;
        this.width = props.width;
        this.height = props.height;
        this.$parent = props.$parent;
        this.$element = document.createElement('div');

        this.init();
    }

    init() {
        this.$element.className = "wall";
        this.$element.style.height = this.height + 'px';
        this.$element.style.width = this.width + 'px';
        
        this.renderWall();
        this.$parent.appendChild(this.$element);
    }

    renderWall() {
        this.$element.style.left = this.x + 'px';
        this.$element.style.top = this.y + 'px';
    }

    updateWallPosition() {
        this.x -= this.velocity;
    }

    pushSelfToWalls(walls) {
        walls.push(this);
    }

    destroyWall() {
        this.$element.remove();
    }
}

class UpperWall extends Wall {
    constructor(props) {
        super(props);
    }
}

class LowerWall extends Wall {
    constructor(props) {
        super(props);
    }
}