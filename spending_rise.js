window.addEventListener('load', function(){
    
    const width1 = window.innerWidth*0.8;
    const height1 = 710;
    
    const margin1 = { top: 100, right: 150, bottom: 208, left: 150 };
    const innerWidth = width1 - margin1.left - margin1.right;
    const innerHeight = height1 - margin1.top - margin1.bottom;
        
    
    const svg = d3.select('svg')
        .attr("width",width1)
        .attr("height",height1)
    // Provide some text below the graphs
    svg.append('text')
            .attr('y', 560+50)
            .attr('x',innerWidth - 550)
            .attr('font-family','Arial')
            .attr('font-size', '14px')
            .attr('font-weight','normal')
            .attr('line-height','1.6')
            .attr('text-align','center')
            .text('During the year 2019, total personal consumption expenditures exceeded 14 trillions U.S Dollar for the first time.');
    
    svg.append('text')
            .attr('y', 560+75)
            .attr('x',innerWidth - 550)
            .attr('font-family','Arial')
            .attr('font-size', '14px')
            .attr('font-weight','normal')
            .attr('line-height','1.6')
            .attr('text-align','center')
            .text('This is 46x more as compared to the total spending in 1959. Except for spending on Animal feeds/Farm supplies,');
    svg.append('text')
            .attr('y', 560+100)
            .attr('x',innerWidth - 550)
            .attr('font-family','Arial')
            .attr('font-size', '14px')
            .attr('font-weight','normal')
            .attr('line-height','1.6')
            .attr('text-align','center')
            .text('total expenditure of all products have risen by at least 400% since 1959.');
    
    svg.append('text')
            .attr('y', 165)
            .attr('x',innerWidth - 550)
            .attr('font-family','Georgia')
            .attr('fill', '#333')
            .attr('font-size', '10px')
            .attr('font-weight','normal')
            .attr('line-height','1.6')
            .attr('text-align','center')
            .text('Total amount spent on communication equipment ');
    
    svg.append('text')
            .attr('y', 175)
            .attr('x',innerWidth - 550)
            .attr('font-family','Georgia')
            .attr('fill', '#333')
            .attr('font-size', '10px')
            .attr('font-weight','normal')
            .attr('line-height','1.6')
            .attr('text-align','center')
            .text('has increase by 10,000% within 20 years.');
     
    svg.append('text')
            .attr('y', 175)
            .attr('x',width1 - margin1.right - 130)
            .attr('font-family','Georgia')
            .attr('fill', 'hsl(200deg 70% 40%)')
            .attr('font-size', '12px')
            .attr('font-weight','normal')
            .attr('line-height','1.6')
            .attr('text-align','center')
            .text('In 2019, the total amount spent by household');
    
    svg.append('text')
            .attr('y', 190)
            .attr('x',width1 - margin1.right- 130)
            .attr('font-family','Georgia')
            .attr('fill', 'hsl(200deg 70% 40%)')
            .attr('font-size', '12px')
            .attr('font-weight','normal')
            .attr('line-height','1.6')
            .attr('text-align','center')
            .text('is ~46x the size of amount spent in 1959.');
    
    svg.append('text')
            .attr('y', 405)
            .attr('x',width1 - margin1.right- 250)
            .attr('font-family','Georgia')
            .attr('fill', '#333')
            .attr('font-size', '10px')
            .attr('font-weight','normal')
            .attr('line-height','1.6')
            .attr('text-align','center')
            .text('In contrast, the total amount spent on Animal feeds/Farm supplies'); 
    
    svg.append('text')
            .attr('y', 420)
            .attr('x',width1 - margin1.right- 250)
            .attr('font-family','Georgia')
            .attr('fill', '#333')
            .attr('font-size', '10px')
            .attr('font-weight','normal')
            .attr('line-height','1.6')
            .attr('text-align','center')
            .text('in 2020 is only 0.36x the size of amount spent in 1959.');

    
    
    const render = data => {

        const title = 'Spending on the Rise';
  
        const xValue = d => d.Date;
        const xAxisLabel = '';

        const yValue = d => d.value;
        const yAxisLabel = '';
        // circle radius size 
        const circleRadius = 3.4;
        
        // Color scale based on day:
        const color = d3.scaleOrdinal()
            .domain(d3.extent(data, d => d.variable))
            .range(['#C0C0C0'])
        //const color = "grey"
         // x-axis scale based on Time Of Day
        const xScale = d3.scaleLinear()
            .domain(d3.extent(data, xValue))
            .range([0, innerWidth]);
        // y-axis scale based on hourly average
        const yScale = d3.scaleLog().base(2)
            .domain(d3.extent(data, yValue))
            .range([innerHeight, 0])
            .nice();
        
        const g = svg.append('g')
            .attr('transform', `translate(${margin1.left},${margin1.top})`);
        
        
        
        // X-axis and Y-axis
        const xAxis = d3.axisBottom(xScale)
            .ticks(11)
            .tickSize(5)
            .tickSizeOuter(0)
            .tickPadding(15)
            .tickFormat(d3.format("d"));
        // y axis and y grid lines
        const yAxis = d3.axisRight(yScale)
            .ticks([])
            .tickSize(innerWidth)
            .tickFormat("");
  
        const yAxisG = g.append('g').call(yAxis)
            .attr("class", "y axis")
            .attr('opacity',0.15)
            .attr('fill','#fafafa')
            .call(yAxis)
            .style("stroke-dasharray", "2 2");
        
        yAxisG.selectAll('.domain').remove();
        
        // y axis and y grid lines
        var y_tick_labels = ["4096","1024","256","64","16","4","1","0.25"]
        
        g.append('g').append('text')
            .attr('class', 'yaxis-label')
            .attr('y', innerWidth + 65)
            .attr('x', -innerHeight / 2)
            .attr('fill', '#c9c9c9')
            .attr('transform', `rotate(-90)`)
            .attr("font-size","12px")
            .attr('text-anchor', 'middle')
            .text(yAxisLabel);
        
        g.selectAll('ylabels').data(y_tick_labels)
            .enter().append('text')
            .attr("x", innerWidth + 9)
            .attr("y", function(d,i){ return i * (innerHeight/7.45)})
            .style("fill", '#999')
            .text(function(d){ return d})
            .attr("text-anchor", "left")
            .attr("font-size","9px")
            .attr("font-family", "Helvetica")
            .style("alignment-baseline", "middle")

        
        // x axis
        const xAxisG = g.append('g').call(xAxis)
            .attr('transform', `translate(0,${innerHeight})`);

        xAxisG.append('text')
            .attr('class', 'x axis')
            .attr('y', 75)
            .attr('x', innerWidth / 2)
            .attr('fill', 'black')
            .text(xAxisLabel);
        
        // div.tooltips
        var tooltip = d3.select("body")
            .append("div")
            .style("position", "absolute")
            .style("z-index", "1")
            .style("visibility", "hidden")
            //.style("background-color", "black")
            .style("display", "inline-block")
            .style("color", "black");
        
        
        
        // rect for annotations
        g.append('rect')
            .attr('y',yScale(108.8333333))
            .attr('x',xScale(1981))
            .attr('height',100)
            .attr('width',1)
            .attr('fill','#333')
            .attr('opacity',0.5)
            .attr('transform',`rotate(125,${xScale(1981)},${yScale(108.8333333)})`)
        
        // rect for annotations
        g.append('rect')
            .attr('y',yScale(46.06))
            .attr('x',xScale(2019))
            .attr('height',100)
            .attr('width',1)
            .attr('fill','hsl(200deg 70% 40%)')
            .attr('opacity',0.5)
            .attr('transform',`rotate(145,${xScale(2019)},${yScale(46.06)})`)
        
        
        // rect for annotations
        g.append('rect')
            .attr('y',yScale(0.36))
            .attr('x',xScale(2020))
            .attr('height',50)
            .attr('width',1)
            .attr('fill','#333')
            .attr('opacity',0.5)
            .attr('transform',`rotate(125,${xScale(2020)},${yScale(0.36)})`)
        
        
        // Circles - Scatter plot
        circles = g.selectAll('circle').data(data)
            .enter().append('circle')
            .attr('cy', d => yScale(yValue(d)))
            .attr('cx', d => xScale(xValue(d)))
            .attr('r', circleRadius)
            .attr('fill', function(d,i){
                    return d.variable === 'Overall Average' ? 'hsl(200deg 70% 40%)' : "#C0C0C0"
            })
            .attr('class','circle')
            .attr('opacity',function(d,i){
                    return d.variable === 'Overall Average' ? 0.6 : 0.5
            });
        
        // To show info about each obs when mouse hover over 
        circles
            .on("mouseover", function(d,i){
                    // show the information for each node
                    return tooltip.style('visibility', 'visible')
                       .style('left', (event.pageX - 20) + 'px')
                       .style('top', (event.pageY - 60) + 'px')
                       .html("We are spending " + "<b>" + i.value.toFixed(2) + "x</b> more on " + "<br/>"+ "<b><u>"+i.variable+"</u></b>" + " in " +  i.Date + "<br/>"+ "(as compared to year 1959).")
            })
            .on("mouseout",function(d,i){
                        return tooltip.style('visibility', 'hidden');
                        });
        
        // LINE GRAPH
        nested_data = Object.fromEntries(d3.group(data, d=>d.variable));
        
        nested = Object.entries(nested_data).map(([key, value]) => ({key,value}));

        const lineGenerator = d3.line()
            .x(d => xScale(xValue(d)))
            .y(d => yScale(yValue(d)));
        
        
        line = g.selectAll('.line-path').data(nested)
            .enter().append("path")
                .attr("class", "line-path")
                .attr('opacity',function(d){
                    return d.key === 'Overall Average' ? 0.5 : 0;
                })
                .attr("d", d => lineGenerator(d.value))
                .attr("stroke-width",function(d){
                    return d.key === 'Overall Average' ? 1.5 : 0;
                })
                .attr("stroke", function(d,i){
                    return d.key === 'Overall Average' ? 'hsl(200deg 70% 40%)' : "yellow";
                });
        
        // Title
        g.append('text')
            .attr('class', 'title')
            .attr('y', -40)
            .text(title); 
        
        g.append('text')
            .attr('y',-20)
            .attr('font-size','11.5px')
            .attr('font-family','georgia')
            .text('Consumers spend many times more every year as compared to the 1959 base year but purchasing behaviour vary greatly by product categories.');
        
      
        // user specified product/service
        allGroupSet = new Set()
        
        for (var i = 0; i < data.length; i++){
            allGroupSet.add(data[i].variable);
        };
        
        var allGroup = Array.from(allGroupSet).sort();
        allGroup.unshift("Choose one product or service:")

        // add the options to the button
        d3.select("#selectButton")
          .selectAll('myOptions')
            .data(allGroup)
          .enter()
            .append('option')
          .text(function (d) { return d; }) // text showed in the menu
            
          .attr("value", function (d) { return d; }); // corresponding value returned by the button
      
        // Second LINE GRAPH and circles 
        const lg = svg.append('g')
            .attr('transform', `translate(${margin1.left},${margin1.top})`);
        
        var line2 = lg.selectAll('.line-path').data(nested)
            .enter().append("path")
                .attr("class", "line-path")
                .attr('opacity',function(d,i){
                    return d.key === 'Selected_GROUP' ? 0.5 : 0;
                })
                .attr("d", d => lineGenerator(d.value))
                .attr("stroke-width",function(d){
                    return d.key === 'Overall Average' ? 1.5 : 0;
                })
                .attr("stroke", function(d,i){
                    return d.key === 'Selected_GROUP' ? 'red' : "yellow";
                });
        
        var dot = lg.selectAll('circle').data(nested_data['Overall Average'])
            .enter().append('circle')
                .attr('cy', d => yScale(yValue(d)))
                .attr('cx', d => xScale(xValue(d)))
                .attr("r",circleRadius)
                .attr('fill', function(d,i){
                    return d.variable === 'Overall Average' ? 'hsl(200deg 70% 40%)' : "hsl(39deg 90% 50%)"
                })
                .attr('opacity',function(d,i){
                            return d.variable === 'Overall Average' ? 0.6 : 0.5
                });

                
        function update(selectedGroup){
            // Give these new data to update line
            line2
                .transition()
                .duration(300)
                .attr("stroke-width",function(d){
                    return d.key === selectedGroup ? 1.5 : 0;
                })
                .attr('opacity',function(d,i){
                    return d.key === selectedGroup ? 0.5 : 0;
                })   
                .attr("stroke", function(d,i){
                    return d.key === selectedGroup ? 'hsl(39deg 90% 50%)' : "red";
                });
            
            if (selectedGroup == "Choose one product or service:"){
                var group = "Overall Average"
            } else {
                var group = selectedGroup
            }
            
            dot
                .data(nested_data[group])
                .transition()
                .duration(300)
                .attr("cx", d => xScale(xValue(d)))
                .attr("cy", d => yScale(yValue(d)))
                .attr('fill', function(d,i){
                    return d.variable === 'Overall Average' ? 'hsl(200deg 70% 40%)' : "hsl(39deg 90% 50%)"
                })
                .attr("opacity", 0.5);
            dot
                .on("mouseover", function(d,i){
                        // show the information for each node
                        return tooltip.style('visibility', 'visible')
                           .style('left', (event.pageX - 20) + 'px')
                           .style('top', (event.pageY - 60) + 'px')
                           .html("We are spending " + "<b>" + i.value.toFixed(2) + "x</b> more on " + "<br/>"+ "<b><u>"+i.variable+"</u></b>" + " in " +  i.Date + "<br/>"+ "(as compared to year 1959).")
                })
                .on("mouseout",function(d,i){

                        return tooltip.style('visibility', 'hidden');
                    
                });
            
        };
        
            // When the button is changed, run the updateChart function
        d3.select("#selectButton").on("change", function(d) {
            // recover the option that has been chosen
            var selectedOption = d3.select(this).property("value")
            // run the updateChart function with this selected option
            update(selectedOption)
        });
        // LEGEND ////
        const clg = svg.append('g')
            .attr('transform', `translate(${margin1.left},${margin1.top})`);
        // Add one dot in the legend for each name.
        var size = 10
        var product_categories = ["Overall Average", ""]
        
        clg.selectAll("myLegend").data(product_categories)
          .enter().append("circle")
            .attr("cx", 10)
            .attr("cy", function(d,i){ return 5 + i*(size+15)}) 
            .attr("r", circleRadius)
            .attr('opacity',1)
            .style("fill",  function(d){
                    return d === 'Overall Average' ? 'hsl(200deg 70% 40%)' : "hsl(39deg 90% 50%)"
                })
        
        clg.selectAll("myLegend").data(product_categories)
          .enter().append("circle")
            .attr("cx", 40)
            .attr("cy", function(d,i){ return 5 + i*(size+15)}) 
            .attr("r", circleRadius)
            .attr('opacity',1)
            .style("fill",  function(d){
                    return d === 'Overall Average' ? 'hsl(200deg 70% 40%)' : "hsl(39deg 90% 50%)"
                })
        
        clg.selectAll("myLegend").data(product_categories)
          .enter().append("rect")
            .attr('x', 10)
            .attr('y', function(d,i){ return 4 + i*(size+15)})
            .attr('width',30)
            .attr('height',2.2)
            .attr('opacity',1)
            .style("fill",  function(d){
                    return d === 'Overall Average' ? 'hsl(200deg 70% 40%)' : "hsl(39deg 90% 50%)"
                })
        
        // Add labels beside legend dots
        clg.selectAll("myLegend")
          .data(product_categories)
          .enter()
          .append("text")
            .attr("x", 50)
            .attr("y", function(d,i){ return 6 + i*(size+5)})
            .style("fill", function(d){
                    return d === 'Overall Average' ? 'hsl(200deg 70% 40%)' : "hsl(39deg 90% 50%)"
                })
            .text(function(d){ return d})
            .attr("text-anchor", "left")
            .attr("font-size","14px")
            .style("alignment-baseline", "middle")
        
    }
    
     // data -> render(data) -> PLOT
    d3.csv('spending_rise.csv')
        .then(data => {
            data.forEach(d => {
            d.Date = +d.Date;
            d.variable = d.variable;
            d.value = +d.value;
            });
        
            render(data);
        });
})