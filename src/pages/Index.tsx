
import Hero from "@/components/Hero";
import DemoShowcase from "@/components/DemoShowcase";
import ValuePropositions from "@/components/ValuePropositions";
import Process from "@/components/Process";
import Solutions from "@/components/Solutions";
import ROICalculator from "@/components/ROICalculator";
import ContactForm from "@/components/ContactForm";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <DemoShowcase />
      <ValuePropositions />
      <Process />
      <Solutions />
      <ROICalculator />
      <ContactForm />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;
