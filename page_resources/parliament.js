
// radius of a seat (circle) in pixels 
var seatRadius = 20;
// number of seats per number of rows
var seatNumberPerRow = [5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 41]; 
// total number of seats per number of rows
var totalSeatNumberPerRow = [5, 12, 21, 32, 45, 60, 77, 96, 117, 140, 165];

var totalSeats = 0;

var totalRows = 0;

var totalColumns = 0;
// matrix where each seat is marked by 1  
var seatMatrix;
// flag showing if the first (or last?) row of the seatMatrix has empty elements
var oddLastRow = true;
// total data on parties 
var data;
// array where each element is a single seat and its value the party name holding it
var partySeats;

function drawParliament() {
    // get party data from repository first, download and parse it
    Papa.parse("https://nalib.github.io/parliament/members_list_detailed.csv", {
        download: true,
        complete: function(result) {
            // on callback, save it globally and continue
            data = result.data;
            initValues();
            drawSeats();
        }
    });
};

// do all the calculation, find all values and assign them to global variables
function initValues() {

    // calculate all the seats in the parliament
    for (i = 1; i < data.length; i++) {
        // only count active members (colimn 'acvtive' is 1)
        if (data[i][5] == 1)
            totalSeats++;
    }

    // calculate total number of rows and columns (seatMatrix dimensions)
    for(var i = 0; i < totalSeatNumberPerRow.length; i++) {
        if (totalSeatNumberPerRow[i] >= totalSeats) {
            totalRows = i+1;
            totalColumns = seatNumberPerRow[i];
            // if a row (the last row) has less seats than the predefined values (90 % of time), set a flag
            oddLastRow = (totalSeatNumberPerRow[i] == totalSeats) ? false : true;
            break;
        }
    }

    // create an array of all seats and assign a party name to each seat
    partySeats = new Array(totalSeats);
    for(var i = 1; i <= totalSeats; i++) {
        partySeats[i-1] = data[i][2];
    }

    // define and calculate seat matrix, seats are given value of 1
    seatMatrix = new Array(totalRows);
    for(var i = 0; i < totalRows; i++) {
        // have to instantiate each row as an array because javascript  
        seatMatrix[i] = new Array(totalColumns);
        // for odd last row 
        if (i == 0 && oddLastRow) {
            var middleIndex = Math.floor(totalColumns / 2);
            var lastRowSeatsNumber = totalSeats - totalSeatNumberPerRow[totalRows - 2]; //disaster wating to happen, fix it! 
            var halfLastRowSeats = Math.floor(lastRowSeatsNumber / 2);
            var startIndex = middleIndex - halfLastRowSeats ;
            var endIndex = startIndex + lastRowSeatsNumber;
            // alert(middleIndex + ", " + lastRowSeatsNumber + ", " + halfLastRowSeats + ", " + startIndex + ", " + endIndex);
            for(var j = 0; j < totalColumns; j++) {
                if (j >= startIndex && j < endIndex)
                    seatMatrix[i][j] = 1;
                else 
                    seatMatrix[i][j] = 0;
            }
        }
        // for full last row
        else {
            for(var j = 0; j < totalColumns; j++) {
                if (j >= i && j < totalColumns - i )
                    seatMatrix[i][j] = 1;
                else 
                    seatMatrix[i][j] = 0;
            }
        }
    }

    // traversing the seatMatrix once again and assign a party name to each seat
    var k = 0;
    for(var i = 0; i < totalColumns; i++) {
        // to get the zig-zag traversing, even number columns go from top down and vice-verca 
        if ( i % 2 == 0) {
            for(var j = 0; j < totalRows; j++) {
                if(seatMatrix[j][i] == 1) {
                    seatMatrix[j][i] = partySeats[k];
                    k++;
                }
            }
        }
        else {
            for(var j = totalRows - 1; j >= 0; j--) {
                if(seatMatrix[j][i] == 1) {
                    seatMatrix[j][i] = partySeats[k];
                    k++;
                }
            }
        }
    }
}

function drawSeats() {
    // get dimensions of svg element
    var positionInfo = document.getElementById("svg").getBoundingClientRect();

    for(var i = 0, k = seatMatrix.length; i < seatMatrix.length; i++, k--)
        drawArc(positionInfo, seatMatrix[i], k);
};

// draws 1 arc of the parlament, given the dimensions ov the parent svg, seats array and pariament row (k)
function drawArc(dimensions, row, k) {
    // total number of drawing elements 
    var n = 0;
    // if we are in the last row and it's not full
    if(oddLastRow && k == totalRows)
        n = row.length;
    else {
        for(var i = 0; i < row.length; i++) {
            if (row[i] != 0) 
                n++;
        }
    }
    //dimensions of parent svg element
    var width = dimensions.width;
    var height = dimensions.height;
    //radius of row arc (hypothenuse in trigonometry functions)
    var arcR = width / 10 + k * 2.5 * seatRadius;
    // initial angle 
    var alpha = 20;
    //angle used in trigonomentry calc.
    var theta = (180 - 2 * alpha) / (n - 1);

    for(var i = 0; i < n; i++) {

        var a = Math.cos(toRadians(i * theta + alpha)) * arcR;      // the adjesent cathetus
        var b = Math.sin(toRadians(i * theta + alpha)) * arcR;      // the opposite cathetus
        
        var xInSeatMatrix = Math.ceil((totalColumns - n) / 2) + i;
        var yInSeatMatrix = seatMatrix.length - k;
        // alert( rowInSeatMatrix +  ", " + columnInSeatMatrix + ", ");
        var name = seatMatrix[yInSeatMatrix][xInSeatMatrix]; 

        // if we are in the last row, it's not full and at empty element, just jump it
        if (oddLastRow && k == totalRows && row[i] == 0)
            continue;
        // everything seems fine, draw the circle
        drawSeat(
            (width / 2 ) - a, 
            height - b, 
            seatRadius, 
            name);
    }
}

function drawSeat(cx, cy, r, name) {
    // add svg namespace 
    var svgns = "http://www.w3.org/2000/svg";
    var svg = document.getElementById("svg");
    var circle = document.createElementNS(svgns, "circle");
    circle.setAttribute("cx", cx);
    circle.setAttribute("cy", cy);
    circle.setAttribute("r", r);
    circle.setAttribute("stroke", "black");
    circle.setAttribute("stroke-width", 2);
    circle.setAttribute("fill", getColor(name));
    circle.setAttribute("class", "seat");
    // another element inside the cirle, used for tooltip
    var title = document.createElementNS(svgns, "title");
    title.innerHTML = name;
    circle.appendChild(title);
    // add the circle finaly
    svg.appendChild(circle);
}

function toRadians(angle) {
        return angle * (Math.PI / 180);
};

function getColor(partyName) {
    switch (partyName) {
        case "ANCAP":
            return "chartreuse";
        case "EFP":
            return "green";
        case "FED":
            return "dodgerblue";
        case "INP":
            return "maroon";
        case "LAB":
            return "black";
        case "NLP":
            return "orange";
        case "NPA":
            return "gray";
        case "NPC":
            return "blue";
        case "NZRP":
            return "#510424";
        case "PKP":
            return "darkslategray";
        case "SPQR":
            return "red";
        case "THP":
            return "pink";
        default:
            return "white"; 
    }
}