
const Process = () => {
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
        
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className="relative animate-fade-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border-l-4 border-gradient-to-b from-cyan-500 to-green-500 group hover:scale-105">
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-cyan-600 mb-3 tracking-wide uppercase">{step.days}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{step.description}</p>
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
