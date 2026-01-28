import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

const App = () => {
  const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const [tasks, setTasks] = useState(storedTasks);
  const [taskValue, setTaskValue] = useState("");
  const [filterValue, setFilterValue] = useState("all");

  const clearTasks = () => {
    const userConfirmed = window.confirm(
      "Do you really want to delete all the tasks?"
    );

    if (userConfirmed) {
      setTasks([]);
      localStorage.removeItem("tasks");
    } else {
      alert("Deletion cancelled!");
    }
  };

  // const data = [
  //   {
  //     id: "afa1f786-b6e1-4b02-b8c9-a009b98f2ae1",
  //     value: "Task 1",
  //     status: "active",
  //   },
  //   {
  //     id: "4c0b725c-e2c0-41d6-abc2-9db6b2ec9b99",
  //     value: "Task 2",
  //     status: "completed",
  //   },
  //   {
  //     id: "5239039a-00a8-46a8-b819-0e63748ce7b2",
  //     value: "Task 3",
  //     status: "active",
  //   },
  // ];

  // console.log(data.filter((task) => task.status !== "active"));

  // setTasks((prev) => {
  //         const updated = prev.filter((task) => task.status === "active");

  const addTask = (e) => {
    e.preventDefault();
    if (taskValue === "") {
      alert("Please enter a task!");
      return;
    }

    const newTask = {
      id: uuidv4(),
      value: taskValue,
      status: "active",
    };

    setTasks((prev) => {
      const updatedTasks = [...prev, newTask];
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });

    setTaskValue("");
  };

  const filteredTasks =
    filterValue === "all"
      ? tasks
      : tasks.filter((taskObject) => taskObject.status === filterValue);

  const handleToggle = (id) => {
    setTasks((prev) => {
      const updated = prev.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === "active" ? "completed" : "active",
            }
          : task
      );

      localStorage.setItem("tasks", JSON.stringify(updated));
      return updated;
    });
  };

  const handleDeleteCompleted = () => {
    const userConfirmed = window.confirm(
      "Do you really want to delete all completed tasks?"
    );

    if (userConfirmed) {
      setTasks((prev) => {
        const updated = prev.filter((task) => task.status === "active");

        if (updated.length === 0) {
          localStorage.removeItem("tasks");
        } else {
          localStorage.setItem("tasks", JSON.stringify(updated));
        }

        return updated;
      });
    } else {
      alert("Deletion cancelled!");
    }
  };

  const handleDeleteTask = (id) => {
    setTasks((prev) => {
      const updated = prev.filter((task) => task.id !== id);

      if (updated.length === 0) {
        localStorage.removeItem("tasks");
      } else {
        localStorage.setItem("tasks", JSON.stringify(updated));
      }

      return updated;
    });
  };

  const completedCount = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  const activeCount = tasks.filter((task) => task.status === "active").length;

  const totalCount = tasks.length;

  return (
    <div id="app-container">
      <div id="card">
        <h1>To-Do List</h1>

        <form onSubmit={addTask}>
          <div id="task-manager">
            <input
              type="text"
              maxLength={100}
              placeholder="Add a new task..."
              value={taskValue}
              onChange={(e) => setTaskValue(e.target.value)}
            />

            <button type="submit">Add</button>
            {tasks.length > 0 && (
              <button type="button" onClick={clearTasks}>
                Clear
              </button>
            )}
          </div>
        </form>

        <div id="filter">
          <button
            style={{
              backgroundColor: filterValue === "all" && "#3c82f6",
              color: filterValue === "all" && "#fff",
            }}
            onClick={() => setFilterValue("all")}
          >
            All
          </button>
          <button
            style={{
              backgroundColor: filterValue === "active" && "#3c82f6",
              color: filterValue === "active" && "#fff",
            }}
            onClick={() => setFilterValue("active")}
          >
            Active
          </button>
          <button
            style={{
              backgroundColor: filterValue === "completed" && "#3c82f6",
              color: filterValue === "completed" && "#fff",
            }}
            onClick={() => setFilterValue("completed")}
          >
            Completed
          </button>
        </div>

        {tasks.length === 0 && (
          <div id="no-task">No tasks yet. Add one above!</div>
        )}

        <div id="tasks">
          {filteredTasks.map((taskObject, index) => (
            <div key={index} className="task">
              <input
                type="checkbox"
                checked={taskObject.status === "completed"}
                onChange={() => handleToggle(taskObject.id)}
              />
              <p
                style={{
                  textDecoration:
                    taskObject.status === "completed" && "line-through",
                }}
              >
                {taskObject.value}
              </p>
              <button onClick={() => handleDeleteTask(taskObject.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>

        {tasks.length > 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <p>
              {filterValue === "all" &&
                `${completedCount} out of ${totalCount} tasks completed`}

              {filterValue === "active" && `Active: ${activeCount} task(s)`}

              {filterValue === "completed" &&
                `Completed: ${completedCount} task(s)`}
            </p>

            {completedCount > 0 && (
              <p
                onClick={handleDeleteCompleted}
                style={{
                  color: "red",
                  cursor: "pointer",
                }}
              >
                Clear Completed
              </p>
            )}
          </div>
        )}

        <p id="footer-text">
          Powered by{" "}
          <a href="https://pinecone.mn/" rel="noreferrer" target="_blank">
            Pinecone Academy
          </a>
        </p>
      </div>
    </div>
  );
};

export default App;
