
// radius of a seat (circle) in pixels 
const RSEAT = 20;
// number of seats per number of rows
const SEATNUMPERROW = [5, 8, 11, 14, 17, 20, 23, 26, 29]; 
// total number of seats per number of rows
const TOTALSEATNUMPERROW = [5, 13, 24, 38, 55, 75, 98, 124, 153];

function drawParliament() {
    
    // var positionInfo = document.getElementById("svg").getBoundingClientRect();

    // document.getElementById("svg_circle").setAttribute("fill", "blue");

    drawSeats();
    
    // for(var i = 0; i < 8; i++)
    //     drawArc(positionInfo, SEATNUMPERROW[i], i);
    
};

// draws 1 arc of the parlament, given the dimensions ov the parent svg, number of seats and pariament row
function drawArc(dimensions, n, k) {
    //dimensions of parent svg element
    var width = dimensions.width;
    var height = dimensions.height;
    //radius of row arc (hypothenuse in trigonometry functions)
    var arcR = width / 10 + k * 2.5 * RSEAT;
    //angle used in trigonomentry calc.
    var alpha = 180 / (n - 1);

    for(var i = 0; i < n; i++) {

        var a = Math.cos(toRadians(i * alpha)) * arcR;      // the adjesent cathetus
        var b = Math.sin(toRadians(i * alpha)) * arcR;      // the opposite cathetus
        
        drawSeat((width / 2 ) - a, height - 20 - b, RSEAT);
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
    
    // var parties = fetchParties();
    var parties = [
        {name:"VMRO", seats:1, color:"red"},
        {name:"SDS", seats:2, color:"blue"},
        {name:"DUI", seats:20, color:"white"} 
    ];

    var totalSeats = 0;
    var totalRows = 0;
    
    // calculate all the seats in the parliament
    for (i = 0; i < parties.length; i++) {
        totalSeats += parties[i].seats;
    }

    // calculate total number of rows
    for(var i = 0; i < TOTALSEATNUMPERROW.length; i++) {
        if (TOTALSEATNUMPERROW[i] >= totalSeats) {
            totalRows = i+1;
            break;
        }
    }

    var positionInfo = document.getElementById("svg").getBoundingClientRect();


    // if the last row is full 
    if(totalSeats == TOTALSEATNUMPERROW[totalRows - 1]) {
        for(var i = 0; i < totalRows; i++) {
            drawArc(positionInfo, SEATNUMPERROW[i], i);
        }
    }
    // if last row has "odd" number of seats (pretty much all of the time)
    else {
        // draw all rows without the last one normally
        var currentRow = 0;
        while (currentRow < totalRows - 1) {
            drawArc(positionInfo, SEATNUMPERROW[currentRow], currentRow);
            currentRow++;
        }
        // draw only the remaining seats in the last row
        var lastRowSeats = TOTALSEATNUMPERROW[currentRow] - totalSeats;
        drawArc(positionInfo, SEATNUMPERROW[currentRow] - lastRowSeats, currentRow);
    }


    
    
    // var data = Papa.parse("https://nalib.github.io/parliament/members_list_detailed.csv", {
    //     download: true,
    //     complete: function(result) {
    //         // alert(result[3]);
    //         console.log(result.data[3][3]);
    //     }
    // });

    // alert(totalSeats + ' = ' +  m + ' * ' + n);

    
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