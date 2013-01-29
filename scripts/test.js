w = window.innerWidth-25;
h = window.innerHeight-25;
padding = 40;

svg = d3.select("body")
	.append("svg")
	.attr("width", w)
	.attr("height", h);

w = svg[0][0]["clientWidth"];
h = svg[0][0]["clientHeight"];




//JSON data containing starting points and ranges
var data = [
	{offenceName: "GBH with intent",
	colour: "#0072c1",
	offencesRanges: [
		
		
		{bottom: 9,
		startingpoint: 12,
		top: 16
		},
		{bottom: 5,
		startingpoint: 6,
		top: 9
		},
		{bottom: 3,
		startingpoint: 4,
		top: 5
		}
		]
	},
	{offenceName: "GBH",
	colour: "#0072c1",
	offencesRanges: [
		{bottom: 2.5,
		startingpoint: 3,
		top: 4
		},
		{bottom: 1,
		startingpoint: 1.5,
		top: 3
		},
		{bottom: "Community Order",
		startingpoint: "Community Order",
		top: 51/52
		}
		]
	},
	{offenceName: "ABH",
	colour: "#0072c1",
	offencesRanges: [
		{
		name: "Category 1",
		bottom: 1,
		startingpoint: 1.5,
		top: 3
		},
		{
		name: "Category 2",
		bottom: "Community Order",
		startingpoint: 0.5,
		top: 51/52
		},
		{
		name: "Category 3",
		bottom: "Fine",
		startingpoint: "Community Order",
		top: "Community Order"
		}
		]
	},
	{offenceName: "Assault with intent to resist arrest",
	colour: "#0072c1",
	offencesRanges: [
		{
		name: "Category 1",
		bottom: 12/52,
		startingpoint: 0.5,
		top: 51/52
		},
		{
		name: "Category 2",
		bottom: "Community Order",
		startingpoint: "Community Order",
		top: "Community Order"
		},
		{
		name: "Category 3",
		bottom: "Fine",
		startingpoint: "Fine",
		top: "Fine"
		}
		]
	},
	{offenceName: "Assault on a police constable in execution of his duty",
	colour: "#0072c1",
	offencesRanges: [
		{
		name: "Category 1",
		bottom: "Community Order",
		startingpoint: 12/52,
		top: 0.5
		},
		{
		name: "Category 2",
		bottom: "Community Order",
		startingpoint: "Community Order",
		top: "Community Order"
		},
		{
		name: "Category 3",
		bottom: "Fine",
		startingpoint: "Fine",
		top: "Fine"
		}
		]
	},
	{offenceName: "Common Assault",
	colour: "#0072c1",
	offencesRanges: [
		{
		name: "Category 1",
		bottom: "Community Order",
		startingpoint: 12/52,
		top: 0.5
		},
		{
		name: "Category 2",
		bottom: "Fine",
		startingpoint: "Community Order",
		top: "Community Order"
		},
		{
		name: "Category 3",
		bottom: "Discharge",
		startingpoint: "Fine",
		top: "Fine"
		}
		]
	}
	
];


var disposalWidth = 350+padding;
var custodyWidth = 100;

var bottomAxisPosition = 500;

var glHeight = 10;
var glSpacing = 50;

var transitionDuration = 5000;




/////////////////////////////////////////////////
//Axes and scales
/////////////////////////////////////////////////



//An ordinal scale to cover discharge,fine,community order
var disposalScale = d3.scale.ordinal()
						.domain(["Discharge","Fine", "Community Order"])
						.rangeBands([padding,disposalWidth]);

//disposalScale("Community Order") -> 80
//disposalScale.rangeBand() -> 40

var disposalAxis = d3.svg.axis().scale(disposalScale).ticks(0).tickSize(0);

svg.append("g")
	.attr("class", "axes");

svg.select(".axes")
	.append("g")
	.attr("class", "axis")
	.call(disposalAxis);


maxDisposal = disposalScale.rangeExtent()[1];
maxCust01 = maxDisposal+custodyWidth*2;

var custodyScale01 = d3.scale.linear()
						.domain([0,1])
						.range([maxDisposal,maxCust01]);

var custodyScaleAxis01 = d3.svg.axis().scale(custodyScale01).ticks(2).tickSubdivide(1).tickPadding(3);;

