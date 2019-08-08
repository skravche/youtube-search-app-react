import React from "react";
import "./VideoListItem.css";

const VideoListItem = props => {
  const video = props.video;
  const onUserSelected = props.onUserSelected;
  const imageUrl = video.snippet.thumbnails.default.url;

  const selectedVid = () => onUserSelected(video);
  return (
    <div onClick={selectedVid} className="iteml">
      <img className="mini-vid" src={imageUrl} alt="" />
      <p>{video.snippet.title}</p>
      <p>{video.snippet.publishedAt}</p>
      <p>{video.snippet.videoId}</p>
      <button type="button">PLAY</button>
    </div>
  );
};

export default VideoListItem;
