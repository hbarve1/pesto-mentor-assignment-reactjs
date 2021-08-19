import React, { useReducer } from "react";
import { Task } from "./Task";

function reducer(state, action) {
  return { ...state, [action.id]: action.value };
}

const TaskWithSubtasks = (props) => {
  let [statuses, dispatch] = useReducer(
    reducer,
    props.subtasks.reduce((E, subtask) => {
      E[subtask.id] = false;
      return E;
    }, {})
  );

  let areAllPassing = Object.entries(statuses).every(([id, status]) => status);
  let areSomePassing =
    !areAllPassing && Object.entries(statuses).some(([id, status]) => status);

  return (
    <>
      <label className="task">
        <input
          id={`task-${props.id}`}
          type="checkbox"
          disabled={true}
          checked={areAllPassing}
          readOnly={true}
          ref={(el) => el && (el.indeterminate = areSomePassing)}
        />
        <label htmlFor={`task-${props.id}`}></label>
        {props.label}
      </label>
      <div className="subtasks">
        {props.subtasks.map((subtask) => (
          <Task
            key={subtask.id}
            component={props.component}
            id={subtask.id}
            test={subtask.test}
            onComplete={(status) => {
              dispatch({
                id: subtask.id,
                value: status
              });
              props.onComplete(
                Object.entries(statuses).every(([id, status]) => status)
              );
            }}
            completed={statuses[subtask.id]}
          >
            {subtask.label}
          </Task>
        ))}
      </div>
    </>
  );
};

export const TaskList = (props) => {
  let [statuses, dispatch] = useReducer(
    reducer,
    props.tasks.reduce((E, task) => {
      E[task.id] = false;
      for (let subtask of task.subtasks || []) {
        E[subtask.id] = false;
      }
      return E;
    }, {})
  );

  return (
    <div className="tasks">
      <h2>Tasks</h2>
      {props.tasks.map((task) => {
        if (task.subtasks) {
          return (
            <TaskWithSubtasks
              key={task.id}
              component={props.component}
              id={task.id}
              label={task.label}
              subtasks={task.subtasks}
              completed={statuses[task.id]}
              onComplete={(status) => {
                dispatch({
                  id: task.id,
                  value: status
                });
              }}
            />
          );
        } else {
          return (
            <Task
              key={task.id}
              component={props.component}
              id={task.id}
              test={task.test}
              completed={statuses[task.id]}
              onComplete={(status) => {
                dispatch({
                  id: task.id,
                  value: status
                });
              }}
            >
              {task.label}
            </Task>
          );
        }
      })}
    </div>
  );
};
