import React, { useState } from "react";
import "../App.css";
const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [todoEditing, setTodoEditing] = React.useState(null);
  const [editingText, setEditingText] = React.useState("");
  function handleSubmit(e) {
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
    };
    setTodos([...todos].concat(newTodo));
    setTodo("");
  }

  function submitEdits(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText;
      }
      return todo;
    });
    setTodos(updatedTodos);
    setTodoEditing(null);
  }

  function toggleComplete(id) {
    let updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  function deleteTodo(id) {
    let updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  return (
    <div id="todo-list">
      <h1>To do List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add New Item"
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
        />
        <button type="submit">Add</button>
      </form>

      {todos.map((todo) => (
        <span key={todo.id} className="todo">
          <span className="todo-text">
            <input
              type="checkbox"
              id="completed"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            />
            {todo.id === todoEditing ? (
              <input
                type="text"
                placeholder="Enter A Eddited Text"
                onChange={(e) => setEditingText(e.target.value)}
              />
            ) : (
              <div>{todo.text}</div>
            )}
          </span>

          <span className="todo-actions">
            {todo.id === todoEditing ? (
              <button className="btn" onClick={() => submitEdits(todo.id)}>
                Submit Edits
              </button>
            ) : (
              <button className="btn" onClick={() => setTodoEditing(todo.id)}>
                <i className="far fa-edit"></i>
              </button>
            )}

            <button className="btn" onClick={() => deleteTodo(todo.id)}>
              <i className="far fa-trash-alt"></i>
            </button>
          </span>
        </span>
      ))}
    </div>
  );
};

export default Todo;
