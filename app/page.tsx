import Footer from "@/components/organisms/footer";
import About from "@/components/templates/about";
import Banner from "@/components/templates/banner";
import Contact from "@/components/templates/contact";
import Expertice from "@/components/templates/expertice";
import Projects from "@/components/templates/projects";
import Timeline from "@/components/templates/timeline";

export default function Home() {
  return (
    <>
      <main>
        <Banner />
        <Expertice />
        <Projects />
        <About />
        <Timeline />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
