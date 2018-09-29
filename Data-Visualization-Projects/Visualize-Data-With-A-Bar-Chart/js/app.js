
//Set global variables
var yMargin = 40,
    width = 800,
    height = 400,
    barWidth = width/275;

//set tooltip?

//set overlay?


//set svg container


//fetch json data
d3.json("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json",
function(err, data) {

   //set y-axis description text?

   //set chart footer info text?

   //create array of year-Quater mapping from data for ToolTip

   //create array of year as ints for x-axis

   //set xScale
   //set xAxis
   //set xAxis Group

   //create array of GDPs for y-axis
   //get min & max from GDP array
   //set scale for y-axis
   //set yAxis
   //set yAxisGroup

   //add bars to Chart
   //add effects for tooltips and overlays

   console.log(data);

});
