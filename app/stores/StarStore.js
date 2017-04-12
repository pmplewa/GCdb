import alt from "../alt";
import StarActions from "../actions/StarActions";

class StarStore {
  constructor() {
    this.bindListeners({
      getStar: StarActions.GET_STAR,
      getStarDone: StarActions.GET_STAR_DONE,
      getStarFail: StarActions.GET_STAR_FAIL
    });
    this.data = null;
    this.status = null;
    this.message = null;
  }
  getStar(payload) {
    this.data = payload;
  }
  getStarDone(payload) {
    this.status = null;
    this.message = null;
    this.data = payload;
  }
  getStarFail(error) {
    this.status = "danger";
    this.message = "This star was not found.";
  }
}

export default alt.createStore(StarStore);
