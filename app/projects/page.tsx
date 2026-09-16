import Project from "../Components/Project";
import PageBackdrop from "../Components/three/PageBackdrop";

export const metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <div className="pt-20">
      <PageBackdrop />
      <Project />
    </div>
  );
}
