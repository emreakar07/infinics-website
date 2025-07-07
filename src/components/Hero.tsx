import { Button } from "@/components/ui/button";
import { Zap, Code2, Sparkles, ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-br from-cyan-50 via-white to-green-50 overflow-hidden">
      {/* Enhanced background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-gradient-to-br from-cyan-200/40 to-green-200/40 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-gradient-to-tr from-green-200/40 to-cyan-200/40 rounded-full blur-3xl animate-pulse"></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(0 0 0 / 0.04)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`
             }}
        />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Refined header with logo and company name */}
          <div className="mb-12 animate-fade-in">
            <div className="flex items-center justify-center gap-3 mb-6">
              <img 
                src="/lovable-uploads/ae62675a-c666-4cfd-aca4-5a928cd05760.png" 
                alt="Infinics Logo" 
                className="h-12 w-auto"
              />
              <h2 className="text-[1.75rem] font-extrabold bg-gradient-to-r from-cyan-700 via-slate-700 to-green-700 bg-clip-text text-transparent tracking-tight">
                Infinics
              </h2>
            </div>
            
            {/* Main headline with better visual hierarchy */}
            <div className="text-center">
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-green-600 bg-clip-text text-transparent leading-tight">
                AI Agent Dev Studio
              </h1>
            </div>
          </div>
          
          {/* Enhanced subheadline with visual elements */}
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-10 animate-fade-in">
            <div className="flex items-center gap-2">
              <Code2 className="h-5 w-5 text-cyan-600" />
              <span className="text-lg text-gray-600">From concept</span>
            </div>
            <ArrowRight className="h-4 w-4 text-gray-400" />
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-green-600" />
              <span className="text-lg text-gray-600">to production in</span>
              <span className="font-bold text-2xl bg-gradient-to-r from-cyan-600 to-green-600 bg-clip-text text-transparent">14 days</span>
            </div>
          </div>
          
          {/* CTA Buttons with enhanced styling */}
          <div className="animate-fade-in flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform group"
              onClick={() => {
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Zap className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              Start Your Project
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-2 px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 transform hover:border-cyan-500 hover:text-cyan-600 group"
              onClick={() => {
                document.querySelector('#demo-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Try Live Demo
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          
          {/* Enhanced trust indicators with icons */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600 animate-fade-in">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>No hidden costs</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>14-day guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Custom solutions only</span>
            </div>
          </div>
          
          {/* Stats badges - removed client satisfaction */}
          <div className="mt-12 flex justify-center gap-12 animate-fade-in">
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-green-600 bg-clip-text text-transparent">50+</div>
              <div className="text-sm text-gray-600">AI Agents Deployed</div>
            </div>
            <div className="h-12 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-green-600 bg-clip-text text-transparent">24/7</div>
              <div className="text-sm text-gray-600">Support Available</div>
            </div>
          </div>
        </div>
      </div>

      {/* Smooth transition element - more subtle */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default Hero;
