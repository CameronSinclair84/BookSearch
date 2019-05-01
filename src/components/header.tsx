import * as React from "react";
import styles from "./header.module.scss";

export interface IProps {}

export interface IState {}

class Header extends React.Component<IProps, IState> {
  //state = { :  }
  public render() {
    return (
      <div className={styles.header}>
        <div className={styles.dropdowncontainer}>
          Please select an author:{" "}
        </div>
      </div>
    );
  }
}

export default Header;
