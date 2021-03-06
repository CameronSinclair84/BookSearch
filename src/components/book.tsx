import * as React from "react";
import { IBook } from "../reducers/bookReducer";
import styles from "./book.module.scss";
import placeholder from "./placeholder.jpg";

export interface IProps {
  book: IBook;
}

export interface IState {}

class Book extends React.Component<IProps, IState> {
  public render() {
    const genreType = this.props.book.volumeInfo.categories
      ? this.props.book.volumeInfo.categories
      : "None Specified";
    const bookLength = this.props.book.volumeInfo.pageCount
      ? this.props.book.volumeInfo.pageCount + " pages"
      : "Not specified";
    const datePublished = this.props.book.volumeInfo.publishedDate
      ? this.props.book.volumeInfo.publishedDate
      : "Not specified";
    const thumbnail = this.props.book.volumeInfo.imageLinks
      ? this.props.book.volumeInfo.imageLinks.thumbnail
      : placeholder;
    return (
      <React.Fragment>
        <div className={styles.bookinfo}>
          <section className={styles.bookTitle}>
            <div className={styles.title}>{this.props.book.volumeInfo.title}</div>
            <div className={styles.picContainer}>
              <img className={styles.picture} src={thumbnail} alt="Book cover" />
            </div>
          </section>

          <section className={styles.description}>{this.props.book.volumeInfo.description}</section>
          <section className={styles.properties}>
            Genre: {genreType}
            <br />
            Length: {bookLength}
            <br />
            Date Published: {datePublished}
          </section>
        </div>
      </React.Fragment>
    );
  }
}

export default Book;
