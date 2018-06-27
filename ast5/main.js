$screen = document.getElementsByClassName("screen")[0];

var screen = {
    maxX: 800,
    maxY: 500,
    minX: 0,
    minY: 0,
}

var velocities = [-1, 0, 1];
var speed = 2;

function createBall(x, y, dx, dy, color, radius){
    var ball = {
        x: x,
        y: y,
        dx: dx,
        dy: dy,
        color: color,
        radius: radius,
    }

    return ball;
}

function showBall(ball){
    var $ball = document.createElement("div");
    $ball.style.position = "absolute";
    $ball.style.width = ball.radius;
    $ball.style.height = ball.radius;
    $ball.style.backgroundColor = ball.color;
    $ball.style.left = ball.x + "px";
    $ball.style.top = ball.y + "px";

    return $ball;
}

function checkBoundaryCollision(ball){
    if (ball.x <= screen.minX || (ball.x + ball.radius) >= screen.maxX){
        ball.dx = -1 * ball.dx;
    }

    if (ball.y <= screen.minY || (ball.y + ball.radius) >= screen.maxY){
        ball.dy = -1 * ball.dy;
    }
}

function checkBallCollision(ball1, ball2){
    if ((Math.abs(ball1.x - ball2.x) * 2 < (ball1.radius + ball2.radius)) && (Math.abs(ball1.y - ball2.y) * 2 < (ball1.radius + ball2.radius))){
        ball1.dx = velocities[Math.floor(Math.random() * 3)];
        ball1.dy = velocities[Math.floor(Math.random() * 3)];
        ball2.dx = velocities[Math.floor(Math.random() * 3)];
        ball2.dy = velocities[Math.floor(Math.random() * 3)];
    }
}

function updateBallPosition(divBall, ball){
    ball.x += ball.dx * speed;
    ball.y += ball.dy * speed;
    if (ball.x < 0){
        ball.x = 0;
    } else if (ball.x > (screen.maxX - ball.radius)){
        ball.x = screen.maxX - ball.radius;
    }  else if (ball.y < 0) {
        ball.y = 0;
    } else if (ball.y > screen.maxY - ball.radius){
        ball.y = screen.maxY - ball.radius;
    }

    divBall.style.left = ball.x + "px";
    divBall.style.top = ball.y + "px";
}

var redBall = createBall(Math.floor(Math.random() * 480), Math.floor(Math.random() * 480), Math.floor(Math.random() * 3), Math.floor(Math.random() * 3), "red", 50);
var blueBall = createBall(Math.floor(Math.random() * 480), Math.floor(Math.random() * 480), Math.floor(Math.random() * 3), Math.floor(Math.random() * 3), "blue", 50);

var $redBall = showBall(redBall);
document.body.appendChild($redBall);

var $blueBall = showBall(blueBall);
document.body.appendChild($blueBall);

setInterval(function(){
    updateBallPosition($blueBall, blueBall);
    updateBallPosition($redBall, redBall);
    checkBoundaryCollision(redBall);
    checkBoundaryCollision(blueBall);
    checkBallCollision(blueBall, redBall);
}, 1);

document.onkeydown = checkKey;

function checkKey(e){
    e = e || window.event;

    if (e.keyCode == '38'){
        // up arrow
        blueBall.dx = 0;
        blueBall.dy = -1;
    } else if (e.keyCode == '40'){
        // down arrow
        blueBall.dx = 0;
        blueBall.dy = 1;
    } else if (e.keyCode == '37'){
        // left arrow
        blueBall.dx = -1;
        blueBall.dy = 0;
    } else if (e.keyCode == '39'){
        // right arrow
        blueBall.dx = 1;
        blueBall.dy = 0;
    }
}
