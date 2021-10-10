import { useRef } from "react";
import "../styles/FormTodo.scss";

export const FormTodo = (props) => {
  const textInputRef = useRef(null);

  const todoSubmitHandler = (event) => {
    event.preventDefault();
    const enteredText = textInputRef.current.value;
    props.onAddTodo(enteredText);
    textInputRef.current.value = "";
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
      <button id="addBtn">Add.</button>
    </form>
  );
};
