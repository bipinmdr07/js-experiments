var graph = document.getElementsByClassName("scatter-plot-graph")[0];

function generate_point(){
    var point = {left: Math.ceil(Math.random() * 500), top: Math.ceil(Math.random() * 500)};
    return point;
}

function plot(coordinate){
    var point = document.createElement('div');
    point.className = "point";
    point.style.width = "5px";
    point.style.height = "5px";
    point.style.borderRadius = "50%";
    point.style.position = "absolute";
    point.style.backgroundColor = "black";
    point.style.left = coordinate.left;
    point.style.top = coordinate.top;

    document.body.appendChild(point);
}


// generate 100 points
var i = 100;
var points_array = [];
while(i > 0) {
    points_array.push(generate_point());
    i--;
}

points_array.forEach((coordinate) => {
    plot(coordinate);
});

var ul = document.getElementById("nodes-container");
console.log(ul);
var black_dots = document.getElementsByClassName("point");

for (i = 0; i <  100; i++){
    black_dots[i].onclick = function() {
        var coordinate = document.createElement('li');
        // console.log(this.style.left + ', ' + this.style.top);
        coordinate.innerHTML = this.style.left + ', ' + this.style.top;
        ul.appendChild(coordinate);
        this.remove();

        // document.body.appendChild(coordinate);
    };
}

