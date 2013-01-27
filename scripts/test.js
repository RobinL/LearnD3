

w = window.innerWidth-25;
h = window.innerHeight-25;
padding = 40;

svg = d3.select("body")
	.append("svg")
	.attr("width", w)
	.attr("height", h);

w = svg[0][0]["clientWidth"];
h = svg[0][0]["clientHeight"];

var dataset  = [];
for (var i = 0; i < 150; i++) {
	dataset.push(
		[Math.random()*100, Math.random()*100, Math.random()*100]);
}


//should try to use the nice function
//domainMin = d3.min(dataset);
//domainMax = d3.max(dataset);



/////////////////////////////////////////////
//Axes
//////////////////////////////////////////////



domainMin = 0;
domainMax = 100;

rangeMin = padding;
rangeMax = w-padding;

//range comes out

var xScale = d3.scale.linear()
				.domain([domainMin,domainMax])
				.range([rangeMin,rangeMax]);


var xAxis = d3.svg.axis()
	.scale(xScale);

var xAxisSvg = svg.append("g")
	.attr("class","axis")
	.call(xAxis);

xAxisSvg.attr("transform","translate(0," + (h-padding) + ")");


rangeMin = padding;
rangeMax = h-padding;

var yScale = d3.scale.linear()
	.domain([0,100])
	.range([rangeMax,rangeMin]);

var yAxis = d3.svg.axis()
	.scale(yScale)
	.orient("left");

var yAxisSvg = svg.append("g")
	.attr("class","axis")
	.call(yAxis);

yAxisSvg.attr("transform","translate(" + padding + ",0)");



/////////////////////////////////////////////
//Plotpoints
//////////////////////////////////////////////

var circles = svg.selectAll("circle")
				.data(dataset)
				.enter()
				.append("circle");



circles.attr("cx", function(d) {
	return xScale(d[0]);
	})
	.attr("cy", function(d) {
		return yScale(d[1]);
	});



domainMin = d3.min(dataset,function(d) {return (d [2]);});
domainMax = d3.max(dataset,function(d) {return (d [2]);});

var circleScale = d3.scale.linear()
					.domain([domainMin, domainMax])
					.range([2,20]);

circles.attr("r",function(d) {
		return circleScale(d[2]);
	});

var circleColourScale = d3.scale.linear()
							.domain([domainMin, domainMax])
							.range([0,255]);

circles.attr("fill", function(d){

	col = circleColourScale(d[2]);
	return d3.rgb(255-col,col,col);

});

circles.attr("stroke", function(d){

	col = circleColourScale(d[2]);
	return d3.rgb(col,255-col,255);

});


/////////////////////////////////////////////
//Updates and transitions 
//////////////////////////////////////////////


d3.select("svg")
.on("click", function() {

var dataset  = [];
for (var i = 0; i < 150; i++) {
	dataset.push(
		[Math.random()*100, Math.random()*100, Math.random()*100]);
}


svg.selectAll("circle")
	.data(dataset)
	.transition()
	.duration(2000)
	.attr("cx", function(d) {
	return xScale(d[0]);
	})
	.attr("cy", function(d) {
		return yScale(d[1]);
	})
	.attr("fill", function(d){
	col = circleColourScale(d[2]);
	return d3.rgb(col,255-col,255);})
	.attr("r",function(d) {
		return circleScale(d[2]);
	})








});