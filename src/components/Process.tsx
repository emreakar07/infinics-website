import React, { useState } from "react";
import { CheckCircle, Zap, Rocket, Target, Calendar, Users, TrendingUp, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const Process = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      icon: Target,
      day: "1-2",
      title: "Analyze & Plan",
      description: "Deep dive into your processes and create a strategic roadmap",
      deliverables: ["Process audit", "ROI projection", "Technical specs"],
      metrics: ["50+ processes analyzed", "3-5x ROI identified", "Clear milestones"],
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50/50 to-cyan-50/50"
    },
    {
      icon: Zap,
      day: "3-5", 
      title: "Design & Architect",
      description: "AI-powered design for optimal user experience and architecture",
      deliverables: ["UI/UX designs", "System architecture", "API documentation"],
      metrics: ["10+ screens designed", "Scalable architecture", "API-first approach"],
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-50/50 to-emerald-50/50"
    },
    {
      icon: Rocket,
      day: "6-12",
      title: "Build & Test", 
      description: "Rapid development with continuous testing and daily updates",
      deliverables: ["Working software", "Test reports", "Daily demos"],
      metrics: ["95%+ test coverage", "Zero critical bugs", "Daily progress"],
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-50/50 to-pink-50/50"
    },
    {
      icon: CheckCircle,
      day: "13-14",
      title: "Launch & Scale",
      description: "Deploy your solution with training and ongoing support",
      deliverables: ["Live deployment", "Team training", "Support setup"],
      metrics: ["100% uptime", "Full team trained", "24/7 support active"],
      color: "from-orange-500 to-red-500",
      bgColor: "from-orange-50/50 to-red-50/50"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-cyan-100/20 to-green-100/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-100/20 to-pink-100/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-100 to-green-100 rounded-full text-sm font-semibold text-gray-700 mb-4">
            <Calendar className="h-4 w-4" />
            Our Process
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
            From Idea to Impact in 14 Days
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our proven sprint methodology delivers production-ready AI solutions at lightning speed
          </p>
        </div>

        {/* Timeline for desktop */}
        <div className="hidden lg:block mb-12">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute top-12 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 rounded-full"></div>
            
            {/* Steps */}
            <div className="grid grid-cols-4 gap-4 relative">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="relative cursor-pointer group"
                  onClick={() => setActiveStep(index)}
                >
                  {/* Step circle */}
                  <div className="flex justify-center mb-4">
                    <div className={cn(
                      "w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 relative",
                      activeStep === index 
                        ? `bg-gradient-to-br ${step.color} shadow-lg scale-110` 
                        : "bg-white border-2 border-gray-200 hover:border-gray-300"
                    )}>
                      <step.icon className={cn(
                        "h-10 w-10 transition-colors",
                        activeStep === index ? "text-white" : "text-gray-600"
                      )} />
                      {/* Day badge */}
                      <Badge 
                        className={cn(
                          "absolute -top-2 -right-2 text-xs",
                          activeStep === index 
                            ? "bg-gray-900 text-white" 
                            : "bg-white border border-gray-200 text-gray-600"
                        )}
                      >
                        Day {step.day}
                      </Badge>
                    </div>
                  </div>
                  
                  {/* Step title */}
                  <h3 className={cn(
                    "text-center font-semibold transition-colors",
                    activeStep === index ? "text-gray-900" : "text-gray-600"
                  )}>
                    {step.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile timeline */}
        <div className="lg:hidden mb-8">
          <div className="flex justify-between items-center mb-6">
            {steps.map((step, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={cn(
                  "flex-1 relative",
                  index < steps.length - 1 && "after:content-[''] after:absolute after:top-1/2 after:right-0 after:w-full after:h-0.5 after:bg-gray-200"
                )}
              >
                <div className={cn(
                  "w-12 h-12 mx-auto rounded-full flex items-center justify-center transition-all relative z-10",
                  activeStep === index 
                    ? `bg-gradient-to-br ${step.color} shadow-lg` 
                    : "bg-white border-2 border-gray-200"
                )}>
                  <step.icon className={cn(
                    "h-6 w-6",
                    activeStep === index ? "text-white" : "text-gray-600"
                  )} />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Active step detail */}
        <Card className="overflow-hidden border-0 shadow-xl animate-fade-in">
          <div className={`h-2 bg-gradient-to-r ${steps[activeStep].color}`}></div>
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left side - Details */}
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-3 bg-gradient-to-br ${steps[activeStep].color} rounded-xl shadow-lg`}>
                      {React.createElement(steps[activeStep].icon, { className: "h-6 w-6 text-white" })}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{steps[activeStep].title}</h3>
                      <p className="text-sm text-gray-600">Days {steps[activeStep].day}</p>
                    </div>
                  </div>
                  <p className="text-gray-600">{steps[activeStep].description}</p>
                </div>

                {/* Deliverables */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-gray-600" />
                    Key Deliverables
                  </h4>
                  <div className="space-y-2">
                    {steps[activeStep].deliverables.map((deliverable, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className={cn("h-4 w-4", `text-${steps[activeStep].color.split('-')[1]}-500`)} />
                        <span className="text-sm text-gray-700">{deliverable}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right side - Metrics */}
              <div className={`p-6 rounded-2xl bg-gradient-to-br ${steps[activeStep].bgColor}`}>
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Success Metrics
                </h4>
                <div className="grid gap-4">
                  {steps[activeStep].metrics.map((metric, idx) => (
                    <div 
                      key={idx} 
                      className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-white/50"
                    >
                      <div className="flex items-center gap-2">
                        <ChevronRight className={cn("h-4 w-4", `text-${steps[activeStep].color.split('-')[1]}-500`)} />
                        <span className="font-medium text-gray-900">{metric}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Step navigation */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t">
              <button
                onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                disabled={activeStep === 0}
                className={cn(
                  "flex items-center gap-2 text-sm font-medium transition-colors",
                  activeStep === 0 ? "text-gray-400 cursor-not-allowed" : "text-gray-600 hover:text-gray-900"
                )}
              >
                <ChevronRight className="h-4 w-4 rotate-180" />
                Previous
              </button>
              
              <div className="flex gap-2">
                {steps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveStep(index)}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all",
                      activeStep === index 
                        ? `w-8 bg-gradient-to-r ${steps[index].color}` 
                        : "bg-gray-300 hover:bg-gray-400"
                    )}
                  />
                ))}
              </div>

              <button
                onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
                disabled={activeStep === steps.length - 1}
                className={cn(
                  "flex items-center gap-2 text-sm font-medium transition-colors",
                  activeStep === steps.length - 1 ? "text-gray-400 cursor-not-allowed" : "text-gray-600 hover:text-gray-900"
                )}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Process;