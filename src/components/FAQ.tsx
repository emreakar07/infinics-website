
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "What types of solutions does Infinics offer?",
      answer: "Infinics offers two primary solution types: custom software development where we build tailored applications from scratch, and our proprietary product suite of ready-made applications that can be quickly customized to your needs. Both options are delivered in just 14 days through our AI-powered development process."
    },
    {
      question: "What technologies do you use?",
      answer: "We use a comprehensive technology stack including Next.js, React, Node.js, Supabase, Firebase, Google Cloud, AWS, and Azure. We also implement advanced caching, authentication solutions, and AI integration capabilities to ensure your application is performant, secure, and intelligent."
    },
    {
      question: "How do you integrate AI into your solutions?",
      answer: "AI is at the core of our development process. Our specialized AI team ensures that your product leverages the latest in artificial intelligence, from natural language processing to computer vision and predictive analytics, giving you a competitive edge in today's market."
    },
    {
      question: "What kind of support do you offer after deployment?",
      answer: "We provide comprehensive post-launch support including monitoring, performance optimization, security updates, and feature enhancements. We offer flexible support packages tailored to your needs, ensuring your application continues to deliver value as your business evolves."
    },
    {
      question: "Who leads your team?",
      answer: "Our team is led by Efe Akman, who brings 20 years of international technology expertise. Infinics is composed of senior developers with 5+ years of enterprise experience, specialized AI engineers and researchers, and dedicated product managers."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about working with Infinics
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg shadow-sm border border-gray-200">
                <AccordionTrigger className="px-6 py-4 text-left font-semibold text-gray-900 hover:text-cyan-600">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
