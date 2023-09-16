import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import TodoList from "./TodoList";
import AddNewForm from "./AddNewForm";
import EditForm from "./EditForm";
import TodoDataService from "../services/TodoDataService";
//import ChangeStatus from "./components/ChangeStatus";
import "./App.css";

const param = {
  prop_id: 2,
  prop_todo_date: "2021-09-09 18:30:00.000",
  prop_todo_content: "todo content",
};

interface Props {
  id: number;
  status: number;
}

function ChangeStatus(prop: Props) {
  TodoDataService.changeStatus(prop.id, prop.status)
    .then((response: any) => {
      console.log(response.data);
    })
    .catch((e: Error) => {
      console.log(e);
    });
}

const handleStatusChange = () => {
  const statusParam = {
    id: 3,
    status: 2,
  };
  ChangeStatus(statusParam);
};

function AppAside() {
  const [todoStatus, setTodoStatus] = useState(-1);

  const toggleStatus = (st: number) => setTodoStatus(st);

  return (
    <div className="App">
      <div style={{ display: "none" }}>
        <h2>Check status change on button click!</h2>
        <h4>Original: id = 3, status = 1</h4>
        <h4>Change to: id = 3, status = 2</h4>
        <button onClick={handleStatusChange}>CLICK THIS</button>
      </div>
      <div style={{ display: "none" }}>
        <EditForm
          prop_id={param.prop_id}
          prop_todo_date={param.prop_todo_date}
          prop_todo_content={param.prop_todo_content}
        />
      </div>
      <div>
        <AddNewForm />
      </div>

      <div className="Todo List Toggles" style={{ display: "none" }}>
        <button onClick={() => toggleStatus(-1)}>All</button>
        <button onClick={() => toggleStatus(1)}>1</button>
        <button onClick={() => toggleStatus(2)}>2</button>
        <TodoList statusProp={todoStatus} />
      </div>
    </div>
  );
}

export default AppAside;
