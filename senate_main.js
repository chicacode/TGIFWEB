var data;
var dataSenate;
var dataStatistic;
var valueArray = [];
var tenPercenNum;
var file;
var file_atten;


var statistics = {

    democrats: 0,
    republicans: 0,
    independents: 0,
    total_present: 0,
    votes_with_party_pct: 0,
    total_votes: 0,
    total_demo: 0,
    total_repu: 0,
    total_inde: 0,
    demo_pct: 0,
    repu_pct: 0,
    inde_pct: 0

};

console.log(statistics);

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
    dataSenate = data.results[0].members;
    console.log(dataSenate);
    dataStatistic = data.results[0].members;
    console.log(dataStatistic);
    file = document.getElementById("senate");

    if (file) {
        createTable(dataSenate);
        getStates(dataSenate);
        senListener();
        
    } else if (file_atten = document.getElementById("senate_attendance")) {
        console.log('FILE', file_atten);


        getMembers(dataStatistic);
    
        least_engaged(dataSenate);
        most_engaged(dataSenate);
    } else if (file_party = document.getElementById("senate_party")){
        console.log('ELSE IF');
    
        getMembers2(dataSenate);
        least_loyal(dataSenate);
        most_loyal(dataSenate);

    }
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
function senListener(){
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
                valueArray.splice(i, 1); //en la posicion I quitame 1.
            }
        }

    } else {
        valueArray.push("I");

    }

    console.log(valueArray);
    filterParty();

});

}
function createTable1() {
    var tbody = document.getElementById("senate_glance");

    var row = document.createElement("tr");

    var coldemo = document.createElement("tr");

    coldemo.textContent = "Democrats";
    row.appendChild(coldemo);

    var colde = document.createElement("td");

    colde.textContent = statistics.democrats;

    coldemo.appendChild(colde);

    var coldepct = document.createElement("td");
    coldepct.textContent = statistics.demo_pct + " " + "%";

    coldemo.appendChild(coldepct);

    var colrepu = document.createElement("tr");

    colrepu.textContent = "Republicans";

    row.appendChild(colrepu);

    var colre = document.createElement("td");
    colre.textContent = statistics.republicans;

    colrepu.appendChild(colre);

    var colrepct = document.createElement("td");
    colrepct.textContent = statistics.repu_pct + " " + "%";

    colrepu.appendChild(colrepct);

    var colinde = document.createElement("tr");

    colinde.textContent = "Independents";

    row.appendChild(colinde);

    var coli = document.createElement("td");
    coli.textContent = statistics.independents;

    colinde.appendChild(coli);

    var colipct = document.createElement("td");
    colipct.textContent = statistics.inde_pct + " " + "%";

    colinde.appendChild(colipct);


    var total = document.createElement("tr");

    total.textContent = "Total";

    row.appendChild(total);

    var totalmembers = document.createElement("td");

    totalmembers.textContent = statistics.total_present;

    total.appendChild(totalmembers);

    var totalpct = document.createElement("td");

    totalpct.textContent = statistics.votes_with_party_pct + " " + "%";

    total.appendChild(totalpct);

    tbody.appendChild(row);


}



function createTable2(leastMost, tableid) {

    var tbody = document.getElementById(tableid);

    for (var i = 0; i < leastMost.length; i++) {

        var row = document.createElement("tr");

        var fullname = document.createElement("td");

        var link = document.createElement("a");

        link.setAttribute("href", leastMost[i].url);
        link.target = "_blank";


        if (leastMost[i].middle_name == null) {

            leastMost[i].middle_name = "";
        }

        link.textContent = leastMost[i].last_name + " " + leastMost[i].first_name + " " + leastMost[i].middle_name;

        fullname.appendChild(link);

        row.appendChild(fullname);

        var number_missedVotes = document.createElement("td");

        number_missedVotes.textContent = leastMost[i].missed_votes;


        row.appendChild(number_missedVotes);

        var pct_missed_v = document.createElement("td");

        pct_missed_v.textContent = leastMost[i].missed_votes_pct + " " + "%";

        row.appendChild(pct_missed_v);

        tbody.appendChild(row);

    }

}


