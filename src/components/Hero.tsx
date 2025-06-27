
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 via-white to-green-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-cyan-200/30 to-green-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-green-200/30 to-cyan-200/30 rounded-full blur-3xl animate-pulse"></div>
      </div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Logo */}
        <div className="mb-8 flex justify-center animate-fade-in">
          <img 
            src="/lovable-uploads/ae62675a-c666-4cfd-aca4-5a928cd05760.png" 
            alt="Infinics Logo" 
            className="h-16 w-auto"
          />
        </div>
        
        {/* Main headline - split into two lines */}
        <div className="mb-6 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-green-600 bg-clip-text text-transparent mb-2">
            Infinics
          </h1>
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-green-600 bg-clip-text text-transparent">
            AI Agent Dev Studio
          </h2>
        </div>
        
        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto animate-fade-in leading-relaxed">
          From concept to production in <span className="font-bold text-cyan-600">14 days</span>.
        </p>
        
        {/* CTA Button */}
        <div className="animate-fade-in">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 transform"
          >
            <Zap className="mr-2 h-5 w-5" />
            Start Your Project
          </Button>
        </div>
        
        {/* Trust indicator */}
        <p className="mt-8 text-sm text-gray-500 animate-fade-in">
          ✓ No hidden costs • ✓ 14-day guarantee • ✓ Custom solutions only
        </p>
      </div>

      {/* Smooth transition element */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default Hero;
