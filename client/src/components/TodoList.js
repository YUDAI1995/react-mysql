import "../styles/TodoList.scss";

export const TodoList = (props) => {
  const onDeleteHandler = (id) => {
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
            <div className="checkBox">
              <input type="checkbox" checked={todo.isDone} onChange={() => {}} />
            </div>
            <p className="text">{todo.text}</p>
          </div>
          <button
            onClick={onDeleteHandler.bind(null, todo.id)}
            className="deleteBtn"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};
