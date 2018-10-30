var data;
var dataSenate;
var valueArray = [];

fetch("https://api.propublica.org/congress/v1/113/senate/members.json", {

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
    dataSenate = data.results[0].members;
    console.log(dataSenate);

    createTable(dataSenate);
    getStates(dataSenate);

});

function createTable(data_senate) {

    var tbody = document.getElementById("data-senate");
    //erase elementos con innerHTML
    tbody.innerHTML = "";

    //Create the table en un loop for con el parametro de tabla

    for (var i = 0; i < data_senate.length; i++) {
        //Crea las rows de la tabla.
        var row = document.createElement("tr");

        var colFullname = document.createElement("td");
        //Creo el contenido del link vinculado al Fullname
        var col_link = document.createElement("a");
        col_link.setAttribute("href", data_senate[i].url);
        col_link.target = "_blank";

        if (data_senate[i].middle_name == null) {

            data_senate[i].middle_name = "";
        }

        col_link.textContent = data_senate[i].last_name + " " + data_senate[i].first_name + " " + data_senate[i].middle_name;

        colFullname.appendChild(col_link);
        row.appendChild(colFullname);

        //declaro la variable de party y creo la celda
        var colParty = document.createElement("td");
        //agrego contenido a la celda del party
        colParty.textContent = data_senate[i].party;
        //anido el contenido de party al body row
        row.appendChild(colParty);

        //declaro variable de state y creo la celda
        var colState = document.createElement("td");
        //agrego contenido a la celda de state con la info del loop
        colState.textContent = data_senate[i].state;
        //anido el contenido de state al body row
        row.appendChild(colState);

        var colSeniority = document.createElement("td");

        colSeniority.textContent = data_senate[i].seniority;

        row.appendChild(colSeniority);

        //repito procedimiento anterior con la var de Votes
        var colVotes = document.createElement("td");
        colVotes.textContent = data_senate[i].votes_with_party_pct;
        row.appendChild(colVotes);

        //Agrega la hilera al final de la tabla (al final del elemento tblbody).
        tbody.appendChild(row);

    }

}

//create the function
function getStates(dataSenate) {

    var states = []; //create empty array  

    for (var i = 0; i < dataSenate.length; i++) {
        
        var state = dataSenate[i].state;
        //put into  array every states 
        states.push(state);

    }
    console.log(states); //show console
    states.sort(); //alphabetic order every state
    console.log(states);

    //create empty array for every states who doesn´t repeat
    var unique_state = ["All"];
    for (var i = 0; i < states.length; i++) {
        //si cada uno de los estados es diferente al estado mas 1
        //si el estado es diferente al estado que le sigue
        //ingresalo en el array vacio
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
        document.getElementById("menudropdown").appendChild(select_all);
    }

}
//create Filter Party function
function filterParty() {

    //declaro variable local del array
    let filters = [];

    //hago una codición
    if (valueArray.length == 0) {

        filters = dataSenate; //crea tabla con miembros
        //sino 
        //do a for loop
    } else {
        for (var i = 0; i < valueArray.length; i++) { //loop over the array

            for (var j = 0; j < dataSenate.length; j++) {
                if (dataSenate[j].party == valueArray[i]) {
                    filters.push(dataSenate[j]);

                }

            }

        }

    }

    console.log(filters);
    filterState(filters); //call function inside loop for "crea tabla con filtros"
}

//create filter state function
function filterState(filters) {
    let filSta = [];
    let dropdown = document.getElementById("menudropdown");
    let selectedOption = dropdown.options[dropdown.selectedIndex].value;
    if (selectedOption == "All") {
        createTable(filters);

    } else {
        for (var i = 0; i < filters.length; i++) {
            if (selectedOption == filters[i].state) {

                filSta.push(filters[i]);

            }
        }
        console.log(filSta);
        createTable(filSta);
    }
}
//add events
document.getElementById('menudropdown').addEventListener('change', filterParty);


var repu = document.getElementById("R");

repu.addEventListener("change", function () {

        //make a decision if and for loop inside a function?

        if (repu.checked == false) {
            for (var i = 0; i < valueArray.length; i++) {
                if (valueArray[i] == "R") {
                    valueArray.splice(i, 1);

                }
            }

        } else {

            valueArray.push("R");

        }

        console.log(valueArray);
        filterParty();
    }

);

var demo = document.getElementById("D");
demo.addEventListener("change", function () {

    if (demo.checked == false) {
        for (var i = 0; i < valueArray.length; i++) {
            if (valueArray[i] == "D") {
                valueArray.splice(i, 1);

            }
        }

    } else {
        valueArray.push("D");
    }

    console.log(valueArray);
    filterParty();
});

var inde = document.getElementById("I");

inde.addEventListener("change", function () {

    if (inde.checked == false) {
        for (var i = 0; i < valueArray.length; i++) {
            if (valueArray[i] == "I") {
                valueArray.splice(i, 1);//en la posicion I quitame 1.
            }
        }

    } else {
        valueArray.push("I");

    }

    console.log(valueArray);
    filterParty();

});
