import {mu} from "../modules/Constants";
import * as OrbitalMechanics from "../modules/OrbitalMechanics";

var chart = {}

chart.create = function(el, orbit) {

  var margin = {top: 10, right: 10, bottom: 10, left: 10},
      width = 480 - margin.left - margin.right,
      height = 480 - margin.top - margin.bottom;
  
  var svg = d3.select(el)
    .append("svg")
      .attr({width: "100%", height: "100%"})
      .attr("viewBox", "0 0 " + (width + margin.left + margin.right) + " " + (height + margin.top + margin.bottom))
      .attr("preserveAspectRatio", "xMidYMid meet")
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg.append("g")
    .attr("class", "axis x")
    .append("text")
      .attr("text-anchor", "end")
      .attr("x", width)
      .attr("dy", -10)
      .text("Δx (as)");

  svg.append("g")
    .attr("class", "axis y")
    .append("text")
      .attr("alignment-baseline", "hanging")
      .attr("dx", 10)
      .text("Δy (as)"); 

  svg.append("path")
    .attr("class", "trace")
    .style({fill: "none", stroke: "black", "stroke-width": 5, "stroke-opacity": 0.2});

  chart.scale = {
    x: d3.scale.linear().range([width, 0]),
    y: d3.scale.linear().range([height, 0]),
    aspect: width / height
  };
  
  chart.svg = {
    line: d3.svg.line()
      .x(d => chart.scale.x(d[0]))
      .y(d => chart.scale.y(d[1]))
      .interpolate("basis"),
    axis: {
      x: d3.svg.axis().scale(chart.scale.x).orient("bottom").ticks(5).outerTickSize(0),
      y: d3.svg.axis().scale(chart.scale.y).orient("left").ticks(5).outerTickSize(0)
    }
  };

  chart.update(el, orbit);
};

chart.update = function(el, orbit) {

  var svg = d3.select(el).select("svg");
  
  var P = OrbitalMechanics.period(orbit, mu);
  var t0 = orbit.t0 - P/2, dt = P / 100,
      time = d3.range(t0, t0 + P + dt, dt),
      points = time.map(t => {
        var p = OrbitalMechanics.convert({
          a: orbit.a,
          e: orbit.e,
          inc: orbit.inc,
          Omega: orbit.Omega,
          omega: orbit.omega,
          M: OrbitalMechanics.meanMotion(orbit, mu) * (t - orbit.t0)
        }, mu);
        return [p.y, p.x];
      });

  var [xmin, xmax] = d3.extent(points, d => d[0]);
  var [ymin, ymax] = d3.extent(points, d => d[1]);

  if ((ymax - ymin) > (xmax - xmin) / chart.scale.aspect) {
    chart.scale.x.domain([(xmax + xmin)/2 - (ymax - ymin)/2 * chart.scale.aspect, (xmax + xmin)/2 + (ymax - ymin)/2 * chart.scale.aspect]); 
    chart.scale.y.domain([ymin, ymax]);
  } else {
    chart.scale.x.domain([xmin, xmax]);
    chart.scale.y.domain([(ymax + ymin)/2 - (xmax - xmin)/2 / chart.scale.aspect, (ymax + ymin)/2 + (xmax - xmin)/2 / chart.scale.aspect]); 
  }

  svg.select(".axis.x")
    .attr("transform", `translate(0,${chart.scale.y(0)})`)
    .call(chart.svg.axis.x);

  svg.select(".axis.y")
    .attr("transform", `translate(${chart.scale.x(0)},0)`)
    .call(chart.svg.axis.y);

  svg.selectAll(".tick").filter(d => Math.abs(d) < 1e-3).remove();

  svg.select(".trace")
    .transition().duration(2000).ease("linear")
      .attrTween("d", () => {                        
        var interpolate = d3.scale.quantile().domain([0,1]).range(d3.range(1, points.length + 1));
        return (t) => chart.svg.line(points.slice(0, interpolate(t)));;
    });
};

chart.destroy = function(el) {
  // do nothing
};

module.exports = chart;
