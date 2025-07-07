
import Hero from "@/components/Hero";
import DemoShowcase from "@/components/DemoShowcase";
import AgentProducts from "@/components/AgentProducts";
import ValuePropositions from "@/components/ValuePropositions";
import Process from "@/components/Process";
import ROICalculator from "@/components/ROICalculator";
import ContactForm from "@/components/ContactForm";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <DemoShowcase />
      <AgentProducts />
      <ValuePropositions />
      <Process />
      <ROICalculator />
      <ContactForm />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;
