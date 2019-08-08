import React from "react";
import VideoListItem from "../VideoListItem";
import "./VideoList.css";

const VideoList = props => {
  const videoItems = props.videos.map(video => {
    return (
      <div>
        <VideoListItem
          onUserSelected={props.onVideoSelect}
          key={video.etag}
          video={video}
        />
      </div>
    );
  });
  return <div className="video-list">{videoItems}</div>;
};

export default VideoList;
