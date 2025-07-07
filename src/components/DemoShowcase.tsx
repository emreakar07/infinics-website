import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, DollarSign, Wrench, Sparkles, Play } from "lucide-react";
import { Link } from "react-router-dom";

const DemoShowcase = () => {
  const demos = [
    {
      id: "pricing-agent",
      title: "Pricing Agent",
      description: "Intelligent pricing recommendations based on market data, competitor analysis, and customer segments",
      icon: DollarSign,
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50",
      features: [
        "Dynamic pricing strategies",
        "Competitor analysis",
        "Revenue optimization",
        "Real-time adjustments"
      ]
    },
    {
      id: "maintenance-agent",
      title: "Maintenance Support Agent",
      description: "Automated support for maintenance requests, troubleshooting, and preventive care recommendations",
      icon: Wrench,
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-50 to-emerald-50",
      features: [
        "24/7 automated support",
        "Predictive maintenance",
        "Issue prioritization",
        "Knowledge base integration"
      ]
    }
  ];

  return (
    <section id="demo-section" className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-cyan-100/40 to-green-100/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-gradient-to-tr from-green-100/40 to-blue-100/40 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-100 to-green-100 rounded-full text-sm font-semibold text-gray-700 mb-4">
            <Sparkles className="h-4 w-4" />
            Live Demo
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
            Try Our AI Agents - Live Demo
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience two of our most popular AI agents in action. These interactive demos showcase how our custom AI solutions can transform your business operations.
          </p>
        </div>

        {/* Demo cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          {demos.map((demo, index) => (
            <Card 
              key={demo.id}
              className={`relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${demo.bgColor} opacity-50`}></div>
              <div className="relative p-8">
                {/* Icon */}
                <div className={`inline-flex p-4 bg-gradient-to-br ${demo.color} rounded-2xl shadow-lg mb-6`}>
                  <demo.icon className="h-8 w-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{demo.title}</h3>
                <p className="text-gray-600 mb-6">{demo.description}</p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {demo.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${demo.color} mt-1.5 flex-shrink-0`}></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Link to={`/demo/${demo.id}`}>
                  <Button 
                    className={`w-full bg-gradient-to-r ${demo.color} hover:opacity-90 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 group`}
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Try Demo
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center animate-fade-in">
          <p className="text-gray-600 mb-4">
            These are just 2 examples from our extensive AI agent suite. Explore all our solutions below.
          </p>
          <div className="flex items-center justify-center gap-2 text-cyan-600">
            <span className="text-sm font-medium">Scroll to see all AI agents</span>
            <ArrowRight className="h-4 w-4 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoShowcase;