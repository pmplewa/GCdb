var mongoose = require("mongoose");

var starSchema = new mongoose.Schema({
  id: Number,
  name: [String],
  source: [{
    table: Number,
    id: Number,
    cite: String
  }],
  magnitude: [{
    band: String,
    value: Number,
    cite: String
  }],
  type: [{
    value: String,
    cite: String
  }],
  orbit: [{
    a: Number,
    a_err: Number,
    e: Number,
    e_err: Number,
    t0: Number,
    t0_err: Number,
    inc: Number,
    inc_err: Number,
    Omega: Number,
    Omega_err: Number,
    omega: Number,
    omega_err: Number,
    cite: String
  }],
  proper_motion: [{
    t0: Number,
    x0: Number,
    x0_err: Number,
    y0: Number,
    y0_err: Number,
    vx: Number,
    vx_err: Number,
    vy: Number,
    vy_err: Number,
    cite: String
  }],
  position: { type: [Number], index: "2d" }
});

module.exports = mongoose.model("Star", starSchema);
