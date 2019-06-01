var margin = {top: 50, right: 80, bottom: 50, left: 80},
    width = 1400 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;

var eduURL = 'https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json';
var countyURL = 'https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json';

var svg = d3.select("#viz-container")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

// Define the div for the tooltip
var tooltip = d3.select("#viz-container")
                .append("div")
                .attr("class", "tooltip")
                .attr("id", "tooltip")
                .style("opacity", 0);

// Map and projection
var path = d3.geoPath();
//var projection = d3.geoAlbersUsa();

  // Data and color scale
var data = d3.map();
var colorScale = d3.scaleThreshold()

d3.queue()
    .defer(d3.json, countyURL)
    .defer(d3.json, eduURL)
    .await(ready);

function ready(error, topoJson, eduInfo){

    //get min and max for setting up colors
    var domainList = eduInfo.map(function(c){
        return c.bachelorsOrHigher;
    });
    var minEdu = Math.min(...domainList);
    var maxEdu = Math.max(...domainList);

    colorScale.domain(d3.range(minEdu, maxEdu, (maxEdu-minEdu)/8))
              .range(d3.schemeBlues[9]);

    svg.append("g")
       .selectAll("path")
       //convert TopoJSON object to GeoJSON object
       .data(topojson.feature(topoJson, topoJson.objects.counties).features)
       .enter().append("path")
       .attr("class", "county")
       .attr("data-fips", function(d){
           return d.id;
        })
       .attr("data-fips", function(d){
           return d.id;
       })
       .attr("data-education", function(d){
            var countyEdu = eduInfo.filter(function(county){
                return county.fips === d.id;
            });

            if(countyEdu[0]){
                return countyEdu[0].bachelorsOrHigher;
            }

            return 0;
       })
       .attr("fill", function(d) { 
        var countyEdu = eduInfo.filter(function(county) {
          return county.fips == d.id;
        });
        if(countyEdu[0]){
          return colorScale(countyEdu[0].bachelorsOrHigher)
        }

        return colorScale(0);
       })
      .attr("d", path)
      .on("mouseover", function(d) {      
        tooltip.style("opacity", .9); 
        tooltip.html(function() {
          var county = eduInfo.filter(function(c) {
            return c.fips == d.id;
          });
          if(county[0]){
            return county[0]['area_name'] + ', ' +
                   county[0]['state'] + ': '  +
                   county[0].bachelorsOrHigher + '%';
          }

          return 0;
        })
      .attr("data-education", function() {
        var county = eduInfo.filter(function(c) {
          return c.fips == d.id;
        });
        if(county[0]){
          return county[0].bachelorsOrHigher;
        }

        return 0
       })
          .style("left", (d3.event.pageX + 10) + "px") 
          .style("top", (d3.event.pageY - 28) + "px"); }) 
          .on("mouseout", function(d) { 
            tooltip.style("opacity", 0); 
          });


    svg.append("path")
       .datum(topojson.mesh(topoJson, topoJson.objects.states, function(a, b) { return a !== b; }))
       .attr("d", path)
       .attr("class", "state-boundary");


    //Legend
    var g = svg.append("g")
           .attr("class", "key")
           .attr("id", "legend")
           .attr("transform", "translate(0,40)");

    var x = d3.scaleLinear()
              .domain([minEdu, maxEdu])
              .rangeRound([600, 860]);
            
    g.selectAll("rect")
        .data(colorScale.range().map(function(d) {
            d = colorScale.invertExtent(d);
            if (d[0] == null) d[0] = x.domain()[0];
            if (d[1] == null) d[1] = x.domain()[1];
            return d;
        }))
        .enter().append("rect")
        .attr("height", 8)
        .attr("x", function(d) { return x(d[0]); })
        .attr("width", function(d) { return x(d[1]) - x(d[0]); })
        .attr("fill", function(d) { return colorScale(d[0]); });

    g.append("text")
        .attr("class", "caption")
        .attr("x", x.range()[0])
        .attr("y", -6)
        .attr("fill", "#000")
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")

    g.call(d3.axisBottom(x)
        .tickSize(13)
        .tickFormat(function(x) { return Math.round(x) + '%' })
        .tickValues(colorScale.domain()))
        .select(".domain")
        .remove();

}