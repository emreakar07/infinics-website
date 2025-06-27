
import { Zap, Settings, Code } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const ValuePropositions = () => {
  const values = [
    {
      icon: Zap,
      title: "Rapid Development",
      description: "We deliver complete, production-ready AI agents in just 14 days, not months or years."
    },
    {
      icon: Settings,
      title: "Custom Solutions", 
      description: "No generic SaaS products. Every AI agent is built specifically for your unique business needs."
    },
    {
      icon: Code,
      title: "AI-Powered",
      description: "Leveraging cutting-edge AI to accelerate development without compromising quality."
    }
  ];

  return (
    <section className="relative py-32 bg-gradient-to-b from-white via-gray-50/30 to-white overflow-hidden">
      {/* Smooth transition from hero */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-white"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Choose Infinics?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're redefining how businesses approach AI agent development
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {values.map((value, index) => (
            <Card 
              key={index} 
              className="border-none shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-gradient-to-br from-white to-gray-50 group animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardContent className="p-8 text-center">
                <div className="mb-6 flex justify-center">
                  <div className="p-4 bg-gradient-to-br from-cyan-100 to-green-100 rounded-full group-hover:scale-110 transition-transform duration-300">
                    <value.icon className="h-8 w-8 text-cyan-600" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Smooth transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-white to-transparent"></div>
    </section>
  );
};

export default ValuePropositions;
