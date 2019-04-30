import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";

import Test from "./components/test";

class App extends Component {
  public render() {
    return (
      <Provider store={store}>
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
          <Test />
        </div>
      </Provider>
    );
  }
}

export default App;
