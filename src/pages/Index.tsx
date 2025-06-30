
import Hero from "@/components/Hero";
import ValuePropositions from "@/components/ValuePropositions";
import Process from "@/components/Process";
import Solutions from "@/components/Solutions";
import ROICalculator from "@/components/ROICalculator";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <ValuePropositions />
      <Process />
      <Solutions />
      <ROICalculator />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;
