// IBook interface

export interface IBook {}

// action types
export const FETCH_BOOKS = "FETCH_BOOKS";
export const SUCCESS_FETCH_BOOKS = "SUCCESS_FETCH_BOOKS";
export const FAILURE_FETCH_BOOKS = "FAILURE_FETCH_BOOKS";

// action creators
export const getBooks = (): IGetBooksAction => ({
  type: FETCH_BOOKS
});
export const getBooksSuccess = (books: IBook[]): IGetBooksSuccessAction => ({
  type: SUCCESS_FETCH_BOOKS,
  books
});
export const getBooksFailure = (error: Error): IGetBooksFailureAction => ({
  type: FAILURE_FETCH_BOOKS,
  error
});

export const fetchBooks = () => (dispatch: any) => {
  dispatch(getBooks());
  fetch("https://www.googleapis.com/books/v1/volumes?q=nature&maxResults=2")
    .then(res => res.json())
    .then(data => dispatch(getBooksSuccess(data.items)))
    .catch(error => dispatch(getBooksFailure(error)));
};

// action interfaces

export interface IGetBooksAction {
  type: typeof FETCH_BOOKS;
}
export interface IGetBooksSuccessAction {
  type: typeof SUCCESS_FETCH_BOOKS;
  books: IBook[];
}
export interface IGetBooksFailureAction {
  type: typeof FAILURE_FETCH_BOOKS;
  error: Error;
}

// combining action creators

type IBookActions =
  | IGetBooksAction
  | IGetBooksSuccessAction
  | IGetBooksFailureAction;

export interface IBookState {
  books: IBook[];
  error: null | Error;
  loading: boolean;
}

// reducer with initial state
const initialState: IBookState = {
  books: [],
  error: null,
  loading: false
};

const bookReducer = (state = initialState, action: IBookActions) => {
  switch (action.type) {
    case FETCH_BOOKS:
      return { ...state, loading: true, error: null };
    case SUCCESS_FETCH_BOOKS:
      return { ...state, loading: false, error: null, books: action.books };
    case FAILURE_FETCH_BOOKS:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default bookReducer;
