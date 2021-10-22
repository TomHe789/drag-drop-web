import React, { useState, useEffect } from "react";
import axios from "axios";

import TaskBox from "@/components/taskBox";
import TaskInput from "@/components/taskInput";

import styles from "./index.scss";

let items = [
  // { id: 0, content: "html", type: 1 },
  // { id: 1, content: "css", type: 2 },
  // { id: 2, content: "javascript", type: 1 },
  // { id: 3, content: "react", type: 3 },
  // { id: 4, content: "vue", type: 2 },
];

export default function Task() {
  const [boxData, setBoxData] = useState([]);
  const [activeTaskId, setActiveTaskId] = useState(null);
  const [tasks, setTasks] = useState(items);

  useEffect(() => {
    // 通过axios请求mock数据: 盒子的颜色类型以及标题
    axios.get("/api/boxData").then((res) => {
      if (res.status === 200 && JSON.stringify(res.data) !== "{}") {
        setBoxData(res.data.list);
      }
    });
  }, []);

  // 添加文本框
  function addInput() {
    // 更新items
    items = [...items, { id: tasks.length, content: "", type: 1 }];
    setTasks(items);
  }

  // 存储文本框内容
  function saveInputValue(id, value) {
    items[id].content = value;
    setTasks(items);
  }

  // 获取当前拖拽任务id
  function onDragStart(id) {
    setActiveTaskId(id);
  }

  // 拖拽结束时 更新state
  function onDragEnd() {
    setActiveTaskId(null);
  }

  // 当用户完成拖拽时 更新tasks 重新渲染
  function dragTo(type) {
    // 目标盒子与当前盒子为同一盒子 不需要更新tasks
    if (items[activeTaskId].type !== type) {
      // console.log('1111')
      items[activeTaskId].type = type;
      setTasks(items);
    }
  }

  return (
    <div className={styles.taskContainer}>
      {/* 通过接口获取的数据 动态渲染盒子 */}
      {boxData.map((item, index) => (
        <TaskBox
          stylesheet={{ backgroundColor: item.backgroundColor }}
          key={index}
          type={item.type}
          title={item.titleContent}
          addInput={addInput}
          canDragIn={
            activeTaskId !== null && tasks[activeTaskId].type !== item.type
          }
          dragTo={dragTo}
        >
          {/* 根据任务的类型 将任务组件渲染到不同的盒子中 */}
          {tasks
            .filter((it) => it.type === item.type)
            .map((s) => (
              <TaskInput
                key={s.id}
                id={s.id}
                type={s.type}
                content={s.content}
                saveInputValue={saveInputValue}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
              />
            ))}
        </TaskBox>
      ))}
    </div>
  );
}
