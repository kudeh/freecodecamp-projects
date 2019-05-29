var margin = {top: 50, right: 50, bottom: 50, left: 50},
    width = 960 - margin.left - margin.right,
    height = 650 - margin.top - margin.bottom;

var url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";

var xScale = d3.scaleLinear()
               .range([0, width]);
var yScale = d3.scaleTime()
               .range([0, height]);

var xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));
var yAxis = d3.axisLeft(yScale).tickFormat(d3.timeFormat("%M:%S"));


var xValue = function(d){
                return d["Year"];
             }
var yValue = function(d){
                var t = d["Time"].split(":");
                return new Date(1970, 0, 1, 0, t[0], t[1]);
             }

var xMap = function(d) {
    return xScale(xValue(d));
}
var yMap = function(d) {
    return yScale(yValue(d));
}

var color = d3.scaleOrdinal(d3.schemeCategory10);
var cValue = function(d) {
    return d["Doping"] != "";
}

var svg = d3.select('.vizHolder')
            .append('svg')
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var tooltip = d3.select(".vizHolder").append("div")
            .attr("class", "tooltip")
            .attr("id", "tooltip")
            .style("opacity", 0);

d3.json(url, function(err, data){


    xScale.domain([d3.min(data, xValue), d3.max(data, xValue)]);
    yScale.domain(d3.extent(data, yValue));

    // x-axis
    svg.append("g")
       .call(xAxis)
        .attr("id", "x-axis")
        .attr("transform", "translate(0," + height + ")")
    svg.append("text")
        .attr("x", width/2)
        .attr("y", height+35)
        .text("Year");

    // y-axis
    svg.append("g")
        .call(yAxis)
        .attr("id", "y-axis")  
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -(height/2))
        .attr("y", -40)
        .text("Best Time (minutes)");

    svg.selectAll(".dot")
       .data(data)
       .enter().append("circle")
       .attr("r", 5)
       .attr("class", "dot")
       .attr("cx", xMap)
       .attr("cy", yMap)
       .style("fill", function(d){
           return color(cValue(d))
        })
       .attr("data-xvalue", xValue)
       .attr("data-yvalue", yValue)
       .on("mouseover", function(d, i) {
        tooltip.transition()
               .duration(200)
               .style("opacity", .9);
        tooltip.html(d["Name"] + ": "+ d["Nationality"] + "<br/>" 
                     + "Year: " + xValue(d) + ", Time: " + data[i]["Time"] 
                     + "<br/><br/>" + d["Doping"])
             .style("left", (d3.event.pageX + 5) + "px")
             .style("top", (d3.event.pageY - 28) + "px")
             .attr("data-year", xValue(d));
        })
    .on("mouseout", function(d) {
        tooltip.transition()
             .duration(500)
             .style("opacity", 0);
    });
    
    // draw legend
    var legend = svg.selectAll(".legend")
                  .data(color.domain())
                  .enter().append("g")
                  .attr("class", "legend")
                  .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    // draw legend colored rectangles
    legend.append("rect")
        .attr("id", "legend")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color);

    // draw legend text
    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) { 
            if (d){
                return "Riders with doping allegations";
            }

            return "No doping allegations";
        })
        .attr("class", "info")

})