svg.select(".axes").append("g")
	.attr("class", "axis")
	.call(custodyScaleAxis01);


var custodyScales=[];
var custodyScaleAxes = [];

for (var i = 0; i < 5; i++) {

	var min = maxCust01 + custodyWidth*i;
	var max = maxCust01 + custodyWidth*(i+1);

	var domainMin = Math.pow(2,i);
	var domainMax = Math.pow(2,i+1);

	custodyScales[i] = d3.scale.linear()
							.domain([domainMin,domainMax])
							.range([min,max]);

	custodyScaleAxes[i] = d3.svg.axis()
							.scale(custodyScales[i])
							.ticks((i)*2)
							.tickSubdivide(1)
							.tickPadding(3);

	svg.select(".axes").append("g")
		.attr("class", "axis")
		.call(custodyScaleAxes[i]);
	
}

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
	.attr("y2",500)
	.attr("class","gridLines");





/////////////////////////////////////////////////
//Draw guideline ranges
/////////////////////////////////////////////////

svg.select(".axes")
.attr("transform", "translate(0," + bottomAxisPosition + ")");

function sentenceToPositionMapper(sentence, topOrBottom) {

	var returnVal;

	if (sentence === "Discharge" || sentence ==="Fine" || sentence === "Community Order"){

		returnVal = disposalScale(sentence);

		if (topOrBottom === 1) {
			returnVal += disposalScale.rangeBand();
		}

		return returnVal;

	}


	if (inDomain(sentence, custodyScale01.domain())) {
			return custodyScale01(sentence);
		}

	for (var i = 0; i < 5; i++) {
		if (inDomain(sentence, custodyScales[i].domain())) {
			return custodyScales[i](sentence);
		}
	}

};


function inDomain(num,arr) {

	if (num>=arr[0] & num<= arr[1]) {
		return true;
	}
	else {
		return false;
	}

}




var glsOverall = svg.selectAll("overallGuidelines")
					.data(data)
					.enter()
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
					.attr("opacity", 0.15);


for (var gl = 0; gl < data.length; gl++) {


	var gls = svg.selectAll("rectangle"+gl)
		.data(data[gl].offencesRanges)
		.enter()
		.append("rect")
		.attr("class", "rectangle"+gl)
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

	
};







//Respond to the click event
d3.select("svg").on("click", function() {

	var data = [
	{offenceName: "Aggravated burglary",
	colour: "#4AAB2E",
	offencesRanges: [
		{
		name: "Category 1",
		bottom: 9,
		startingpoint: 10,
		top: 13
		},
		{
		name: "Category 2",
		bottom: 4,
		startingpoint: 6,
		top: 9
		},
		{
		name: "Category 3",
		bottom: 1,
		startingpoint: 2,
		top: 4
		}
		
		]
	},
	{offenceName: "Domestic burglary",
	colour: "#4AAB2E",
	offencesRanges: [
		{bottom: 2,
		startingpoint: 3,
		top: 6
		},
		{bottom: "Community Order",
		startingpoint: 1,
		top: 2
		},
		{bottom: "Community Order",
		startingpoint: "Community Order",
		top: 0.5
		}
	
		]
	},
	{offenceName: "Non-domestic burglary",
	colour: "#4AAB2E",
	offencesRanges: [
		{bottom: 1,
		startingpoint: 2,
		top: 5
		},
		{bottom: "Community Order",
		startingpoint: 18/52,
		top: 51/52
		},
		{bottom: "Fine",
		startingpoint: "Community Order",
		top: 18/52
		}
	
		]
	}
	];




	var glsOverall = svg.selectAll(".overallGuidelines")
					.data(data)

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
						return sentenceToPositionMapper(d.offencesRanges[0].bottom,0);
					})
					.attr("width", function(d){
						return sentenceToPositionMapper(d.offencesRanges[d.offencesRanges.length-1].top,0) - sentenceToPositionMapper(d.offencesRanges[0].bottom,0);
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
		.duration(transitionDuration)
		.attr("width",0)
		.attr("height",0)
		.remove()








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

	d3.selectAll("rect").on("mouseover", function() {


		if (this.__data__.offenceName) {var text = (this.__data__.offenceName)}
		else {
			var text = "Bottom of range: " +this.__data__.bottom + " and top of range: " + this.__data__.top
		}

		d3.select("div").text(text)


		
})

});

