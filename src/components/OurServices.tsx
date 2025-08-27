import { Code2, Smartphone, Globe, Settings } from "lucide-react";

const services = [
  {
    title: "AI Applications & Integration",
    description: "We design AI-powered applications that address real business needs. From workflow automation to intelligent decision support, our solutions create measurable value.",
    icon: Settings,
    color: "from-cyan-500 to-blue-500"
  },
  {
    title: "Mobile Development", 
    description: "We build mobile applications that fit seamlessly into your operations. Every app is fast to launch, simple to use, and ready to scale as your business grows.",
    icon: Smartphone,
    color: "from-blue-500 to-purple-500"
  },
  {
    title: "Web Development",
    description: "We create web applications that combine modern design with long-term reliability. Each solution is secure, scalable, and aligned with your business goals.",
    icon: Globe,
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "Software Architecture & Design",
    description: "We develop software foundations that support growth. Strong architecture ensures your products remain reliable today and flexible for the future.",
    icon: Code2,
    color: "from-pink-500 to-red-500"
  }
];

const OurServices = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From concept to deployment, we deliver comprehensive solutions tailored to your unique business needs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-5 rounded-2xl group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className={`inline-flex p-4 bg-gradient-to-br ${service.color} rounded-2xl mb-6 shadow-lg`}>
                  <service.icon className="h-8 w-8 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
