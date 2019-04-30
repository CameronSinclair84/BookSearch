import React, { Component } from "react";
import "./App.css";

class App extends Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img
            src={
              "http://books.google.com/books/content?id=mZny5uwvSd8C&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api"
            }
            className="App-logo"
            alt="logo"
          />
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
