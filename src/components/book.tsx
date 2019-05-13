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
        <div className={styles.scene}>
          <div className={styles.movie}>
            <div className={styles.poster} />
            <div className={styles.info}>
              <header>
                <h1>It's a Wonderful Life</h1>
                <span className={styles.year}>1946</span>
                <span className={styles.rating}>PG</span>
                <span className={styles.duration}>130 minutes</span>
              </header>
              <p>
                In Bedford Falls, New York on Christmas Eve, George Bailey is
                deeply troubled. Prayers for his well-being from friends and
                family reach Heaven. Clarence Odbody, Angel Second Class, is
                assigned to visit Earth to save George, thereby earning his
                wings. Franklin and Joseph, the head angels, review George's
                life with Clarence.
              </p>
            </div>
          </div>
        </div>
      </React.Fragment>
      // <div className={styles.bookinfo}>
      //   <section className={styles.bookTitle}>
      //     <div className={styles.title}>{this.props.book.volumeInfo.title}</div>
      //     <div className={styles.picContainer}>
      //       <img className={styles.picture} src={thumbnail} />
      //     </div>
      //   </section>

      //   <section className={styles.description}>
      //     {this.props.book.volumeInfo.description}
      //   </section>
      //   <section className={styles.properties}>
      //     Genre: {genreType}
      //     <br />
      //     Length: {bookLength}
      //     <br />
      //     Date Published: {datePublished}
      //   </section>
      // </div>
    );
  }
}

export default Book;
