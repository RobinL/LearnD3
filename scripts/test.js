
window.onload = function() {

w = window.innerWidth-5;
h = window.innerHeight-5;

padding = 40;

svg = d3.select("body")
	.append("svg")
	.attr("width", w-20)
	.attr("height", h-20)

w = svg[0][0]["clientWidth"];
h = svg[0][0]["clientHeight"];

var dataset  = [];
for (var i = 0; i < 100; i++) {
	dataset.push(Math.random()*100);
}


//domain goes in

domainMin = d3.min(dataset);
domainMax = d3.max(dataset);

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





};
