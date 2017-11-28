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
	// To Show the colors for the quadrants
	 var colorOptions = [{
            value: "#FFFF00",
            label: "Yellow" 
        },{
            value: "#000000",
            label: "Black" 
        },{
            value: "#A52A2A",
            label: "Brown" 
        },{
            value: "#D2691E",
            label: "Chocolate" 
        },{
            value: "#FF7F50",
            label: "Coral" 
        },{
            value: "#DC143C",
            label: "Crimson" 
        },{
            value: "#00008B",
            label: "Dark Blue" 
        },{
            value: "#006400",
            label: "Dark Green" 
        },{
            value: "#FF8C00",
            label: "Dark Orange" 
        },{
            value: "#696969",
            label: "Dim Grey" 
        },{
            value: "#B22222",
            label: "Fire Brick" 
        },{
            value: "#228B22",
            label: "Forest Green" 
        },{
            value: "#008000",
            label: "Green" 
        },{
            value: "#808080",
            label: "Grey" 
        },{
            value: "#ADD8E6",
            label: "Light Blue" 
        },{
            value: "#D3D3D3",
            label: "Light Grey" 
        },{
            value: "#00FF00",
            label: "Lime" 
        },{
            value: "#800000",
            label: "Maroon" 
        },{
            value: "#4169E1",
            label: "Royal Blue" 
        },{
			value: "#0080FF",
            label: "blue"
		}]
	 var rectColor1 = {
        ref : "props.rectColor1",
        label : "Quadrant 1",
        type : "string",
        defaultValue: "#FFFF00",
        component: "dropdown",
        options: colorOptions
    };
	var rectColor2 = {
		ref : "props.rectColor2",
        label : "Quadrant 2",
        type : "string",
        defaultValue: "#0080FF",
        component: "dropdown",
        options: colorOptions
	};
	 var rectColor3 = {
        ref : "props.rectColor3",
        label : "Quadrant 3",
        type : "string",
        defaultValue: "#D3D3D3",
        component: "dropdown",
        options: colorOptions
    };
	var rectColor4 = {
		ref : "props.rectColor4",
        label : "Quadrant 4",
        type : "string",
        defaultValue: "#228B22",
        component: "dropdown",
        options: colorOptions
	};
	 var x1posq1 = {ref: "props.x1Posq1",label: "xpos",type: "string",expression: "optional"};
	 var x2posq1 = {ref: "props.x2Posq1",label: "ypos",type: "string",expression: "optional"};
	 var q1height = {ref: "props.q1height",label: "height",type: "string",expression: "optional"};
	 var q1width = {ref: "props.q1width",label: "width",type: "string",expression: "optional"};
	 
	 var x1posq2 = {ref: "props.x1Posq2",label: "xpos",type: "string",expression: "optional"};
	 var x2posq2 = {ref: "props.x2Posq2",label: "ypos",type: "string",expression: "optional"};
	 var q2height = {ref: "props.q2height",label: "height",type: "string",expression: "optional"};
	 var q2width = {ref: "props.q2width",label: "width",type: "string",expression: "optional"};
	 
	 var x1posq3 = {ref: "props.x1Posq3",label: "xpos",type: "string",expression: "optional"};
	 var x2posq3 = {ref: "props.x2Posq3",label: "ypos",type: "string",expression: "optional"};
	 var q3height = {ref: "props.q3height",label: "height",type: "string",expression: "optional"};
	 var q3width = {ref: "props.q3width",label: "width",type: "string",expression: "optional"};
	 
	 var x1posq4 = {ref: "props.x1Posq4",label: "xpos",type: "string",expression: "optional"};
	 var x2posq4 = {ref: "props.x2Posq4",label: "ypos",type: "string",expression: "optional"};
	 var q4height = {ref: "props.q4height",label: "height",type: "string",expression: "optional"};
	 var q4width = {ref: "props.q4width",label: "width",type: "string",expression: "optional"};
	 
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
                }, 
				configuration : {
                    component: "expandable-items",
                    label: "Chart Configuration",
                    items: {
					header1:{
					 type: "items",
					 label: "Change Quadrant Colors",
					 items:{
                         quadrantColor1: {
                            type: "items",
                            label: "Quadrant 1",
                            items: {
                                rectangleColor:            rectColor1
                            }
                        },
						quadrantColor2: {
                            type: "items",
                            label: "Quadrant 2",
                            items: {
                                rectangleColor:            rectColor2
                            }
                        },
                         quadrantColor3: {
                            type: "items",
                            label: "Quadrant 3",
                            items: {
                                rectangleColor:            rectColor3
                            }
                        },
						quadrantColor4: {
                            type: "items",
                            label: "Quadrant 4",
                            items: {
                                rectangleColor:            rectColor4
                            }
                        }
						}
						},
						header2:{
							type: "items",
							label:"Quadrant 1 Positions",
							items: {
							quadrant1:{
								type: "items",
								label: "Quadrant 1 positions",
								items: {
									x1Pos:{
										type: "items",
										label: "x1 Position",
										items: {
										x1Pos: x1posq1
										}
									},
									x2Pos:{
										type: "items",
										label: "x2 Position",
										items: {
										x1Pos: x2posq1
										}
									},
									q1height:{
										type: "items",
										label: "y1 Position",
										items: {
										x1Pos: q1height
										}
									},
									q1width:{
										type: "items",
										label: "y2 Position",
										items: {
										x1Pos: q1width
										}
									}
								}
							}
						}
						},
						header3:{
							type: "items",
							label: "Quadrant 2 Positions",
							items:{
							quadrant1:{
								type: "items",
								label: "Quadrant 2 positions",
								items: {
									x1Pos:{
										type: "items",
										label: "x1 Position",
										items: {
										x1Pos: x1posq2
										}
									},
									x2Pos:{
										type: "items",
										label: "x2 Position",
										items: {
										x1Pos: x2posq2
										}
									},
									q2height:{
										type: "items",
										label: "y1 Position",
										items: {
										x1Pos: q2height
										}
									},
									q2width:{
										type: "items",
										label: "y2 Position",
										items: {
										x1Pos: q2width
										}
									}
								}
							}
						}
						},
						header4:{
							type: "items",
							label: "Quadrant 3 Positions",
							items:{
							quadrant1:{
								type: "items",
								label: "Quadrant 3 positions",
								items: {
									x1Pos:{
										type: "items",
										label: "x1 Position",
										items: {
										x1Pos: x1posq3
										}
									},
									x2Pos:{
										type: "items",
										label: "x2 Position",
										items: {
										x1Pos: x2posq3
										}
									},
									q2height:{
										type: "items",
										label: "y1 Position",
										items: {
										x1Pos: q3height
										}
									},
									q2width:{
										type: "items",
										label: "y2 Position",
										items: {
										x1Pos: q3width
										}
									}
								}
							}
						}
						},
						header5:{
							type: "items",
							label: "Quadrant 4 Positions",
							items:{
							quadrant1:{
								type: "items",
								label: "Quadrant 4 positions",
								items: {
									x1Pos:{
										type: "items",
										label: "x1 Position",
										items: {
										x1Pos: x1posq4
										}
									},
									x2Pos:{
										type: "items",
										label: "x2 Position",
										items: {
										x1Pos: x2posq4
										}
									},
									q2height:{
										type: "items",
										label: "y1 Position",
										items: {
										x1Pos: q4height
										}
									},
									q2width:{
										type: "items",
										label: "y2 Position",
										items: {
										x1Pos: q4width
										}
									}
								}
							}
						}
						}
					}
				}
            }
        },
        snapshot: {
            canTakeSnapshot: true
        },
		
