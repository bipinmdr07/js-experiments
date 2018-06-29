var $body = document.getElementsByTagName("body")[0];

function Board(props) {
    this.x = props.x;
    this.y = props.y;
    this.height = props.height;
    this.width = props.width;
    this.$parent = props.$parent;
    this.$element = document.createElement("div");
    this.ants = [];

    this.minX = 0;
    this.minY = 0;
    this.maxX = this.width;
    this.maxY = this.height;

    var self = this;

    this.drawBoard = function() {
        self.$element.className = "board";
        self.$element.style.height = self.height + 'px';
        self.$element.style.width = self.width + 'px';
        self.$element.style.left = self.x + 'px';
        self.$element.style.top = self.y + 'px';
        self.$parent.appendChild(self.$element);
    };

    this.addAnts = function(ant) {
        self.ants.push(ant);
    };

    this.startAntSmasher = function(){
        setInterval(function() {
            for (var i = 0; i < self.ants.length; i++) {
                self.ants[i].changePosition();
                if (self.ants[i].collisionOnRightLeftBoard()) {
                    self.ants[i].reverseVelocityX();
                }
        
                if (self.ants[i].collisionOnTopDownBoard()) {
                    self.ants[i].reverseVelocityY();
                }
            }

            // collision detection
            for (var i = 0; i < self.ants.length - 1; i++){
                for (var j = i + 1; j < self.ants.length; j++){
                    if (self.ants[i].detectCollisionWith(self.ants[j])){
                        self.ants[i].changeVelocity();
                        self.ants[j].changeVelocity();
                    }
                }
            }
        }, 50);
    }

    this.$element.onclick = function(e){
        if (e.target.className === "ant"){
            var index = Array.from(self.$element.children).indexOf(e.target);
            this.removeChild(e.target);
            self.ants.splice(index, 1);
            // console.log(e.target === self.ants[index].$element);
        }
    }

    /**
     * ***************************
     *  add set intervel here
     * ***************************
     */
}

function Ant(props) {
    this.speed = props.speed || 2;
    this.size = props.size || 10;
    this.$element = document.createElement("div");
    this.parent = props.parent;
    this.velocities = [1, 0, -1];

    var self = this;

    var setX = function() {
        return Math.floor(Math.random() * (self.parent.maxX - self.size));
    }

    var setY = function() {
        return Math.floor(Math.random() * (self.parent.maxY - self.size));
    }

    var setDx = function() {
        return self.velocities[Math.floor(Math.random() * 3)];
    }

    var setDy = function() {
        return self.velocities[Math.floor(Math.random() * 3)];
    }

    this.x = setX();
    this.y = setY();
    this.dx = setDx();
    this.dy = setDy();

    var updateAntPosition = function() {
        self.$element.style.left = self.x + 'px';
        self.$element.style.top = self.y + 'px';
    };

    var resetPosition = function() {
        if (self.x < self.parent.minX){
            self.x = self.parent.minX;
        } else if ((self.x + self.size) > self.parent.maxX){
            self.x = (self.parent.maxX - self.size);
        } else if (self.y < self.parent.minY) {
            self.y = self.parent.minY;
        } else if ((self.y + self.size) > self.parent.maxY){
            self.y = (self.parent.maxY - self.size);
        }
    }

    this.init = function() {
        self.$element.className = "ant";
        self.$element.style.width = self.size;
        self.$element.style.height = self.size;
        self.$element.style.left = self.x + 'px';
        self.$element.style.top = self.y + 'px';
        self.$element.backgroundColor = self.color;
        self.parent.$element.appendChild(self.$element);
        updateAntPosition();
    };

    this.changePosition = function() {
        self.x += self.dx * self.speed;
        self.y += self.dy * self.speed;
        resetPosition();
        updateAntPosition();
    };


    this.changeVelocity = function() {
        // var changeDir = [-1, 1];
        if (self.dx !== 0 && self.dy !== 0){
            self.dx = [-1, 1][Math.floor(Math.random() * 2)] * self.dx;
            self.dy = [-1, 1][Math.floor(Math.random() * 2)] * self.dx;
        } else if (self.dx === 0) {
            self.dx = [-1,1][Math.floor(Math.random() * 2)];
        } else if (self.dy === 0) {
            self.dy = [-1, 1][Math.floor(Math.random() * 2)];
        }
        // self.dx = self.velocities[Math.floor(Math.random() * 3)]
        // self.dy = self.velocities[Math.floor(Math.random() * 3)]
    };

    this.reverseVelocityX = function() {
        self.dx = -1 * self.dx;
    };

    this.reverseVelocityY = function() {
        self.dy = -1 * self.dy;
    };

    this.detectCollisionWith = function(anotherAnt) {
        return (Math.abs(self.x - anotherAnt.x) * 2 < (self.size + anotherAnt.size) && Math.abs(self.y - anotherAnt.y) * 2 < (self.size + anotherAnt.size));
    };

    this.collisionOnRightLeftBoard = function() {
        return (self.x <= self.parent.minX || (self.x + self.size) >= self.parent.maxX);
    };

    this.collisionOnTopDownBoard = function() {
        return (self.y <= self.parent.minY || (self.y + self.size) >= self.parent.maxY);
    };
}

board = new Board({
    x: 100,
    y: 100,
    height: 300,
    width: 500,
    $parent: $body,
});

board2 = new Board({
    x: 100,
    y: 150,
    height: 300,
    width: 600,
    $parent: $body,
});

board.drawBoard();
board2.drawBoard();

for (var i = 0; i < 20; i++){
    ant = new Ant({
        parent: board,
    });
    
    ant.init();
    board.addAnts(ant);
}

for (var i = 0; i < 50; i++){
    ant = new Ant({
        parent: board2,
    });
    
    ant.init();
    board2.addAnts(ant);
}

board.startAntSmasher();
board2.startAntSmasher();