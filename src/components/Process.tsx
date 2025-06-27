
const Process = () => {
  const steps = [
    {
      days: "Days 1-2",
      title: "Discovery & Planning",
      description: "We work with you to understand your requirements and create a detailed project plan."
    },
    {
      days: "Days 3-5", 
      title: "Design & Architecture",
      description: "Our team designs the application architecture and user interface."
    },
    {
      days: "Days 6-12",
      title: "Development & Testing", 
      description: "We build your application using our AI-powered development tools and perform rigorous testing."
    },
    {
      days: "Days 13-14",
      title: "Deployment & Handover",
      description: "Your application is deployed to production and we provide comprehensive documentation."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our 14-Day Process
          </h2>
          <p className="text-xl text-gray-600">
            From concept to production in just two weeks
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-gradient-to-b from-cyan-500 to-green-500">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {index + 1}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-cyan-600 mb-2">{step.days}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
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
