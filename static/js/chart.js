var create_data = document.getElementById('auction_end_data').innerText;
var end_data = document.getElementById('data').innerText;
//
// console.log(create_data)
// console.log(end_data)

create_instance = JSON.parse(create_data)
end_instance = JSON.parse(end_data)

create_instance = create_instance['data']
end_instance = end_instance['data']

console.log(create_instance)
console.log(end_instance)


dict = {}


var i;
for(i=0;i<create_instance.length;i++)
{
  d = {};
  d["day"] = create_instance[i]['day'];
  d["create"] = create_instance[i]['count'];
  d["end"] = 0;
  dict[create_instance[i]['day']] = d;
}


for(i=0;i<end_instance.length;i++)
{
  d = {};
  if( end_instance[i]['day'] in dict){
    dict[end_instance[i]['day']]['end'] = end_instance[i]['count']
  }
  else{
    d['day'] = end_instance[i]['day'];
    d['create'] = 0;
    d['end'] = end_instance[i]['count'];
    dict[end_instance[i]['day']] = d;
  }
}

data_list = []

for(var key in dict) {
    if(dict.hasOwnProperty(key)) {
        data_list.push(dict[key])
    }
}

// console.log(data_list)
//
// console.log(data_list)
//
// console.log( data_list[0]['day'])
// console.log(typeof data_list[0]['day'])


am4core.ready(function() {
am4core.useTheme(am4themes_animated);
var chart = am4core.create("chartdiv", am4charts.XYChart);

chart.data = data_list;

// Create axes
var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "day";
categoryAxis.numberFormatter.numberFormat = "#";
categoryAxis.renderer.inversed = true;
categoryAxis.renderer.grid.template.location = 0;
categoryAxis.renderer.cellStartLocation = 0.1;
categoryAxis.renderer.cellEndLocation = 0.9;

var  valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
valueAxis.renderer.opposite = true;

// Create series
function createSeries(field, name) {
  var series = chart.series.push(new am4charts.ColumnSeries());
  series.dataFields.valueX = field;
  series.dataFields.categoryY = "day";
  series.name = name;
  series.columns.template.tooltipText = "{name}: [bold]{valueX}[/]";
  series.columns.template.height = am4core.percent(100);
  series.sequencedInterpolation = true;

  var valueLabel = series.bullets.push(new am4charts.LabelBullet());
  valueLabel.label.text = "{valueX}";
  valueLabel.label.horizontalCenter = "left";
  valueLabel.label.dx = 10;
  valueLabel.label.hideOversized = false;
  valueLabel.label.truncate = false;

  var categoryLabel = series.bullets.push(new am4charts.LabelBullet());
  categoryLabel.label.text = "{name}";
  categoryLabel.label.horizontalCenter = "right";
  categoryLabel.label.dx = -10;
  categoryLabel.label.fill = am4core.color("#fff");
  categoryLabel.label.hideOversized = false;
  categoryLabel.label.truncate = false;
}

createSeries("create", "Create");
createSeries("end", "End");

}); // end am4core.ready()
