import React, { useState, useEffect } from "react";

const Home = () => {
  const [tareas, setTareas] = useState([]);
  const [ingreso, setIngreso] = useState("");

  useEffect(() => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/user1")
      .then((res) => res.json())
      .then((resAsJson) => {
        console.log(resAsJson);
        setTareas(resAsJson);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = (event) => {
    if (event.key === "Enter") {
      const newTask = { label: ingreso, done: false };
      const newTasks = [...tareas, newTask];
      setTareas(newTasks);
      setIngreso("");
      updateTasks(newTasks);
    }
  };

  const handleDelete = (index) => {
    const updatedTasks = tareas.filter((_, i) => i !== index);
    setTareas(updatedTasks);
    updateTasks(updatedTasks);
  };

  const updateTasks = (updatedTasks) => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/user1", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTasks),
    })
      .then((res) => res.json())
      .then((resAsJson) => {
        console.log(resAsJson);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="text-center">
      <div className="container-list">
        <input
          type="text"
          value={ingreso}
          maxLength="32"
          onChange={(event) => setIngreso(event.target.value)}
          onKeyDown={handleSubmit}
        />
        <ul className="cont-button">
          {tareas.map((task, index) => (
            <li key={index}>
              {task.label}{" "}
              <button
                className="clear"
                onClick={() => handleDelete(index)}
              >
                x
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
