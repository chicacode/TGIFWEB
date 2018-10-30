var data;
var dataStatistic;

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
    console.log(data);
    dataStatistic = data.results[0].members;
    console.log(dataStatistic);
    getMembers(dataStatistic);

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
    coldepct.textContent = statistics.demo_pct +" "+"%";
  
    coldemo.appendChild(coldepct);

    var colrepu = document.createElement("tr");

    colrepu.textContent = "Republicans";

    row.appendChild(colrepu);

    var colre = document.createElement("td");
    colre.textContent = statistics.republicans;

    colrepu.appendChild(colre);

    var colrepct = document.createElement("td");
    colrepct.textContent = statistics.repu_pct+" "+"%";

    colrepu.appendChild(colrepct);
    
    var colinde = document.createElement("tr");

    colinde.textContent = "Independents";

    row.appendChild(colinde);

    var coli = document.createElement("td");
    coli.textContent = statistics.independents;

    colinde.appendChild(coli);

    var colipct = document.createElement("td");
    colipct.textContent = statistics.inde_pct+" "+"%";

    colinde.appendChild(colipct);


    var total = document.createElement("tr");

    total.textContent = "Total";

    row.appendChild(total);

    var totalmembers = document.createElement("td");

    totalmembers.textContent = statistics.total_present;

    total.appendChild(totalmembers);

    var totalpct = document.createElement("td");

    totalpct.textContent = statistics.votes_with_party_pct+" "+"%";

    total.appendChild(totalpct);

    tbody.appendChild(row);

    
}

function createTable2(leastEngaged) {

    var tbody = document.getElementById("least_engaged");

    for (var i = 0; i < leastEngaged.length; i++) {

        var row = document.createElement("tr");

        var fullname = document.createElement("td");

        var link = document.createElement("a");

        link.setAttribute("href", leastEngaged[i].url);
        link.target = "_blank";
        
        
         if (leastEngaged[i].middle_name == null) {

            leastEngaged[i].middle_name = "";
        }
        
       link.textContent = leastEngaged[i].last_name+ " "+ leastEngaged[i].first_name+ " "+ leastEngaged[i].middle_name;
   
        fullname.appendChild(link);

        row.appendChild(fullname);

        var number_missedVotes = document.createElement("td");

        number_missedVotes.textContent = leastEngaged[i].missed_votes;
       

        row.appendChild(number_missedVotes);

        var pct_missed_v = document.createElement("td");

        pct_missed_v.textContent = leastEngaged[i].missed_votes_pct +" "+"%";

        row.appendChild(pct_missed_v);

        tbody.appendChild(row);

    }

}

function createTable3(mostEngaged) {

    var tbody = document.getElementById("most_engagedtable");

    for (var i = 0; i < mostEngaged.length; i++) {
        var row = document.createElement("tr");

        var fullname = document.createElement("td");

        var link = document.createElement("a");

        link.setAttribute("href", mostEngaged[i].url);
        link.target = "_blank";
        
        
         if (mostEngaged[i].middle_name == null) {

            mostEngaged[i].middle_name = "";
        }

        link.textContent = mostEngaged[i].last_name + " " + mostEngaged[i].first_name+" "+mostEngaged[i].middle_name;

        fullname.appendChild(link);

        row.appendChild(fullname);

        var number_missedVotes = document.createElement("td");

        number_missedVotes.textContent = mostEngaged[i].missed_votes;

        row.appendChild(number_missedVotes);

        var pct_missed_v = document.createElement("td");

        pct_missed_v.textContent = mostEngaged[i].missed_votes_pct +" "+"%";

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

            //totaldemo = members[i].votes_with_party_pct + totaldemo;
            //totaldemo += members[i].votes_with_party_pct;
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

var tenPercenNum = Math.round((data.results[0].members.length * 10) / 100);

var least_engaged_member = [];
least_engaged(dataStatistic);

    
function least_engaged(dataStatistic) {

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

    

    for (var i = least_engaged_member.length ; i < dataStatistic.length; i++) {
        console.log(i);
        //hacer un loop for para recorrer el array pequeño con el grande y compararlo
        
        if (least_engaged_member[least_engaged_member.length-1].missed_votes_pct == data.results[0].members[i].missed_votes_pct){

        least_engaged_member.push(dataStatistic[i]);
            console.log(least_engaged_member);
         
        }

    }

   
    createTable2(least_engaged_member);

}

most_engaged(dataStatistic);
var most_votes;
function most_engaged(dataStatistic) {
    var most_engaged_members = [];

    var most_votes = dataStatistic.sort(function (a, b) {

        return a.missed_votes_pct - b.missed_votes_pct;

    });

    for (var i = 0; i < tenPercenNum; i++) {

        most_engaged_members.push(most_votes[i]);

    }
    

    for (var i = most_engaged_members.length; i < dataStatistic.length; i++) {

if (most_engaged_members[most_engaged_members.length-1].missed_votes_pct == data.results[0].members[i].missed_votes_pct) {

    most_engaged_members.push(dataStatistic[i]);
    console.log(most_engaged_members);
     
        }

    }


    createTable3(most_engaged_members);

}
});
