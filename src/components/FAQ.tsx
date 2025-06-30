
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "How can you deliver in just 14 days when others take months?",
      answer: "We use AI-accelerated development combined with pre-built components and battle-tested frameworks. Our process eliminates traditional bottlenecks like requirement gathering loops, design revisions, and integration issues. We start coding on day one with a clear blueprint."
    },
    {
      question: "What's the real cost compared to hiring developers or agencies?",
      answer: "Traditional development costs $50,000-200,000+ and takes 3-12 months. Our fixed-price model starts at $15,000 with 14-day delivery. You save 70-80% on costs and get to market 10x faster, meaning you start generating revenue immediately instead of waiting months."
    },
    {
      question: "Will the AI solution actually work for my specific business needs?",
      answer: "Yes. We don't use generic templates. Each solution is custom-built for your exact workflows, data, and business rules. We integrate with your existing systems and ensure the AI understands your industry terminology and processes."
    },
    {
      question: "What happens if I need changes or support after launch?",
      answer: "You get 30 days of free support and modifications. After that, we offer maintenance packages starting at $500/month. Most clients see 300-500% ROI within the first 6 months, making ongoing support a profitable investment."
    },
    {
      question: "How do I know this will generate actual business results?",
      answer: "Our solutions typically deliver: 40-60% reduction in manual work, 70% faster process completion, and 90% fewer human errors. We track metrics like time saved, costs reduced, and revenue generated to prove ROI within the first quarter."
    },
    {
      question: "Can you handle enterprise-level security and compliance?",
      answer: "Absolutely. We implement bank-level security, SOC 2 compliance, GDPR compliance, and enterprise authentication. Your data stays in your cloud environment with full audit trails and access controls."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Your Questions, Answered
          </h2>
          <p className="text-xl text-gray-600">
            Real answers about ROI, timeline, and business impact
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
