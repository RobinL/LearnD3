
window.onload = function() {

 dataset = [];

for (var i = 1; i<100; i++) {
	dataset.push((Math.cos(i/5)+1.1)*8);
}




 w = 1500;
 h = 800;

svg = d3.select("body")
	.append("svg")
	.attr("width", w)
	.attr("height", h);

rectangles = svg.selectAll("rect")
	.data(dataset)
	.enter()
	.append("rect")
	.attr("x",0)
	.attr("y",0)
	.attr("width",10)
	.attr("height",100);

rectangles.attr("x", function(d,i) {
	return i * 11;
});

rectangles.attr("height",function(d) { return d*20;});

rectangles.attr("y",function(d) { return h-d*20;});


};

var j = 1;




d3.timer(function() {
  
dataset = [];

j=j+0.1;

for (var i = 1; i<100; i++) {
	dataset.push((Math.cos((i+j)/5)+1.1)*8 +Math.sin(i/8.2)*5+5);
}


rectangles = svg.selectAll("rect")
	.data(dataset);

	

rectangles.attr("x", function(d,i) {
	return i * 11;
});

rectangles.attr("height",function(d) { return d*20;});

rectangles.attr("y",function(d) { return h-d*20;});

rectangles.attr("fill", function(d,i) {
	return d3.rgb(i*2,255-5*i,d*5)
})


 });