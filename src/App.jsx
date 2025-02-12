import { useRef, useState, useEffect } from "react";
import ProjectInput from "./components/ProjectInput";
import ProjectInputPreview from "./components/ProjectInputPreview";
import ProjectSidebar from "./components/ProjectSidebar";
import ProjectView from "./components/ProjectView";
import Toast from "./components/Toast";

function App() {
  const [activeView, setActiveView] = useState("project-preview");
  let activeContentDisplayed = <ProjectInputPreview />;
  const selectedProjectRef = useRef({
    activeProjectIndex: null,
  });
  function handleChangeContentDisplayed(displayTitle, projectIndex) {
    if (projectIndex > -1) {
      selectedProjectRef.current.activeProjectIndex = projectIndex;
      setActiveView(
        `project-view-${selectedProjectRef.current.activeProjectIndex}`
      );
    } else {
      selectedProjectRef.current.activeProjectIndex = null;
      setActiveView(displayTitle);
    }
  }

  const toastRef = useRef();
  const projectId = useRef({
    newId: -1,
  });

  const [projects, setProjects] = useState(() => {
    const savedProjects = localStorage.getItem("projects");
    return savedProjects ? JSON.parse(savedProjects) : [];
  });

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  function handleAddProject(project) {
    project.id = projectId.current.newId + 1;
    projectId.current.newId = projectId.current.newId + 1;
    toastRef.current.open();
    setTimeout(() => {
      setProjects((prevProjects) => {
        const newProjects = [...prevProjects, project];
        selectedProjectRef.current.activeProjectIndex = newProjects.length - 1;
        return newProjects;
      });
      setActiveView(`project-view-${projects.length}`);
      setTimeout(() => {
        toastRef.current.close();
      }, 400);
    }, 700);
  }

  function handleDeleteProject(id) {
    toastRef.current.open();
    setTimeout(() => {
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project.id !== id)
      );
      setActiveView("project-preview");
      selectedProjectRef.current.activeProjectIndex = null;
      setTimeout(() => {
        toastRef.current.close();
      }, 400);
    }, 700);
  }

  function handleAddTask(task) {
    toastRef.current.open();
    setTimeout(() => {
      setProjects((prevProjects) => {
        const newProjects = [
          ...prevProjects.map((project, index) => {
            if (index === selectedProjectRef.current.activeProjectIndex) {
              const newProject = {
                ...project,
                tasks: [...project.tasks, { ...task, id: project.tasks.length }],
              };
              return newProject;
            } else {
              return project;
            }
          }),
        ];
        return newProjects;
      });
      toastRef.current.close();
    }, 700);
  }

  function handleDeleteTask(taskId) {
    setProjects((prevProjects) => {
      const newProjects = [
        ...prevProjects.map((project, index) => {
          if (index === selectedProjectRef.current.activeProjectIndex) {
            const newTasks = project.tasks.filter((t) => t.id !== taskId);
            const newProject = {
              ...project,
              tasks: [...newTasks],
            };
            return newProject;
          } else {
            return project;
          }
        }),
      ];
      return newProjects;
    });
  }

  if (activeView && activeView === "project-input") {
    activeContentDisplayed = (
      <ProjectInput
        onChangeContentDisplayed={handleChangeContentDisplayed}
        onAddProject={handleAddProject}
      />
    );
  } else if (
    activeView ===
    `project-view-${selectedProjectRef.current.activeProjectIndex}`
  ) {
    activeContentDisplayed = (
      <ProjectView
        onDelete={handleDeleteProject}
        selectedProject={
          projects[selectedProjectRef.current.activeProjectIndex]
        }
        onAddTask={handleAddTask}
        onDeleteTask={handleDeleteTask}
      />
    );
  } else {
    activeContentDisplayed = (
      <ProjectInputPreview
        onChangeContentDisplayed={handleChangeContentDisplayed}
      />
    );
  }

  return (
    <main
      className={`${
        activeView === "project-preview"
          ? "rounded-lg bg-[#96897f]"
          : ""
      } flex min-h-svh`}
    >
      <Toast ref={toastRef} />
      {activeContentDisplayed}
      {activeView !== "project-preview" && <ProjectSidebar
          selectedProjectIndex={selectedProjectRef.current.activeProjectIndex}
          onChangeContentDisplayed={handleChangeContentDisplayed}
          projects={projects}
        />}
      {activeView === "project-preview" && null}
    </main>
  );
}

export default App;