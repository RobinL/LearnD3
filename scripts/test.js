w = window.innerWidth-25;
h = window.innerHeight-25;
padding = 40;

svg = d3.select("body")
	.append("svg")
	.attr("width", w)
	.attr("height", h);

w = svg[0][0]["clientWidth"];
h = svg[0][0]["clientHeight"];


var data = JSONData.Assaults;


var disposalWidth = 350+padding;
var custodyWidth = 100;

var bottomAxisPosition = 300;

var glHeight = 10;
var glSpacing = 50;

var transitionDuration = 1500;


/////////////////////////////////////////////////
//Axes and scales
/////////////////////////////////////////////////


//An ordinal scale to cover discharge,fine,community order
var disposalScale = d3.scale.ordinal()
						.domain(["Discharge","Fine", "Community Order"])
						.rangeBands([padding,disposalWidth]);


var disposalAxis = d3.svg.axis()
					.scale(disposalScale)
					.ticks(0)
					.tickSize(0);

svg.append("g")
	.attr("class", "axes");

svg.select(".axes")
	.append("g")
	.attr("class", "axis")
	.call(disposalAxis);


maxDisposal = disposalScale.rangeExtent()[1];
maxCust01 = maxDisposal+custodyWidth*2;

var custodyScale = d3.scale.linear()
						.domain([0,1,2,4,8,16,32])
						.range(d3.range(0+maxDisposal,700+maxDisposal,100));


var custodyScaleAxis = d3.svg.axis()
						.scale(custodyScale)
						.tickValues([0,1,2,3,4,6,8,10,12,14,16,20,24,28,32]);

svg.select(".axes").append("g")
	.attr("class", "axis")
	.call(custodyScaleAxis);

svg.select(".axes").data([data.length*glSpacing])
			.attr("transform", "translate(0," + data.length*glSpacing + ")");


//Grid Lines

gridData = [];

gridData.push(sentenceToPositionMapper("Discharge",0));
gridData.push(sentenceToPositionMapper("Fine",0));
gridData.push(sentenceToPositionMapper("Community Order",0));
gridData.push(sentenceToPositionMapper(0));

for (var i = 0; i < 6; i++) {
	gridData.push(sentenceToPositionMapper(Math.pow(2,i)));
};

svg.selectAll("gridLines")
	.data(gridData)
	.enter()
	.append("line")
	.attr("x1",function(d){return d;})
	.attr("x2",function(d){return d;})
	.attr("y1",0)
	.attr("y2",bottomAxisPosition)
	.attr("class","gridLines");





/////////////////////////////////////////////////
//Draw guideline ranges
/////////////////////////////////////////////////


function sentenceToPositionMapper(sentence, topOrBottom) {

	var returnVal;

	if (sentence === "Discharge" || sentence ==="Fine" || sentence === "Community Order"){

		returnVal = disposalScale(sentence);

		if (topOrBottom === 1) {
			returnVal += disposalScale.rangeBand();
		}

		return returnVal;

	}


	if (sentence >=0) {
			return custodyScale(sentence);
		}

	

};










//Respond to the click event
// d3.select("svg").on("click", function() {

