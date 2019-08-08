import React, { Component } from "react";

class WatchedListItem extends Component {
  render() {
    const { title, onDeleted } = this.props;

    return (
      <div>
        <label> WatchedListItem </label>
        <span>{title}</span>
        <button type="button" onClick={onDeleted}>
          Delete
        </button>
      </div>
    );
  }
}

export default WatchedListItem;
