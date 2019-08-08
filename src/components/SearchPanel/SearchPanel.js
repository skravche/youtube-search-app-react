import React, { Component } from "react";
import "./SearchPanel.css";

class SearchPanel extends Component {
  constructor(props) {
    super(props);
    this.state = { term: "" };
  }

  onInputChange = e => {
    this.setState({ term: e.target.value });
    this.props.onSearchTermChange(e.target.value);
  };

  render() {
    return (
      <div>
        <form className="header-bar">
          <div className="left-title">
            <label>Search Video on Youtube:</label>
          </div>

          <div className="input-search">
            <input
              className="form-control"
              value={this.state.term}
              onChange={this.onInputChange}
              type="text"
              autoCorrect="off"
              autoComplete="off"
              onFocus={this.props.onFocus}
              onBlur={this.props.onBlur}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default SearchPanel;
