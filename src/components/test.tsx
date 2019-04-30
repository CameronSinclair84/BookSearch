import * as React from "react";
import { fetchBooks } from "../reducers/bookReducer";
import { IStore } from "../reducers";
import { connect } from "react-redux";

export interface IReactProps {}

export interface IReduxProps {
  books: any;
  fetchBooks: () => void;
}

export interface IState {
  books: any;
}

class Test extends React.Component<IReactProps & IReduxProps, IState> {
  public state = { books: [] };

  public componentDidMount() {
    this.props.fetchBooks();
  }

  public componentDidUpdate(prevProps: IReactProps & IReduxProps) {
    if (this.props !== prevProps) {
      this.setState({
        books: this.props.books
      });
    }
  }

  public render() {
    console.log(this.state.books);
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
