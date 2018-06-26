var slide = document.getElementsByClassName("slide")[0];

var previous_btn = document.getElementsByTagName('button')[0];
var next_btn = document.getElementsByTagName('button')[1];

var min_limit = 0;
var margin = 0;
var max_limit = -8400;
var factor = 20;


function animate(left_translation){
    if (left_translation){
        margin -= factor;
    } else {
        margin += factor;
    }


    var id = setInterval(function() {
        if (margin % 1400 === 0){
            clearInterval(id);
        } else {
            if(left_translation && margin >= max_limit){
                // next_button clicked
                margin -= factor;
            } else if (!left_translation && margin <= min_limit){
                // previous button clicked
                margin += factor;
            } else if (margin > max_limit){
                margin -= factor;
            } else {
                margin += factor;
            }
            slide.style.marginLeft = margin.toString() + "px";
        }
    }, 1);
}

previous_btn.onclick = function() {
    // if (margin != min_limit){
    //     margin += 1400;
    //     slide.style.marginLeft = margin.toString() + "px";
    // }
    animate(false);
}

next_btn.onclick = function() {
    // if (margin != max_limit){
    //     margin -= 1400;

    //     slide.style.marginLeft = margin.toString() + "px";
    // }
    animate(true);
}

