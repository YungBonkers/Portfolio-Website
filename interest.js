// interest.js
let interestsLoaded = false; // Track whether interests are loaded

function loadXMLDoc() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        if (this.status === 200) { // Check if the request was successful
            const xmlDoc = this.responseXML;
            const interests = xmlDoc.getElementsByTagName("INTEREST");
            loadInterests(interests);
            interestsLoaded = true; // Mark interests as loaded after loading
            document.getElementById("demo").style.display = "table"; // Show the table after loading
        } else {
            console.error("Failed to load XML file:", this.statusText);
        }
    }
    xhttp.open("GET", "interests_catalog.xml", true); // Update to your XML file
    xhttp.send();
}

function loadInterests(interests) {
    let table = "<tr><th>Category</th><th>Name</th></tr>";
    for (let i = 0; i < interests.length; i++) {
        table += "<tr onclick='toggleInterestDetails(" + i + ")' class='interest-row'><td>" +
            interests[i].getElementsByTagName("CATEGORY")[0].childNodes[0].nodeValue +
            "</td><td>" +
            interests[i].getElementsByTagName("NAME")[0].childNodes[0].nodeValue +
            "</td></tr>";

        // Create a hidden row for details
        table += "<tr id='details-" + i + "' style='display:none;'><td colspan='2'>" +
            interests[i].getElementsByTagName("DETAILS")[0].childNodes[0].nodeValue +
            "</td></tr>";
    }
    document.getElementById("demo").innerHTML = table;
}

function toggleInterestDetails(index) {
    const detailsRow = document.getElementById("details-" + index);
    if (detailsRow.style.display === "none") {
        detailsRow.style.display = "table-row"; // Show the details
    } else {
        detailsRow.style.display = "none"; // Hide the details
    }
}

// Toggle function for the button
function toggleInterests() {
    const table = document.getElementById("demo");
    const button = document.getElementById("loadInterestsBtn");

    if (!interestsLoaded) {
        loadXMLDoc(); // Load interests only if they haven't been loaded yet
        button.innerText = "Hide My Interests"; // Change button text
    } else {
        // Toggle visibility
        if (table.style.display === "none" || table.style.display === "") {
            table.style.display = "table"; // Show the table
        } else {
            table.style.display = "none"; // Hide the table
        }
        button.innerText = table.style.display === "none" ? "Load My Interests" : "Hide My Interests"; // Update button text based on visibility
    }
}
