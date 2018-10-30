'use strict'
var data;
var senators;
var states;
var valueArray = [];
var select_all;


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
    app.senators = data.results[0].members;
    app.filters = app.senators;
    console.log(app.senators);

    app.getState();


})

var app = new Vue({

    el: '#vue-app',
    data: {

        senators: [],
        states: [],
        uStates: ["All"],
        menudropdown: "All",
        valueArray: [],
        filters: [],
        filSta: []

    },

    methods: {
        getState: function () {

            for (var i = 0; i < this.senators.length; i++) {
                let state = this.senators[i].state;

                this.states.push(state);

            }

            console.log(this.states);
            this.states.sort();
            console.log(this.states);

            for (var i = 0; i < this.states.length; i++) {

                if (this.states[i] !== this.states[i + 1]) {

                    this.uStates.push(this.states[i]);
                }
            }

            console.log(this.uStates);


        },

        filterParty: function () {

            let filPar = [];

            if (this.valueArray.length == 0) {
                filPar = this.senators;
                
            } else {
                for (var i = 0; i < this.valueArray.length; i++) {

                    for (var j = 0; j < this.senators.length; j++) {

                        if (this.senators[j].party == this.valueArray[i]) {
                            filPar.push(this.senators[j]);
                        }
                    }
                }
            }
            this.filterState(filPar);
            console.log(filPar);


        },

        filterState: function (filPar) {

            let filSta = [];
            let dropdown = this.menudropdown;

            if (dropdown == "All") {
                this.filters = filPar;
            } else {

                for (var i = 0; i < filPar.length; i++) {
                    if (dropdown == filPar[i].state) {

                        filSta.push(filPar[i]);
                    }
                }
                console.log(filSta);
                this.filters = filSta;
            }
        }
    }


});


var repu = document.getElementById("R");

repu.addEventListener("change", function () {


        if (repu.checked == false) {
            for (var i = 0; i < app.valueArray.length; i++) {
                if (app.valueArray[i] == "R") {
                    app.valueArray.splice(i, 1);

                }
            }

        } else {

            app.valueArray.push("R");

        }

        console.log(app.valueArray);
        app.filterParty(app.filters);
    }

);

var demo = document.getElementById("D");
demo.addEventListener("change", function () {

    if (demo.checked == false) {
        for (var i = 0; i < app.valueArray.length; i++) {
            if (app.valueArray[i] == "D") {
                app.valueArray.splice(i, 1);

            }
        }

    } else {
        app.valueArray.push("D");
    }

    console.log(app.valueArray);
    app.filterParty();
});

var inde = document.getElementById("I");

inde.addEventListener("change", function () {

    if (inde.checked == false) {
        for (var i = 0; i < app.valueArray.length; i++) {
            if (app.valueArray[i] == "I") {
                app.valueArray.splice(i, 1); //en la posicion I quitame 1.
            }
        }

    } else {
        app.valueArray.push("I");

    }

    console.log(app.valueArray);
    app.filterParty();

});
