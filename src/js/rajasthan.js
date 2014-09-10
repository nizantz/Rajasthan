var width = 1000,
  height = 1000;
  var indCanvas = d3.select("div").append("svg")
  .attr('width',width)
  .attr('height',height);

d3.json('data/raj.json', function(err, data) {
//  if (err) return console.error(err);
  var group = indCanvas.selectAll('g')
      .data(data.features)
      .enter()
      .append('g');
  var projection = d3.geo.albers()
  .rotate([275, 0])
  .center([0, 10])
  .parallels([-10, 0])
  .scale(1500)
  .translate([width / 2, height / 2]);
  

  //var projection = d3.geo.mercator()
  //                   .scale(1000)
  //                   .translate([width / 2, height / 2]);
  var path = d3.geo.path().projection(projection);

  var areas = group.append('path')
    .attr('d',path)
    .attr('class','area')
    .attr('fill','red')
    .attr("stroke","black")
    .attr("stroke-width","0.5");

    var tooltip = indCanvas.selectAll(".statelabel")
                  .data(data.features.NAME_1)
                  .enter().append("text")
                  .attr("class","statelabel")
                  .text(function(d){return d;})                 
});