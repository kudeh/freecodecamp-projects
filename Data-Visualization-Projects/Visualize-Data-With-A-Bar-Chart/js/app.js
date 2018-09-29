
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
   svgContainer.append('text')
    .attr('transform', 'rotate(-90)')
    .attr('x', -200)
    .attr('y', 15)
    .text('GDP')
    .attr('class', 'axis-label-title');

    //set y-axis description text?
    svgContainer.append('text')
     .attr('x', width/2)
     .attr('y', height+35)
     .text('Year Quarter')
     .attr('class', 'axis-label-title');

   //set chart footer info text?
   svgContainer.append('text')
    .attr('x', width/2 + 120)
    .attr('y', height + 50)
    .text('More Information: http://www.bea.gov/national/pdf/nipaguid.pdf')
    .attr('class', 'info');

   //create array of year-Quater mapping from data for ToolTip
   var yearsQuarters = data.data.map(function(item) {
     var quarter;
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
   var yearsDigits = yearsQuarters.map(function(item){
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
   //scaleGDP values
   var linearScale = d3.scaleLinear()
    .domain([minGDP, maxGDP])
    .range([(minGDP/maxGDP) * height, height]);

   var scaledGDP = GDP.map(function(item) {
       return linearScale(item);
   });
   //set scale for y-axis
   var yScale = d3.scaleLinear()
                  .domain([minGDP, maxGDP])
                  .range([height, (minGDP/maxGDP)*height]);
   //set yAxis
   var yAxis = d3.axisLeft(yScale);
   //set yAxisGroup
   var yAxisGroup = svgContainer.append('g')
                                .call(yAxis)
                                .attr("id", "y-axis")
                                .attr("transform", "translate(60, 0)")
   //add bars to Chart
   d3.select('svg').selectAll('rect')
                    .data(scaledGDP)
                    .enter()
                    .append('rect')
                    .attr('data-date', (d, i) => {
                      return data.data[i][0];
                    })
                    .attr('data-gdp', (d, i) => {
                      return data.data[i][1];
                    })
                    .attr('class', 'bar')
                    .attr('x', (d, i) => {
                      return i * barWidth;
                    })
                    .attr('y', (d, i) => {
                      return height - d;
                    })
                    .attr('width', barWidth)
                    .attr('height', (d) => {
                      return d;
                    })
                    .style('fill', '#33ADFF')
                    .attr('transform', 'translate(60, 0)')
                    //add effects for tooltips and overlays
                    .on('mouseover', function(d, i) {

                    })

});
