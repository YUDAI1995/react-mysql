import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { FormTodo } from "./components/FormTodo";
import { TodoList } from "./components/TodoList";
import { Footer } from "./components/Footer";

const App = () => {
  const [todos, setTodos] = useState([]);

  const apiReqest = () => {
    fetch("/api")
      .then((res) => {
        if (!res.ok) {
          console.log("Error.");
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        setTodos(data.todos);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    apiReqest();
  }, []);

  const onAddHandler = (enteredText) => {
    fetch("/api", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: enteredText,
        isDone: false,
      }),
    })
      .then(apiReqest)
      .catch((error) => {
        console.log(error);
      });
  };
  const onDeleteHandler = (deleteId) => {
    fetch(`/api/${deleteId}`, {
      method: "DELETE",
    })
      .then(apiReqest)
      .catch((error) => {
        console.log(error);
      });
  };
  const onCheckHandler = (todo) => {
    fetch(`/api/${todo.id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: todo.id,
        text: todo.text,
        isDone: !todo.isDone,
      }),
    })
      .then(apiReqest)
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="App">
      <Header />
      <main>
        <div className="inner">
          <FormTodo onAddTodo={onAddHandler} />
          <TodoList
            todos={todos}
            onDeleteTodo={onDeleteHandler}
            onCheckHandler={onCheckHandler}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
