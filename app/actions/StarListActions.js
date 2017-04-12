import alt from "../alt";

class StarListActions {
  constructor() {
    this.generateActions("getStarListDone", "getStarListFail", "updateQuery");
  }
  getStarList(query) {
    return (dispatch) => {
      dispatch([]);
      $.ajax({ url: "/api/search", data: query })
        .done((data) => this.getStarListDone(data))
        .fail((jqXhr) => this.getStarListFail({ status: jqXhr.status, message: jqXhr.statusText }));
    };
  }
}

export default alt.createActions(StarListActions);
