import React, { useState, useEffect, useRef } from "react";

import RemoveButton from "@/components/removeButton";

import styles from "./index.scss";

export default function TaskInput({
  content,
  id,
  type,
  saveInputValue,
  onDragStart,
  onDragEnd,
}) {
  // 文本框显隐
  const [inputIsShow, setInputIsShow] = useState(true);
  // 删除按钮显隐
  const [removeBtnShow, setRemoveBtnShow] = useState(true);

  const inputRef = useRef();

  useEffect(() => {
    const inputDom = inputRef.current;

    // 点击回车或文本框失去焦点时 改为只读状态
    inputDom.addEventListener("keydown", (event) => {
      if (event.keyCode === 13) {
        inputDom.readOnly = true;
        saveInputValue(id, inputDom.value);
      }
    });

    inputDom.addEventListener("blur", () => {
      inputDom.readOnly = true;
      saveInputValue(id, inputDom.value);
    });

    // 鼠标移入显示删除按钮 移出隐藏删除按钮
    inputDom.addEventListener("mouseover", (event) => {
      setRemoveBtnShow(false);
    });

    inputDom.addEventListener("mouseout", (event) => {
      // 判断目标元素类型是否为span 解决移入删除按钮触发mouseout事件问题
      if (event.relatedTarget && event.relatedTarget.nodeName === "SPAN") {
        return false;
      }
      setRemoveBtnShow(true);
    });

  }, [id, saveInputValue]);

  // 移出删除按钮回调 同步更新状态
  function removeBtnHandle() {
    setRemoveBtnShow(true)
  }

  // 点击删除按钮 删除文本框
  function removeTaskInput() {
    setInputIsShow(false);
  }

  // 开始拖拽回调 传入当前拖拽任务id
  function dragStartHandle() {
    // console.log('dragStartHandle')
    onDragStart(id);
  }

  // 结束拖拽回调
  function dragEndHandle() {
    // console.log('dragEndHandle')
    onDragEnd();
  }

  return (
    <div
      className={styles.inputContainer}
      id={id}
      // 设置可拖拽属性
      draggable={true}
      onDragStart={dragStartHandle}
      onDragEnd={dragEndHandle}
      style={{ display: inputIsShow ? "block" : "none" }}
    >
      <input type="text" defaultValue={content} ref={inputRef} />
      <RemoveButton
        removeBtnShow={removeBtnShow}
        removeTaskInput={removeTaskInput}
        removeBtnHandle={removeBtnHandle}
        type={type}
      />
    </div>
  );
}
