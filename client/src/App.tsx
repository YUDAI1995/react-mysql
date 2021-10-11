import React, { useEffect, useState } from "react";
import { Todo, TodoItem, getUniqueStr } from "./models/Todolist.model";
import { Header } from "./components/Header";
import { FormTodo } from "./components/FormTodo";
import { TodoList } from "./components/TodoList";
import { Footer } from "./components/Footer";
import { validate } from "class-validator";

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

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

  const onAddHandler = (enteredText: string) => {
    const newTodo = new TodoItem(getUniqueStr(), enteredText, false);
    validate(newTodo)
      .then((errors) => {
        if (errors.length > 0) {
          throw new Error("Not entered.");
        }

        fetch("/api", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTodo),
        })
          .then(apiReqest)
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        alert("Please enter something to do.");
      });
  };
  const onDeleteHandler = (deleteId: string) => {
    fetch(`/api/${deleteId}`, {
      method: "DELETE",
    })
      .then(apiReqest)
      .catch((error) => {
        console.log(error);
      });
  };
  const onCheckHandler = (todo: Todo) => {
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
