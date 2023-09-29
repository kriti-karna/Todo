import React, { useState } from "react";
import ITodoModel from "../types/TodoModel";
import TodoDataService from "../services/TodoDataService";

interface Props {
  prop_id: number;
  prop_todo_date: string;
  prop_todo_content: string;
}

function EditTodo() {
  ////To change date, time and content on input change
  const [todoTime, setTodoTime] = useState("");
  const [todoDate, setTodoDate] = useState("");
  const [todoContent, setTodoContent] = useState("");

  const updateTodoItem = (data: ITodoModel) => {
    TodoDataService.update(data.id, data)
      .then((response: any) => {
        if (response.data == "success") {
          location.reload();
        } else {
          alert("Something went wrong in the server!");
        }
      })
      .catch((e: Error) => {
        alert(e);
      });
  };

  const handleEditSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    //debugger;
    event.preventDefault();

    //Getting id, date, time, content manually from getElementById because other way around did not work
    const itemId = document.getElementById("edit_todo_id") as HTMLInputElement;
    const id = itemId.value;
    const todoDateFromId = document.getElementById(
      "edit_todo_date"
    ) as HTMLInputElement;
    const todoDateValue = todoDateFromId.value;
    const todoTimeFromId = document.getElementById(
      "edit_todo_time"
    ) as HTMLInputElement;
    const todoTimeValue = todoTimeFromId.value;
    const todoContentFromId = document.getElementById(
      "edit_todo_content"
    ) as HTMLInputElement;
    const todoContentValue = todoContentFromId.value;

    //Get date in desired format
    const dateParts = todoDateValue.split("-");
    const timeParts = todoTimeValue.split(":");
    // const dateParts = todoDate.split("-");
    // const timeParts = todoTime.split(":");
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

    //Only need to push id, todo-date and content on update
    const pushItem = {
      id: parseInt(id),
      todo_date: formattedDateTime,
      done_date: "",
      todo_content: todoContentValue,
      status: 0,
    };

    updateTodoItem(pushItem);
  };

  //console.log(initialItem.todo_date);

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
        <h2>TODO の変更</h2>
      </center>
      <form onSubmit={handleEditSubmit} className="todo-form">
        <div className="form-item">
          <label className="form-label">Select Date</label>
          <br />
          <input
            id="edit_todo_date"
            min={formattedToday}
            className="form-control datetime"
            required
            type="date"
            onChange={(e) => setTodoDate(e.target.value)}
          />
          <input id="edit_todo_id" type="hidden" />
        </div>
        <div className="form-item">
          <label className="form-label">Select Time</label>
          <br />
          <input
            id="edit_todo_time"
            className="form-control datetime"
            required
            type="time"
            onChange={(e) => setTodoTime(e.target.value)}
          />
        </div>
        <div className="form-item">
          <label className="form-label">Enter Todo Content</label>
          <br />
          <textarea
            id="edit_todo_content"
            className="form-control"
            maxLength={100}
            required
            onChange={(e) => setTodoContent(e.target.value)}
          ></textarea>
        </div>
        <input value="変換" type="submit" className="submit-btn" />
      </form>
    </>
  );
}

export default EditTodo;
