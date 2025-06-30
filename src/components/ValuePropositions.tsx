
import { TrendingUp, Clock, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const ValuePropositions = () => {
  const values = [
    {
      icon: Clock,
      title: "10x Faster Time-to-Market",
      description: "Launch in 14 days instead of 6-18 months. Start generating revenue immediately while competitors are still planning.",
      metric: "14 days vs 6+ months"
    },
    {
      icon: DollarSign,
      title: "70% Cost Reduction", 
      description: "Fixed pricing from $15K instead of $50K-200K+ variable costs. No scope creep, no hidden fees, no budget surprises.",
      metric: "Save $35K-185K+"
    },
    {
      icon: TrendingUp,
      title: "300-500% ROI in 6 Months",
      description: "Proven results: 60% less manual work, 70% faster processes, 90% fewer errors. Your investment pays for itself quickly.",
      metric: "3-5x return guaranteed"
    }
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-white via-gray-50/30 to-white overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Smart Businesses Choose Infinics
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Measurable results that impact your bottom line from day one
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
                <div className="text-2xl font-bold text-cyan-600 mb-2">{value.metric}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
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
