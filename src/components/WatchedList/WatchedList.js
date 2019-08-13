import React, { Component } from "react";
import WatchedListItem from "../WatchedListItem";
import "./WatchedList.css";
import { getVideos } from "../Api/";

class WatchedList extends Component {
  state = {
    pool: false,
    items: []
  };

  changePool = () => {
    this.setState(prevState => ({
      pool: !prevState.pool
    }));
    getVideos.then(json => {
      this.setState({
        items: json
      });
    });
  };

  render() {
    const { videosData, onDeleted } = this.props;
    const { pool } = this.state;

    const elements = videosData.map((item, key) => {
      return (
        <div key={item.id}>
          <p onClick={this.changePool}>{JSON.stringify(pool)}</p>
          <p>{JSON.stringify(this.state.items)}</p>
          <WatchedListItem
            title={item.title}
            id={item.id}
            played={item.played}
            onDeleted={() => onDeleted(item.id)}
          />
        </div>
      );
    });

    return <div className="watched-list">{elements}</div>;
  }
}

export default WatchedList;