function getMembers(members) {

    var democrats = [];
    var republicans = [];
    var independents = [];
    var totaldemo = 0;
    var totalrepu = 0;
    var totalinde = 0;

    var missed_votes = [];
    var misses_votes_per = [];

    for (var i = 0; i < members.length; i++) {

        if (members[i].party == "D") {

            democrats.push(members[i]);

        } else if (members[i].party == "R") {

            republicans.push(members[i]);
        } else {

            independents.push(members[i]);

        }

    }


    for (var i = 0; i < members.length; i++) {

        if (members[i].missed_votes > 10 * 100) {

            missed_votes.push(members[i]);
        }

    }
    //get the length of each party.
    statistics.democrats = democrats.length;
    statistics.republicans = republicans.length;
    statistics.independents = independents.length;
    statistics.total_present = dataStatistic.length;

    for (var i = 0; i < democrats.length; i++) {

        totaldemo = totaldemo + democrats[i].votes_with_party_pct;
    }

    for (var i = 0; i < republicans.length; i++) {


        totalrepu = totalrepu + republicans[i].votes_with_party_pct;

    }


    for (var i = 0; i < independents.length; i++) {

        totalinde = totalinde + independents[i].votes_with_party_pct;
    }


    statistics.total_demo = totaldemo;
    statistics.total_repu = totalrepu;
    statistics.total_inde = totalinde;

    statistics.demo_pct = Math.round(totaldemo / democrats.length);
    statistics.repu_pct = Math.round(totalrepu / republicans.length);
    statistics.inde_pct = Math.round(totalinde / independents.length);


    statistics.votes_with_party_pct = Math.round((statistics.total_demo + statistics.total_repu + statistics.total_inde) / statistics.total_present);

    createTable1();


}

var missed_votes;
var totalmember = [];



var least_engaged_member = [];



function least_engaged(dataStatistic) {
var tenPercenNum = Math.round((dataSenate.length * 10) / 100);
    var least_engaged_member = [];

    var missed_votess = dataStatistic.sort(function (a, b) {


        return b.missed_votes_pct - a.missed_votes_pct;

    });

    console.log(tenPercenNum);

    for (var i = 0; i < tenPercenNum; i++) {
        console.log(i);
        least_engaged_member.push(missed_votess[i]);

    }
    console.log(least_engaged_member);



    for (var i = least_engaged_member.length; i < dataStatistic.length; i++) {
        console.log(i);
        //hacer un loop for para recorrer el array pequeño con el grande y compararlo

        if (least_engaged_member[least_engaged_member.length - 1] &&
            least_engaged_member[least_engaged_member.length - 1].missed_votes_pct &&
            least_engaged_member[least_engaged_member.length - 1].missed_votes_pct == data.results[0].members[i].missed_votes_pct) {

            least_engaged_member.push(dataStatistic[i]);
            console.log(least_engaged_member);

        }

    }


    createTable2(least_engaged_member, "least_engaged");

}


var most_votes;

function most_engaged(dataSenate) {
    var tenPercenNum = Math.round((dataSenate.length * 10) / 100);
    var most_engaged_members = [];

    var most_votes = dataSenate.sort(function (a, b) {

        return a.missed_votes_pct - b.missed_votes_pct

    });

    for (var i = 0; i < tenPercenNum; i++) {

        most_engaged_members.push(most_votes[i]);

    }


    for (var i = most_engaged_members.length; i < dataSenate.length; i++) {

        if (most_engaged_members[most_engaged_members.length - 1].missed_votes_pct == data.results[0].members[i].missed_votes_pct) {

            most_engaged_members.push(dataSenate[i]);
            console.log(most_engaged_members);

        }

    }


    createTable2(most_engaged_members, "most_engagedtable");

}

function createTable4() {

    var tbody = document.getElementById("senate_glance");

    var row = document.createElement("tr");

    var coldemo = document.createElement("tr");

    coldemo.textContent = "Democrats"

    row.appendChild(coldemo);

    var colde = document.createElement("td");

    colde.textContent = statistics.democrats;

    coldemo.appendChild(colde);

    var coldepct = document.createElement("td");
    coldepct.textContent = statistics.demo_pct + " " + "%";

    coldemo.appendChild(coldepct);

    var colrepu = document.createElement("tr");

    colrepu.textContent = "Republicans";

    row.appendChild(colrepu);

    var colre = document.createElement("td");
    colre.textContent = statistics.republicans;

    colrepu.appendChild(colre);

    var colrepct = document.createElement("td");
    colrepct.textContent = statistics.repu_pct + " " + "%";

    colrepu.appendChild(colrepct);


    var colinde = document.createElement("tr");

    colinde.textContent = "Independents";

    row.appendChild(colinde);

    var coli = document.createElement("td");
    coli.textContent = statistics.independents;

    colinde.appendChild(coli);

    var colipct = document.createElement("td");
    colipct.textContent = statistics.inde_pct + " " + "%";

    colinde.appendChild(colipct);

    var total = document.createElement("tr");

    total.textContent = "Total";

    row.appendChild(total);

    var totalmembers = document.createElement("td");

    totalmembers.textContent = statistics.total_present;

    total.appendChild(totalmembers);

    var totalpct = document.createElement("td");

    totalpct.textContent = statistics.votes_with_party_pct + " " + "%";

    total.appendChild(totalpct);

    tbody.appendChild(row);


}

