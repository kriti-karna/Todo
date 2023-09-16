import React, { useState, useEffect } from "react";
import TodoDataService from "../services/TodoDataService";
import ITodoModel from "../types/TodoModel";
import TodoItem from "./TodoItem";

interface Prop {
  statusProp?: number;
}
const TodoItemCollection: React.FC<Prop> = ({ statusProp }: Prop) => {
  const [todoGetItems, setTodoGetItems] = useState<Array<ITodoModel>>([]);

  //Select only the specific status/all item
  const [status, setStatus] = useState(statusProp);

  useEffect(() => {
    setStatus((prevStatus) => {
      if (statusProp !== prevStatus && statusProp != -1) {
        retrieveTodoItems(statusProp);
        return statusProp;
      } else if (statusProp == -1 || prevStatus == -1) {
        retrieveTodoItems();
        return statusProp;
      }
      return prevStatus;
    });
  }, [statusProp]);

  const retrieveTodoItems = (st?: number) => {
    TodoDataService.getAll(st)
      .then((response: any) => {
        setTodoGetItems(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  return (
    <div style={{ width: "fit-content", margin: "auto" }}>
      {todoGetItems &&
        todoGetItems.map((tgi) => (
          <TodoItem
            key={tgi.id}
            todoId={tgi.id}
            todoDate={tgi.todo_date}
            doneDate={tgi.done_date}
            todoContent={tgi.todo_content}
            status={tgi.status}
          />
        ))}
    </div>
  );
};

export default TodoItemCollection;
