import "./App.css";
import "./Forms.css";
import React, { useState } from "react";
import AddButton from "./components/AddBtn";
import TodoItemCollection from "./components/TodoItemCollection";
import AddNewTodo from "./components/AddNewTodo";
import EditTodo from "./components/EditTodo";

function App() {
  //To toggle between status to show, current tab and current view
  const [todoStatus, setTodoStatus] = useState(-1);
  const [activeTab, setActiveTab] = useState("all");
  const [activeView, setActiveView] = useState("item-views");

  const toggleStatus = (st: number, tab: string) => {
    setTodoStatus(st);
    setActiveTab(tab);
  };

  //change view on button click
  const btnHandler = (newView: string): void => {
    setActiveView(newView);
    const forms = document.querySelectorAll("form");
    forms.forEach((form) => {
      form.reset();
    });
  };

  const editBtnHandler = () => {
    btnHandler("item-views");
    document.getElementById("edit-todo")!.style.display = "none";
    document.getElementById("item-views")!.style.removeProperty("display");
  };

  return (
    <div className="main-container">
      <div className="main-container-mini">
        <div className="flex-container" style={{ marginTop: "25px" }}>
          <h1 style={{ margin: "auto 0" }}>TODO プロジェクト</h1>
          {activeView == "item-views" && (
            <AddButton btnClickEvent={() => btnHandler("add-new-todo")} />
          )}
        </div>
        <br />
        <div
          id="item-views"
          style={activeView != "item-views" ? { display: "none" } : {}}
        >
          <div className="nav-container">
            <button
              className={
                activeTab == "all"
                  ? "nav-btn btn-all-nav active"
                  : "nav-btn btn-all-nav"
              }
              onClick={() => toggleStatus(-1, "all")}
            >
              全て表示
            </button>
            <button
              className={
                activeTab == "todo"
                  ? "nav-btn active btn-todo-nav"
                  : "nav-btn btn-todo-nav"
              }
              onClick={() => toggleStatus(1, "todo")}
            >
              未完了
            </button>
            <button
              className={
                activeTab == "completed"
                  ? "nav-btn active btn-done-nav"
                  : "nav-btn btn-done-nav"
              }
              onClick={() => toggleStatus(2, "completed")}
            >
              完了
            </button>
            <button
              className={
                activeTab == "expired"
                  ? "nav-btn active btn-expired-nav"
                  : "nav-btn btn-expired-nav"
              }
              onClick={() => toggleStatus(3, "expired")}
            >
              期限切れ
            </button>
          </div>

          <TodoItemCollection statusProp={todoStatus} />
        </div>
        <div
          id="add-new-todo"
          style={activeView != "add-new-todo" ? { display: "none" } : {}}
        >
          <div className="form-container">
            <AddNewTodo />
            <div style={{ width: "100%", display: "flex", marginTop: "10px" }}>
              <button
                className="submit-btn"
                onClick={() => btnHandler("item-views")}
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
        <div
          id="edit-todo"
          style={activeView != "edit-todo" ? { display: "none" } : {}}
        >
          <EditTodo />
          <div style={{ width: "100%", display: "flex", marginTop: "10px" }}>
            <button className="submit-btn" onClick={editBtnHandler}>
              閉じる
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
