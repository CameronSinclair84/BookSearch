import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";

class App extends Component {
  public render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <h2>My Library placeholder</h2>
          </header>
        </div>
      </Provider>
    );
  }
}

export default App;
