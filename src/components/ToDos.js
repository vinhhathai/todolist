import React from "react";
import ToDoItems from "./ToDoItems";
class Todos extends React.Component {
  render() {
    return (
      <ul>
        {this.props.todos.map((todo) => (
          <ToDoItems
            key={todo.id}
            todo={todo}
            handleChange={this.props.handleChange}
            deleteTodo={this.props.deleteTodo}
          />
        ))}
      </ul>
    );
  }
}
export default Todos;
