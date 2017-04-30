import {mod} from "./Math";

export function convert(d, mu) {
  mu = typeof mu !== "undefined" ? mu : 1;
  
  var a = d.a, e = d.e, inc = d.inc, Omega = d.Omega, omega = d.omega, M = d.M;
  var f = M2f(e, M);

  var r = a*(1-e*e)/(1+e*Math.cos(f));
  var v0 = Math.sqrt(mu/a/(1.-e*e));

  var cO = Math.cos(Omega);
  var sO = Math.sin(Omega);
  var co = Math.cos(omega);
  var so = Math.sin(omega);
  var cf = Math.cos(f);
  var sf = Math.sin(f);
  var ci = Math.cos(inc);
  var si = Math.sin(inc);

  var x = r*(cO*(co*cf-so*sf)-sO*(so*cf+co*sf)*ci);
  var y = r*(sO*(co*cf-so*sf)+cO*(so*cf+co*sf)*ci);
  var z = r*(so*cf+co*sf)*si;

  var vx = v0*((e+cf)*(-ci*co*sO-cO*so)-sf*(co*cO-ci*so*sO));
  var vy = v0*((e+cf)*(ci*co*cO-sO*so)-sf*(co*sO+ci*so*cO));
  var vz = v0*((e+cf)*co*si-sf*si*so);

  return {x: x, y: y, z: z, vx: vx, vy: vy, vz: vz};
}

export function meanMotion(d, mu) {
  mu = typeof mu !== "undefined" ? mu : 1;

  return d.a/Math.abs(d.a)*Math.sqrt(Math.abs(mu/(d.a*d.a*d.a)));
}

export function period(d, mu) {
  mu = typeof mu !== "undefined" ? mu : 1;

  return 2*Math.PI/meanMotion(d, mu);
}

export function M2E(e, M, tol, maxiter) {
  tol = typeof tol !== "undefined" ? tol : 1.48e-8;
  maxiter = typeof maxiter !== "undefined" ? maxiter : 100;

  var E, F;

  if (e < 1) {
    E = e < 0.8 ? M : Math.sign(M)*Math.PI;
    F = E-e*Math.sin(E)-M;
    for (var i = 1; i <= maxiter; i++) {
      E = E-F/(1-e*Math.cos(E));
      F = E-e*Math.sin(E)-M
      if (Math.abs(F) < tol) break;
    }
    E = mod(E+Math.PI, 2*Math.PI)-Math.PI
  } else {
    E = Math.sign(M)*Math.log(2.*Math.abs(M)/e+1.8);
    F = E-e*Math.sinh(E)-M;
    for (var i = 1; i <= maxiter; i++) {
      E = E-F/(1-e*Math.cosh(E));
      F = E-e*Math.sinh(E)-M;
      if (Math.abs(F) < tol) break;
    }
  }

  return E;
}

export function M2f(e, M) {
  var E = M2E(e, M);

  if (e > 1) {
    return 2.*Math.atan(Math.sqrt((1+e)/(e-1))*Math.tanh(E/2));
  } else {
    return 2*Math.atan(Math.sqrt((1+e)/(1-e))*Math.tan(E/2));
  }
}
