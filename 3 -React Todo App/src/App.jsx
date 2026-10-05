import { useState, useEffect } from "react";
import "./App.css";

function App() {

  const [task, setTask] = useState("");
  const [todos, setTodos] = useState(() => {
  const savedTodos = localStorage.getItem("todos");

  return savedTodos ? JSON.parse(savedTodos) : [];
   });
  const [editIndex, setEditIndex] = useState(null);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todos));
   }, [todos]);


  
  const addTodo = () => {

    if (task.trim() === "") {
      return;
    }

    if (editIndex !== null) {

      const updatedTodos = [...todos];

      updatedTodos[editIndex].text = task;

      setTodos(updatedTodos);

      setEditIndex(null);

    } else {

      setTodos([
        ...todos,
        {
          text: task,
          completed: false
        }
      ]);

    }

    setTask("");
  };


 
  const deleteTodo = (index) => {

    const newTodos = todos.filter(
      (todo, i) => i !== index
    );

    setTodos(newTodos);
  };


  
  const completeTodo = (index) => {

    const updatedTodos = [...todos];

    updatedTodos[index].completed =
      !updatedTodos[index].completed;

    setTodos(updatedTodos);
  };


 
  const editTodo = (index) => {

    setTask(todos[index].text);

    setEditIndex(index);
  };



const filteredTodos = todos
  .map((todo, index) => ({
    ...todo,
    originalIndex: index
  }))
  .filter((todo) =>
    todo.text
      .toLowerCase()
      .includes(search.toLowerCase())
  )
  .filter((todo) => {

    if (filter === "active") {
      return !todo.completed;
    }

    if (filter === "completed") {
      return todo.completed;
    }

    return true;
  });

  return (
    <div className="todo-container">

      <h1>✨ FocusFlow</h1>

      <p className="subtitle">
        Stay organized. Stay focused.
      </p>


  

      <div className="todo-input">

        <input
          type="text"
          placeholder="What needs to be done?"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <button onClick={addTodo}>
          {editIndex !== null ? "Update" : "Add"}
        </button>

      </div>




      <div className="search-box">

        <input
          type="text"
          placeholder="🔍 Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>



      <div className="filters">

        <button
          className={filter === "all" ? "active-filter" : ""}
          onClick={() => setFilter("all")}
        >
          All
        </button>

        <button
          className={filter === "active" ? "active-filter" : ""}
          onClick={() => setFilter("active")}
        >
          Active
        </button>

        <button
          className={filter === "completed" ? "active-filter" : ""}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>

      </div>


   

      <ul>

        {filteredTodos.length === 0 ? (

  <li className="no-task">
    No tasks found 🔍
  </li>

) : (

  filteredTodos.map((todo) => (

    <li
      key={todo.originalIndex}
      className={
        todo.completed
          ? "completed"
          : ""
      }
    >

      <span
        className="todo-text"
        onClick={() =>
          completeTodo(todo.originalIndex)
        }
      >
        {todo.completed ? "☑️" : "☐"} {todo.text}
      </span>

      <div className="todo-actions">

        <button
          className="edit-btn"
          onClick={() =>
            editTodo(todo.originalIndex)
          }
        >
          ✏️
        </button>

        <button
          className="delete-btn"
          onClick={() =>
            deleteTodo(todo.originalIndex)
          }
        >
          🗑️
        </button>

      </div>

    </li>

  ))

)}

      </ul>

      <p className="task-count">

        {todos.length} Task
        {todos.length !== 1 ? "s" : ""}

        {" • "}

        {todos.filter(todo => todo.completed).length}

        {" "}Completed

      </p>

    </div>
  );
}

export default App;