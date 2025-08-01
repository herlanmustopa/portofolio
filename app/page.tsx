import About from "@/components/templates/about";
import Banner from "@/components/templates/banner";
import Expertice from "@/components/templates/expertice";
import Projects from "@/components/templates/projects";

export default function Home() {
  return (
    <main>
      <Banner />
      <Expertice />
      <Projects />
      <About/>
    </main>
  );
}
