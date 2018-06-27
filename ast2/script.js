var graph = document.getElementsByClassName("scatter-plot-graph")[0];

function generatePoint(){
    var point = {left: Math.ceil(Math.random() * 490), top: Math.ceil(Math.random() * 490)};
    return point;
}

function plot(coordinate){
    var point = document.createElement('div');
    point.className = "point";
    point.style.width = "10px";
    point.style.height = "10px";
    point.style.borderRadius = "50%";
    point.style.position = "absolute";
    point.style.backgroundColor = "black";
    point.style.left = coordinate.left;
    point.style.top = coordinate.top;

    document.body.appendChild(point);
}


// generate 100 points
var i = 100;
var pointsArray = [];
while(i > 0) {
    pointsArray.push(generatePoint());
    i--;
}

pointsArray.forEach((coordinate) => {
    plot(coordinate);
});

var ul = document.getElementById("nodes-container");
var blackDots = document.getElementsByClassName("point");

for (i = 0; i <  100; i++){
    blackDots[i].onclick = function() {
        var coordinate = document.createElement('li');
        coordinate.innerHTML = "x: " + this.style.left + ', ' + 'y: ' + this.style.top;
        ul.appendChild(coordinate);
        this.remove();
    };
}

