import React, { useState, useEffect } from "react";
import TextBtn from "./TextBtn";
import TodoDataService from "../services/TodoDataService";

interface Param {
  todoId: number;
  todoDate: string;
  doneDate?: string;
  todoContent: string;
  status: number;
}

// Mark as done/Mark as delete/Get expired when needed:
function ChangeStatus(id: number, status: number) {
  //debugger;
  TodoDataService.changeStatus(id, status)
    .then((response: any) => {
      //console.log(response.data);
      if (response.data == "success") {
        location.reload();
      } else {
        alert(response.data); //If there is any error from server
      }
    })
    .catch((e: Error) => {
      console.log(e);
    });
}

function TodoItem(paramItem: Param) {
  let todoDateConv = new Date(paramItem.todoDate);
  //If todo item is done, display the done_date insteat of todo_date
  if (paramItem.doneDate != null) {
    todoDateConv = new Date(paramItem.doneDate);
  }

  //Check if todo_date is less than current time and if
  // the status is 1, mark it as expired
  const today = new Date();
  if (todoDateConv < today && paramItem.status == 1) {
    ChangeStatus(paramItem.todoId, 3);
    //console.log(paramItem.todoId);
  }

  var thisDate = todoDateConv.toISOString().split("T")[0];
  //debugger;
  const thisTime = `${todoDateConv
    .getHours()
    .toString()
    .padStart(2, "0")}:${todoDateConv
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;

  //Creating edit functionality manually (not a good thing to do)
  const onEditHandle = () => {
    //debugger;
    const thisDateWithOffset = new Date(
      todoDateConv.getTime() - todoDateConv.getTimezoneOffset() * 60000
    ); // Remove the offset
    thisDate = thisDateWithOffset.toISOString().split("T")[0];

    //Id edit:
    var idEdit = document.getElementById("edit_todo_id") as HTMLInputElement;
    idEdit.value = paramItem.todoId.toString();

    //Date picker edit:
    var todoDateEdit = document.getElementById(
      "edit_todo_date"
    ) as HTMLInputElement;
    todoDateEdit.value = thisDate.toString();

    //Time picker edit:

    var todoTimeEdit = document.getElementById(
      "edit_todo_time"
    ) as HTMLInputElement;
    todoTimeEdit.value = thisTime.toString();

    //Todo content Edit:
    var todoContentEdit = document.getElementById(
      "edit_todo_content"
    ) as HTMLInputElement;
    todoContentEdit.value = paramItem.todoContent.toString();

    document.getElementById("item-views")!.style.display = "none";
    document.getElementById("edit-todo")!.style.removeProperty("display");
  };

  var thisDatePart = thisDate.split("-");
  console.log(thisDate);
  return (
    <>
      <div className={"item-container container-" + paramItem.status}>
        <div style={{ display: "grid" }} className="seperator">
          <span style={{ textAlign: "center" }}>
            {thisDatePart[0] +
              "年" +
              thisDatePart[1] +
              "月" +
              (parseInt(thisDatePart[2]) + 1) +
              "日"}
          </span>
          <span style={{ textAlign: "center" }}>{thisTime}</span>
        </div>
        {paramItem.todoContent}
        <div className="btn-container">
          {paramItem.status == 1 && (
            <TextBtn btnName="変換" clickHandle={onEditHandle} />
          )}
          {paramItem.status == 1 && (
            <TextBtn
              btnName="完了"
              clickHandle={() => ChangeStatus(paramItem.todoId, 2)}
            />
          )}

          <TextBtn
            btnName="削除"
            clickHandle={() => ChangeStatus(paramItem.todoId, 0)}
          />
        </div>
      </div>
    </>
  );
}

export default TodoItem;
