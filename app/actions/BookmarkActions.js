import alt from "../alt";

class BookmarkActions {
  constructor() {
    this.generateActions("addBookmark", "removeBookmark", "clearBookmarks");
  }
}

export default alt.createActions(BookmarkActions);
