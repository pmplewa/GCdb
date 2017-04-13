import alt from "../alt";
import StarListActions from "../actions/StarListActions";

class StarListStore {
  constructor() {
    this.bindListeners({
      updateQuery: StarListActions.UPDATE_QUERY,
      getStarList: StarListActions.GET_STAR_LIST,
      getStarListDone: StarListActions.GET_STAR_LIST_DONE,
      getStarListFail: StarListActions.GET_STAR_LIST_FAIL
    });
    this.query = {
      limit: 200,
      orbit: false,
      pm: false,
      vz: false
    };
    this.data = [];
    this.status = null;
    this.message = null;
  }
  updateQuery(payload) {
    Object.assign(this.query, payload)
  }
  getStarList(payload) {
    this.data = payload;
  }
  getStarListDone(payload) {
    this.status = null;
    this.message = null;
    this.data = payload.map(d => {
      var magnitude = d.magnitude.find(d => d.band == "K");
      return {
        id: d.id,
        name: d.name,
        display_name: d.name.join(" / "),
        magnitude: magnitude ? magnitude.value : null,
        distance: d.position ? Math.sqrt(Math.pow(d.position[0], 2) + Math.pow(d.position[1], 2)) : null,
        N_orbit: d.orbit.length,
        N_proper_motion: d.proper_motion.length
      };
    });
  }
  getStarListFail(error) {
    this.status = "danger";
    this.message = "Something went wrong.";
  }
}

export default alt.createStore(StarListStore);
