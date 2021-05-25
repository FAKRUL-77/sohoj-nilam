date_data = document.getElementById('auction_by_date').innerText;
datetime_data = document.getElementById('auction_by_datetime').innerText;

date_data = JSON.parse(date_data)
datetime_data = JSON.parse(datetime_data)

date_instance = date_data['data'];
datetime_instance = datetime_data['data'];

final_date_data = []
final_datetime_data = []

var i;
for(i=0;i<date_instance.length; i++)
{
  final_date_data.push([ (date_instance[i]['day']), date_instance[i]['price']])
}

for(i=0;i<datetime_instance.length; i++)
{
  final_datetime_data.push([ (datetime_instance[i]['day']), datetime_instance[i]['price']])
}

dic = {
    'dropdown_date': final_date_data,
    'dropdown_datetime': final_datetime_data,
}

var selected_item

selected_item = final_datetime_data

var chart = anychart.bar();
function dropdownFunction(value)
{
    selected_item = value
    console.log(dic)
    anychart.onDocumentReady(function() {

        var data = {
          header: ["Time", "Auction Value"],
          rows: dic[selected_item]
        };


        chart.data(data);

        chart.container("barChart");
        chart.draw();
    });
}




// $( ".dropdown" ).change(function() {
// 	chart.options.data[0].dataPoints = [];
//   var e = document.getElementById("dd");
// 	var selected = e.options[e.selectedIndex].value;
//   dps = jsonData[selected];
//   for(var i in dps) {
//   	var xVal = dps[i].x;
//     chart.options.data[0].dataPoints.push({x: new Date(xVal), y: dps[i].y});
//   }
//   chart.render();
// });




//
// var jsonData = {
// "dps1": [
//     { "x": "2016-6-25 12:58:52", "y": 10.22 },
//     { "x": "2016-7-25 13:33:23", "y": 11.14 },
//     { "x": "2016-8-25 13:49:18", "y": 13.58 },
//     { "x": "2016-9-25 13:55:01", "y": 15.25 },
//     { "x": "2016-10-25 14:00:15", "y": 17.25 },
// ],
// "dps2": [
//      { "x": "2016-6-25 12:58:52", "y": 19.99 },
//      { "x": "2016-7-25 13:33:23", "y": 21.78 },
//      { "x": "2016-8-25 13:49:18", "y": 23.45 },
//      { "x": "2016-9-25 13:55:01", "y": 24.73 },
//      { "x": "2016-10-25 14:00:15", "y": 26.58 }
// ],
// "dps3": [
//     { "x": "2016-6-25 12:58:52", "y": 27.66 },
//     { "x": "2016-7-25 13:33:23", "y": 28.68 },
//     { "x": "2016-8-25 13:49:18", "y": 30.73 },
//     { "x": "2016-9-25 13:55:01", "y": 32.46 },
//     { "x": "2016-10-25 14:00:15", "y": 34.79 }
// ],
// "dps4": [
//     { "x": "2016-6-25 12:58:52", "y": 10.22 },
//     { "x": "2016-7-25 13:33:23", "y": 11.14 },
//     { "x": "2016-8-25 13:49:18", "y": 15.25 },
//     { "x": "2016-9-25 13:55:01", "y": 19.99 },
//     { "x": "2016-10-25 14:00:15", "y": 21.78 }
// ],
// "dps5": [
//     { "x": "2016-6-25 12:58:52", "y": 24.73 },
//     { "x": "2016-7-25 13:33:23", "y": 26.58 },
//     { "x": "2016-8-25 13:49:18", "y": 27.66 },
//     { "x": "2016-9-25 13:55:01", "y": 28.68 },
//     { "x": "2016-10-25 14:00:15", "y": 32.46 }
// ]}
// var dataPoints = [];
// var chart = new CanvasJS.Chart("chartContainer",
// {
// 	axisX: {
//   	valueFormatString: "D/MM h:mm",
//     intervalType: 'month',
//     interval: 1
//   },
// 	data: [{
//     showInLegend: true,
//     type: 'column',
//     //xValueFormatString:"D MM h:mm",
//     xValueType: "dateTime",
//     showInLegend: true,
//     name: "series1",
//     legendText: "EnergykWh",
//     dataPoints: dataPoints // this should contain only specific serial number data
//
// 	}]
// });
//
// $( ".dropdown" ).change(function() {
// 	chart.options.data[0].dataPoints = [];
//   var e = document.getElementById("dd");
// 	var selected = e.options[e.selectedIndex].value;
//   dps = jsonData[selected];
//   for(var i in dps) {
//   	var xVal = dps[i].x;
//     chart.options.data[0].dataPoints.push({x: new Date(xVal), y: dps[i].y});
//   }
//   chart.render();
// });
//
