//Scope
var data;
var dataHouse;
var filters;
var valueArrayH = [];

fetch("https://api.propublica.org/congress/v1/113/house/members.json", {

    method: "GET",
    headers: {
        'X-API-Key': 'PjNubs0nQvxxinj8kRptiIIL1Og5ATM1u4NdpUnP'
    }
}).then(function (response) {

    if (response.ok) {

        return response.json();
    }
    throw new Error(response.statusText);
}).then(function (JSON) {

    data = JSON;
    console.log(data);
    dataHouse = data.results[0].members;
    console.log(dataHouse);
    createTable(dataHouse);
    getStates(dataHouse);
    
  
});

//Create a table
function createTable(data_house) {
    
    //declaro var y obtendo datos mediante ID
    var tbody = document.getElementById("house");
    //le ordendo al tbody que me borre los elementos con innerHTML
    tbody.innerHTML = "";

    for (var i = 0; i < data_house.length; i++) {
        //Create table rows
        var row = document.createElement("tr");

        var colFullname = document.createElement("td");
        //Creo el contenido del link vinculado al Fullname
        var col_link = document.createElement("a");
        col_link.setAttribute("href", data_house[i].url);
        col_link.target = "_blank";

        if (data_house[i].middle_name == null) {

            data_house[i].middle_name = "";
        }

        col_link.textContent = data_house[i].last_name + " " + data_house[i].first_name + " " + data_house[i].middle_name;


        colFullname.appendChild(col_link);
        row.appendChild(colFullname);

        //declaro la variable de party y creo la celda
        var colParty = document.createElement("td");
        //agrego contenido a la celda del party
        colParty.textContent = data_house[i].party;
        //anido el contenido de party al body row
        row.appendChild(colParty);

        var colState = document.createElement("td");
        colState.textContent = data_house[i].state;
        row.appendChild(colState);


        var colSeniority = document.createElement("td");
        colSeniority.textContent = data_house[i].seniority;
        row.appendChild(colSeniority);

        //repito procedimiento anterior con la var de Votes
        var colVotes = document.createElement("td");
        colVotes.textContent = data_house[i].votes_with_party_pct;
        row.appendChild(colVotes);

        //Agrega la hilera al final de la tabla (al final del elemento tblbody).
        tbody.appendChild(row);

    }

}

//create the getstates function
function getStates(dataHouse) {
    var states = []; //create empty array put into the states
    //go for every states
    for (var i = 0; i < dataHouse.length; i++) {
        //every state from json is equal a state
        var state = dataHouse[i].state;
        //make push into the emprty array
        states.push(state);

    }
    console.log(states); 
    states.sort(); //alphabetic order 
    console.log(states);

    //create empty array every unique state
    var unique_state = ["All"];
    for (var i = 0; i < states.length; i++) {
        //si cada uno de los estados es diferente al estado mas 1
        //si el estado es diferente al estado que le sigue
        //put it into the array
        if (states[i] !== states[i + 1]) {
            unique_state.push(states[i]);
        }

    }
    console.log(unique_state);

    //creo una seccion con todos los estados  

    for (var i = 0; i < unique_state.length; i++) {

        var select_all = document.createElement("option");

        if (i == 0) {
            select_all.setAttribute('selected', 'selected');
            select_all.value = "All";

        }

        select_all.value = unique_state[i];
        select_all.textContent = unique_state[i];
        document.getElementById("menudropdown-house").appendChild(select_all);
    }
}
//create Filter Party function

function filterParty() {

    //declaro variable local del array
    
var filters =[];
    //hago una codición
    if (valueArrayH.length == 0) {

        filters = dataHouse; //crea tabla con miembros
        //sino 
        //do a for loop
    } else {
        for (var i = 0; i < valueArrayH.length; i++) { //loop over the array

            for (var j = 0; j < dataHouse.length; j++) {
                if (dataHouse[j].party == valueArrayH[i]) {
                    filters.push(dataHouse[j]);

                }

            }

        }

    }
console.log(filters);
    filterState(filters); //call function inside loop for "crea tabla con filtros"
}

//create filterState function
function filterState(filters) {
    var filSta = [];
    var dropdown = document.getElementById("menudropdown-house");
    var selectedOption = dropdown.options[dropdown.selectedIndex].value;
    if (selectedOption == "All") {
        createTable(filters);

    } else {
        for (var i = 0; i < filters.length; i++) {
            if (selectedOption == filters[i].state) {

                filSta.push(filters[i]);

            }
        }

        createTable(filSta);
    }
}
//add events
document.getElementById('menudropdown-house').addEventListener('change', filterParty);

var repu = document.getElementById("R");
console.log(repu);

repu.addEventListener("change", function () {

        //make a decision if and for loop inside a function?

        if (repu.checked == false) {
            for (var i = 0; i < valueArrayH.length; i++) {
                if (valueArrayH[i] == "R") {
                    valueArrayH.splice(i, 1);

                }
            }

        } else {

            valueArrayH.push("R");

        }
        console.log(valueArrayH);
        filterParty();
    }

);

var demo = document.getElementById("D");
demo.addEventListener("change", function () {

    if (demo.checked == false) {
        for (var i = 0; i < valueArrayH.length; i++) {
            if (valueArrayH[i] == "D") {
                valueArrayH.splice(i, 1);

            }
        }

    } else {
        valueArrayH.push("D");
    }
    console.log(valueArrayH);
    filterParty();
});

var inde = document.getElementById("I");

inde.addEventListener("change", function () {

    if (inde.checked == false) {
        for (var i = 0; i < valueArrayH.length; i++) {
            if (valueArrayH[i] == "I") {
                valueArrayH.splice(i, 1);
            }

        }

    } else {
        valueArrayH.push("I");


    }
    console.log(valueArrayH);
    filterParty();

});
