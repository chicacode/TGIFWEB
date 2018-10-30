//Scope
var data;
var dataHouse;
var filters;
var valueArrayH = [];
var dataHouSta;

var statistics = {

    democrats: 0,
    republics: 0,
    independents: 0,
    total_present: 0,
    missed_votes: 0,
    missed_votes_pct: 0,
    votes_with_party_pct: 0,
    total_votes: 0,
    total_demo: 0,
    total_repu: 0,
    total_inde: 0

};
console.log(statistics);

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
    dataHouse = data.results[0].members;
    console.log(dataHouse);
    dataHouSta = data.results[0].members;
    console.log(dataHouSta);
    fileHouse = document.getElementById("houseD");
    console.log(fileHouse);
    
    if(fileHouse){
        createTable(dataHouse);
        getStates(dataHouse);
        houseListener();
        
        
    }else if(file_atten_house = document.getElementById("house_attendance")){
        console.log(file_atten_house);
        getMembers(dataHouSta);
        least_engaged(dataHouSta);
        most_engaged(dataHouSta);
    
    }else{
        console.log("ELSE");
        getMembers2(dataHouSta);
        least_loyal(dataHouSta);
        most_loyal(dataHouSta);
    }

}).catch(function(error){ 
            
    console.log("requested faile: " + error.message);
            });
    
 console.log(data);

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

    var filters = [];
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
function houseListener(){
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

}

function createTable1() {


    var tbody = document.getElementById("bodyhouse");

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

    totalpct.textContent = (statistics.votes_with_party_pct + " " + "%");

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

        pct_missed_v.textContent = leastMost[i].votes_with_party_pct + " " + "%";

        row.appendChild(pct_missed_v);

        tbody.appendChild(row);

    }

}



function getMembers(dataHouSta) {

    var democrats = [];
    var republicans = [];
    var independents = [];
    var totaldemo = 0;
    var totalrepu = 0;
    var totalinde = 0;

    for (var i = 0; i < dataHouSta.length; i++) {

        if (dataHouSta[i].party === "D") {

            democrats.push(dataHouSta[i]);

            //totaldemo = dataHouSta[i].votes_with_party_pct + totaldemo;



        } else if (dataHouSta[i].party === "R") {

            republicans.push(dataHouSta[i]);
            //totalrepu = dataHouSta[i].votes_with_party_pct + totalrepu;

        } else {
            independents.push(dataHouSta[i]);


        }

    }

    for (var i = 0; i < democrats.length; i++) {

        totaldemo = totaldemo + democrats[i].votes_with_party_pct;
    }

    for (var i = 0; i < republicans.length; i++) {
        totalrepu = totalrepu + republicans[i].votes_with_party_pct;
    }


    statistics.democrats = democrats.length;
    statistics.republicans = republicans.length;
    statistics.independents = independents.length;
    statistics.total_present = dataHouSta.length;



    statistics.total_demo = totaldemo;
    console.log(totaldemo)
    statistics.total_repu = totalrepu;
    console.log(totalrepu)

    statistics.demo_pct = Math.round(totaldemo / democrats.length);
    statistics.repu_pct = Math.round(totalrepu / republicans.length);
    statistics.inde_pct = independents.length;



    statistics.votes_with_party_pct = Math.round((statistics.total_demo + statistics.total_repu) / statistics.total_present);

    createTable1();


}

var missed_votess;

function least_engaged(dataHouSta) {
    var tenPercenNum = Math.round((data.results[0].members.length * 10) / 100);
    var least_engaged_member = [];

    var missed_votess = dataHouSta.sort(function (a, b) {

        return b.missed_votes_pct - a.missed_votes_pct;

    });

    console.log(tenPercenNum);

    for (var i = 0; i < tenPercenNum; i++) {
        console.log(i);
        least_engaged_member.push(missed_votess[i]);

    }
    console.log(least_engaged_member);



    for (var i = least_engaged_member.length; i < dataHouSta.length; i++) {

        if (least_engaged_member[least_engaged_member.length - 1].missed_votes_pct == data.results[0].members[i].missed_votes_pct) {

            least_engaged_member.push(dataHouSta[i]);

        }

    }
    createTable2(least_engaged_member, "least-engaged");
}

var most_votes;

function most_engaged(dataHouse) {
    var tenPercenNum = Math.round((data.results[0].members.length * 10) / 100);
    var most_engaged_members = [];

    var most_votes = dataHouSta.sort(function (a, b) {

        return a.missed_votes_pct - b.missed_votes_pct;

    });


    for (var i = 0; i < tenPercenNum; i++) {

        most_engaged_members.push(most_votes[i]);

    }


    for (var i = most_engaged_members.length; i < dataHouSta.length; i++) {

        if (most_engaged_members[most_engaged_members.length - 1].missed_votes_pct == data.results[0].members[i].missed_votes_pct) {

            most_engaged_members.push(dataHouSta[i]);
        }

    }

   createTable2(most_engaged_members, "most_engagedtable");
}


function createTable4() {

    var tbody = document.getElementById("houseparty");

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
    colipct.textContent = statistics.inde_pct +" " + "%";

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


function getMembers2(dataHouSta) {

    var democrats = [];
    var republicans = [];
    var independents = [];
    var totaldemo = 0;
    var totalrepu = 0;
    var totalinde = 0;

    var missed_votes = [];
    var misses_votes_per = [];

    for (var i = 0; i < dataHouSta.length; i++) {

        if (dataHouSta[i].party == "D") {

            democrats.push(dataHouSta[i]);

        } else if (dataHouSta[i].party == "R") {

            republicans.push(dataHouSta[i]);
        } else {

            independents.push(dataHouSta[i]);

        }

    }

    statistics.democrats = democrats.length;
    statistics.republicans = republicans.length;
    statistics.independents = independents.length;
    statistics.total_present = dataHouSta.length;

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


    statistics.votes_with_party_pct = Math.round((statistics.total_demo + statistics.total_repu) / statistics.total_present);


    createTable4();

}


function least_loyal(dataHouSta) {
    var tenPercenNum = Math.round((data.results[0].members.length * 10) / 100);
    var least_loyal_party = [];

    var votes_pct_loyal = dataHouSta.sort(function (a, b) {

        return b.votes_with_party_pct - a.votes_with_party_pct;
    });

    console.log(tenPercenNum);

    for (var i = 0; i < tenPercenNum; i++) {

        least_loyal_party.push(votes_pct_loyal[i]);

    }
    for (var i = least_loyal_party.length; i < dataHouSta.length; i++) {
        if (least_loyal_party[least_loyal_party.length - 1].votes_with_party_pct == dataHouSta[i].votes_with_party_pct) {
            least_loyal_party.push(dataHouSta[i]);
        }
    }

    createTable2(least_loyal_party, "leastLoyalparty");

}


function most_loyal(dataHouSta) {
    var tenPercenNum = Math.round((data.results[0].members.length * 10) / 100);
    var most_loyal_party = [];

    var votes_most_loyal = dataHouSta.sort(function (a, b) {


        return a.votes_with_party_pct - b.votes_with_party_pct;


    });

    for (var i = 0; i < tenPercenNum; i++) {

        most_loyal_party.push(votes_most_loyal[i]);
    }

    for (var i = most_loyal_party.length; i < dataHouSta.length; i++) {

        if (most_loyal_party[most_loyal_party.length - 1].votes_with_party_pct == dataHouSta[i].votes_with_party_pct) {

            most_loyal_party.push(dataHouSta[i]);


        }


    }

    createTable2(most_loyal_party, "mostLoyalparty");

}
