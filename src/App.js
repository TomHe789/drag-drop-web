import React, { useState, useEffect } from "react";
import { Route, withRouter } from "react-router-dom";

import Task from "./pages/task";

import styles from "./index.scss";

function App({ history }) {
  // 控制按钮显隐
  const [isHide, setIsHide] = useState(true);

  // 路径不为/时 隐藏按钮
  useEffect(() => {
    if (history.location.pathname !== "/") {
      setIsHide(false);
    }
  }, [history]);

  // 点击按钮跳转到任务页面 并隐藏按钮
  function clickHandle() {
    setIsHide(false);
    history.replace("/task");
  }

  return (
    <div className={styles.mainContainer}>
      <button
        onClick={clickHandle}
        style={{ display: isHide ? "block" : "none" }}
      >
        Start App
      </button>
      <Route path="/task" component={Task} />
    </div>
  );
}

export default withRouter(App);
