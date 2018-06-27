var slide = document.getElementsByClassName("slide")[0];

var previousBtn = document.getElementsByTagName('button')[0];
var nextBtn = document.getElementsByTagName('button')[1];

var imageLocation = window.location.href + "images/";

var minLimit = 0;
var margin = -1400;
var maxLimit = -11200;
var factor = 20;


function animate(leftTranslation){
    if (leftTranslation){
        margin -= factor;
    } else {
        margin += factor;
    }


    var id = setInterval(function() {
        if (margin % 1400 === 0){
            clearInterval(id);
            if (margin == 0){
                margin = -9800;
            } else if (margin == -11200){
                margin = -1400;
            }
        } else {
            if(leftTranslation && margin >= maxLimit){
                // next_button clicked
                margin -= factor;
            } else if (!leftTranslation && margin <= minLimit){
                // previous button clicked
                margin += factor;
            }
            slide.style.marginLeft = margin.toString() + "px";
        }
    }, 1);
}

previousBtn.onclick = function() {
    animate(false);
}

nextBtn.onclick = function() {
    animate(true);
}

