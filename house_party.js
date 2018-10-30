var data;
var dataHouSta;


var statistics = {
    
    democrats: 0,
    republics: 0,
    independents: 0,
    total_present: 0,
    votes_with_party_pct:0,
    total_demo: 0,
    total_repu: 0,
    total_inde: 0,
    total_votes: 0,  
    demo_pct: 0,
    repu_pct: 0,
    inde_pct: 0
};


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
    dataHouSta = data.results[0].members;
    console.log(dataHouSta);
    
    getMembers(dataHouSta);
    

function createTable1() {

    var tbody = document.getElementById("houseparty");

    var row = document.createElement("tr");

    var coldemo = document.createElement("tr");

    coldemo.textContent = "Democrats"

    row.appendChild(coldemo);

    var colde = document.createElement("td");

    colde.textContent = statistics.democrats;

    coldemo.appendChild(colde);

    var coldepct = document.createElement("td");
    coldepct.textContent = statistics.demo_pct+" "+"%";

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


function createTable2(leastLoyal) {

    var tbody = document.getElementById("leastLoyalparty");

    for (var i = 0; i < leastLoyal.length; i++) {

        var row = document.createElement("tr");

        var fullname = document.createElement("td");

        var link = document.createElement("a");

        link.setAttribute("href", leastLoyal[i].url);
        link.target = "_blank";
        
        if (leastLoyal[i].middle_name == null) {

            leastLoyal[i].middle_name = "";
        }

       link.textContent = leastLoyal[i].last_name + " " + leastLoyal[i].first_name+" "+leastLoyal[i].middle_name;
   
        fullname.appendChild(link);

        row.appendChild(fullname);

        var number_missedVotes = document.createElement("td");

        number_missedVotes.textContent = leastLoyal[i].missed_votes;
       

        row.appendChild(number_missedVotes);

        var pct_missed_v = document.createElement("td");

        pct_missed_v.textContent = leastLoyal[i].missed_votes_pct+" "+"%";

        row.appendChild(pct_missed_v);

        tbody.appendChild(row);

    }

}

function createTable3(mostLoyal) {

    var tbody = document.getElementById("mostLoyalparty");

    for (var i = 0; i < mostLoyal.length; i++) {
        var row = document.createElement("tr");

        var fullname = document.createElement("td");

        var link = document.createElement("a");

        link.setAttribute("href", mostLoyal[i].url);
        link.target = "_blank";
        
        if (mostLoyal[i].middle_name == null) {

            mostLoyal[i].middle_name = "";
        }

        link.textContent = mostLoyal[i].last_name + " " + mostLoyal[i].first_name+" "+ mostLoyal[i].middle_name;

        fullname.appendChild(link);

        row.appendChild(fullname);

        var number_missedVotes = document.createElement("td");

        number_missedVotes.textContent = mostLoyal[i].missed_votes;

        row.appendChild(number_missedVotes);

        var pct_missed_v = document.createElement("td");

        pct_missed_v.textContent = mostLoyal[i].missed_votes_pct+" "+"%";

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
    var name = [];
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
    //statistics.inde_pct = Math.round(totalinde / independents.length);


    statistics.votes_with_party_pct = Math.round((statistics.total_demo + statistics.total_repu) / statistics.total_present);
    
    
    createTable1();

}
var tenPercenNum = Math.round((data.results[0].members.length * 10) / 100);
    
//call the function
least_loyal(dataHouSta);

function least_loyal(dataHouSta){
    
   var least_loyal_party = []; 
    
    var votes_pct_loyal = dataHouSta.sort(function(a,b){
        
        return b.votes_with_party_pct  - a.votes_with_party_pct;
    });
    
   console.log(tenPercenNum); 
    
    for (var i = 0; i < tenPercenNum; i++){
        
 least_loyal_party.push(votes_pct_loyal[i]);
        
    }    
  for(var i=least_loyal_party.length; i < dataHouSta.length; i++){
     if(least_loyal_party[least_loyal_party.length-1].votes_with_party_pct == dataHouSta[i].votes_with_party_pct)
      {
 least_loyal_party.push(dataHouSta[i]); 
      }
  }
    
  createTable2(least_loyal_party); 
    
}


most_loyal(dataHouSta);
function most_loyal(dataHouSta){
    
    var most_loyal_party = [];
    
 var votes_most_loyal = dataHouSta.sort(function(a,b){
        
        
       return a.votes_with_party_pct - b.votes_with_party_pct; 
        
        
    });
    
    for(var i=0; i < tenPercenNum; i++){
        
most_loyal_party.push(votes_most_loyal[i]);
    }
    
   for(var i= most_loyal_party.length; i<dataHouSta.length;i++){
       
       if(most_loyal_party[most_loyal_party.length-1].votes_with_party_pct == dataHouSta[i].votes_with_party_pct){
           
     most_loyal_party.push(dataHouSta[i]);   
           
           
       }
       
       
   }
          
    createTable3(most_loyal_party);
       
   }
    });