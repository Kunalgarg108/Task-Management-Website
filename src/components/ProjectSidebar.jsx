import Button from "./Button";
export default function ProjectSidebar({
  onChangeContentDisplayed,
  projects,
  selectedProjectIndex,
}) {
  return (
    <div className=" bg-[#221F1F] flex-initial p-10 w-80 rounded-r-lg">
      <h1 className="py-2 text-white font-bold text-2xl">YOUR PROJECTS</h1>
      <Button
        onClick={() => onChangeContentDisplayed("project-input")}
        content="+ Add project"
      />
      <div className="p-1 space-y-2">
        {projects.length > 0 &&
          projects.map((project, projectIndex) => {
            return (
              <p
                onClick={() =>
                  onChangeContentDisplayed("project-view", projectIndex)
                }
                className={`${
                  projectIndex === selectedProjectIndex
                    ? "animate-pulse text-white bg-gradient-to-br from-pink-500 to-orange-400"
                    : "text-black bg-gray-200"
                } pl-3 py-1 pr-1 rounded-lg cursor-pointer font-bold`}
                key={`${project.title}-${projectIndex}`}
              >
                <span className="px-2">
                {projectIndex + 1}: 
                </span>
                {project.title}
              </p>
            );
          })}
      </div>
    </div>
  );
}
