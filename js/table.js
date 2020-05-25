if(window.localStorage.getItem("isLoggedIn") == 1)
      {
        if(window.localStorage.getItem("sessionId") == undefined){
    alert("Plese select session")

      }
      else
      {


    const databaseUrl = "https://studev.groept.be/api/a19fire4/getsensordata/"+window.localStorage.getItem("sessionId");
    var json_obj;
    var maxValue = 0;
    var table;
    function retrievData() {
        fetch(databaseUrl)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
      json_obj = data;
      for (counter = 0; counter < json_obj.length; counter++) {
          if (parseInt(json_obj[counter].value) > maxValue) {
            maxValue = parseInt(json_obj[counter].value);
          }
    }
   
    return json_obj;
  })
  .then((json_obj) => {
      //create Tabulator on DOM element with id "example-table"
    table = new Tabulator("#example-table", {
    height:800, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
    data:json_obj, //assign data to table
    layout:"fitColumns", //fit columns to width of table (optional)
    columns:[ //Define Table Columns
        {title:"Simulation Id", field:"sim_id", hozAlign:"center", width:150, headerFilter:true},
        {title:"Sensor Id", field:"sensor_id", hozAlign:"center", headerFilter:true},
        {title:"Time", field:"time", hozAlign:"center"},
        {title:"Value", field:"value", hozAlign:"center" },
        {title:"Value Graphical", field:"value", hozAlign:"center", formatter:"progress", formatterParams:{
            min:0,
            max:maxValue,
            color:["green", "orange", "red"],
            legendColor:"#000000",
            legendAlign:"left",
        }},
    ],
    rowClick:function(e, row){ //trigger an alert message when the row is clicked
        alert("Row " + row.getData().data_id + " Clicked!!!!     "+"Simulation Id = "+row.getData().sim_id+
        "     Sensor Id = "+row.getData().sensor_id+"     Time = "+row.getData().time
        +"     Heat = "+row.getData().value);
    },
});

  })
  
  .then((dataChanged) => { 
////


  });
  };
  retrievData();

  //trigger download of data.csv file
document.getElementById("download-csv").addEventListener("click", function(){
    table.download("csv", "data.csv");
});

//trigger download of data.json file
document.getElementById("download-json").addEventListener("click", function(){
    table.download("json", "data.json");
});

//trigger download of data.xlsx file
document.getElementById("download-xlsx").addEventListener("click", function(){
    table.download("xlsx", "data.xlsx", {sheetName:"My Data"});
});

//trigger download of data.pdf file
document.getElementById("download-pdf").addEventListener("click", function(){
    table.download("pdf", "data.pdf", {
        orientation:"portrait", //set page orientation to portrait
        title:"Simulation Report", //add title to report
    });
});

//trigger download of data.html file
document.getElementById("download-html").addEventListener("click", function(){
    table.download("html", "data.html", {style:true});
});

}
}
  else
  {
    alert("Plese first login");
  }
