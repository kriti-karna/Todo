import React, { useState, useEffect, ChangeEvent } from "react";
import TodoDataService from "../services/TodoDataService";
import { Link } from "react-router-dom";
import ITodoModel from "../types/TodoModel";

interface Prop {
  statusProp?: number;
}

const TodoList: React.FC<Prop> = ({ statusProp }: Prop) => {
  const [todoGetItems, setTodoGetItems] = useState<Array<ITodoModel>>([]);

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
    <div>
      <ul className="list-group">
        {todoGetItems &&
          todoGetItems.map((tgi, index) => (
            <li key={index} className="list-group-item">
              {tgi.todo_date.toString().split("T")[0]} -----
              {tgi.todo_date.toString().split("T")[1]}: {tgi.todo_content}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TodoList;
