import React, { useState } from "react";
import ITodoModel from "../types/TodoModel";
import TodoDataService from "../services/TodoDataService";

interface Props {
  prop_id: number;
  prop_todo_date: string;
  prop_todo_content: string;
}

function EditForm(item: Props) {
  let initialItem = {
    id: item.prop_id,
    todo_date: item.prop_todo_date,
    done_date: "",
    todo_content: item.prop_todo_content,
    status: 0,
  };

  const todoDateConv = new Date(initialItem.todo_date);

  // Extract the date and time components as strings
  const thisDate = todoDateConv.toISOString().split("T")[0];
  const thisTime = `${todoDateConv
    .getHours()
    .toString()
    .padStart(2, "0")}:${todoDateConv
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;

  //console.log(thisDate, thisTime);

  const [todoTime, setTodoTime] = useState(thisTime);
  const [todoDate, setTodoDate] = useState(thisDate);
  const [todoContent, setTodoContent] = useState(initialItem.todo_content);

  const updateTodoItem = (data: ITodoModel) => {
    TodoDataService.update(data.id, data)
      .then((response: any) => {
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const handleEditSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior

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

    const pushItem = {
      id: item.prop_id,
      todo_date: formattedDateTime,
      done_date: "",
      todo_content: todoContent,
      status: 0,
    };

    updateTodoItem(pushItem);
  };

  //console.log(initialItem.todo_date);

  return (
    <form onSubmit={handleEditSubmit}>
      <label>
        Enter your name:
        <input
          required
          type="date"
          defaultValue={todoDate}
          onChange={(e) => setTodoDate(e.target.value)}
        />
        <input
          required
          type="time"
          defaultValue={todoTime}
          onChange={(e) => setTodoTime(e.target.value)}
        />
        <textarea
          required
          defaultValue={item.prop_todo_content}
          onChange={(e) => setTodoContent(e.target.value)}
        ></textarea>
      </label>
      <input type="submit" />
    </form>
  );
}

export default EditForm;
