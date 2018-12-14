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