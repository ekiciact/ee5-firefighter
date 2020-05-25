

    function newSensorValue(newURL){
      fetch(newURL, {
            
            method: 'POST', 
          }).then((response) => {
          return response.json();
        })
        .then((data) => {
      
           navDisplay()
          return data;
        }).catch(function (error){
          console.log(error);
          });
      };

      function newSession(newURL){
        fetch(newURL, {
              
              method: 'POST', 
            }).then((response) => {
            return response.json();
          })
          .then((data) => {
        
             navDisplay()
            return data;
          }).catch(function (error){
            console.log(error);
            });
        };


var numberOfData = 0;
var numberOfDataCreated = 0;
var cycleOfData = 1200;
var dataCounter = 0;
var times = 0;
var simulationOn = false;
var d = new Date();
var data = { 
    simid:"0",
    sensorid:"",
    time: "",
    value: ""};
var sessionId = 99;
   

var aq = [];

 var   sensor1Values =210;
 var   sensor2Values =180;
 var   sensor3Values =150;
 var   sensor4Values =130;
 var   sensor5Values =100;
 var   sensor6Values =180;
 var   sensor7Values =170;
 var   sensor8Values =140;
 var   sensor9Values =130;
 var   sensor10Values =110;

function dataProducer(){
  if (simulationOn == true && (numberOfData == 0 || numberOfDataCreated <= numberOfData)) {
    for (let index = 1; index <= 10; index++) {
      
      setTimeout(() => { 
  
      
      data.sensorid = "";
      data.time = "";
      data.value = "";
    
        
        data.sensorid = index;
        data.time = times;

        Math.floor( Math.random() * ( 1 + 200 - 100 ) ) + 100;
  
     switch (index) {
          case 1:
              sensor1Values = Math.floor( Math.random() * ( 1 + 699 - 600 ) ) + 600;
              data.value =  sensor1Values;
            break;
          case 2:
              sensor2Values = Math.floor( Math.random() * ( 1 + 599 - 500 ) ) + 500;
              data.value =  sensor2Values;
            break;
          case 3:
              sensor3Values = Math.floor( Math.random() * ( 1 + 200 - 100 ) ) + 100;
              data.value =  sensor3Values;
            break;
          case 4:
              sensor4Values = Math.floor( Math.random() * ( 1 + 299 - 200 ) ) + 200;
              data.value =  sensor4Values; 
            break;
          case 5:
              sensor5Values = Math.floor( Math.random() * ( 1 + 199 - 100 ) ) + 100;
              data.value =  sensor5Values;
            break;
          case 6:
              sensor6Values = Math.floor( Math.random() * ( 1 + 599 - 500 ) ) + 500;
              data.value =  sensor6Values;
            break;
          case 7:
              sensor7Values = Math.floor( Math.random() * ( 1 + 499 - 400 ) ) + 400;
              data.value =  sensor7Values;
            break;
          case 8:
              sensor8Values = Math.floor( Math.random() * ( 1 + 399 - 300 ) ) + 300;
              data.value =  sensor8Values;
            break;
          case 9:
              sensor9Values = Math.floor( Math.random() * ( 1 + 299 - 200 ) ) + 200;
              data.value =  sensor9Values;  
            break;
          case 10:
              sensor10Values = Math.floor( Math.random() * ( 1 + 199 - 100 ) ) + 100;
              data.value =  sensor10Values;
            break;
        
          default:
        
        };
        var newURL = 'https://studev.groept.be/api/a19fire4/simulation/'+data.simid+"/"+data.sensorid+"/"+data.time+"/"+data.value
        newSensorValue(newURL);
      },index*80);
  } 
  }

};





window.onload = setInterval(function()
{ 
  dataProducer();
  times+=30; 
  numberOfDataCreated++;   
   
}, cycleOfData);

const inputSE = document.getElementById('sessionInput');

inputSE.addEventListener('change', updateSE);

function updateSE(e) {
  sessionId = e.target.value;
  
}


const inputSI = document.getElementById('simidInput');

inputSI.addEventListener('change', updateSI);

function updateSI(e) {
  data.simid = e.target.value;
  
}

const inputNOD = document.getElementById('numberOfData');

inputNOD.addEventListener('change', updateNOD);

function updateNOD(e) {
  numberOfData = e.target.value;
  
}

const inputCOD = document.getElementById('cycleOfData');

inputCOD.addEventListener('change', updateCOD);

function updateCOD(e) {
  cycleOfData = e.target.value;
  
}


function sessionAdd() {
  var newURL = "https://studev.groept.be/api/a19fire4/newsession/"+sessionId;
}



function simulationStart() {
  if (simulationOn) {
    alert("Plese stop the ongoing simulation to start new one")
  } else {
    times=0; 
    numberOfDataCreated = 0;  
    simulationOn = true;
    document.getElementById("simulationText").innerHTML = "<b>Simulation Info: </b><br> Simulation is running."
  }

  }


function simulationStop(){
    if (simulationOn) {
      simulationOn = false;
      var min = Math.floor(numberOfDataCreated*cycleOfData/(60000))
      var sec = Math.floor(numberOfDataCreated*cycleOfData%(60000)/1000);
      document.getElementById("simulationText").innerHTML = "<b>Simulation Info: </b><br> Simulation is succesfully stopped.<br><b>"+numberOfDataCreated+"</b> data is created.<br>Total runtime is <b>"+min+"</b> min.<b>"+sec+"</b> sec.";  
    } else {
      alert("Simulation is not running!!!")
    }
    
  }
