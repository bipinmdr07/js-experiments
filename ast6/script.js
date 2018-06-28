$board = document.getElementsByClassName("board")[0];

function createAnt(x, y, dx, dy, size, color) {
    var ant = {
        x: x,
        y: y,
        dx: dx,
        dy: dy,
        size : size,
        color: color,
    }
    return ant;
}

var screen = {
    minX: 0,
    minY: 0,
    maxX: 900,
    maxY: 600,
}

var antSize = 10;
var velocities = [-1, 0, 1];
var speed = 1;

var ants = [];
var $ants = [];
// generate 500 ants
var numberOfAnts = 500;

for(var i = 0; i < numberOfAnts; i++){
    var ant = createAnt(Math.floor(Math.random() * (screen.maxX - antSize)), Math.floor(Math.random() * (screen.maxY - antSize)), velocities[Math.floor(Math.random() * 3)], velocities[Math.floor(Math.random() * 3)], antSize, "black");
    var $ant = document.createElement("div");
    $ant.className = "ant";
    $ant.style.width = ant.size + "px";
    $ant.style.height = ant.size + "px";
    $ant.style.position = "absolute";
    $ant.style.left = ant.x + "px";
    $ant.style.top = ant.y + "px";
    $ant.style.backgroundColor = ant.color;
    document.body.appendChild($ant);

    ants.push(ant);
    $ants.push($ant);
}

function updateAntPosition(ant, $ant){
    ant.x += ant.dx * speed;
    ant.y += ant.dy * speed;

    if (ant.x < 0){
        ant.x = 0;
    } else if ((ant.x + ant.size) > screen.maxX){
        ant.x = (screen.maxX - ant.size);
    } else if (ant.y < 0){
        ant.y = 0;
    } else if ((ant.y + ant.size) > screen.maxY){
        ant.y = (screen.maxY - ant.size);
    }

    $ant.style.left = ant.x + "px";
    $ant.style.top = ant.y + "px";
}

function collisionWithWall(ant){
    if (ant.x <= screen.minX || (ant.x + ant.size) >= screen.maxX){
        ant.dx = -1 * ant.dx;
    }

    if (ant.y <= screen.minY || (ant.y + ant.size) >= screen.maxY){
        ant.dy = -1 * ant.dy;
    }
}

function collisionWithAnotherAnt(ants){
    for(var i = 0; i < ants.length - 1; i++){
        for(var j = i + 1; j < ants.length; j++){
            if (Math.abs(ants[i].x - ants[j].x) * 2 < (ants[i].size + ants[j].size) && Math.abs(ants[i].y - ants[j].y) * 2 < (ants[i].size + ants[j].size)){
                ants[i].dx = velocities[Math.floor(Math.random() * 3)];
                ants[i].dy = velocities[Math.floor(Math.random() * 3)];
                ants[j].dx = velocities[Math.floor(Math.random() * 3)];
                ants[j].dy = velocities[Math.floor(Math.random() * 3)];
            }
        }
    }
}

// killing the ants
$ants.forEach(function(ant){
    ant.onclick = function() {
        var index = $ants.indexOf(ant);
        $ants.splice(index, 1);
        ants.splice(index, 1);
        this.remove();
    }
});

setInterval(function() {
    collisionWithAnotherAnt(ants);
    for(var i = 0; i < $ants.length; i++){
        updateAntPosition(ants[i], $ants[i]);
        collisionWithWall(ants[i]);
    }
}, 1);