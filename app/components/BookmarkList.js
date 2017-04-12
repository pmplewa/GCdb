import React from "react";
import StarTable from "./StarTable";
import BookmarkStore from "../stores/BookmarkStore";
import BookmarkActions from "../actions/BookmarkActions";

class BookmarkList extends React.Component {
  constructor(props) {
    super(props);
    this.state = BookmarkStore.getState();
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    BookmarkStore.listen(this.onChange);
  }
  componentWillUnmount() {
    BookmarkStore.unlisten(this.onChange);
  }
  onChange(state) {
    this.setState(state);
  }
  render() {
    if (this.state.bookmarks.length == 0) return null;
    return (
      <div>
        <StarTable data={this.state.bookmarks} bookmarkAction={BookmarkActions.removeBookmark} icon="minus"/>
        <div className="text-right"><span role="button" className="btn btn-default btn-xs" onClick={BookmarkActions.clearBookmarks}>clear bookmarks</span></div>
      </div>
    );
  }
}

export default BookmarkList;
