
import React, { useState } from "react";
import { CheckCircle, Zap, Rocket, Target, ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const Process = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      icon: Target,
      days: "Days 1-2",
      title: "Analyze & Plan",
      shortTitle: "Plan",
      description: "We analyze your processes, identify gaps, and create a detailed roadmap with clear ROI projections.",
      outcome: "Strategic blueprint ready",
      features: ["Process audit", "ROI projection", "Implementation plan"],
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50"
    },
    {
      icon: Zap,
      days: "Days 3-5", 
      title: "Design & Architect",
      shortTitle: "Design",
      description: "AI-powered design creates optimal UX and technical architecture for maximum efficiency.",
      outcome: "Production-ready designs",
      features: ["AI-powered UX", "Technical blueprint", "User flow mapping"],
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-50 to-emerald-50"
    },
    {
      icon: Rocket,
      days: "Days 6-12",
      title: "Build & Test", 
      shortTitle: "Build",
      description: "Rapid development with continuous testing. Daily updates keep you informed throughout.",
      outcome: "Fully tested solution",
      features: ["Agile development", "Continuous testing", "Daily updates"],
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-50 to-pink-50"
    },
    {
      icon: CheckCircle,
      days: "Days 13-14",
      title: "Launch & Scale",
      shortTitle: "Launch",
      description: "Deploy, train your team, and monitor performance. Immediate results with full support.",
      outcome: "Live solution generating ROI",
      features: ["Team training", "Performance monitoring", "Ongoing support"],
      color: "from-orange-500 to-red-500",
      bgColor: "from-orange-50 to-red-50"
    }
  ];

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-br from-white via-gray-50 to-white overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-cyan-100/30 to-green-100/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-100/30 to-pink-100/30 rounded-full blur-3xl animate-pulse"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-100 to-green-100 px-4 py-2 rounded-full text-sm font-medium text-cyan-700 mb-4">
            <Rocket className="h-4 w-4" />
            Proven Process
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
            From Idea to Impact
            <span className="block bg-gradient-to-r from-cyan-600 to-green-600 bg-clip-text text-transparent">
              in Just 14 Days
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Our streamlined process delivers measurable business results fast
          </p>
        </div>
        
        {/* Mobile Timeline */}
        <div className="md:hidden space-y-6 mb-12">
          {steps.map((step, index) => (
            <div 
              key={index}
              className={`relative p-6 rounded-2xl bg-gradient-to-br ${step.bgColor} shadow-lg animate-fade-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 bg-gradient-to-br ${step.color} rounded-xl flex-shrink-0 shadow-lg`}>
                  <step.icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">{step.days}</span>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full bg-gradient-to-r ${step.color} text-white`}>
                      {step.shortTitle}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 leading-relaxed">{step.description}</p>
                  <div className="flex items-center gap-2 text-green-600 font-medium text-sm mb-3">
                    <CheckCircle className="h-4 w-4" />
                    {step.outcome}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {step.features.map((feature, idx) => (
                      <span key={idx} className="text-xs bg-white/60 px-2 py-1 rounded-full text-gray-700">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Interactive Timeline */}
        <div className="hidden md:block max-w-6xl mx-auto mb-12">
          {/* Step selector */}
          <div className="flex justify-center mb-8">
            <div className="flex bg-white rounded-2xl p-2 shadow-lg border border-gray-200">
              {steps.map((step, index) => (
                <button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className={`px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 ${
                    activeStep === index
                      ? `bg-gradient-to-r ${step.color} text-white shadow-lg`
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {step.days}
                </button>
              ))}
            </div>
          </div>

          {/* Active step display */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left: Step details */}
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center gap-4">
                <div className={`p-4 bg-gradient-to-br ${steps[activeStep].color} rounded-2xl shadow-lg`}>
                  {React.createElement(steps[activeStep].icon, { className: "h-8 w-8 text-white" })}
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                    {steps[activeStep].days}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {steps[activeStep].title}
                  </h3>
                </div>
              </div>
              
              <p className="text-gray-600 text-lg leading-relaxed">
                {steps[activeStep].description}
              </p>
              
              <div className="flex items-center gap-3 text-green-600 font-semibold">
                <CheckCircle className="h-5 w-5" />
                <span>Result: {steps[activeStep].outcome}</span>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900">Key Activities:</h4>
                <div className="grid grid-cols-1 gap-2">
                  {steps[activeStep].features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Visual representation */}
            <div className={`relative p-8 rounded-3xl bg-gradient-to-br ${steps[activeStep].bgColor} shadow-xl animate-fade-in`}>
              <div className="aspect-square flex items-center justify-center">
                <div className={`w-32 h-32 bg-gradient-to-br ${steps[activeStep].color} rounded-full flex items-center justify-center shadow-2xl animate-pulse`}>
                  {React.createElement(steps[activeStep].icon, { className: "h-16 w-16 text-white" })}
                </div>
              </div>
              <div className="mt-6 text-center">
                <div className={`inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700`}>
                  <Play className="h-4 w-4" />
                  Step {activeStep + 1} of 4
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="bg-gradient-to-r from-cyan-500 to-green-500 rounded-2xl p-8 text-white shadow-2xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Business?</h3>
            <p className="text-cyan-100 mb-6">
              Join hundreds of companies that chose speed and efficiency over endless delays
            </p>
            <Button 
              size="lg" 
              className="bg-white text-cyan-600 hover:bg-gray-100 font-semibold px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Start Your 14-Day Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
