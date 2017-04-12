import alt from "../alt";
import BookmarkActions from "../actions/BookmarkActions";

class BookmarkStore {
  constructor() {
    this.bindListeners({
      addBookmark: BookmarkActions.ADD_BOOKMARK,
      removeBookmark: BookmarkActions.REMOVE_BOOKMARK,
      clearBookmarks: BookmarkActions.CLEAR_BOOKMARKS
    });
    this.bookmarks = [];
  }
  addBookmark(star) {
    if (!this.bookmarks.some(d => d.id == star.id)) this.bookmarks = this.bookmarks.concat(star);
  }
  removeBookmark(star) {
    this.bookmarks = this.bookmarks.filter((d) => d !== star);
  }
  clearBookmarks() {
    this.bookmarks = [];
  }
}

export default alt.createStore(BookmarkStore);
