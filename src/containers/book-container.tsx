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
  books: any[];
}
export interface IState {
  authorName: string;
  //filteredBooks: any[];
}

interface IGenre {
  label: string;
  value: number;
}

class BookContainer extends React.Component<IReactProps & IReduxProps, IState> {
  public state = { authorName: "Dan Brown", filteredBooks: this.props.books };

  public componentDidMount = () => {
    this.props.fetchBooks(this.state.authorName);
  };

  //   public componentDidUpdate(prevProps: IReactProps & IReduxProps) {
  //     if (this.props !== prevProps) {
  //       this.setState({
  //         filteredList: this.props.cards.filter(this.filterCards)
  //       });
  //     }
  //   }

  public handleAuthorChange = (evt: any) => {
    this.setState({
      authorName: evt.label
    });
    this.props.fetchBooks(evt.label);
  };

  public handleGenreChange = (evt: any) => {
    // this.setState({
    //   authorName: evt.label
    // });
    // this.props.fetchBooks(evt.label);
  };

  // Build the list of genres for the dropdown box

  public buildGenres = (): IGenre[] => {
    let getAllGenres: string[] = [];
    let genreArray: IGenre[] = [];

    this.props.books.map(element => {
      if (element.volumeInfo.categories) {
        for (let i = 0; i < element.volumeInfo.categories.length; i++) {
          getAllGenres.push(element.volumeInfo.categories[i]);
        }
      }
    });
    let removeDuplicates = (arg: string[]) =>
      arg.filter((element1, element2) => arg.indexOf(element1) === element2);
    let removedDuplicateGenres = removeDuplicates(getAllGenres);

    for (let i = 0; i < removedDuplicateGenres.length; i++) {
      genreArray.push({ label: removedDuplicateGenres[i], value: i + 1 });
    }
    console.log(genreArray);
    return genreArray;
  };

  public render() {
    return (
      <div>
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
              onChange={this.handleAuthorChange}
              placeholder="Select Author..."
            />
          </div>
          <div className={styles.select}>
            <Select
              options={this.buildGenres()}
              autosize={true}
              placeholder="Select Genre..."
              onChange={this.handleGenreChange}
            />
          </div>
        </div>
        <div className={styles.bookcontainer}>
          {this.props.books.map((eachBook, index) => (
            <Book key={index} book={eachBook} />
          ))}
        </div>
      </div>
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
