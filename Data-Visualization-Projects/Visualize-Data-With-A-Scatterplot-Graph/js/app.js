var width = 1000,
    height = 480,
    dotSize = 20;

var svgContainer = d3.select('.vizHolder')
                     .append('svg')
                     .attr('width', width)
                     .attr('height', height);


d3.json('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json', function(err, data){
    
    //x-axis values
    var years = data.map(function(item){
        return item["Year"];
    });

    //y-axis values
    var times = data.map(function(item){
        var t = item["Time"].split(":");
        return new Date(1970, 0, 1, 0, t[0], t[1]);
    });

    //legend values
    var dope = data.map(function(item){
        if(item["Doping"]){
            return "Riders with doping allegations";
        }

        return "No doping allegations";
    });

    //Y-Axis title
    svgContainer.append('text')
    .attr('transform', 'rotate(-90)')
    .attr('x', -200)
    .attr('y', 10)
    .text('Time in Minutes');

    //X-Axis title
    svgContainer.append('text')
                .attr('x', width/2)
                .attr('y', height-5)
                .text('Year');

                var xScale = d3.scaleLinear()
                .domain([d3.min([...years, (Math.min(...years)-1)]), 
                         d3.max([...years, (Math.max(...years)+1)])])
                .range([0, width]);

    var xAxis = d3.axisBottom()
                  .scale(xScale)
                  .tickFormat(d3.format("d"));

    var xAxisGroup = svgContainer.append('g')
                                 .call(xAxis)
                                 .attr('id', 'x-axis')
                                 .attr('transform', 'translate(50, 440)');

    var yScale = d3.scaleTime()
                   .domain(d3.extent(times))
                   .range([0, height]);
    
    var yAxis = d3.axisLeft()
                  .scale(yScale)
                  .tickFormat(d3.timeFormat("%M:%S"));

    var yAxisGroup = svgContainer.append('g')
                                 .call(yAxis)
                                 .attr('id', 'y-axis')
                                 .attr('transform', 'translate(50, -40)')


});