function animate(maxStars){
    var stars = "";
    var stopCondition = maxStars;
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

        if (i === stopCondition){
            increment = !increment;
            if (stopCondition === maxStars){
                stopCondition = 1;
            } else {
                stopCondition = maxStars;
            }
        }
        console.log(stars);
    }, 100);
}

animate(10);