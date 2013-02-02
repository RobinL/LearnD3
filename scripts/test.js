w = window.innerWidth-25;
h = window.innerHeight-25;
padding = 40;

svg = d3.select("body")
	.append("svg")
	.attr("width", w)
	.attr("height", h);

w = svg[0][0]["clientWidth"];
h = svg[0][0]["clientHeight"];


var data = JSONData[0];

var disposalWidth = 350+padding;
var custodyWidth = 100;

var bottomAxisPosition = 300;

var glHeight = 30;
var catSpacing = 0;  //Spacing must be > -1*glHeight and less than about glHeight/4

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

svg.select(".axes")
	.append("text")
	.text("Sentence length in years")
	.attr("dx", 350+padding+custodyWidth*3)
	.attr("dy",35)



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

group = svg.append("g").attr("class","gridLines");

group.selectAll("gridLines")
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






d3.select("select").on("change", function(){

	//Get data
	var selection = d3.select("select")[0][0].value;
	data = JSONData[selection];

	//GuidelineGroups will be a selection of each guideline with class .overallGuidelines.  Nested within these guidelines is the category range data.
	var guidelineGroups = svg.selectAll(".overallGuidelines").data(data);

/*
	When we update the data we want to:
	1.  Determine whether any 'parent' guidelines need to enter
		a.  Animate entrance of parent
		b.  Animate entrance of chilren (category ranges)
	2.  Determine whether any 'parent' guideline need to be updated
		a. Animate parent	(overall guideline range)
		b. Animate children (category ranges)
	3.  Determine whether any 'parent' guidelines need to exit
		a. Animate children being removed
		b.  Animate parent removal
		c.  Ensure that removal of parent elements happens only after animations have
*/
	
	
	//Enter for 'parent' rectangles, which represent the overall guideline range
	guidelineGroups.enter()
		.append("g")
			.attr("class","overallGuidelines")
		.append("rect") //You can chain append statements, but only if the previous append is suitable (e.g. you can't append anything to a rectangle)
			.attr("class","guidelineGroupsRectanges")
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
				return glHeight;
			})
			.attr("fill", function(d) {
				return d.colour;
			})
			.style("opacity",0.0);
	//You can think of the enter function as 'selecting' all the elements which are entering with the assigned dataset


	//Guideline groups now exist.  We can select them and add text



			
	
				

	//Update() for 'parent' rectangles.  Note that unlike enter() and exit() there's update() is implicit.
	guidelineGroups.select(".guidelineGroupsRectanges")
					.transition()
					.duration(transitionDuration)
					.attr("x", function(d) {
						return sentenceToPositionMapper(d.offencesRanges[d.offencesRanges.length-1].bottom,0);
					})
					.attr("width", function(d){
						return (sentenceToPositionMapper(d.offencesRanges[0].top,0)- sentenceToPositionMapper(d.offencesRanges[d.offencesRanges.length-1].bottom,0));
					})
					.attr("y", function(d,i) {
						return glSpacing*i;
					})
					.attr("height", function(d,i){
						return glHeight;
					})
					.attr("fill", function(d) {
						return d.colour;
					})
					.style("opacity",0.15);
	


	//Enter for category ranges
	guidelineGroups
			.selectAll(".categoryRangeRect") //We're performing a 'double' or 'nested' selection.  This means that for each element in guidelineGroups we will make a selection. As a result there's a nested loop going on.  D3 helps us out by indexing both of these loops using i and j
			.data(cross("offencesRanges"))  //The cross function outputs a FUNCTION.  It inputs the data for the parent element it, and does something a bit like a cartesian join against each of the three category ranges in the child data.  This means that each child has access to the parent data.
			.enter()
			.append("rect")
			.attr("class", "categoryRangeRect")
			.attr("x", function(d,i) {
				return (
				sentenceToPositionMapper(d.cat.bottom,0) +
				sentenceToPositionMapper(d.cat.top,1)
				)/2
				;
			})
			.attr("width", 0)
			.attr("y",function(d,i,j) {
								
				var numSpaces = d.gl.offencesRanges.length-1;
				var totalSpace =  numSpaces*catSpacing;
				var catHeight = (glHeight-totalSpace)/(d.gl.offencesRanges.length);
				var spaceToSplit = glHeight - catHeight;
				var spaceSplit = spaceToSplit/(d.gl.offencesRanges.length-1);

		


				return j*glSpacing + spaceSplit*i ;
			})
			.attr("height",function(d,i){

				return glHeight/(d.gl.offencesRanges.length)-catSpacing;
			})
			.attr("fill",function(d,i){

				var lightnessScale = d3.scale.linear()
					.domain([0,d.gl.offencesRanges.length-1])
					.range([0.1,0.6]);

				col = d3.hsl(d.gl.colour);
				col.l = lightnessScale(i);

			return col;

			});
	

	//Update() for category ranges
	guidelineGroups.selectAll(".categoryRangeRect")
					.data(cross("offencesRanges"))
					.transition()
					.duration(transitionDuration)
					.attr("class", "categoryRangeRect")
					.attr("x", function(d,i) {
						return sentenceToPositionMapper(d.cat.bottom,0);
					})
					.attr("width", function(d){
						return (sentenceToPositionMapper(d.cat.top,1)- sentenceToPositionMapper(d.cat.bottom,0));
					})
					.attr("y",function(d,i,j) {
						
						numSpaces = d.gl.offencesRanges.length-1;

						totalSpace =  numSpaces*catSpacing;

						
						var catHeight = (glHeight-totalSpace)/(d.gl.offencesRanges.length);

						var spaceToSplit = glHeight - catHeight;

						var spaceSplit = spaceToSplit/(d.gl.offencesRanges.length-1);


						


						return j*glSpacing + spaceSplit*i ;
										
					})
					.attr("height",function(d,i){
						return  (glHeight-totalSpace)/(d.gl.offencesRanges.length);
					})
					.attr("fill",function(d,i){

						var lightnessScale = d3.scale.linear()
							.domain([0,d.gl.offencesRanges.length-1])
							.range([0.1,0.6]);

						col = d3.hsl(d.gl.colour);
						col.l = lightnessScale(i);

					return col;

					});

					//Can we bind data to the last

		//Exit() for both guideline ranges and category ranges
		guidelineGroups.exit().selectAll(".categoryRangeRect")
					.data(cross("offencesRanges"))
					.transition()
					.duration(transitionDuration/2)
					.attr("width", 0)
					.attr("x", function(d,i) {
						return (
						sentenceToPositionMapper(d.cat.bottom,0) +
						sentenceToPositionMapper(d.cat.top,1)
						)/2
						;
					})
					.remove().each("end", function() {      //This is a callback that happens once the animation completes
						svg.selectAll(".overallGuidelines")
						.data(data)
						.exit()
						.remove();
					});
						







					

	guidelineGroups.exit()
		.select(".guidelineGroupsRectanges")
		.transition()
		.duration(transitionDuration)
		.style("opacity",0.0)
		.remove().each("end", function() {
			svg.selectAll(".overallGuidelines")
				.data(data)
				.exit()
				
				.remove();
		})

	var newAxesPos = data.length*glSpacing;
	var oldAxesPos = svg.select(".axes").data()[0];

	//Update axis position

		

      
	//Update gridlines

	if (newAxesPos-oldAxesPos > 20 ){
		//axis animating up the page
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


		d3.selectAll("g .gridLines")
		.data(gridData)
		.transition()
		.duration(transitionDuration)
		.attr("x1",function(d){return d;})
		.attr("x2",function(d){return d;})
		.attr("y1",0)
		.attr("y2",data.length*glSpacing);
	
	}

	else {
		//axes going down the page
		svg.select(".axes").data([data.length*glSpacing])
			.transition()	
			.delay(transitionDuration/2)	
			.duration(transitionDuration/2)
			.attr("transform", "translate(0," + data.length*glSpacing + ")");

		d3.selectAll("g .gridLines")
		.data(gridData)
		.transition()
		.delay(transitionDuration/2)	
		.duration(transitionDuration/2)
		.attr("x1",function(d){return d;})
		.attr("x2",function(d){return d;})
		.attr("y1",0)
		.attr("y2",data.length*glSpacing);


	}


	//Labels etc

	glNameLabels  = svg.selectAll(".glNameLabels").data(data);
			
	glNameLabels.enter()
			.append("text")
			.attr("class","glNameLabels")
			.attr("dx", function(d) {
						return 10+sentenceToPositionMapper(d.offencesRanges[0].top,0);
					})
			.attr("dy", function(d,i) {
						return i*glSpacing +20;
					})
			.text(function(d) {
				return d.offenceName;
			})
			.style("opacity",0);

	glNameLabels
			.transition()
			.duration(transitionDuration/2)
			.style("opacity",0)
			.transition()
			.duration(0)
			.attr("class","glNameLabels")
			.attr("dx", function(d) {
						return 10+sentenceToPositionMapper(d.offencesRanges[0].top,0);
					})
			.attr("dy", function(d,i) {
						return i*glSpacing +20;
					})
			.text(function(d) {
				return d.offenceName;
			})
			.transition()
			.duration(transitionDuration/2)
			.style("opacity",1)
			
			
			
			

	glNameLabels.exit().remove();
			






	guidelineGroups = svg.selectAll(".overallGuidelines");
	

});

d3.select("select").on("change")();


//Utility functions

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

}

function cross(a) {
		return function(d) {
			b = d[a]
			var c = [];
			for(var i = 0, n = b.length; i < n; i++) c.push({
				gl: d,
				cat: b[i]
			});
			return c;
		};
	}
