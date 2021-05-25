var data = document.getElementById('data').innerText;

Data = JSON.parse(data)
console.log(Data['data'])
instance = Data['data']
console.log(instance)
date = new Date(instance[0]['day']);

am4core.ready(function() {

// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

var chart = am4core.create("chartdiv", am4charts.XYChart);

var data = [];
var value = 50;
for(var i = 0; i < instance.length; i++){
  var date = new Date(instance[i]['day']);
  value = instance[i]['available']

  data.push({date:date, value: value});
}

chart.data = data;


// Create axes
var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
dateAxis.renderer.minGridDistance = 60;

var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

// Create series
var series = chart.series.push(new am4charts.LineSeries());
series.dataFields.valueY = "value";
series.dataFields.dateX = "date";
series.tooltipText = "{value}"

series.tooltip.pointerOrientation = "vertical";

chart.cursor = new am4charts.XYCursor();
chart.cursor.snapToSeries = series;
chart.cursor.xAxis = dateAxis;

chart.scrollbarX = new am4core.Scrollbar();

});