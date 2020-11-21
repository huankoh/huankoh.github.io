window.addEventListener('load', function(){
    
    // function to get date in id format
    function quarter_year(date){
    var month = date.getMonth() + 1;
    return (Math.ceil(month) + "/1/" + date.getFullYear().toString().substr(-4));
    };
    
    //function to define recession period
    function recession(date){
        if (['4/1/1960','5/1/1960','6/1/1960','7/1/1960',
             '8/1/1960','9/1/1960','10/1/1960','11/1/1960','12/1/1960',
             '1/1/1961','2/1/1961'].includes(date)){
            return "60-61 Recession"
        } else if (['12/1/1969','1/1/1970','2/1/1970','3/1/1970',
             '4/1/1970','5/1/1970','6/1/1970','7/1/1970','8/1/1970',
             '9/1/1970','10/1/1970','11/1/1970'].includes(date)){
            return "69-70 Recession"
        } else if (['11/1/1973','12/1/1973','1/1/1974','2/1/1974','3/1/1974',
                    '4/1/1974','5/1/1974','6/1/1974','7/1/1974','8/1/1974','9/1/1974','10/1/1974',
                    '11/1/1974','12/1/1974','1/1/1975','2/1/1975','3/1/1975'].includes(date)){
            return "1973 Oil Crisis"
        } else if (['1/1/1980','2/1/1980','3/1/1980','4/1/1980','5/1/1980','6/1/1980','7/1/1980'].includes(date)){
            return "1980 Recession"
        } else if (['7/1/1981','8/1/1981','9/1/1981','10/1/1981',
                    '11/1/1981','12/1/1981','1/1/1982','2/1/1982','3/1/1982',
                    '4/1/1982','5/1/1982','6/1/1982','7/1/1982','8/1/1982','9/1/1982','10/1/1982',
                    '11/1/1982'].includes(date)){
            return "81-82 Recession"
        } else if (['7/1/1990','8/1/1990','9/1/1990','10/1/1990',
                    '11/1/1990','12/1/1990','1/1/1991','2/1/1991','3/1/1991'].includes(date)){
            return "1990s Recession"
        } else if (['3/1/2001','4/1/2001','5/1/2001','6/1/2001','7/1/2001','8/1/2001','9/1/2001','10/1/2001','11/1/2001'].includes(date)){
            return "dot-com Bust"
        } else if (['12/1/2007','1/1/2008','2/1/2008','3/1/2008',
                    '4/1/2008','5/1/2008','6/1/2008','7/1/2008',
                    '8/1/2008','9/1/2008','10/1/2008','11/1/2008','12/1/2008',
                   '1/1/2009','2/1/2009','3/1/2009',
                    '4/1/2009','5/1/2009','6/1/2009'].includes(date)){
            return "Great Recession"
        } else if (['2/1/2020','3/1/2020','4/1/2020','5/1/2020','6/1/2020'].includes(date)){
            return "COVID-19 Crisis"
        } else {
            return "Normal"
        }
    }
    
    var y_value;
    // function to set y axis 
    function type_value(type){
        if (type == 'Durable goods'){
            y_value = 120
        }else if (type == 'Non-durable goods'){
            y_value = 90
        } else if (type == 'Services'){
             y_value = 60
        } else {
             y_value = 30
        }
        return y_value;
    };
   
    
    // INITIAL bubble plot setup
    const width = window.innerWidth*0.8;
    const height = 400;
    const margin = ({top: 0, right: 200, bottom: 0, left: 200})    
    
    var svg = d3.select("#vis")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", 105);  
    var svgB = d3.select("#chart").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    
    /////// SOME COMMENTS made below the figure ///////
    svg.append('text')
            .attr('y', height - 270)
            .attr('x',margin.left - 70)
            .attr('font-family','Arial')
            .attr('font-size', '12px')
            .attr('font-weight','normal')
            .attr('line-height','1.6')
            .attr('font-style','italic')
            .attr('text-align','center')
            .text("Note: Some of the products or services may not have data in the early years. It means that you are");
    svg.append('text')
            .attr('y', height - 247)
            .attr('x',margin.left - 70)
            .attr('font-family','Arial')
            .attr('font-size', '12px')
            .attr('font-style','italic')
            .attr('font-weight','normal')
            .attr('line-height','1.6')
            .attr('text-align','center')
            .text(" in the wrong matrix! If you can't wait, drag the slider to later periods to find your bubble!");
    
    
    /////////
    
    
    var xS = d3.scaleLinear()
               .domain([-100, 100])
               .range([0, width - margin.left - margin.right ]);

    var xA = d3.axisBottom()
            .scale(xS)
            .ticks(4, d3.format(",d"));
    // Draw the x-axis.
    svgB.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0,0)")
        .call(xA)
        //.call(g => g.select(".domain").remove());

    // Add an x-axis label.
    svgB.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("font-family", "Helvetica Neue")
        .attr("font-size","13px")
        .style("font-weight", "bold")
        .attr("x", margin.left -50)
        .attr("y", 0-10)
        .text("Year-on-year percentage change (%)");

    // 
    var yS = d3.scaleLinear()
             .domain([0, 150])
             .range([height, 0]);

    var yA = d3.axisLeft()
            .scale(yS);

    // Add a y-axis label.
    svgB.append("text")
        .attr("class", "y label")
        .attr("font-family", "Helvetica Neue")
        .attr("font-size","15px")
        .attr("text-anchor", "end")
        .attr("x", 0)
        .attr("y", yS(125))
        .text("Durable goods");
    // Add a y-axis label.
    svgB.append("text")
        .attr("class", "y label")
        .attr("font-family", "Helvetica Neue")
        .attr("font-size","15px")
        .attr("text-anchor", "end")
        .attr("x", 0 )
        .attr("y", yS(95))
        .text("Non-durable goods");
    
    // Add a y-axis label.
    svgB.append("text")
        .attr("class", "y label")
        .attr("font-family", "Helvetica Neue")
        .attr("font-size","15px")
        .attr("text-anchor", "end")
        .attr("x", 0)
        .attr("y", yS(65))
        .text("Services");
    
    // Add a y-axis label.
    svgB.append("text")
        .attr("class", "y label")
        .attr("font-family", "Helvetica Neue")
        .attr("font-size","15px")
        .style("font-weight", "bold")
        .attr("text-anchor", "end")
        .attr("x", -17)
        .attr("y", yS(35))
        .text("Your Choice");
    // Add a y-axis label.
    svgB.append("text")
        .attr("class", "y label")
        .attr("font-family", "Helvetica Neue")
        .attr("font-size","15px")
        .style("font-weight", "bold")
        .attr("text-anchor", "end")
        .attr("x", -55)
        .attr("y", yS(30))
        .text("vs");
    // Add a y-axis label.
    svgB.append("text")
        .attr("class", "y label")
        .attr("font-family", "Helvetica Neue")
        .attr("font-size","15px")
        .attr("text-anchor", "end")
        .style("font-weight", "bold")
        .attr("x", 0)
        .attr("y", yS(25))
        .text("Total Expenditure");
    
    // add a line for 0% 
    svgB.append('rect')
        .attr('y', yS(150))
        .attr('x',xS(0))
        .attr('height',height - 50)
        .attr('width',1)
        .attr('opacity',0.05);

    // Add a scale for bubble size
    var z = d3.scaleSqrt()
        .domain([0, 520000])
        .range([ 3, 10]);
    // color scale 
    var colorScale = d3.scaleOrdinal()
        .domain(['Services','Durable goods','Non-durable goods', 
                 'Total consumption expenditure',"Your Choice"])
        .range(d3.schemeSet1);
    
    
    d3.csv('historical_simulation.csv')
        .then(data => {
            data.forEach(d => {
                d.id = d.Date;
                d.Date = new Date(d.Date);
                d.month = +d.month;
                d.year = +d.year; 
                d.variable = d.variable;
                d.value = +d.value;
                d.size = +d.size
                d.type = d.type;
            });
        // transform data to be based on date
        data_bydate = Object.fromEntries(d3.group(data, d=>d.id));
        
        //initialise with 1/1/60 (first data)
        var filtered_data = data_bydate['1/1/1960']
        console.log(filtered_data);
        // Add the Normal or Recession label
        var economic_condition = svgB.append("text")
            .attr("class", "year label")
            .attr("text-anchor", "end")
            .attr("y", height - 84)
            .attr("x", width- margin.right)
            .text('Normal');
        // Add bubble
        var bubble =  svgB.selectAll("dot").data(filtered_data)
            .enter().append("circle")
                .attr("class", "bubbles")
                .attr("cx", function (d) { return xS(d.value); } )
                .attr("cy", function (d) { 
                    if (d.variable == 'Total consumption expenditure'){
                        return yS(30)
                    } else{
                        return yS(type_value(d.type)); 
                    } 
                })
                .attr("r", function (d) { 
                    if (isNaN(d.value)){
                        return 0
                    } else {
                        return z(d.size)
                    }   
                })
                .attr("fill", function (d) { return colorScale(d.type)} )
                .attr("opacity",0.7);
        
        // div.tooltips
        var tooltipB = d3.select("body")
            .append("div")
            .style("position", "absolute")
            .style("z-index", "1")
            .style("visibility", "hidden")
            .style("background-color", "none")
            .style("display", "inline-block")
            .style("color", "black");
        
        bubble
            .on("mouseover", function(d,i){
                    // transparent the unselected nodes 
                    d3.selectAll("dot").attr("opacity", 0.3); 
            
                    // show selected nodes
                    d3.selectAll(this).attr("opacity", 1);
                        
                    // show the information for each node
                    return tooltipB.style('visibility', 'visible')
                       .style('left', (event.pageX - 20) + 'px')
                       .style('top', (event.pageY - 60) + 'px')
                       .html("<b><u>"+i.variable+"</u></b>" + "<br/>"+"Total Amount Spend (in millions): " + i.size + "<br/>" + "Percentage Change: " + i.value.toFixed(2) + "%")
            })
            .on("mouseout",function(d,i){
                        d3.selectAll("dot")
                            .attr("opacity", 1);
                        return tooltipB.style('visibility', 'hidden');
                    
                        });
        // user specified product/service
        allProductSet = new Set()
        
        for (var i = 0; i < data.length; i++){
            allProductSet.add(data[i].variable);
        };
        var products = Array.from(allProductSet).sort();
        products.unshift("I don't want any comparison!")
        // add the options to the button
        d3.select("#Button")
          .selectAll('myOptions')
            .data(products)
          .enter()
            .append('option')
          .text(function (d) { return d; }) // text showed in the menu
            .attr("y",height)
          .attr("value", function (d) { return d; }); // corresponding value returned by the button
        
        function updateBubble(selectedProduct){
        
            bubble
                .transition()
                .duration(500)
                .attr("fill", function (d) { 
                    if (d.variable == selectedProduct && d.variable != 'Total consumption expenditure' ){
                        return colorScale('Your Choice')
                    } else {
                        return colorScale(d.type)
                    }; 
                })
                .attr("cy", function (d) { 
                    if (d.variable == selectedProduct){
                        return yS(30)
                    } else {
                        return yS(type_value(d.type))
                    }; 
                });
        };
        
        // When the button is changed, run the updateChart function
        d3.select("#Button").on("change", function(d) {
            // recover the option that has been chosen
            var selectedOption = d3.select(this).property("value")
            // run the updateChart function with this selected option
            updateBubble(selectedOption)
        });
        function step() {
            update(x.invert(currentValue));
            currentValue = currentValue + (targetValue/(initial_speed/speed_adj));
            if (currentValue > targetValue) {
                moving = false;
                currentValue = 0;
                clearInterval(timer);
                // timer = 0;
                playButton.text("Play");
                console.log("Slider moving: " + moving);
            } else if (currentValue < 0) {
                currentValue = 0;
                clearInterval(timer);
                // timer = 0;
                playButton.text("Play");
                console.log("Slider moving: " + moving);
            }
        
        };

        function update(h) {
        // update position and text of label according to slider scale
            handle.attr("cx", x(h));

            label
                .attr("x", x(h))
                .text(formatDate(h));
            // update 
            economic_condition.text(recession(quarter_year(h)));
            // update data when slider is played
            var slider_date = quarter_year(x.invert(currentValue))

            // Create new data with the selection?

            var filtered_data = data_bydate[slider_date]

              // Give these new data to update dots
              bubble
                  .data(filtered_data)
                  .transition()
                  .duration(100)
                    .attr("class", "bubbles")
                    .attr("cx", function (d) { return xS(d.value); } )
                    .attr("r", function (d) { 
                        if (isNaN(d.value)){
                            return 0
                        } else {
                            return z(d.size)
                        }   
                    })
        };

        //play button
        playButton
            .on("click", function() {
                var button = d3.select(this);
                if (button.text() == "Pause") {
                moving = false;
                clearInterval(timer);
                // timer = 0;
                button.text("Play");
            } else {
                moving = true;
                timer = setInterval(step, 100);
                button.text("Pause");
            }
                console.log("Slider moving: " + moving);
        });
        

            // ---------------------------//
        //       LEGEND              //
        // ---------------------------//

        // Add legend: circles
        var valuesToShow = [10000,1000000,10000000, 15000000]
        var xCircle = width - margin.right
        var xLabel = xCircle +100
        svg
          .selectAll("legend")
          .data(valuesToShow)
          .enter()
          .append("circle")
            .attr("cx", xCircle)
            .attr("cy", function(d){ return height - 318 - z(d) } )
            .attr("r", function(d){ return z(d) })
            .style("fill", "none")
            .attr("stroke", "black")

        // Add legend: segments
        svg
          .selectAll("legend")
          .data(valuesToShow)
          .enter()
          .append("line")
            .attr('x1', function(d){ return xCircle + z(d) } )
            .attr('x2', xLabel)
            .attr('y1', function(d){ return height - 318 - z(d) } )
            .attr('y2', function(d){ return height - 318 - z(d) } )
            .attr('stroke', 'black')
            .style('stroke-dasharray', ('2,2'))

        // Add legend: labels
        svg
          .selectAll("legend")
          .data(valuesToShow)
          .enter()
          .append("text")
            .attr('x', xLabel)
            .attr('y', function(d){ return height - 318 - z(d) } )
            .text( function(d){ return d } )
            .style("font-size", 10)
            .attr('alignment-baseline', 'middle')

        // Legend title
        svg.append("text")
          .attr('x', xCircle)
          .attr("y", height - 330+30)
          .text("Total Expenditure")
          .attr("text-anchor", "middle")

        // Add one dot in the legend for each name.
        var size = 10
        var allgroups = ["Durable goods", "Non-durable goods", "Services", "Total consumption expenditure", "Your Choice"]
        svgB.selectAll("myrect")
          .data(allgroups)
          .enter()
          .append("circle")
            .attr("cx", width - margin.right - 200)
            .attr("cy", function(d,i){ return height - 85 + i*(size+5)}) // 100 is where the first dot appears. 25 is the distance between dots
            .attr("r", 2.5)
            .style("fill", function(d){ return colorScale(d)});
 

        // Add labels beside legend dots
        svgB.selectAll("mylabels")
          .data(allgroups)
          .enter()
          .append("text")
            .attr("x", width - margin.right - 200 + size*.8)
            .attr("y", function(d,i){ return height -85+ i * (size + 5)}) // 100 is where the first dot appears. 25 is the distance between dots
            .style("fill", function(d){ return colorScale(d)})
            .text(function(d){ return d})
            .attr("text-anchor", "left")
            .attr("font-size","12px")
            .style("alignment-baseline", "middle")

        });

    ////////// slider //////////
    var formatDateIntoYear = d3.timeFormat("%Y");
    var formatDate = d3.timeFormat("%b %Y");
    var parseDate = d3.timeParse("%m/%d/%y");
    
    var startDate = new Date("1960-01-01"),
    endDate = new Date("2020-06-01");
    
    
    var moving = false;
    var currentValue = 0;
    var targetValue = width - margin.left - margin.right - 100;

    var playButton = d3.select("#play-button")
        .style("left", margin.left - 80);
    
    var x = d3.scaleTime()
        .domain([startDate, endDate])
        .range([0, targetValue])
        .clamp(true);
    
    var slider = svg.append("g")
        .attr("class", "slider")
        .attr("transform", "translate(" + margin.left + "," + height/28 + ")");

    slider.append("line")
        .attr("class", "track")
        .attr("x1", x.range()[0])
        .attr("x2", x.range()[1])
      .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
        .attr("class", "track-inset")
      .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
        .attr("class", "track-overlay")
        .call(d3.drag()
            .on("start", (event,d) => slider.interrupt())
            .on("drag", (event,d) => {
              currentValue = event.x;
              update(x.invert(currentValue)); 
            })
        );

    slider.insert("g", ".track-overlay")
        .attr("class", "ticks")
        .attr("transform", "translate(0," + 20 + ")")
      .selectAll("text")
        .data([new Date("1960-01-01"),new Date("1970-01-01"),new Date("1980-01-01"),
               new Date("1990-01-01"),new Date("2000-01-01"),new Date("2010-01-01"),
              new Date("2020-01-01")])
        .enter()
        .append("text")
        .attr("x", x)
        .attr("y", 10)
        .attr("font-family", "Georgia")
        .attr("text-anchor", "middle")
        .text(function(d) { return formatDateIntoYear(d); });

    var handle = slider.insert("circle", ".track-overlay")
        .attr("class", "handle")
        .attr("r", 10);

    var label = slider.append("text")  
        .attr("class", "label")
        .attr('font-size','11')
        .attr('fill','#333')
        .attr("font-family", "Georgia")
        .attr("font-weight", "bold")
        .attr("text-anchor", "middle")
        .text(formatDate(startDate))
        .attr("transform", "translate(0," + (20) + ")")
    

    function step() {
        update(x.invert(currentValue));
        currentValue = currentValue + (targetValue/1000);
        if (currentValue > targetValue) {
                moving = false;
                currentValue = 0;
                clearInterval(timer);
                // timer = 0;
                playButton.text("Play");
                console.log("Slider moving: " + moving);
        } else if (currentValue < 0) {
            currentValue = 0;
            clearInterval(timer);
            // timer = 0;
            playButton.text("Play");
            console.log("Slider moving: " + moving);
        }  
    };
    function update(h) {
    // update position and text of label according to slider scale
        console.log(h)
        handle.attr("cx", x(h));
        
        label
            .attr("x", x(h))
            .text(formatDate(h));
    };  
    
    
    // Speed button
    var initial_speed = 1500
    var speed_adj = 1
    
    var fasterButton = d3.select("#fast-button")
        .style("left", margin.left - 22);
    
    var slowerButton = d3.select("#slow-button")
        .style("left", margin.left - 75);
    
    //Faster button
    fasterButton
        .on("click", function() {
            if (speed_adj >= 0.5){
                speed_adj = speed_adj + 0.25
            } else if (speed_adj >= 0.3 && speed_adj < 0.5){
                speed_adj = speed_adj + 0.1
            } else if (speed_adj < 0.3){
                speed_adj = speed_adj + 0.05
            } 
            speed_label.text(speed_adj.toFixed(2)+'x')
    });
    
    //slower button
    slowerButton
        .on("click", function() {
            if (speed_adj >= 0.5){
                speed_adj = speed_adj - 0.25
            } else if (speed_adj >= 0.3 && speed_adj < 0.5){
                speed_adj = speed_adj - 0.1
            } else if (speed_adj > 0.1 && speed_adj < 0.3){
                speed_adj = speed_adj - 0.05
            } else {
                speed_adj
            }
            speed_label.text(speed_adj.toFixed(2) + 'x')
    }); 
    
    // display speed
    svg.append('text')
            .attr('y', 95)
            .attr('x', 80)
            .attr('font-family','Georgia')
            .attr('font-size', '13px')
            .attr('fill','#333')
            .attr('font-weight','bold')
            .attr('line-height','1.6')
            .attr('text-align','center')
            .text("Simulator's Speed: "); 
    
    var speed_label = svg.append('text')
            .attr('y', 95)
            //.attr('x', width - margin.left- 135)
            .attr('x', 210)
            .attr('font-family','Georgia')
            .attr('fill','#333')
            .attr('font-size', '13px')
            .attr('font-weight','bold')
            .attr('line-height','1.6')
            .attr('text-align','center')
            .text("1.00x");  
    
});