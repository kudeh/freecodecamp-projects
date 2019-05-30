var margin = {top: 50, right: 50, bottom: 50, left: 50},
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
               .range([0, width]);
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
    var colorRange = temps.map(function(t){
        var z = (t-minTemp)/(maxTemp-minTemp);
        return z;
    });
    // Build color scale
    var myColor = d3.scaleLinear()
            .range([d3.interpolateRdYlBu(Math.min(...colorRange)),
                    d3.interpolateRdYlBu(Math.max(...colorRange))])
            .domain([minTemp, maxTemp])


    var tickVals = newData.filter(function(d){
        if(d["year"]%10===0){
            return d["year"];
        };
    });

    console.log(tickVals);

    xScale.domain(newData.map(function(d){
        return d["year"];
    }))
    
    // xAxis.tickValues(newData.filter(function(d){
    //     if(d["year"]%10===0){
    //         return d["year"];
    //     };
    // }))
    var reversedMonthNames = monthNames.reverse();
    yScale.domain(reversedMonthNames)
          .padding(0.02);

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

    svg.selectAll(".cell")
        .data(newData)
        .enter().append("rect")
        .attr("x", xMap)
        .attr("y", yMap)
        .attr("width", xScale.bandwidth())
        .attr("height", yScale.bandwidth())
        .style("padding", "010")
        // .attr("width", )
        // .attr("height", function(d,i){
        //     return yScale.rangeBand(d.month);
        //   })
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
    
})