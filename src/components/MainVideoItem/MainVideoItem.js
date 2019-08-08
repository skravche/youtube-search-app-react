import React, { Component } from "react";
import YouTube from "react-youtube";

class MainVideoItem extends Component {
  render() {
    const { onPlayed, video } = this.props;

    if (!video) {
      return <div className="main-vid">Loading...</div>;
    }
    const videoId = video.id.videoId;

    const opts = {
      height: "590",
      width: "940",
      playerVars: {
        autoplay: 0
      }
    };
    return (
      <div className="main-video">
        <YouTube videoId={videoId} opts={opts} onPlay={onPlayed} />
        <div className="details">
          <div className="text-datails">
            Channel: {video.snippet.channelTitle}
          </div>
          <div className="text-datails">Title: {video.snippet.title}</div>
        </div>
      </div>
    );
  }
}

export default MainVideoItem;
