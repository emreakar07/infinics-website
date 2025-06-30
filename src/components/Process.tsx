
import { useState } from "react";
import { CheckCircle, Zap, Rocket, Target } from "lucide-react";

const Process = () => {
  const [selectedStep, setSelectedStep] = useState<number | null>(null);

  const steps = [
    {
      icon: Target,
      days: "Days 1-2",
      title: "Define & Plan",
      description: "We analyze your current processes, identify efficiency gaps, and create a detailed implementation roadmap with clear ROI projections.",
      outcome: "Clear blueprint with measurable goals"
    },
    {
      icon: Zap,
      days: "Days 3-5", 
      title: "Design & Architect",
      description: "Our AI-powered design system creates the optimal user experience and technical architecture for maximum efficiency and minimal training time.",
      outcome: "Production-ready designs and architecture"
    },
    {
      icon: Rocket,
      days: "Days 6-12",
      title: "Build & Test", 
      description: "Rapid AI-accelerated development with continuous testing. We build, test, and refine your solution while keeping you updated daily.",
      outcome: "Fully functional, tested solution"
    },
    {
      icon: CheckCircle,
      days: "Days 13-14",
      title: "Launch & Optimize",
      description: "We deploy your solution, train your team, and monitor performance. You start seeing results immediately with full support.",
      outcome: "Live solution generating immediate ROI"
    }
  ];

  return (
    <section className="relative py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            From Idea to Impact in 14 Days
          </h2>
          <p className="text-xl text-gray-600">
            Proven process that delivers measurable business results
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyan-300 to-green-300 rounded-full hidden md:block"></div>
            
            {steps.map((step, index) => (
              <div 
                key={index} 
                className={`relative flex flex-col md:flex-row items-center mb-12 animate-fade-in ${
                  index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'
                }`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Timeline dot */}
                <div 
                  className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-cyan-500 to-green-500 rounded-full border-4 border-white shadow-lg cursor-pointer hover:scale-125 transition-transform duration-300 z-10 hidden md:flex items-center justify-center"
                  onClick={() => setSelectedStep(selectedStep === index ? null : index)}
                >
                  <step.icon className="h-4 w-4 text-white" />
                </div>
                
                {/* Content box */}
                <div 
                  className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'} cursor-pointer`}
                  onClick={() => setSelectedStep(selectedStep === index ? null : index)}
                >
                  <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
                    <div className="flex items-center mb-3">
                      <div className="p-2 bg-gradient-to-br from-cyan-100 to-green-100 rounded-lg mr-3 md:hidden">
                        <step.icon className="h-5 w-5 text-cyan-600" />
                      </div>
                      <div className="text-sm font-semibold text-cyan-600 tracking-wide uppercase">{step.days}</div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                    <div className="text-sm font-medium text-green-600 mb-3">→ {step.outcome}</div>
                    
                    {/* Expandable description */}
                    <div className={`overflow-hidden transition-all duration-500 ${
                      selectedStep === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <p className="text-gray-600 leading-relaxed pt-2 border-t border-gray-100">
                        {step.description}
                      </p>
                    </div>
                    
                    {/* Click indicator */}
                    <div className="text-xs text-cyan-500 mt-2 opacity-60 group-hover:opacity-100 transition-opacity">
                      {selectedStep === index ? 'Click to collapse' : 'Click for details'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
