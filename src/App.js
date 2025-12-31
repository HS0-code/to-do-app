import "./App.css";

const App = () => {
  return (
    <div className="App">
      <div className="todo-box">
        <h1 className="todo-title">To-Do list</h1>

        <div className="todo-input-row">
          <input
            type="text"
            placeholder="Add a new task..."
            className="todo-input"
          />
          <button className="todo-button">Add</button>
        </div>
      </div>
    </div>
  );
};

export default App;
