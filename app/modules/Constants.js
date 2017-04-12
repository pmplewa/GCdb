export const M0 = 4.28e6; // solar masses
export const R0 = 8.32e3; // parsecs
export const mu = 39.487906165759156 * M0 / Math.pow(R0, 3);

export const t0 = 2000.0;

export var deg2rad = (x) => x * Math.PI / 180;
export var rad2deg = (x) => x * 180 / Math.PI;
export var as2deg = (x) => x / 60 / 60;
export var deg2as = (x) => x * 60 * 60;
export var as2rad = (x) => deg2rad(as2deg(x));
export var rad2as = (x) => deg2as(rad2deg(x));

export var asyr2kms = (x) => x * 4.740470463496208 * R0
