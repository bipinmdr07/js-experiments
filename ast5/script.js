var $table = document.getElementsByClassName("screen")[0];

var screen = {
    maxX: 800,
    maxY: 500,
    minX: 0,
    minY: 0,
}


// var $ball = document.createElement('div');
// $ball.id = "ball";

// var $controllableBall = document.createElement("div");
// $controllableBall.className = "control-ball";

// function getPosition(){
//     return {left: , top: };
// }




// var ball = {
//     x: 10,
//     y: 10,
//     dx: 0,
//     dy: 0,
// }

var velocities = [-1, 0, 1];
var velocity = 2;

// var position = getPosition();
// ball.x = position.left;
// ball.y = position.top;

// position = getPosition();
// $controllableBall.style.left = position.left;
// $controllableBall.style.top = position.top;

// $ball.style.left = ball.x;
// $ball.style.top = ball.y;
// document.body.appendChild($ball);
// document.body.appendChild($controllableBall);

// setInterval(function(){
//     ball.x = ball.x + (ball.dx * velocity);
//     ball.y = ball.y + (ball.dy * velocity);

//     updateBallPosition();
//     checkBoundaryCollision();
// }, 5);

// function updateBallPosition() {
//     $ball.style.left = ball.x + "px";
//     $ball.style.top = ball.y + "px";
// }

// function checkBoundaryCollision(ballToCheck)    {
//     if ((ball.x + 10) >= screen.maxX || ball.x <= screen.minX){
//         ball.dx = -1 * ball.dx;
//     }

//     if (ball.y <= screen.minY || (ball.y + 10) >= screen.maxY){
//         ball.dy = -1 * ball.dy;
//     }
// }

function Ball(radius, color) {
    this.ball = function() {
        var ball = document.createElement("div");
        ball.style.width = radius + "px";
        ball.style.height = radius + "px";
        ball.style.position = "absolute";
        ball.style.backgroundColor = color;
        return ball;
    };
    this.radius = radius;
    this.x = Math.ceil(Math.random() * (500 - this.radius));
    this.y = Math.ceil(Math.random() * (500 - this.radius));
    this.dx = velocities[Math.floor(Math.random() * 3)];
    this.dy = velocities[Math.floor(Math.random() * 3)];

    // this.setPosition = function() {
    //     this.ball.style.left = this.x + "px";
    //     this.ball.style.top = this.y + "px";
    // }

    this.updateBallPosition = function() {
        this.x += this.dx * velocity;
        this.y += this.dy * velocity;
        // this.ball.style.left = this.x + "px";
        // this.ball.style.top = this.y + "px";
    }

    this.checkBoundaryCollision = function() {
        if (this.x <= screen.minX || (this.x + this.radius) >= screen.maxX){
            this.dx = -1 * this.dx;
        }

        if (this.y <= screen.minY || (this.y + this.radius) >= screen.maxY){
            this.dy = -1 * this.dy;
        }
    }
}

function setPosition(ballClass, ballObject) {
    ballObject.style.left = ballClass.x + "px";
    ballObject.style.top = ballClass.y + "px";
}

var smallBall = new Ball(50, "red");
var blueBall = new Ball(50, "blue");

var ball1 = smallBall.ball();
var ball2 = blueBall.ball();

setPosition(smallBall, ball1);
setPosition(blueBall, ball2);

document.body.appendChild(ball1);
document.body.appendChild(ball2);

setInterval(function() {
    smallBall.checkBoundaryCollision();
    smallBall.updateBallPosition();
    setPosition(smallBall, ball1);

    blueBall.checkBoundaryCollision();
    blueBall.updateBallPosition();
    setPosition(blueBall, ball2);
}, 1);
console.log(ball1);

