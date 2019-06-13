import * as React from "react";
import { IBook } from "../reducers/bookReducer";
import styles from "./book3d.module.scss";
import placeholder from "./placeholder.jpg";

export interface IProps {
  book: IBook;
}

export interface IState {}

class Book3D extends React.Component<IProps, IState> {
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
    const title =
      this.props.book.volumeInfo.title.length > 80
        ? this.props.book.volumeInfo.title.slice(0, 80) + "..."
        : this.props.book.volumeInfo.title;
    return (
      <React.Fragment>
        <div className={styles.scene}>
          <div className={styles.book}>
            <div className={styles.poster}>
              <img className={styles.picture} src={thumbnail} alt="Book cover" />
            </div>
            <div className={styles.info}>
              <header>
                <h1>{title}</h1>
                Genre: {genreType}
                <br />
                Length: {bookLength}
                <br />
                Date Published: {datePublished}
              </header>
              <p className={styles.description}>{this.props.book.volumeInfo.description}</p>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Book3D;
