import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  public componentWillMount() {
    fetch(
      "https://www.googleapis.com/books/v1/volumes?q=nature&maxResults=20&projection=lite"
    )
      .then(res => console.log(res.json()))
      .catch(error => console.log(error));
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
