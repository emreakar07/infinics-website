
import { TrendingUp, Clock, DollarSign, ArrowRight, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const ValuePropositions = () => {
  const values = [
    {
      icon: Clock,
      title: "10x Faster Launch",
      shortTitle: "Speed",
      description: "Launch in 14 days instead of 6-18 months. Start generating revenue immediately while competitors are still planning.",
      metric: "14 days",
      subMetric: "vs 6+ months",
      benefits: ["Immediate market entry", "First-mover advantage", "Quick ROI realization"],
      bgGradient: "from-blue-500 to-cyan-500",
      cardGradient: "from-blue-50 to-cyan-50"
    },
    {
      icon: DollarSign,
      title: "70% Cost Reduction", 
      shortTitle: "Savings",
      description: "Fixed pricing from $15K instead of $50K-200K+ variable costs. No scope creep, hidden fees, or budget surprises.",
      metric: "$15K",
      subMetric: "vs $50K-200K+",
      benefits: ["Predictable costs", "No hidden fees", "Budget protection"],
      bgGradient: "from-green-500 to-emerald-500",
      cardGradient: "from-green-50 to-emerald-50"
    },
    {
      icon: TrendingUp,
      title: "5x ROI Guarantee",
      shortTitle: "Results",
      description: "Proven results: 60% less manual work, 70% faster processes, 90% fewer errors. Your investment pays for itself.",
      metric: "5x ROI",
      subMetric: "in 6 months",
      benefits: ["Automated workflows", "Error reduction", "Process optimization"],
      bgGradient: "from-purple-500 to-pink-500",
      cardGradient: "from-purple-50 to-pink-50"
    }
  ];

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-cyan-200/20 to-blue-200/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-green-200/20 to-emerald-200/20 rounded-full blur-2xl animate-pulse"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-100 to-green-100 px-4 py-2 rounded-full text-sm font-medium text-cyan-700 mb-4">
            <CheckCircle className="h-4 w-4" />
            Proven Business Results
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
            Need a Custom AI Agent?
            <span className="block bg-gradient-to-r from-cyan-600 to-green-600 bg-clip-text text-transparent">
              Choose Infinics
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Measurable results that transform your business from day one
          </p>
        </div>
        
        {/* Values Grid */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto mb-12">
          {values.map((value, index) => (
            <Card 
              key={index} 
              className={`relative border-none shadow-lg hover:shadow-2xl transition-all duration-700 hover:scale-105 bg-gradient-to-br ${value.cardGradient} group animate-fade-in overflow-hidden`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Card background pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white to-transparent transform rotate-12 scale-150"></div>
              </div>
              
              <CardContent className="relative p-6 md:p-8">
                {/* Icon and metric */}
                <div className="flex items-start justify-between mb-6">
                  <div className={`p-3 md:p-4 bg-gradient-to-br ${value.bgGradient} rounded-2xl group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                    <value.icon className="h-6 w-6 md:h-8 md:w-8 text-white" />
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl md:text-3xl font-bold bg-gradient-to-br ${value.bgGradient} bg-clip-text text-transparent`}>
                      {value.metric}
                    </div>
                    <div className="text-xs md:text-sm text-gray-500 font-medium">
                      {value.subMetric}
                    </div>
                  </div>
                </div>
                
                {/* Title and description */}
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6 text-sm md:text-base">
                  {value.description}
                </p>
                
                {/* Benefits list */}
                <div className="space-y-2">
                  {value.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
                
                {/* Arrow indicator */}
                <div className="mt-6 flex justify-end">
                  <ArrowRight className={`h-5 w-5 text-gray-400 group-hover:text-cyan-600 group-hover:translate-x-1 transition-all duration-300`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Bottom CTA */}
        <div className="text-center animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <div className="inline-flex items-center gap-4 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-gray-200">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">A</div>
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold">B</div>
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold">C</div>
            </div>
            <span className="text-gray-700 font-medium">AI-powered solutions for real business problems.</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuePropositions;
