
//Set global variables
var width = 800,
    height = 400,
    barWidth = width/275;

//set tooltip?
var tooltip = d3.select(".chart").append("div")
                .attr("id", "tooltip")
                .style("opacity", 0);

//set overlay?
var overlay = d3.select(".chart").append("div")
                .attr("class", "overlay")
                .style("opacity", 0);

//set svg container
var svgContainer = d3.select(".chart").append("svg")
                     .attr("width", width + 100)
                     .attr("height", height + 60)

//fetch json data
d3.json("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json",
function(err, data) {

   //set y-axis description text?

   //set chart footer info text?

   //create array of year-Quater mapping from data for ToolTip
   var yearsQuaters = data.data.map(function(item) {
     var quater;
     var month = item[0].substring(5, 7);

     switch (month) {
       case '01':
         quarter = "Q1";
         break;
       case '04':
         quarter = "Q2";
         break;
       case '07':
         quarter = "Q3";
         break;
       case '10':
         quarter = "Q4";
         break;
     }

     return item[0].substring(0, 4) + ' ' + quarter;
   });
   //create array of year as ints for x-axis
   var yearsDigits = yearsQuaters.map(function(item){
     return item.substring(0, 4);
   });

   //set xScale
   var xScale = d3.scaleLinear()
                  .domain([d3.min(yearsDigits), d3.max(yearsDigits)])
                  .range([0, width]);
   //set xAxis
   var xAxis = d3.axisBottom()
                 .scale(xScale)
                 .tickFormat(d3.format("d"))
   //set xAxis Group
   var xAxisGroup = svgContainer.append("g")
                                .call(xAxis)
                                .attr("id", "x-axis")
                                .attr('transform', 'translate(60, 400)');

   //create array of GDPs for y-axis
   var GDP = data.data.map(function(item){
     return item[1];
   });
   //get min & max from GDP array
   var minGDP = d3.min(GDP);
   var maxGDP = d3.max(GDP);
   //set scale for y-axis
   var yScale = d3.scaleLinear()
                  .domain([minGDP, maxGDP])
                  .range([(minGDP/maxGDP)*height, height]);
   //set yAxis
   var yAxis = d3.axisLeft(yScale);
   //set yAxisGroup
   
   //add bars to Chart
   //add effects for tooltips and overlays

   console.log(data);

});
