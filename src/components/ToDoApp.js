import React, { useEffect, useState } from "react";
import AddTodo from "./AddToDo";
import Header from "./layout/Header";
import Todos from "./ToDos";
import Footer from "../store/containers/Footer";

import axios from "axios";
function ToDoApp() {
  const [state, setState] = useState({
    todos: [],
  });

  const handleCheckboxChange = (id) => {
    setState({
      todos: state.todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      }),
    });
  };
  const deleteTodo = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then((response) => {
        setState({
          todos: [
            ...state.todos.filter((todo) => {
              return todo.id !== id;
            }),
          ],
        });
      });
  };
  const addTodo = (title) => {
    const newData = {
      title: title,
      completed: false,
    };
    axios
      .post("https://jsonplaceholder.typicode.com/todos", newData)
      .then((response) => setState({ todos: [...state.todos, response.data] }));
  };

  useEffect(() => {
    const config = {
      params: {
        _limit: 9,
      },
    };
    axios
      .get("https://jsonplaceholder.typicode.com/todos", config)
      .then((response) => setState({ todos: response.data }));
  }, []);

  return (
    <div className="container">
      <Header />
      <AddTodo addTodo={addTodo} />
      <Todos
        todos={state.todos}
        handleChange={handleCheckboxChange}
        deleteTodo={deleteTodo}
      />
      <Footer />
    </div>
  );
}
export default ToDoApp;
