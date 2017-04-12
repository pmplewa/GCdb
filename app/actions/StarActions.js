import alt from "../alt";

class StarActions {
  constructor() {
    this.generateActions("getStarDone", "getStarFail");
  }
  getStar(id) {
    return (dispatch) => {
      dispatch();
      $.ajax({ url: `/api/stars/${id}` })
        .done((data) => this.getStarDone(data))
        .fail((jqXhr) => this.getStarFail({ status: jqXhr.status, message: jqXhr.statusText }));
    };
  }
}

export default alt.createActions(StarActions);
