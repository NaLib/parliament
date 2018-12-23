

function drawParliament() {
    
    var positionInfo = document.getElementById("svg").getBoundingClientRect();

    // document.getElementById("svg_circle").setAttribute("fill", "blue");

    // drawSeats();
    
    for(var i = 0; i < 2; i++)
        drawArc(positionInfo, 5, i+1);

};

// draws 1 arc of the parlament, given the dimensions ov the parent svg, number of seats and pariament row
function drawArc(dimensions, n, k) {
    //dimensions of parent svg element
    var width = dimensions.width;
    var height = dimensions.height;
    //radius of row arc (hypothenuse in trigonometry functions)
    var arcR = width / (10 - k);
    //angle used in trigonomentry calc.
    var alpha = 180 / (n - 1);

    for(var i = 0; i < n; i++) {

        var a = Math.cos(toRadians(i * alpha)) * arcR;      // the adjesent cathetus
        var b = Math.sin(toRadians(i * alpha)) * arcR;      // the opposite cathetus
        
        drawSeat((width / 2 ) - a, height - 20 - b, 20);
    }

}

function drawSeat(cx, cy, r) {

    var svgns = "http://www.w3.org/2000/svg";
    var svg = document.getElementById("svg");
    var circle = document.createElementNS(svgns, "circle");
    circle.setAttribute("cx", cx);
    circle.setAttribute("cy", cy);
    circle.setAttribute("r", r);
    circle.setAttribute("stroke", "black");
    circle.setAttribute("stroke-width", 2);
    circle.setAttribute("fill", "white");

    svg.appendChild(circle);
}

function drawSeats() {
    


    /*
    // var parties = fetchParties();
    var parties = [
        {name:"VMRO", seats:50, color:"red"},
        {name:"SDS", seats:23, color:"blue"},
        {name:"DUI", seats:60, color:"white"} 
    ];

    var totalSeats = 0;
    
    for (i = 0; i < parties.length; i++) {
        totalSeats += parties[i].seats;
    }

    var m = getDimensions(totalSeats);
    var n = totalSeats / m;
    
    var data = Papa.parse("https://nalib.github.io/parliament/members_list_detailed.csv", {
        download: true,
        complete: function(result) {
            // alert(result[3]);
            console.log(result.data[3][3]);
        }
    });

    alert(totalSeats + ' = ' +  m + ' * ' + n);

    */
};

function fetchParties() {

};

function getDimensions(number) {

    var divisor = 2;
    
    while( (number / divisor) / divisor > 2 ) {
        divisor++;
    }

    return divisor;
};

function getSeatNumber() {

    var data = Papa.parse("https://nalib.github.io/parliament/members_list_detailed.csv", {
        download: true,
        complete: function(result) {
            return result.data.length;
        }
    });

};

function toRadians(angle) {
        return angle * (Math.PI / 180);
};