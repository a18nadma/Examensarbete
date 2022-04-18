// ==UserScript==
// @name         performance test
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://wwwlab.iit.his.se/a18nadma/Examensarbete/settings.html
// @icon         https://www.google.com/s2/favicons?domain=his.se
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var startingTime
    var RunsDone;
    var measurements = new Array();
    var totalRuns = 100;

    // If measurement data exists in localSorage we save it to a java array
    if (localStorage.getItem('Measurements') !== null){
        measurements = JSON.parse(localStorage.Measurements);
    }
    if (localStorage.getItem('TimesRunCounter') !== null ){
        RunsDone = parseInt(localStorage.getItem('TimesRunCounter'));
        localStorage.setItem('TimesRunCounter', ++RunsDone);
    }else {
        RunsDone = 1;
        localStorage.setItem('TimesRunCounter', RunsDone);
    }
    if(RunsDone <= totalRuns){
        // Wait until the page has loaded
        window.onload = function (){
            var endTime = new Date().getTime();
            //calculate the loading time
            var deltaTime = endTime-parseInt(localStorage.StartTime);
            if(RunsDone > 1){
                measurements.push(deltaTime);
            }
            // save the array of loading time in localStorage
            localStorage.setItem('Measurements', JSON.stringify(measurements));
            console.log(deltaTime);
        }();
        startingTime = new Date().getTime();
        localStorage.setItem('StartTime', startingTime);
        window.location.reload();
    }
    //add loading time when done.
    if(RunsDone == totalRuns+1){
        var timeString = "";
        measurements.forEach(makeString)
        function makeString(item){
            timeString += item + " ";
        }
        // Remove: "userscript.html?name=Measurer.user.js&id=b8468125-4281-4f81-a3e1-550e91abfa35:67"
        console.log(timeString);
    }

})();