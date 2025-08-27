
import Hero from "@/components/Hero";
import InfinicsDescription from "@/components/InfinicsDescription";
import OurServices from "@/components/OurServices";
import DemoShowcase from "@/components/DemoShowcase";
import AgentProducts from "@/components/AgentProducts";
import ValuePropositions from "@/components/ValuePropositions";
import Process from "@/components/Process";
import ROICalculator from "@/components/ROICalculator";
import ContactForm from "@/components/ContactForm";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import WebinarButton from "@/components/WebinarButton";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <InfinicsDescription />
      <OurServices />
      <DemoShowcase />
      <AgentProducts />
      <ValuePropositions />
      <Process />
      <ROICalculator />
      <ContactForm />
      <FAQ />
      <Footer />
      <WebinarButton />
    </div>
  );
};

export default Index;
