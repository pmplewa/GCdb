import React from "react";
import {R0, M0, t0} from "../modules/Constants"

class Info extends React.Component {
  render() {
    return (
      <div>

        <h2>API Endpoints</h2>

        <div className="panel panel-default">
          <div className="panel-body">
            <h4>GET /api/count</h4>
            <p>Return the total number of stars in the database:</p>
            <samp>{`{"count":10531}`}</samp>
          </div>
        </div>      

        <div className="panel panel-default">
          <div className="panel-body">
            <h4>GET /api/stars/:id</h4>
            <p>Return the database record of the specified star:</p>
            <p><samp>{`/api/stars/101`}</samp></p>
            <p><samp>{`{"id":101,"name":["S0-2","S2"],...}`}</samp></p>
          </div>
        </div>

        <div className="panel panel-default">
          <div className="panel-body">
            <h4>GET /api/search</h4>
            <p>Return the database records matching a search query:</p>
            <p><samp>{`/api/search?name=S2`}</samp></p>
            <p><samp>{`/api/search?name=S2&limit=5`}</samp></p>
            <p><samp>{`[{"id":15,"name":["IRS29NE1"],...},{"id":16,"name":["IRS33N", "S2-13"]...},...]`}</samp></p>
            <p>At most 500 records are returned at one time.</p>
          </div>
        </div>

        <div className="panel panel-default">
          <div className="panel-body">
            <h4>GET /api/match</h4>
            <p>Find stars within some radius around a certain on-sky position:</p>
            <p><samp>{`/api/match?x=0&y=0&r=0.1`}</samp></p>
            <p><samp>{`[{"id":101,"name":["S0-2", "S2"],...}]`}</samp></p>
          </div>
        </div>


        <h2>Data Sources</h2>

        <ul className="list-unstyled">
            <li><a href="http://dx.doi.org/10.1088/0004-637X/692/2/1075" target="_blank">Gillessen+ 2009</a> / Tables 7 and 9</li>
            <li><a href="http://dx.doi.org/10.3847/1538-4357/aa5c41" target="_blank">Gillessen+ 2017</a> / Tables 3 and 4</li>
        </ul>  

        <h2>Implementation Notes</h2>

        <p>Internal calculations assume a black hole mass of M<sub>0</sub> = {(M0/1e6).toFixed(2)} 10<sup>6</sup> M<sub>☉</sub>, a distance to the Galactic Center of R<sub>0</sub> = {(R0/1e3).toFixed(2)} kpc and a reference epoch t<sub>0</sub> = {t0.toFixed(2)}.</p>
      </div>
    );
  }
}

export default Info;
