import Button from "./Button";

export default function Task({ task, onDeleteTask }) {
  return (
    <div className=" flex bg-gray-300 rounded">
      <div className="flex-1">
        <p className="p-2">{task.text}</p>
      </div>
      <Button
        onClick={() => onDeleteTask(task.id)}
        content="Clear"
        purpose="clear"
      />
    </div>
  );
}
