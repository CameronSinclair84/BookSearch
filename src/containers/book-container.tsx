import * as React from "react";
import { connect } from "react-redux";
import { IStore } from "../reducers";
import { fetchBooks, IBook } from "../reducers/bookReducer";
import styles from "./book-container.module.scss";
import Book3D from "../components/book3d";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";

export interface IReactProps {}

export interface IReduxProps {
  fetchBooks: (authorName: string) => void;
  books: IBook[];
}

export interface IState {
  authorName: string;
  authorInputName: string;
  keyword: string;
  filteredBooks: IBook[];
  genres: IGenre[];
  selectedGenre: string;
  pageCount: number;
  maxPageCount: number;
}

interface IGenre {
  label: string;
  value: number;
}

class BookContainer extends React.Component<IReactProps & IReduxProps, IState> {
  public state = {
    pageCount: 0,
    maxPageCount: 0,
    authorName: "George R.R Martin",
    authorInputName: "",
    selectedGenre: "ALL",
    keyword: "",
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
      this.setState(
        {
          filteredBooks: this.props.books
        },
        () =>
          this.setState({
            genres: this.buildGenres(),
            maxPageCount: this.findMaxPageCount(),
            pageCount: this.findMaxPageCount()
          })
      );
    }
  }

  public render() {
    const renderBooks = this.state.filteredBooks.map((eachBook, index) => (
      <Book3D key={index} book={eachBook} />
    ));

    return (
      <React.Fragment>
        <div className={styles.header}>
          <div className={styles.logo} />
          <div className={styles.optionsContainer}>
            <div className={styles.authorDropdown}>
              <Select
                options={[
                  { label: "Dan Brown", value: 1 },
                  { label: "Jane Austen", value: 2 },
                  { label: "Isaac Asimov", value: 3 },
                  { label: "Enid Blyton", value: 4 },
                  { label: "Roald Dahl", value: 5 },
                  { label: "George R.R Martin", value: 6 },
                  { label: "J. R. R. Tolkien", value: 7 }
                ]}
                onChange={this.handleAuthorDropdownChange}
                placeholder="Select Author..."
              />
            </div>
            <div className={styles.authorInput}>
              Specify author:
              <input
                type="text"
                onChange={this.handleAuthorChange}
                value={this.state.authorInputName}
              />
            </div>
            <div className={styles.selectGenre}>
              <Select
                options={this.state.genres}
                autosize={true}
                placeholder="Select Genre..."
                onChange={this.handleGenreChange}
              />
            </div>
            <div className={styles.keywordInput}>
              Keyword Search:
              <input type="text" onChange={this.handleKeywordChange} />
            </div>
            <div className={styles.sliderContainer}>
              <div className={styles.sliderInfo}>
                Max page count:
                {" " + this.state.pageCount}
              </div>
              <div className={styles.sliderActual}>
                <input
                  type="range"
                  min="0"
                  max={this.state.maxPageCount}
                  value={this.state.pageCount}
                  onChange={this.handleSliderChange}
                  className={styles.slider}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.bookcontainer}>{renderBooks}</div>
        </div>
      </React.Fragment>
    );
  }

  public findMaxPageCount = (): number => {
    let findMax: number = 0;
    this.state.filteredBooks.map(eachbook => {
      if (eachbook.volumeInfo.pageCount && eachbook.volumeInfo.pageCount > findMax) {
        findMax = eachbook.volumeInfo.pageCount;
      }
    });
    return findMax;
  };

  public handleAuthorDropdownChange = (evt: any) => {
    this.setState(
      {
        authorName: evt.label,
        authorInputName: "",
        selectedGenre: "ALL",
        filteredBooks: []
      },
      () => this.props.fetchBooks(this.state.authorName)
    );
  };

  public handleAuthorChange = (evt: any) => {
    this.setState(
      {
        authorInputName: evt.target.value,
        selectedGenre: "ALL",
        filteredBooks: []
      },
      () => this.props.fetchBooks(this.state.authorInputName)
    );
  };

  public handleFilter = () => {
    this.setState({
      filteredBooks: this.props.books.filter(eachbook => {
        const { description, title, pageCount, categories } = eachbook.volumeInfo;
        const stringToSearch = description
          ? title.toLowerCase() + description.toLowerCase()
          : title.toLowerCase();

        if (this.state.selectedGenre === "ALL") {
          if (
            !pageCount &&
            (stringToSearch.includes(this.state.keyword) || this.state.keyword === "")
          ) {
            return true;
          }
          if (
            pageCount &&
            pageCount <= this.state.pageCount &&
            (stringToSearch.includes(this.state.keyword) || this.state.keyword === "")
          ) {
            return true;
          }
        } else if (categories !== undefined && categories.includes(this.state.selectedGenre)) {
          if (
            !pageCount &&
            (stringToSearch.includes(this.state.keyword) || this.state.keyword === "")
          ) {
            return true;
          }
          if (
            pageCount &&
            pageCount <= this.state.pageCount &&
            (stringToSearch.includes(this.state.keyword) || this.state.keyword === "")
          ) {
            return true;
          }
        }
        return false;
      })
    });
  };

  public handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(
      {
        pageCount: parseInt(event.target.value)
      },
      () => this.handleFilter()
    );
  };

  public handleKeywordChange = (evt: any) => {
    this.setState(
      {
        keyword: evt.target.value.toLowerCase()
      },
      () => this.handleFilter()
    );
  };

  public handleGenreChange = (evt: any) => {
    this.setState(
      {
        selectedGenre: evt.label
      },
      () => {
        this.handleFilter();
      }
    );
  };

  // Build the list of genres for the dropdown box

  public buildGenres = (): IGenre[] => {
    const getAllGenres: string[] = [];
    const finalGenres: IGenre[] = [];

    this.state.filteredBooks.map(element => {
      if (element.volumeInfo.categories) {
        for (let i = 0; i < element.volumeInfo.categories.length; i++) {
          getAllGenres.push(element.volumeInfo.categories[i]);
        }
      }
    });

    const removedDuplicateGenres = new Set(getAllGenres);
    const genreIterator = removedDuplicateGenres.values();

    finalGenres.push({ label: "ALL", value: 1 });

    for (let i = 0; i < removedDuplicateGenres.size; i++) {
      finalGenres.push({ label: genreIterator.next().value, value: i + 2 });
    }

    return finalGenres;
  };
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
