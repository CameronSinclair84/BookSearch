import * as React from "react";
import { fetchBooks } from "../reducers/bookReducer";
import { IStore } from "../reducers";
import { connect } from "react-redux";

export interface IReactProps {}

export interface IReduxProps {
  books: any;
  fetchBooks: () => void;
}

export interface IState {}

class Test extends React.Component<IReactProps & IReduxProps, IState> {
  public componentWillMount() {
    this.props.fetchBooks();
    // fetch("https://www.googleapis.com/books/v1/volumes?q=nature&maxResults=20")
    //   .then(res => res.json())
    //   .then(data => console.log(data.items[0].accessInfo.country))
    //   .catch(error => console.log(error));
  }

  public render() {
    console.log(this.props.books);
    return <h3>blah</h3>;
  }
}

const mapStateToProps = (state: IStore, props: IReactProps) => {
  return {
    ...props,
    books: state.books.books
  };
};

const mapDispatchToProps = { fetchBooks };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Test);
