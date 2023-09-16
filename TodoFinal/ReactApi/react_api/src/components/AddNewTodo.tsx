import React, { useState } from "react";
import ITodoModel from "../types/TodoModel";
import TodoDataService from "../services/TodoDataService";
import "../Forms.css";

function AddNewTodo() {
  //To change date, time and content on input change
  const [todoTime, setTodoTime] = useState(Date);
  const [todoDate, setTodoDate] = useState(Date);
  const [todoContent, setTodoContent] = useState(String);

  const saveTodoItem = (data: ITodoModel) => {
    //debugger;
    TodoDataService.create(data)
      .then((response: any) => {
        if (response.data == "success") {
          location.reload();
        } else {
          alert("Something went wrong in the server!");
        }
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //Get date in desired format
    const dateParts = todoDate.split("-");
    const timeParts = todoTime.split(":");
    const combinedDateTime = new Date(
      Date.UTC(
        Number(dateParts[0]),
        Number(dateParts[1]) - 1, // Month is zero-based
        Number(dateParts[2]),
        Number(timeParts[0]),
        Number(timeParts[1])
      )
    );
    const formattedDateTime = combinedDateTime.toISOString();
    // console.log(`CombinedString = ${formattedDateTime}`);
    // console.log(todoContent);

    //Only need to push todo-date and content on new creation
    const pushNewTodo = {
      id: 0,
      todo_date: formattedDateTime,
      done_date: "",
      todo_content: todoContent,
      status: 0,
    };
    //debugger;
    saveTodoItem(pushNewTodo);
  };

  //Get today date to fix the minimum date select to today
  const today = new Date();
  const formattedToday = today
    .toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .split("/")
    .reverse()
    .join("-");

  return (
    <>
      <center>
        <h2>新しい TODO</h2>
      </center>
      <form onSubmit={handleSubmit} className="todo-form">
        <div className="form-item">
          <label className="form-label">日付を選択してください。</label>
          <br />
          <input
            min={formattedToday}
            className="form-control datetime"
            required
            type="date"
            onChange={(e) => setTodoDate(e.target.value)}
          />
        </div>
        <div className="form-item">
          <label className="form-label">時間を選択してください。</label>
          <br />
          <input
            className="form-control datetime"
            required
            type="time"
            onChange={(e) => setTodoTime(e.target.value)}
          />
        </div>
        <div className="form-item">
          <label className="form-label">Todo 内容を入力してください。</label>
          <br />
          <textarea
            className="form-control"
            maxLength={100}
            required
            onChange={(e) => setTodoContent(e.target.value)}
          ></textarea>
        </div>
        <input value="作成" type="submit" className="submit-btn" />
      </form>
    </>
  );
}

export default AddNewTodo;
