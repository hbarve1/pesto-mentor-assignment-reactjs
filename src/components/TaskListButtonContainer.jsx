import React from "react";
import { useHistory } from "react-router-dom";

export const TaskListContainer = (props) => {
  const history = useHistory();
  return (
    <div className="tasklist-links">
      <button onClick={() => history.push("/tasks/1")}>Task 1</button>
      <button onClick={() => history.push("/tasks/2")}>Task 2</button>
      <button onClick={() => history.push("/tasks/3")}>Task 3</button>
    </div>
  );
};
