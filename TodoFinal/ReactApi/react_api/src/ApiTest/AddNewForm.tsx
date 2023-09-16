import React, { useState } from "react";
import ITodoModel from "../types/TodoModel";
import TodoDataService from "../services/TodoDataService";

function AddNewForm() {
  const initialItem = {
    id: 0,
    todo_date: "",
    done_date: "",
    todo_content: "",
    status: 0,
  };

  let newTodoItem: ITodoModel;

  const [todoTime, setTodoTime] = useState(Date);
  const [todoDate, setTodoDate] = useState(Date);
  const [todoContent, setTodoContent] = useState(String);

  //const [newTodo, setNewTodo] = useState<ITodoModel>(initialItem);
  const saveTodoItem = (data: ITodoModel) => {
    //debugger;

    TodoDataService.create(data)
      .then((response: any) => {
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter your name:
        <input
          required
          type="date"
          onChange={(e) => setTodoDate(e.target.value)}
        />
        <input
          required
          type="time"
          onChange={(e) => setTodoTime(e.target.value)}
        />
        <textarea
          required
          onChange={(e) => setTodoContent(e.target.value)}
        ></textarea>
      </label>
      <input type="submit" />
    </form>
  );
}

export default AddNewForm;
