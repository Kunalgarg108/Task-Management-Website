import Button from "./Button";
import Section from "./Section";
import TaskView from "./TaskView";

export default function ProjectView({
  onChangeContentDisplayed,
  onDelete,
  selectedProject,
  onAddTask,
  onDeleteTask,
}) {
  return (
    <Section 
      title={selectedProject.title}
      buttons={
        <Button
          onClick={() => onDelete(selectedProject.id)}
          content="Delete"
          purpose="delete"
        />
      }
    >
      <hr />
      <p className=" text-white text-left text-2xl">Description: {selectedProject.description}</p>
      <p className=" text-gray-100 opacity-90 text-2xl">Due Date: {selectedProject.dueDate}</p>
      <hr/>
      <TaskView
        tasks={selectedProject.tasks}
        onAddTask={onAddTask}
        onDeleteTask={onDeleteTask}
      />
    </Section>
  );
}
