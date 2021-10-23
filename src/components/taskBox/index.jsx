import React, { useState, useEffect, useRef } from "react";
import PubSub from "pubsub-js";

import AddButton from "@/components/addButton";
// import TaskInput from "@/components/taskInput";

import styles from "./index.scss";

export default function TaskBox({
  stylesheet,
  type,
  title,
  addInput,
  canDragIn,
  dragTo,
  children,
}) {
  // 控制添加按钮的显隐
  const [isShow, setIsShow] = useState(true);
  // 容器是否填满
  const [isFull, setIsFull] = useState(false);
  // 目标容器边框发生改变
  const [isIn, setIsIn] = useState(false);

  const contentContainerRef = useRef(null);
  const contentWrapRef = useRef(null);

  useEffect(() => {
    let container = contentContainerRef.current
    // 容器被填满 重新设置容器颜色
    if (isFull) {
      // console.log(contentContainerRef.current.style)
      container.style.backgroundColor = "skyblue";
    }

    // 订阅消息
    let token = PubSub.subscribe("INFO", (msg, data) => {
      // 显示添加按钮 盒子恢复颜色
      if (!isContainerFull() && type === 1) {
        // console.log('接收到INFO')
        setIsShow(true);
        container.style.backgroundColor = "rgb(238,220,220)";
      }
      // console.log(msg, data, '123')
    });
    // 取消订阅
    return () => {
      PubSub.unsubscribe(token);
    };
  }, [isFull, type]);

  // 添加文本框
  function addItemHandle() {
    // console.log("addItemHandle");
    // 内容未超出容器 可继续添加文本框
    if (!isContainerFull()) {
      addInput();
    } else {
      addInput();
      // 隐藏添加按钮
      setIsShow(false);
      setIsFull(true);
    }
  }

  // 判断内容是否超出容器
  function isContainerFull() {
    // 内容高度
    const contentHeight = contentWrapRef.current.clientHeight;
    // 容器高度
    const containerHeight = contentContainerRef.current.clientHeight;

    return contentHeight + 59 >= containerHeight;
  }

  function dragEnterhandle(event) {
    event.preventDefault();
    if (canDragIn) {
      setIsIn(true);
    }
  }

  function dragOverhandle(event) {
    event.preventDefault();
    if (canDragIn) {
      setIsIn(true);
    }
  }

  function dragLeavehandle(event) {
    event.preventDefault();
    // console.log("dragLeavehandle");
    if (canDragIn) {
      setIsIn(false);
    }
  }

  // 拖拽完成回调
  function dropHandle(event) {
    // 拖拽完成时 发布消息 判断第一个容器是否被填满
    // console.log('发布INFO')
    PubSub.publish("INFO", "hello");
    // console.log("dropHandle...", type);
    // 盒子没有填满 才可以继续放
    if (!isContainerFull()) {
      dragTo(type);
      setIsIn(false);
    }
  }

  return (
    <div
      // 必须设置onDragEnter onDragLeave onDragOver event.preventDefault();
      // 否则onDrop无效
      className={styles.boxContainer}
      onDragEnter={dragEnterhandle}
      onDragLeave={dragLeavehandle}
      onDragOver={dragOverhandle}
      onDrop={dropHandle}
      type={type}
    >
      <div className={styles.boxTitle} style={{ ...stylesheet }}>
        {title}
      </div>
      <div
        className={styles.boxContent}
        style={{ ...stylesheet, borderStyle: isIn ? "dashed" : "none" }}
        // style={{ ...stylesheet}}
        ref={contentContainerRef}
      >
        <div className={styles.contentWrap} ref={contentWrapRef}>
          {children}
          {/* 第一个盒子显示添加按钮 */}
          {title === "Prepare to study" && isShow ? (
            <AddButton addItemHandle={addItemHandle} />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
