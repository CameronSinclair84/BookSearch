import * as React from "react";
import { connect } from "react-redux";
import { IStore } from "../reducers";
import { fetchBooks, IBook } from "../reducers/bookReducer";
import styles from "./book-container.module.scss";
import Book from "../components/book";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../118-512.png";

export interface IReactProps {}

export interface IReduxProps {
  fetchBooks: (authorName: string) => void;
  books: IBook[];
}

export interface IState {
  authorName: string;
  filteredBooks: IBook[];
  genres: IGenre[];
}

interface IGenre {
  label: string;
  value: number;
}

class BookContainer extends React.Component<IReactProps & IReduxProps, IState> {
  public state = {
    authorName: "Dan Brown",
    filteredBooks: this.props.books,
    genres: []
  };

  public componentDidMount = () => {
    this.props.fetchBooks(this.state.authorName);
  };

  public componentDidUpdate(prevProps: IReduxProps & IReactProps) {
    if (!this.props.books) {
      console.log("No results");
    } else if (this.props.books !== prevProps.books) {
      console.log(this.props.books);
      this.setState({
        filteredBooks: this.props.books,
        genres: this.buildGenres()
      });
    }
  }

  public handleAuthorDropdownChange = (evt: any) => {
    this.props.fetchBooks(evt.label);
    this.setState({
      authorName: evt.label,
      filteredBooks: []
    });
  };

  public handleAuthorChange = (evt: any) => {
    console.log(evt.target.value);
    this.setState(
      {
        authorName: evt.target.value,
        filteredBooks: []
      },
      () => this.props.fetchBooks(this.state.authorName)
    );
  };

  public handleGenreChange = (evt: any) => {
    this.setState({
      filteredBooks: this.props.books.filter(eachBook => {
        if (evt.label === "ALL") {
          return true;
        } else if (eachBook.volumeInfo.categories !== undefined) {
          if (eachBook.volumeInfo.categories.includes(evt.label)) {
            return true;
          }
          return false;
        }
        return false;
      })
    });
  };

  // Build the list of genres for the dropdown box

  public buildGenres = (): IGenre[] => {
    const getAllGenres: string[] = [];
    const finalGenres: IGenre[] = [];

    this.props.books.map(element => {
      if (element.volumeInfo.categories) {
        for (let i = 0; i < element.volumeInfo.categories.length; i++) {
          getAllGenres.push(element.volumeInfo.categories[i]);
        }
      }
    });

    const removeDuplicates = (arg: string[]) =>
      arg.filter((element1, element2) => arg.indexOf(element1) === element2);

    const removedDuplicateGenres = removeDuplicates(getAllGenres);

    finalGenres.push({ label: "ALL", value: 1 });

    for (let i = 0; i < removedDuplicateGenres.length; i++) {
      finalGenres.push({ label: removedDuplicateGenres[i], value: i + 2 });
    }

    return finalGenres;
  };

  public render() {
    const renderBooks = this.state.filteredBooks.map((eachBook, index) => (
      <Book key={index} book={eachBook} />
    ));
    return (
      <React.Fragment>
        <div className={styles.header}>
          <div className={styles.logo}>
            <img src={logo} height="50px" />
          </div>
          <div className={styles.dropdowncontainer}>
            <Select
              options={[
                { label: "Dan Brown", value: 1 },
                { label: "Jane Austen", value: 2 },
                { label: "Isaac Asimov", value: 3 }
              ]}
              onChange={this.handleAuthorDropdownChange}
              placeholder="Select Author..."
            />
          </div>
          <div className={styles.select}>
            <Select
              options={this.state.genres}
              autosize={true}
              placeholder="Select Genre..."
              onChange={this.handleGenreChange}
            />
          </div>
          <div className={styles.authorinput}>
            Specify author:
            <input type="text" onChange={this.handleAuthorChange} />
          </div>
        </div>
        <div className={styles.bookcontainer}>{renderBooks}</div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: IStore, props: IReactProps) => {
  return {
    books: state.books.books
  };
};

const mapDispatchToProps = { fetchBooks };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookContainer);
