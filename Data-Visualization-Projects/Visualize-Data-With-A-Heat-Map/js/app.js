var margin = {top: 50, right: 80, bottom: 50, left: 80},
    width = 1500 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

var url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";

var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

var getBaseTemp = function(data) {
    return data["baseTemperature"];
}

var getDataList = function(data) {
    return data["monthlyVariance"];
}

var getTemps = function(data) {
    var temp = []
    data.forEach(function(item){
        temp.push(item["temperature"])
    })

    return temp;
}


var xScale = d3.scaleBand()
               .rangeRound([0, width], 0.1);
var yScale = d3.scaleBand()
               .range([height, 0]);

var xAxis = d3.axisBottom(xScale);
var yAxis = d3.axisLeft(yScale);

var xValue = function(d){
    return d["year"];
}
var yValue = function(d){
    return d["monthName"];
}

var xMap = function(d) {
    return xScale(xValue(d));
}
var yMap = function(d) {
    return yScale(yValue(d));
}

// append the svg object to the body of the page
var svg = d3.select("#viz-container")
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// tooltip svg
var tooltip = d3.select("#viz-container").append("div")
.attr("class", "tooltip")
.attr("id", "tooltip")
.style("opacity", 0);

d3.json(url, function(err, data){

    var baseTemp = getBaseTemp(data);
    var newData = getDataList(data);

    newData.forEach(function(item){
        item["temperature"] = item["variance"] + baseTemp;
        item["monthName"] = monthNames[item["month"]-1]; 
    });

    var temps = getTemps(newData);
    var minTemp = Math.min(...temps);
    var maxTemp = Math.max(...temps);

    // Build color scale
    var myColor = d3.scaleSequential(d3.interpolateRdYlBu)
                    .domain([maxTemp, minTemp])

    xScale.domain(newData.map(function(d){
        return d["year"];
    }));

    var reversedMonthNames = monthNames.reverse();
    yScale.domain(reversedMonthNames);

    var xDomain = [...xScale.domain()]

    var tickVals = xDomain.filter(function(d){
        return d%10===0;
    }).map(function(d){
            return d;
    });

    xAxis.tickValues(tickVals);

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
        .text("Month");

    // cells in heat map grid
    svg.selectAll(".cell")
        .data(newData)
        .enter().append("rect")
        .attr("x", xMap)
        .attr("y", yMap)
        .attr("width", xScale.bandwidth())
        .attr("height", yScale.bandwidth())
        .attr("class", "cell")
        .attr("data-year", xValue)
        .attr("data-month", function(d){
            return d["month"]-1
        })
        .attr("data-temp", function(d){
            return d["temperature"];
        })
        .style("fill", function(d) { return myColor(d["temperature"])} )
        .on("mouseover", function(d, i) {
            tooltip.transition()
                   .duration(200)
                   .style("opacity", .9);
            tooltip.html(d["year"] + " - "+ d["monthName"] + "<br/>" 
                         + Math.round(d["temperature"], 2)+"℃")
                 .style("left", (d3.event.pageX + 5) + "px")
                 .style("top", (d3.event.pageY - 28) + "px")
                 .attr("data-year", xValue(d));
        })
        .on("mouseout", function(d) {
            tooltip.transition()
                 .duration(500)
                 .style("opacity", 0)
        });
        
        //converts temp to number between 0 and 1
        var normalizeTemp = function(t) {
            var z = 1-((t - minTemp)/(maxTemp-minTemp));
            return z;
        };

        // initialize Legend
        var legendWidth = 550;
        var legendHeight = 50;
        var legend = d3.select("#viz-container").append("svg")
                       .attr("id", "legend")
                       .attr("width", legendWidth)
                       .attr("height", legendHeight)
                       .attr("transform", "translate("+(margin.left)+", 0)")
                       .append("g")
        // legend scale
        var legendX = d3.scaleLinear()
                        .range([0, legendWidth])
                        .domain([minTemp, maxTemp]);

        // legend x-axis
        var legendXAxis = d3.axisBottom(legendX)
                           .tickFormat(d3.format(".1f"));

        //add x-axis to legend svg                   
        legend.append("g")
              .call(legendXAxis)
              .attr("id", "legend-axis")
              .attr("transform", "translate(0,"+legendHeight/2+")")
        
        //Add rectangles for legend
        legend.selectAll("rect")
              .data(temps.sort())
              .enter().append("rect")
              .attr("x", function(d){
                  return legendX(d);
              })
              .attr("y", function(d){
                  return 0;
              })
              .attr("width", function(d){
                return 50;
            })
            .attr("height", function(d){
                return legendHeight/2;
            })
            .style("fill", function(d){
                return d3.interpolateRdYlBu(normalizeTemp(d));
            });
    
})