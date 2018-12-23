function toggleSchedule(obj) {
    
    if (obj.innerHTML == "Hide") {
        document.getElementById("schedule").getElementsByTagName("h3")[0].style.display = "none"
        document.getElementById("schedule").getElementsByTagName("ul")[0].style.display = "none"
        obj.innerHTML = "Show schedule"
    } else {
        document.getElementById("schedule").getElementsByTagName("h3")[0].style.display = "block"
        document.getElementById("schedule").getElementsByTagName("ul")[0].style.display = "block"
        obj.innerHTML = "Hide"
    }
};

function loadElements() {
    loadArchive();
};

function loadArchive() {
    // var data = Papa.parse("members_list_detailed.csv", {
    Papa.parse("https://nalib.github.io/parliament/threads_list_detailed.csv", {   
        download: true,
        complete: function(result) {
            // console.log(result);
            var tbody = document.getElementById("archive_table_body");
            for(i = 1; i < result.data.length; i++) {
                var newRow = document.createElement("tr");

                if(i%2 != 0) 
                    newRow.setAttribute("style", "background-color: #ede2d4");

                var newCell = document.createElement("td");
                newCell.innerHTML = result.data[i][0];
                newCell.setAttribute("style", "text-align: center; padding: 2px; font-size: 9pt;");
                newRow.appendChild(newCell);

                newCell = document.createElement("td");
                newCell.innerHTML = result.data[i][1];
                newCell.setAttribute("style", "text-align: left; word-break: break-all; padding: 2px; font-size: 9pt;");
                newRow.appendChild(newCell);

                newCell = document.createElement("td");
                newCell.innerHTML = '[<a href="'+result.data[i][2]+'">View</a>]';
                newCell.setAttribute("style", "text-align: center; padding: 2px; font-size: 9pt;");
                newRow.appendChild(newCell);

                // for(j = 0; j < 3; j++) {
                //     var newCell = document.createElement("td");
                //     if()
                //     newCell.innerHTML = result.data[i][j];
                //     if(i%2==0) {
                //         newCell.setAttribute("style", "background-color: #ede2d4; text-align: center;");
                //     }
                //     newRow.appendChild(newCell);
                // }
                tbody.appendChild(newRow);
            }
        }
    });
};

function testFunction() {
    alert("WERK");
};