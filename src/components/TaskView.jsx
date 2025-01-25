import { useRef, useState } from "react";
import Button from "./Button";
import { CustomInput } from "./Input";
import Section from "./Section";
import Task from "./Task";

const TASK = {
  id: 0,
  text: "",
  completed: false,
};

export default function TaskView({ tasks, onAddTask, onDeleteTask }) {
  const [task, setTask] = useState(TASK);

  function handleChangeTask(t) {
    setTask(t);
  }

  let taskIdRef = useRef({
    id: -1,
  });

  function handleToggleComplete(taskId) {
    const taskElement = document.getElementById(taskId);
    const isCompleted = taskElement.classList.contains("bg-gray-500");
    if (isCompleted) {
      taskElement.classList.remove("bg-gray-500");
      taskElement.classList.add("bg-white");
    } else {
      taskElement.classList.remove("bg-white");
      taskElement.classList.add("bg-gray-500");
    }
  }

  return (
    <Section title="Tasks">
      <div className="flex justify-between mb-4">
        <CustomInput
          value={task.text}
          onChange={(e) =>
            handleChangeTask({
              id: taskIdRef.current.id + 1,
              text: e.target.value,
              completed: false,
            })
          }
          name="task"
          type="text"
          required
          className="p-3 rounded-lg shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
        <Button
          content="Add"
          onClick={() => {
            taskIdRef.current.id = taskIdRef.current.id + 1;
            setTask(TASK);
            onAddTask(task);
          }}
          purpose="add"
          disabled={task.text === ""}
          className="bg-teal-600 text-white py-2 px-4 text-sm font-semibold rounded-lg shadow-md hover:bg-teal-700 transition-all focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
      </div>

      {tasks.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              id={task.id}
              className={`p-6 rounded-xl shadow-lg transition-all duration-300 ${
                task.completed ? "bg-gray-500 text-white" : "bg-white text-black"
              }`}
            >
              <div className="flex flex-col justify-between h-full">
                <span
                  className={`text-lg ${task.completed ? "line-through" : ""}`}
                >
                  {task.text}
                </span>
                <div className="flex justify-end space-x-2 mt-4">
                  <Button
                    content={task.completed ? "Undo" : "Completed"}
                    onClick={() => handleToggleComplete(task.id)}
                    purpose="complete"
                    className="w-full bg-green-500 text-white py-2 px-4 text-sm font-semibold rounded-lg shadow-md hover:bg-green-600 transition-all focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                  <Button
                    content="Delete"
                    onClick={() => onDeleteTask(task.id)}
                    purpose="delete"
                    className="w-full bg-yellow-500 text-white py-2 px-4 text-sm font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}
