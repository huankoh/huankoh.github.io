window.addEventListener('load', function(){
    
    const width2 = window.innerWidth*0.8;
    const height2 = 560;
    
    const svg2 = d3.select('#pc_scatter').append('svg')
        .attr("width",width2)
        .attr("height",height2);
    
    
    // for month
    var months = [ "January", "February", "March", "April", "May", "June", 
           "July", "August", "September", "October", "November", "December" ];
    
    const render2 = data => {

        const title2 = 'Erratic Spending Behaviour';
  
        const xValue2 = d => d.Date;
        const xAxisLabel2 = '';

        const yValue2 = d => d.value;
        const yAxisLabel2 = 'Annual Percentage Change';
        // circle radius size 
        const circleRadius2 = 3.4;

        const margin2 = { top: 108, right: 150, bottom: 108, left: 150 };
        const innerWidth2 = width2 - margin2.left - margin2.right;
        const innerHeight2 = height2 - margin2.top - margin2.bottom;
        
        
        // Color scale based on day:
        const color2 = d3.scaleOrdinal()
            .domain(d3.extent(data, d => d.variable))
            .range(['#C0C0C0'])
        //const color = "grey"
         // x-axis scale based on year
        const xScale2 = d3.scaleTime()
            .domain(d3.extent(data, xValue2))
            .range([0, innerWidth2]);
        // y-axis scale based on percentage changes
        const yScale2 = d3.scaleLinear()
            .domain(d3.extent(data, yValue2))
            .range([innerHeight2, 0])
            .nice();
        
        const g2 = svg2.append('g')
            .attr('transform', `translate(${margin2.left},${margin2.top})`);
        
        // X-axis and Y-axis
        const xAxis2 = d3.axisBottom(xScale2)
            .ticks(11)
            .tickSize(5)
            .tickSizeOuter(0)
            .tickPadding(15);
        
        // y axis and y grid lines
        const yAxis2 = d3.axisRight(yScale2)
            .ticks(16)
            .tickSize(innerWidth2)
            .tickFormat("");
  
        const yAxisG2 = g2.append('g').call(yAxis2)
            .attr("class", "y axis")
            .attr('opacity',0.15)
            .attr('fill','#fafafa')
            .call(yAxis2)
            .style("stroke-dasharray", "2 2");
        
        yAxisG2.selectAll('.domain').remove();
        
        // y axis and y grid lines
        var y_tick_labels2 = [60,50,40,30,20,10,0,-10,-20,-30,-40,-50,-60,-70,-80]
        
        g2.append('g').append('text')
            .attr('class', 'yaxis-label')
            .attr('y', innerWidth2 + 45)
            .attr('x', -innerHeight2 / 2)
            .attr('fill', '#c9c9c9')
            .attr("font-family", "Georgia")
            .attr('transform', `rotate(-90)`)
            .attr("font-size","12px")
            .attr('text-anchor', 'middle')
            .text(yAxisLabel2);
        
        g2.append('g').append('text')
            .attr('class', 'yaxis-label')
            .attr('y',  - 15)
            .attr('x', innerWidth2 + 9)
            .attr('fill', '#999')
            .attr("font-size","9px")
            .attr("font-family", "Georgia")
            .style("alignment-baseline", "middle")
            .text('%');
        
        g2.selectAll('ylabels').data(y_tick_labels2)
            .enter().append('text')
            .attr("x", innerWidth2 + 9)
            .attr("y", function(d,i){ return i * (innerHeight2/14)})
            .style("fill", '#999')
            .text(function(d){ return d})
            .attr("text-anchor", "left")
            .attr("font-size","9px")
            .attr("font-family", "Georgia")
            .style("alignment-baseline", "middle")
    
        
        // x axis
        const xAxisG2 = g2.append('g').call(xAxis2)
            .attr('transform', `translate(0,${innerHeight2})`);

        xAxisG2.append('text')
            .attr('class', 'x axis')
            .attr('y', 75)
            .attr('x', innerWidth2 / 2)
            .attr('fill', 'black')
            .text(xAxisLabel2);
        // For annotation //

         // rect for annotations
        g2.append('rect')
            .attr('y',yScale2(-36))
            .attr('x',xScale2(new Date('6/1/80')))
            .attr('height',50)
            .attr('width',1)
            .attr('fill','#333')
            .attr('opacity',0.5)
            .attr('transform',`rotate(340,${xScale2(new Date('6/1/80'))},${yScale2(-36)})`)
     
         // rect for annotations
        g2.append('rect')
            .attr('y',yScale2(-10))
            .attr('x',xScale2(new Date('3/1/82')))
            .attr('height',125)
            .attr('width',1)
            .attr('fill','#333')
            .attr('opacity',0.5)
            .attr('transform',`rotate(340,${xScale2(new Date('3/1/82'))},${yScale2(-26)})`)
        
         // rect for annotations
        g2.append('rect')
            .attr('y',yScale2(-25.16))
            .attr('x',xScale2(new Date('3/1/91')))
            .attr('height',75)
            .attr('width',1)
            .attr('fill','#333')
            .attr('opacity',0.5)
            .attr('transform',`rotate(310,${xScale2(new Date('3/1/91'))},${yScale2(-25.16)})`)
        
        
        // shade covid-19 crisis in red
        g2.append('rect')
            .attr('y',yScale2(60))
            .attr('x',xScale2(new Date('3/1/20')))
            .attr('height',innerHeight2)
            .attr('width',xScale2(new Date('6/1/20')) - xScale2(new Date('3/1/20')) + 3)
            .attr('fill','red')
            .attr('opacity',0.1);
        
        // shade GFC crisis in red
        g2.append('rect')
            .attr('y',yScale2(60))
            .attr('x',xScale2(new Date('12/1/07')))
            .attr('height',innerHeight2)
            .attr('width',xScale2(new Date('6/1/09')) - xScale2(new Date('12/1/07')) + 3)
            .attr('fill','red')
            .attr('opacity',0.1);
        // div.tooltips
        var tooltip2 = d3.select("body")
            .append("div")
            .style("position", "absolute")
            .style("z-index", "1")
            .style("visibility", "hidden")
            .style("display", "inline-block")
            .style("color", "black");
    

        // Circles - Scatter plot
        circles2 = g2.selectAll('circle').data(data)
            .enter().append('circle')
            .attr('cy', d => yScale2(yValue2(d)))
            .attr('cx', d => xScale2(xValue2(d)))
            .attr('r', circleRadius2)
            .attr('fill', function(d,i){
                    return d.variable === 'Overall Average' ? 'hsl(200deg 70% 40%)' : "#C0C0C0"
            })
            .attr('class','circle')
            .attr('opacity',function(d,i){
                    return d.variable === 'Overall Average' ? 0.6 : 0.3
            });
    
        
        // To show info about each obs when mouse hover over 
        circles2
            .on("mouseover", function(d,i){
                    // show the information for each node
                    return tooltip2.style('visibility', 'visible')
                       .style('left', (event.pageX - 20) + 'px')
                       .style('top', (event.pageY - 60) + 'px')
                       .html("<u><b>" + i.variable + "</u></b>" + "<br/>" + "Percentage change in spending (vs last year): " + i.value.toFixed(2) + "%" + "<br/>" + "Time Period: " +months[i.Date.getMonth()] + " " + i.Date.getFullYear())
            })
            .on("mouseout",function(d,i){
                        return tooltip2.style('visibility', 'hidden');
                        });
        
        // LINE GRAPH
        nested_data2 = Object.fromEntries(d3.group(data, d=>d.variable));
        
        nested2 = Object.entries(nested_data2).map(([key, value]) => ({key,value}));

        const lineGenerator2 = d3.line()
            .x(d => xScale2(xValue2(d)))
            .y(d => yScale2(yValue2(d)));
        
        
        line2 = g2.selectAll('.line-path').data(nested2)
            .enter().append("path")
                .attr("class", "line-path")
                .attr('opacity',function(d){
                    return d.key === 'Overall Average' ? 0.8 : 0;
                })
                .attr("d", d => lineGenerator2(d.value))
                .attr("stroke-width",function(d){
                    return d.key === 'Overall Average' ? 1.5 : 0;
                })
                .attr("stroke", function(d,i){
                    return d.key === 'Overall Average' ? 'hsl(200deg 70% 40%)' : "yellow";
                });
        
        // Title
        g2.append('text')
            .attr('class', 'title')
            .attr('y', -40)
            .text(title2); 
        
        g2.append('text')
            .attr('y',-20)
            .attr('font-size','13px')
            .attr('font-family','georgia')
            .text('The change in fortune for various products and services is often sudden and unpredictable.');
        
        g2.append('text')
            .attr('y',yScale2(-49))
            .attr('x', xScale2(new Date('3/1/90')))
            .attr('font-size','11px')
            .attr('fill', '#333')
            .attr('font-family','georgia')
            .text('Mild recession in the 1990s.');
        g2.append('text')
            .attr('y',yScale2(-65))
            .attr('x', xScale2(new Date('6/1/80')))
            .attr('font-size','11px')
            .attr('fill', '#333')
            .attr('font-family','georgia')
            .text('A double-dip recession during 1980-1982.');
        
         g2.append('text')
            .attr('y',innerHeight2+50)
            .attr('x', 10)
            .attr('font-size','8px')
            .attr('fill', '#333')
            .attr('font-family','georgia')
            .text('*Shading indicates either a Global Financial Crisis during 07-09 period or');
      g2.append('text')
            .attr('y',innerHeight2+60)
            .attr('x', 10)
            .attr('font-size','8px')
            .attr('fill', '#333')
            .attr('font-family','georgia')
            .text('an ongoing COVID-19 health and economic crisis since March 2020.');
        // user specified product/service
        allGroupSet2 = new Set()
        
        for (var i = 0; i < data.length; i++){
            allGroupSet2.add(data[i].variable);
        };
        
        var allGroup2 = Array.from(allGroupSet2).sort();
        allGroup2.unshift("Choose one product or service:")

        // add the options to the button
        d3.select("#selectButton2")
          .selectAll('myOptions')
            .data(allGroup2)
          .enter()
            .append('option')
          .text(function (d) { return d; }) // text showed in the menu
          .attr("value", function (d) { return d; }); // corresponding value returned by the button
      
        // Second LINE GRAPH and circles 
        const lg2 = svg2.append('g')
            .attr('transform', `translate(${margin2.left},${margin2.top})`);
        
        var line22 = lg2.selectAll('.line-path').data(nested2)
            .enter().append("path")
                .attr("class", "line-path")
                .attr('opacity',function(d,i){
                    return d.key === 'Selected_GROUP' ? 0.8 : 0;
                })
                .attr("d", d => lineGenerator2(d.value))
                .attr("stroke-width",function(d){
                    return d.key === 'Overall Average' ? 1.5 : 0;
                })
                .attr("stroke", function(d,i){
                    return d.key === 'Selected_GROUP' ? 'red' : "yellow";
                });
        
        var dot2 = lg2.selectAll('circle').data(nested_data2['Overall Average'])
            .enter().append('circle')
                .attr('cy', d => yScale2(yValue2(d)))
                .attr('cx', d => xScale2(xValue2(d)))
                .attr("r",circleRadius2)
                .attr('fill', function(d,i){
                    return d.variable === 'Overall Average' ? 'hsl(200deg 70% 40%)' : "hsl(39deg 90% 50%)"
                })
                .attr('opacity',function(d,i){
                            return d.variable === 'Overall Average' ? 0.5 : 0.3
                });

                
        function update2(selectedGroup){
            // Give these new data to update line
            line22
                .transition()
                .duration(300)
                .attr("stroke-width",function(d){
                    return d.key === selectedGroup ? 1.5 : 0;
                })
                .attr('opacity',function(d,i){
                    return d.key === selectedGroup ? 0.6 : 0;
                })   
                .attr("stroke", function(d,i){
                    return d.key === selectedGroup ? 'hsl(39deg 90% 50%)' : "red";
                });
            
            if (selectedGroup == "Choose one product or service:"){
                var group2 = "Overall Average"
            } else {
                var group2 = selectedGroup
            }
            
            dot2
                .data(nested_data2[group2])
                .transition()
                .duration(300)
                .attr("cx", d => xScale2(xValue2(d)))
                .attr("cy", d => yScale2(yValue2(d)))
                .attr('fill', function(d,i){
                    return d.variable === 'Overall Average' ? 'hsl(200deg 70% 40%)' : "hsl(39deg 90% 50%)"
                })
                .attr("opacity", 0.3);
            dot2
                .on("mouseover", function(d,i){
                        // show the information for each node
                        return tooltip2.style('visibility', 'visible')
                           .style('left', (event.pageX - 20) + 'px')
                           .style('top', (event.pageY - 60) + 'px')
                            .html("<u><b>" + i.variable + "</u></b>" + "<br/>" + "Percentage change in spending (vs last year): " + i.value.toFixed(2) + "%" + "<br/>" + "Time Period: " +months[i.Date.getMonth()] + " " + i.Date.getFullYear())
                })
                .on("mouseout",function(d,i){
                        return tooltip2.style('visibility', 'hidden');
                    
                });
            
        };
        
            // When the button is changed, run the updateChart function
        d3.select("#selectButton2").on("change", function(d) {
            // recover the option that has been chosen
            var selectedOption = d3.select(this).property("value")
            // run the updateChart function with this selected option
            update2(selectedOption)
        });
        // LEGEND ////
        const clg2 = svg2.append('g')
            .attr('transform', `translate(${margin2.left},${margin2.top})`);
        // Add one dot in the legend for each name.
        var size2 = 10
        var product_categories2 = ["Overall Average", ""]
        
        clg2.selectAll("myLegend").data(product_categories2)
          .enter().append("circle")
            .attr("cx", 10)
            .attr("cy", function(d,i){ return 5 + i*(size2+15)}) 
            .attr("r", circleRadius2)
            .attr('opacity',1)
            .style("fill",  function(d){
                    return d === 'Overall Average' ? 'hsl(200deg 70% 40%)' : "hsl(39deg 90% 50%)"
                })
        
        clg2.selectAll("myLegend").data(product_categories2)
          .enter().append("circle")
            .attr("cx", 40)
            .attr("cy", function(d,i){ return 5 + i*(size2+15)}) 
            .attr("r", circleRadius2)
            .attr('opacity',1)
            .style("fill",  function(d){
                    return d === 'Overall Average' ? 'hsl(200deg 70% 40%)' : "hsl(39deg 90% 50%)"
                })
        
        clg2.selectAll("myLegend").data(product_categories2)
          .enter().append("rect")
            .attr('x', 10)
            .attr('y', function(d,i){ return 4 + i*(size2+15)})
            .attr('width',30)
            .attr('height',2.2)
            .attr('opacity',1)
            .style("fill",  function(d){
                    return d === 'Overall Average' ? 'hsl(200deg 70% 40%)' : "hsl(39deg 90% 50%)"
                })
        
        // Add labels beside legend dots
        clg2.selectAll("myLegend")
          .data(product_categories2)
          .enter()
          .append("text")
            .attr("x", 50)
            .attr("y", function(d,i){ return 6 + i*(size2+5)})
            .style("fill", function(d){
                    return d === 'Overall Average' ? 'hsl(200deg 70% 40%)' : "hsl(39deg 90% 50%)"
                })
            .text(function(d){ return d})
            .attr("text-anchor", "left")
            .attr("font-size","14px")
            .style("alignment-baseline", "middle")
        
    }
      
    // data -> render(data) -> PLOT
    d3.csv('percentage_change.csv')
        .then(data => {
            data.forEach(d => {
            d.Date = new Date(d.Date);
            d.variable = d.variable;
            d.value = +d.value;
            });
        
            render2(data);
        });
})