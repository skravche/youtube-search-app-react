import React, { Component } from "react";
import WatchedList from "../WatchedList";
import MainVideoItem from "../MainVideoItem";
import SearcPanel from "../SearchPanel";
import VideoList from "../VideoList";
import { getVideos, addVideo, remove } from "../Api";
import YTSearch from "youtube-api-search";
import "./App.css";

const _API_KEY = "AIzaSyBdVut9QCzqAHBzfDEh30yUp4E529som6s"; //AIzaSyCAJiqovaCAKuMXBJy0xOTAdqBXD7f3jn4

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focus: false,
      videos: [],
      selectedVideo: null,
      items: [],
      isLoaded: false,
      played: false
    };
    this.videoSearch("biketrial");
  }

  componentDidMount() {
    getVideos
      .then(response => {
        if (response.status !== 200) {
          throw new Error("Failed to load data!");
        }
        return response.json();
      })
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json
        });
      });
  }

  videoSearch(searchTerm) {
    YTSearch({ key: _API_KEY, term: searchTerm, type: "video" }, data => {
      this.setState({
        videos: data,
        selectedVideo: data[0]
      });
    });
  }

  deleteMongo = id => {
    const index = this.state.items.findIndex(el => el.id === id);
    console.log(id, index);
    remove(id);
  };

  videoPlayed = () => {
    const videoId = this.state.selectedVideo.id.videoId;
    addVideo({
      id: videoId,
      title: this.state.selectedVideo.snippet.title,
      played: this.state.played
    });
    this.setState(prevState => ({
      played: !prevState.played
    }));
  };

  handleInputFocus = () => {
    this.setState({ focus: true });
    console.log("onFocus");
  };

  handleInputBlur = () => {
    this.timeout = setTimeout(() => {
      this.setState({ focus: false });
    }, 300);
  };

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    const { played, items } = this.state;

    return (
      <div>
        <div>
          <h3>State Monitor:</h3>
        </div>
        <header>
          <SearcPanel
            onSearchTermChange={searchTerm => this.videoSearch(searchTerm)}
            onFocus={this.handleInputFocus}
            onBlur={this.handleInputBlur}
          />
          {this.state.focus ? (
            <VideoList
              onVideoSelect={userSelected =>
                this.setState({ selectedVideo: userSelected })
              }
              videos={this.state.videos}
            />
          ) : null}
        </header>
        <main className="main-content">
          <WatchedList
            videosData={items}
            onDeleted={this.deleteMongo}
            onPlayed={this.onPlayed}
          />
          <MainVideoItem
            onPlayed={this.videoPlayed}
            video={this.state.selectedVideo}
          />
          <div>{JSON.stringify(played)}</div>
          <div>{JSON.stringify(items)}</div>
        </main>
        <footer>...footer</footer>
      </div>
    );
  }
}

export default App;