function getMembers2(dataStatistic) {

    var democrats = [];
    var republicans = [];
    var independents = [];
    var totaldemo = 0;
    var totalrepu = 0;
    var totalinde = 0;

    var missed_votes = [];
    var misses_votes_per = [];

    for (var i = 0; i < dataStatistic.length; i++) {

        if (dataStatistic[i].party == "D") {

            democrats.push(dataStatistic[i]);

        } else if (dataStatistic[i].party == "R") {

            republicans.push(dataStatistic[i]);
        } else {

            independents.push(dataStatistic[i]);

        }

    }


    
    //get the length of each party
    statistics.democrats = democrats.length;
    statistics.republicans = republicans.length;
    statistics.independents = independents.length;
    statistics.total_present = dataStatistic.length;


    for (var i = 0; i < democrats.length; i++) {

        totaldemo = totaldemo + democrats[i].votes_with_party_pct;
    }

    for (var i = 0; i < republicans.length; i++) {

        totalrepu = totalrepu + republicans[i].votes_with_party_pct;

    }

    for (var i = 0; i < independents.length; i++) {

        totalinde = totalinde + independents[i].votes_with_party_pct;
    }


    statistics.total_demo = totaldemo;
    statistics.total_repu = totalrepu;
    statistics.total_inde = totalinde;

    statistics.demo_pct = Math.round(totaldemo / democrats.length);
    statistics.repu_pct = Math.round(totalrepu / republicans.length);
    statistics.inde_pct = Math.round(totalinde / independents.length);


    statistics.votes_with_party_pct = Math.round((statistics.total_demo + statistics.total_repu + statistics.total_inde) / statistics.total_present);


    createTable4();

}


/*Get the average of each party, identificar el 10% los miembros que menos votan or su partido y todos los miembros que tengan el mismo valor del ultimo del array que contiene el 10%*/



function least_loyal(dataSenate) {
var tenPercenNum = Math.round((dataSenate.length * 10) / 100);
    var least_loyal_party = [];

    var votes_pct_loyal = dataSenate.sort(function (a, b) {

        return b.votes_with_party_pct - a.votes_with_party_pct;

    });

    console.log(tenPercenNum);

    for (var i = 0; i < tenPercenNum; i++) {

        least_loyal_party.push(votes_pct_loyal[i]);

    }

    for (var i = least_loyal_party.length; i < dataSenate.length; i++) {


        if (least_loyal_party[least_loyal_party.length - 1].votes_with_party_pct == data.results[0].members[i].votes_with_party_pct) {

            least_loyal_party.push(dataSenate[i]);

        }

    }
    console.log(least_loyal_party);
    createTable2(least_loyal_party, "senate-party");
}




function most_loyal(dataSenate) {
var tenPercenNum = Math.round((dataSenate.length * 10) / 100);
    var most_loyal_party = [];

    var votes_most_loyal = dataSenate.sort(function (a, b) {


        return a.votes_with_party_pct - b.votes_with_party_pct;


    });

    for (var i = 0; i < tenPercenNum; i++) {

        most_loyal_party.push(votes_most_loyal[i]);
    }

    console.log(tenPercenNum);
    console.log(most_loyal_party);



    for (var i = most_loyal_party.length; i < data.results[0].members.length; i++) {

        if (most_loyal_party[most_loyal_party.length - 1].votes_with_party_pct == data.results[0].members[i].votes_with_party_pct) {

            most_loyal_party.push(data.results[0].members[i]);
        }

    }
    createTable2(most_loyal_party, "senate-partyMost");
}
