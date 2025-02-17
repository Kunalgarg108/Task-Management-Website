import Button from "./Button";
import Section from "./Section";
import noProjectSelectedImg from "../assets/no-projects.png";

export default function ProjectInputPreview({ onChangeContentDisplayed }) {
  return (
    <Section>
      <img
        className=" max-w-20 max-h-20"
        src={noProjectSelectedImg}
        alt="note-read"
      />
      <h1 className=" font-bold text-3xl">No Project Selected</h1>
      <p className="text-2xl">Please select a project or get started with a new one</p>
      <Button
        onClick={() => onChangeContentDisplayed("project-input")}
        content="Create new project"
        purpose="add"
      />
    </Section>
  );
}
