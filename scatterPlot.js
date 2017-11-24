/*requirejs.config({
    shim: {
      //Load d3 library before bullet.js
      //Only seems to work when extension name is hard coded
        "extensions/scatterPlotExt/dragit": ["extensions/scatterPlotExt/d3.v3.min"]
    }
});
*/
define([
		"jquery",
		'qlik',
		"text!./scatterCss.css",
		"/extensions/scatterPlot/d3.v3.min.js",
		"/extensions/scatterPlot/d3Utils.js",
		"text!./dragit.css",
		"/extensions/scatterPlot/nationjson.js",
		"/extensions/scatterPlot/dragit.js"], 
	function($,qlik, cssContent) {
    $("<style>").html(cssContent).appendTo("head");
    return {
        initialProperties: {
            version: 1.1,
            qHyperCubeDef: {
                qDimensions: [],
                qMeasures: [],
                qInitialDataFetch: [{
                    qWidth: 15,
                    qHeight: 200
                }]
            }
        },
        definition: {
            type: "items",
            component: "accordion",
            items: {
                dimensions: {
                    uses: "dimensions",
                    min: 1,
                    max: 2
                },
                measures: {
                    uses: "measures",
                    min: 2,
                    max: 3
				},
                sorting: {
                    uses: "sorting"
                },
                settings: {
                    uses: "settings"
                }
            }
        },
        snapshot: {
            canTakeSnapshot: true
        },
		
paint: function($element, layout) {
// Various accessors that specify the four dimensions of data to visualize.
/*function x(d) { return d.income; }
function y(d) { return d.lifeExpectancy; }
function radius(d) { return d.population; }
function color(d) { return d.region; }
*/
var mes1 = (layout.qHyperCube.qMeasureInfo[0].qFallbackTitle).toLowerCase();
var mes2 = (layout.qHyperCube.qMeasureInfo[1].qFallbackTitle).toLowerCase();
var mes3 = (layout.qHyperCube.qMeasureInfo[2].qFallbackTitle).toLowerCase();

function x(d) { 
	if(d[mes1] == 0)
		return 4000;
	return d[mes1]; }
function y(d) { return d[mes2]; }
function radius(d) { return d[mes3]; }
function color(d) { return d.region; }
function key(d) { return d.name; }
var dataSet = layout.qHyperCube.qDataPages[0].qMatrix;
var numDims = layout.qHyperCube.qDimensionInfo.length;
var numMsrs = layout.qHyperCube.qMeasureInfo.length;
var msrInfo = layout.qHyperCube.qMeasureInfo;
/*setTimeout(function() {
    var headID = document.getElementsByTagName("head")[0];         
    var newScript = document.createElement('script');
    newScript.type = 'text/javascript';
    newScript.src = '/extensions/scatterPlot/dragit.js';
    headID.appendChild(newScript);
}, 100);*/

var id = "container_" + layout.qInfo.qId;
// Check to see if the chart element has already been created
if (document.getElementById(id)) {
    // if it has been created, empty it's contents so we can redraw it
    $("#" + id).empty();
}
else {
    // if it hasn't been created, create it with the appropiate id and size
    $element.append($('<div />').attr("id", id).width(width).height(height));
}
// Chart dimensions.
var margin = {top: 19.5, right: 19.5, bottom: 19.5, left: 39.5},
    width = 960 - margin.right,
    height = 500 - margin.top - margin.bottom;
// Various scales. These domains make assumptions of data, naturally.
var maxMinMsr1 = senseD3.getMaxMinMeasure(dataSet,1);
var maxMinMsr2 = senseD3.getMaxMinMeasure(dataSet,2);
var maxMinMsr3 = senseD3.getMaxMinMeasure(dataSet,3);

var xScale = d3.scale.linear().domain([maxMinMsr1.min, maxMinMsr1.max]).range([0, width]),
    yScale = d3.scale.linear().domain([maxMinMsr2.min, maxMinMsr2.max]).range([height, 0]),
    radiusScale = d3.scale.sqrt().domain([maxMinMsr3.min, maxMinMsr3.max]).range([0, 40]),
    colorScale = d3.scale.category10();
// The x & y axes.
var xAxis = d3.svg.axis().orient("bottom").scale(xScale).ticks(12, d3.format(",d")),
    yAxis = d3.svg.axis().scale(yScale).orient("left");
// Create the SVG container and set the origin.
var svg = d3.select("#" + id).append("svg")
    .attr("width", width + margin.left + margin.right + 50)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + (margin.left + 40) + "," + margin.top + ")")
    .attr("class", "gRoot")
// Add the x-axis.
svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);
// Add the y-axis.
svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);
// Add an x-axis label.

svg.append("path")
  .attr("class","axisnew")
  .attr("d","M0,"+height/2+" L"+width+","+height/2);
//y axis
svg.append("path")
  .attr("class","axisnew")
  .attr("d","M"+width/2+",0 L"+width/2+","+height);


svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", height - 6)
    .text(layout.qHyperCube.qMeasureInfo[0].qFallbackTitle);
// Add a y-axis label.
svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", 6)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text(layout.qHyperCube.qMeasureInfo[1].qFallbackTitle);
// Add the year label; the value is set on transition.
var label = svg.append("text")
    .attr("class", "year label")
    .attr("text-anchor", "end")
    .attr("y", height - 24)
    .attr("x", width)
    .text(2013);
// Add the country label; the value is set on transition.
var countrylabel = svg.append("text")
    .attr("class", "country label")
    .attr("text-anchor", "start")
    .attr("y", 80)
    .attr("x", 20)
    .text(" ");
var first_time = true;
// Load the data.
//var nations = nationsJson;
var data = senseD3.createData(dataSet, numDims,msrInfo);
var nations = data;
  // A bisector since many nation's data is sparsely-defined.
  var bisect = d3.bisector(function(d) { return d[0]; });
  // Add a dot per nation. Initialize the data at 1800, and set the colors.
  var dot = svg.append("g")
      .attr("class", "dots")
    .selectAll(".dot")
      .data(interpolateData(2013))// Hardcoded year here
    .enter().append("circle")
      .attr("class", "dot")
      .style("fill", function(d) { return colorScale(color(d)); })
      .call(position)
      .on("mousedow", function(d, i) {
      })
      .on("mouseup", function(d, i) {
        dot.classed("selected", false);
        d3.select(this).classed("selected", !d3.select(this).classed("selected"));
        dragit.trajectory.display(d, i, "selected");
        //TODO: test if has been dragged
        // Look at the state machine history and find a drag event in it?
      })
      .on("mouseenter", function(d, i) {
        clear_demo();
        if(dragit.statemachine.current_state == "idle") {
          dragit.trajectory.display(d, i)
          dragit.utils.animateTrajectory(dragit.trajectory.display(d, i), dragit.time.current, 1000)
          countrylabel.text(d.name);
          dot.style("opacity", .4)
          d3.select(this).style("opacity", 1)
          d3.selectAll(".selected").style("opacity", 1)
        }
      })
      .on("mouseleave", function(d, i) {
        if(dragit.statemachine.current_state == "idle") {
          countrylabel.text("");
          dot.style("opacity", 1);
        }
  
        dragit.trajectory.remove(d, i);
      })
      .call(dragit.object.activate)
  // Add a title.
  dot.append("title")
      .text(function(d) { return d.name; });
  // Start a transition that interpolates the data based on year.
  svg.transition()
      .duration(30000)
      .ease("linear")
  // Positions the dots based on data.
  function position(dot) {
    dot.attr("cx", function(d) { 
			var xScl = xScale(x(d));
			return xScl;
		})
       .attr("cy", function(d) { 
	   		var yScl = yScale(y(d));
	   		return yScl; 
		})
       .attr("r", function(d) { 
	   		var rad = radiusScale(radius(d));
	   		return rad; 
		});
  }
  // Defines a sort order so that the smallest dots are drawn on top.
  function order(a, b) {
    return radius(b) - radius(a);
  }
  // Updates the display to show the specified year.
  function displayYear(year) {
    dot.data(interpolateData(year+dragit.time.min), key).call(position).sort(order);
    label.text(dragit.time.min + Math.round(year));
  }
  // Interpolates the dataset for the given (fractional) year.
 /* function interpolateData(year) {
    return nations.map(function(d) {
      return {
        name: d.name,
        region: d.region,
        income: interpolateValues(d.income, year),
        population: interpolateValues(d.population, year),
        lifeExpectancy: interpolateValues(d.lifeExpectancy, year)
      };
    });
  }*/
  function interpolateData(year) {
    return nations.map(function(d) {
      return {
        name: d.name,
        spend: interpolateValues(d.Spend, year),
        maco: interpolateValues(d.MaCo, year),
        volume: interpolateValues(d.Volume, year)
      };
    });
  }
  // Finds (and possibly interpolates) the value for the specified year.
  function interpolateValues(values, year) {
    var i = bisect.left(values, year, 0, values.length - 1),
        a = values[i];
    if (i > 0) {
      var b = values[i - 1],
          t = (year - a[0]) / (b[0] - a[0]);
      return a[1] * (1 - t) + b[1] * t;
    }
    return a[1];
  }
  
  init();
  function update(v, duration) {
    dragit.time.current = v || dragit.time.current;
    displayYear(dragit.time.current)
    d3.select("#slider-time").property("value", dragit.time.current);
  }
  function init() {
    dragit.init(".gRoot");
    //dragit.time = {min:1800, max:2009, step:1, current:1800} Adil - hardcoded here
	dragit.time = {min:2013, max:2018, step:1, current:2013}
    dragit.data = d3.range(nations.length).map(function() { return Array(); })
    //for(var yy = 1800; yy<2009; yy++) { Adil - hardcoded here
	for(var yy = 2013; yy<2018; yy++) {
      interpolateData(yy).filter(function(d, i) { 
        dragit.data[i][yy-dragit.time.min] = [xScale(x(d)), yScale(y(d))];
      })
    }
    dragit.evt.register("update", update);
    //d3.select("#slider-time").property("value", dragit.time.current);
    d3.select("#slider-time")
      .on("mousemove", function() { 
        update(parseInt(this.value), 500);
        clear_demo();
      })
    var end_effect = function() {
      countrylabel.text("");
      dot.style("opacity", 1)
    }
    dragit.evt.register("dragend", end_effect)
  }
function clear_demo() {
  if(first_time) {
     svg.transition().duration(0);
    first_time = false;
    //window.clearInterval(demo_interval);
    countrylabel.text("");
    dragit.trajectory.removeAll();
    d3.selectAll(".dot").style("opacity", 1)
  }
}
}
};
}
);
