var margin = {top: 50, right: 80, bottom: 50, left: 80},
    width = 1500 - margin.left - margin.right,
    height = 1000 - margin.top - margin.bottom;

var movieSalesURL = "https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/movie-data.json"

//add svg to html
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

//color scale
var color = d3.scaleOrdinal(d3.schemeCategory20);

// treemap object
var treemap = d3.treemap()
                .size([width, height])
                .paddingInner(1);


d3.json(movieSalesURL, function(err, data){

    var root = d3.hierarchy(data)
                 .sum(function(d){
                     return d.value;
                 })
                 .sort(function(a, b) { return b.height - a.height || b.value - a.value; });

    treemap(root);
    
    //set up box for genre
    var genre = svg.selectAll("g")
                  .data(root.leaves())
                  .enter().append("g")
                  .attr("transform", function(d) { return "translate(" + d.x0 + "," + d.y0 + ")"; })
    
    //add movies in genre
    genre.append("rect")
         .attr("class", "tile")
         .attr("width", function(d) { return d.x1 - d.x0; })
         .attr("height", function(d) { return d.y1 - d.y0; })
         .attr("data-name", function(d){
            return d.data.name;
         })
         .attr("data-category", function(d){
            return d.data.category;
         })
         .attr("data-value", function(d){
            return d.data.value;
         })
         .attr("fill", function(d) { 
            return color(d.data.category); 
         })
         //add tool tip
         .on("mousemove", function(d) {    
            tooltip.style("opacity", .8); 
            tooltip.html(
              'Name: ' + d.data.name + 
              '<br>Category: ' + d.data.category + 
              '<br>Value: ' + d.data.value
            )
            .attr("data-value", d.data.value)
            .style("left", (d3.event.pageX + 10) + "px") 
            .style("top", (d3.event.pageY - 28) + "px"); 
          })    
          .on("mouseout", function(d) { 
            tooltip.style("opacity", 0); 
          })

    //add text to genre
    genre.append("text")
         .attr('class', 'movie-labels')
         .selectAll("tspan")
         .data(function(d) { return d.data.name.split(/(?=[A-Z][^A-Z])/g); })
         .enter().append("tspan")
         .attr("x", 5)
         .attr("y", function(d, i) { return 10 + i * 15; })
         .text(function(d) { return d; });

    //legend
    var legend = d3.select("#viz-container")
                   .append("div")
                   .attr("id", "legend")
                   .append("svg")                  

    var categories = root.leaves().map(function(nodes){
    return nodes.data.category;
    });
    categories = categories.filter(function(category, index, self){
    return self.indexOf(category)===index;    
    })

    var legendWidth = 300;
    const LEGEND_OFFSET = 10;
    const LEGEND_RECT_SIZE = 15;
    const LEGEND_H_SPACING = 150;
    const LEGEND_V_SPACING = 10;
    const LEGEND_TEXT_X_OFFSET = 3;
    const LEGEND_TEXT_Y_OFFSET = -2;
    var legendElemsPerRow = Math.floor(legendWidth/LEGEND_H_SPACING);
    
    var legendElem = legend
        .append("g")
        .attr("transform", "translate(60," + LEGEND_OFFSET + ")")
        .selectAll("g")
        .data(categories)
        .enter().append("g")
        .attr("transform", function(d, i) { 
        return 'translate(' + 
        ((i%legendElemsPerRow)*LEGEND_H_SPACING) + ',' + 
        ((Math.floor(i/legendElemsPerRow))*LEGEND_RECT_SIZE + (LEGEND_V_SPACING*(Math.floor(i/legendElemsPerRow)))) + ')';
        })
        
    legendElem.append("rect")                              
        .attr('width', LEGEND_RECT_SIZE)                          
        .attr('height', LEGEND_RECT_SIZE)     
        .attr('class','legend-item')                 
        .attr('fill', function(d){
        return color(d);
        })
        
    legendElem.append("text")                              
        .attr('x', LEGEND_RECT_SIZE + LEGEND_TEXT_X_OFFSET)                          
        .attr('y', LEGEND_RECT_SIZE + LEGEND_TEXT_Y_OFFSET)                       
        .text(function(d) { return d; });  
})