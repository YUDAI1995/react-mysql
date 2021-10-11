import React, { useRef } from "react";
import "../styles/FormTodo.scss";

interface FormTodoProps {
  onAddTodo: (enteredText: string) => void;
}

export const FormTodo: React.FC<FormTodoProps> = ({ onAddTodo }) => {
  const textInputRef = useRef<HTMLInputElement>(null);

  const todoSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const enteredText = textInputRef.current!.value;
    onAddTodo(enteredText);
    textInputRef.current!.value = "";
  };

  return (
    <form onSubmit={todoSubmitHandler}>
      <input
        type="text"
        id="todo-inputForm"
        className="inputForm"
        ref={textInputRef}
        placeholder="Enter to add."
      />
      <button id="addBtn">Add</button>
    </form>
  );
};
