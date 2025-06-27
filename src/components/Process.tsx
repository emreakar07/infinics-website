
import { useState } from "react";

const Process = () => {
  const [selectedStep, setSelectedStep] = useState<number | null>(null);

  const steps = [
    {
      days: "Days 1-2",
      title: "Discovery & Planning",
      description: "We work with you to understand your requirements and create a detailed AI agent project plan."
    },
    {
      days: "Days 3-5", 
      title: "Design & Architecture",
      description: "Our team designs the AI agent architecture and user interface for optimal performance."
    },
    {
      days: "Days 6-12",
      title: "Development & Testing", 
      description: "We build your AI agent using our advanced development tools and perform rigorous testing."
    },
    {
      days: "Days 13-14",
      title: "Deployment & Handover",
      description: "Your AI agent is deployed to production and we provide comprehensive documentation."
    }
  ];

  return (
    <section className="relative py-32 bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-br from-cyan-100/20 to-green-100/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-gradient-to-bl from-green-100/20 to-cyan-100/20 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our 14-Day AI Agent Process
          </h2>
          <p className="text-xl text-gray-600">
            From concept to production in just two weeks
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {/* Timeline container */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyan-300 to-green-300 rounded-full"></div>
            
            {steps.map((step, index) => (
              <div 
                key={index} 
                className={`relative flex items-center mb-16 animate-fade-in ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Timeline dot */}
                <div 
                  className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-cyan-500 to-green-500 rounded-full border-4 border-white shadow-lg cursor-pointer hover:scale-125 transition-transform duration-300 z-10"
                  onClick={() => setSelectedStep(selectedStep === index ? null : index)}
                ></div>
                
                {/* Content box */}
                <div 
                  className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'} cursor-pointer`}
                  onClick={() => setSelectedStep(selectedStep === index ? null : index)}
                >
                  <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
                    <div className="text-sm font-semibold text-cyan-600 mb-2 tracking-wide uppercase">{step.days}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                    
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
                      {selectedStep === index ? 'Click to collapse' : 'Click to expand'}
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
