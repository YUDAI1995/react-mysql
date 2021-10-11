import React from "react";
import { Todo } from "../models/Todolist.model";
import "../styles/TodoList.scss";

interface TodoListProps {
  todos: Todo[];
  onCheckHandler: (todo: Todo) => void;
  onDeleteTodo: (id: string) => void;
}

export const TodoList: React.FC<TodoListProps> = (props) => {
  const onDeleteHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => {
    event.stopPropagation();
    props.onDeleteTodo(id);
  };

  return (
    <ul className="TodoList">
      {props.todos.map((todo) => (
        <li
          className={todo.id}
          key={todo.id}
          onClick={props.onCheckHandler.bind(null, todo)}
        >
          <div className="todoItem">
            <input
              type="checkbox"
              id="checkBox"
              className="checkBox"
              checked={todo.isDone}
              onChange={() => {}}
            />
            <p className="text">{todo.text}</p>
          </div>
          <button
            onClick={(e) => onDeleteHandler(e, todo.id)}
            className="deleteBtn"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};