paint: function($element, layout) {

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
var mes1 = (layout.qHyperCube.qMeasureInfo[0].qFallbackTitle).toLowerCase();
var mes2 = (layout.qHyperCube.qMeasureInfo[1].qFallbackTitle).toLowerCase();
var mes3 = (layout.qHyperCube.qMeasureInfo[2].qFallbackTitle).toLowerCase();

function x(d) { 
	if(d[mes1] == 0)
		return 4000;
	return d[mes1]; }
function y(d) { return d[mes2]; }
function radius(d) { return d[mes3]; }
function color(d) { return d.name; }
function key(d) { return d.name; }
var dataSet = layout.qHyperCube.qDataPages[0].qMatrix;
var numDims = layout.qHyperCube.qDimensionInfo.length;
var numMsrs = layout.qHyperCube.qMeasureInfo.length;
var msrInfo = layout.qHyperCube.qMeasureInfo;

// Chart dimensions.
var margin = {top: 19.5, right: 19.5, bottom: 19.5, left: 39.5},
    width = 960 - margin.right,
    height = 500 - margin.top - margin.bottom;
// Various scales. These domains make assumptions of data, naturally.
var maxMinMsr1 = senseD3.getMaxMinMeasure(dataSet,1);
var maxMinMsr2 = senseD3.getMaxMinMeasure(dataSet,2);
var maxMinMsr3 = senseD3.getMaxMinMeasure(dataSet,3);



 var domainwidth = (width - margin.left - margin.right + 50) / 2;
 var domainheight = (height - margin.top - margin.bottom + 40) / 2;


var xScale = d3.scale.linear().domain([maxMinMsr1.min, maxMinMsr1.max]).range([0, width]),
    yScale = d3.scale.linear().domain([maxMinMsr2.min, maxMinMsr2.max]).range([height, 0]),
    radiusScale = d3.scale.sqrt().domain([maxMinMsr3.min, maxMinMsr3.max]).range([0, 40]),
    colorScale = d3.scale.category10();
// The x & y axes.
var xAxis = d3.svg.axis().orient("bottom").scale(xScale).ticks(12, d3.format(",d")),
    yAxis = d3.svg.axis().scale(yScale).orient("left");
	
// Add a tooltip
var div = d3.select("body").append("div")	
	.attr("class", "tooltipDendo")				
	.style("opacity", 0);
// Create the SVG container and set the origin.
var svg = d3.select("#" + id).append("svg")
    .attr("width", width + margin.left + margin.right + 50)
    .attr("height", height + margin.top + margin.bottom + 20)
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
	
	
	var getXPos = d3.scale.linear().domain([maxMinMsr1.min,maxMinMsr1.max]).range([0,domainwidth*2]);
	var getYPos = d3.scale.linear().domain([maxMinMsr2.min,maxMinMsr2.max]).range([0,domainheight*2]);
	
//Build Quadrants
//Quadrant 1
	
svg.append("rect")
    .style("opacity", 0.5)
    .attr("fill", layout.props.rectColor2)
	.attr("x",function(){
		if(layout.props.x1Posq1 == "" || typeof(layout.props.x1Posq1) == "undefined")
			return getXPos(maxMinMsr1.min);
		else
			return getXPos(layout.props.x1Posq1);
		})
	.attr("y",function(){
	if(layout.props.x2Posq1 == "" ||typeof(layout.props.x2Posq1) == "undefined")
		return getYPos(maxMinMsr2.max/2);
	else
		return getYPos(layout.props.x2Posq1);
	})
	.style("stroke", "grey")
	.style("stroke-width",1.5)
	.attr("width", function(){
		if(layout.props.q1width == "" ||typeof(layout.props.q1width) == "undefined")
	 		return domainwidth;
		else
			return getXPos(layout.props.q1width);
		})
    .attr("height", function(){
		if(layout.props.q1height == "" || typeof(layout.props.q1height) == "undefined")
			return domainheight;
		else
			return getYPos(layout.props.q1height)
		});
	
//Quadrant 2
	
svg.append("rect")
    .style("opacity", 0.5)
    .attr("fill", layout.props.rectColor4)
	.attr("x",function(){
		if(layout.props.x1Posq2 == "" || typeof(layout.props.x1Posq2) == "undefined")
			return getXPos(maxMinMsr1.max/2);
		else
			return getXPos(layout.props.x1Posq2);
		})
	.attr("y",function(){
	if(layout.props.x2Posq2 == "" || typeof(layout.props.x2Posq2) == "undefined")
		return getYPos(maxMinMsr2.max/2);
	else
		return getYPos(layout.props.x2Posq2);
	})
	.style("stroke", "grey")
	.style("stroke-width",1.5)
	.attr("width", function(){
		if(layout.props.q2width == "" || typeof(layout.props.q2width) == "undefined")
	 		return domainwidth;
		else
			return getXPos(layout.props.q2width);
		})
    .attr("height", function(){
		if(layout.props.q2height == "" || typeof(layout.props.q2height) == "undefined")
			return domainheight;
		else
			return getYPos(layout.props.q2height)
		});
	

//Quadrant 3
svg.append("rect")
	.style("opacity", 0.3)
    .attr("fill", layout.props.rectColor1)
	.attr("x",function(){
		if(layout.props.x1Posq3 == "" || typeof(layout.props.x1Posq3) == "undefined")
			return getXPos(maxMinMsr1.min);
		else
			return getXPos(layout.props.x1Posq3);
		})
	.attr("y",function(){
	if(layout.props.x2Posq3 == "" || typeof(layout.props.x2Posq3) == "undefined")
		return getYPos(maxMinMsr2.min);
	else
		return getYPos(layout.props.x2Posq3);
	})
	.style("stroke", "grey")
	.style("stroke-width",1.5)
	.attr("width", function(){
		if(layout.props.q3width == "" || typeof(layout.props.q3width) == "undefined")
	 		return domainwidth;
		else
			return getXPos(layout.props.q3width);
		})
    .attr("height", function(){
		if(layout.props.q3height == "" || typeof(layout.props.q3height) == "undefined")
			return domainheight;
		else
			return getYPos(layout.props.q3height)
		});
	
//Quadrant 4

svg.append("rect")
    .style("opacity", 0.5)
    .attr("fill", layout.props.rectColor3)
	.attr("x",function(){
		if(layout.props.x1Posq4 == "" || typeof(layout.props.x1Posq4) == "undefined")
			return getXPos(maxMinMsr1.max/2 );
		else
			return getXPos(layout.props.x1Posq4);
		})
	.attr("y",function(){
	if(layout.props.x2Posq4 == "" || typeof(layout.props.x2Posq4) == "undefined")
		return getYPos(maxMinMsr2.min);
	else
		return getYPos(layout.props.x2Posq4);
	})
	.style("stroke", "grey")
	.style("stroke-width",1.5)
	.attr("width", function(){
		if(layout.props.q4width == "" || typeof(layout.props.q4width) == "undefined")
	 		return domainwidth;
		else
			return getXPos(layout.props.q4width);
		})
    .attr("height", function(){
		if(layout.props.q4height == "" || typeof(layout.props.q4height) == "undefined")
			return domainheight;
		else
			return getYPos(layout.props.q4height)
		});
	


// X- axis label 
svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width/2)
    .attr("y", height + 35)
	.style("font-size",20)
	.style("fill", "black")
    .text(layout.qHyperCube.qMeasureInfo[0].qFallbackTitle);
// Add a Y - Axis label.
svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", -60)
	.attr("x",-domainheight)
	.style("font-size",20)
	.style("fill", "black")
    //.attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text(layout.qHyperCube.qMeasureInfo[1].qFallbackTitle);
// Add the year label; the value is set on transition.
var label = svg.append("text")
    .attr("class", "year label")
    .attr("text-anchor", "end")
    .attr("y", height - 24)
    .attr("x", width - 10)
    .text(2013);
// Add the country label; the value is set on transition.
var countrylabel = svg.append("text")
    .attr("class", "country label")
    .attr("text-anchor", "start")
    .attr("y", 80)
    .attr("x", 15)
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
	 .on("mouseover", function(d) {
	  					var spend = d.spend;
	  					var maco = d.maco;         
						var volume = d.volume;
						div.transition()        
					.duration(200)      
					.style("opacity", .9)
            		div.html("<br/> Spend: " + spend + "<br>" + " MaCo: " + maco + "<br/>" + " Volume: " + volume)
					.style("left", (d3.event.pageX) + "px")    //Set X  
         			.style("top", (d3.event.pageY) + "px"); 
					})
				.on("mouseout", function(d) {		
            	  div.transition()		
				  .duration(500)		
				  .style("opacity", 0)
				  })

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