d3.select("select").on("change", function(){

	var selection = d3.select("select")[0][0].value;

	data = JSONData[selection];

	
	var glsOverall = svg.selectAll(".overallGuidelines")
					.data(data);

	glsOverall.transition()
				.duration(transitionDuration)
				.attr("x", function(d) {
						return sentenceToPositionMapper(d.offencesRanges[d.offencesRanges.length-1].bottom,0);
					})
					.attr("width", function(d){
						return (sentenceToPositionMapper(d.offencesRanges[0].top,0)- sentenceToPositionMapper(d.offencesRanges[d.offencesRanges.length-1].bottom,0));
					})
				.attr("y", function(d,i) {
					return i*glSpacing;
				})
				.attr("height", function(d,i){
					return (d.offencesRanges.length)*glHeight;
				})
				.attr("fill", function(d) {
					return d.colour;
				})
				.attr("opacity", 0.15);

	glsOverall.enter()
			.append("rect")
					.attr("class","overallGuidelines")
					.attr("x", function(d) {
						return sentenceToPositionMapper(d.offencesRanges[d.offencesRanges.length-1].bottom,0);
					})
					.attr("width", function(d){
						return (sentenceToPositionMapper(d.offencesRanges[0].top,0)- sentenceToPositionMapper(d.offencesRanges[d.offencesRanges.length-1].bottom,0));
					})
					.attr("y", function(d,i) {
						return i*glSpacing;
					})
					.attr("height", function(d,i){
						return (d.offencesRanges.length)*glHeight;
					})
					.attr("fill", function(d) {
						return d.colour;
					})
					.attr("opacity", 0)
					.transition()
					.duration(transitionDuration)
					.attr("opacity", 0.15);


	glsOverall
		.exit()
		.transition()
		.duration(transitionDuration/3)
		.attr("opacity",0)
		.remove();




	for (var gl = 0; gl < data.length; gl++) {


		var thisone = svg.selectAll(".rectangle"+gl)
			.data(data[gl].offencesRanges);
		
		thisone
			.transition()
			.duration(transitionDuration)
			.attr("x", function(d) {
				return sentenceToPositionMapper(d.bottom,0);
			})
			.attr("width", function(d){
				return sentenceToPositionMapper(d.top,1) -sentenceToPositionMapper(d.bottom,0);
			})
			.attr("y",function(d,i) {
				return i*glHeight +gl*glSpacing;
			})
			.attr("height",glHeight)
			.attr("fill",function(d,i){

			var lightnessScale = d3.scale.linear()
							.domain([0,data[gl].offencesRanges.length-1])
							.range([0.1,0.6]);

			col = d3.hsl(data[gl].colour);
			col.l = lightnessScale(i);

			return col;

		});


	thisone
		.enter()
		.append("rect")
		.attr("class", "rectangle"+gl)
		.attr("x", function(d) {
		return sentenceToPositionMapper(d.bottom,0);
		})
	.attr("width", 0)
	.attr("y",function(d,i) {
		return i*glHeight +gl*glSpacing;
		})
	.attr("height",glHeight)
	.attr("fill",function(d,i){

		var lightnessScale = d3.scale.linear()
						.domain([0,data[gl].offencesRanges.length-1])
						.range([0.1,0.6]);

		col = d3.hsl(data[gl].colour);
		col.l = lightnessScale(i);

		return col;

	})
	.transition()
      .duration(transitionDuration)
      .attr("width", function(d){
		return sentenceToPositionMapper(d.top,1) -sentenceToPositionMapper(d.bottom,0);
		})


      thisone
		.exit()
		.transition()
		.duration(transitionDuration)
		.attr("width",0)
		.attr("height",0)
		.remove()
		
			
	};


	for (var gl = 0; gl < data.length+10; gl++) {

		if (!data[gl]) {
		var thisone = svg.selectAll(".rectangle"+gl)
		.transition()
		.duration(transitionDuration/3)
		.attr("opacity",0)
		.remove()
	}
	}


	var newAxesPos = data.length*glSpacing;
	var oldAxesPos = svg.select(".axes").data()[0];

	if (newAxesPos > oldAxesPos) {
		svg.select(".axes").data([data.length*glSpacing])
			.transition()
			.duration(transitionDuration/4)
			.style("opacity",0)
			.transition()
			.duration(0)
			.attr("transform", "translate(0," + data.length*glSpacing + ")")
			.transition()
			.delay(2*transitionDuration/4)
			.duration(transitionDuration/2)
			.style("opacity",1)


		

		svg.selectAll(".gridLines")
			.data(gridData)
			.transition()
			.duration(transitionDuration/2)
			.attr("x1",function(d){return d;})
			.attr("x2",function(d){return d;})
			.attr("y1",0)
			.attr("y2",data.length*glSpacing)
			.attr("class","gridLines");

	} else {

		svg.select(".axes").data([data.length*glSpacing])
			.transition()
			.delay(transitionDuration/3)
			.duration(transitionDuration/2)
			.attr("transform", "translate(0," + data.length*glSpacing + ")");

		svg.selectAll(".gridLines")
			.data(gridData)
			.transition()
			.delay(transitionDuration/3)
			.duration(transitionDuration/2)
			.attr("x1",function(d){return d;})
			.attr("x2",function(d){return d;})
			.attr("y1",0)
			.attr("y2",data.length*glSpacing)
			.attr("class","gridLines");
	}

	




	d3.selectAll("rect").on("mouseover", function() {


		if (this.__data__.offenceName) {var text = (this.__data__.offenceName)}
		else {
			var text = "Bottom of range: " +this.__data__.bottom + " and top of range: " + this.__data__.top
		}

		d3.select("div").text(text)


		
})

});

d3.select("select").on("change")();