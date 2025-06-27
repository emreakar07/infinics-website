
import { Zap, Settings, Code } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const ValuePropositions = () => {
  const values = [
    {
      icon: Zap,
      title: "Rapid Development",
      description: "We deliver complete, production-ready applications in just 14 days, not months or years."
    },
    {
      icon: Settings,
      title: "Custom Solutions", 
      description: "No generic SaaS products. Every application is built specifically for your unique business needs."
    },
    {
      icon: Code,
      title: "AI-Powered",
      description: "Leveraging cutting-edge AI to accelerate development without compromising quality."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose Infinics?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're redefining how businesses approach application development
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {values.map((value, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white to-gray-50">
              <CardContent className="p-8 text-center">
                <div className="mb-6 flex justify-center">
                  <div className="p-4 bg-gradient-to-br from-cyan-100 to-green-100 rounded-full">
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
    </section>
  );
};

export default ValuePropositions;
