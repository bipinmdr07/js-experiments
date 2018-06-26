function pattern(n) {
    console.log(n);
    for (var i = 0; i < 5; i++) {
        var str="";
        for (var j = 0; j < i; j++) {
            str+='*';
        }
        console.log(str);
    }
    for (var i = 5; i > 0; i--) {
        var str="";
            for (var j = i; j > 0; j--) {
                str+= '*';
            }
            console.log(str);
        }
    }
function animate(n) {
    for (var i = 0; i <= n; i++) {
        setTimeout(function()	 {
           return function(){
               return pattern();
           }
        }, 1000);
    }
}

animate(10)
