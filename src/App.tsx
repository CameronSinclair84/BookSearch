import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";
import Header from "./components/header";
import BookContainer from "./containers/book-container";

export interface IProps {}

export interface IState {}

class App extends Component {
  public render() {
    return (
      <Provider store={store}>
        <div className="App">
          <BookContainer />
        </div>
      </Provider>
    );
  }
}

export default App;
