import React, { useState, useEffect, useRef } from "react";
import PubSub from "pubsub-js";

import styles from "./index.scss";

export default function RemoveButton({
  removeBtnShow,
  removeTaskInput,
  removeBtnHandle,
  type,
}) {
  const [isBtnHide, setIsBtnHide] = useState(true);
  const btnRef = useRef(null);

  useEffect(() => {
    // 是否显示删除按钮
    setIsBtnHide(removeBtnShow);
  }, [removeBtnShow]);

  useEffect(() => {
    // 鼠标移出删除按钮 隐藏删除按钮
    btnRef.current.addEventListener("mouseout", (event) => {
      // 更新state 调用父级方法 同步更新
      setIsBtnHide(true);
      removeBtnHandle();
    });
  });

  // 点击删除按钮回调
  function clickHandle() {
    removeTaskInput();
    // console.log(type);
    // 如果是在第一个盒子中点击删除按钮 发布消息
    if (type === 1) {
      PubSub.publish("INFO", "hello");
    }
  }

  return (
    <div>
      <span
        style={{ display: isBtnHide ? "none" : "inline-block" }}
        className={styles.delete}
        ref={btnRef}
        onClick={() => {
          clickHandle();
        }}
      >
        x
      </span>
    </div>
  );
}
