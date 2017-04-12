import React from "react";

var paper = {};

paper["2009ApJ...692.1075G"] = {
  author: "Gillessen+ 2009",
  url: "http://dx.doi.org/10.1088/0004-637X/692/2/1075"
};

paper["2017ApJ...837...30G"]= {
  author: "Gillessen+ 2017",
  url: "http://dx.doi.org/10.3847/1538-4357/aa5c41"
};

const Citation = (props) => 
  <a href={paper[props.data.cite].url} target="_blank">{paper[props.data.cite].author}</a>;

export default Citation;
