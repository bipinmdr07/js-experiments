function animate(max_stars){
    var stars = "";
    var stop_condition = max_stars;
    var increment = true;
    var i = 0;
    setInterval(function(){
        if (increment){
            stars += "*";
            i += 1;
        } else {
            stars = stars.slice(0, -1);
            i -= 1;
        }

        if (i === stop_condition){
            increment = !increment;
            if (stop_condition === max_stars){
                stop_condition = 1;
            } else {
                stop_condition = max_stars;
            }
        }
        console.log(stars);
    }, 100);
}

animate(20);