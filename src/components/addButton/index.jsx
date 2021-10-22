import React from "react";
import styles from "./index.scss";

export default function AddButton({ addItemHandle }) {
  return (
    <div className={styles.btnContainer}>
      <button className={styles.btn} onClick={addItemHandle}>
        +
      </button>
    </div>
  );
}
