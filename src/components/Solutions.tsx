
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Solutions = () => {
  const aiSolutions = [
    "Intelligent Inventory Search Engine",
    "Digital Recruitment System with AI Interview", 
    "Guest Review Analysis System",
    "In-Hotel AI Assistant",
    "AI-Powered Contract & Document Management",
    "Call Center Conversation Analyzer",
    "AI-Powered Sales Proposal Management",
    "DeepResearch and Report Generator"
  ];

  const enterpriseSolutions = [
    "Digital Audit System",
    "Marketing Budget & Expense Tracking", 
    "Quality Control Management System",
    "Compliance Platform",
    "Web and Telegram E-Commerce Platform",
    "Enterprise Slack Platform",
    "CRM System",
    "Project Management App"
  ];

  const mobileSolutions = [
    "Next-Generation Mobile Application Platform",
    "Telegram E-Pin Sales Platform",
    "Personal Finance App",
    "Cross-Platform Mobile Solutions"
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What We Build
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We build and deliver AI-powered solutions in just 14 days
          </p>
        </div>

        <Tabs defaultValue="ai" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-12 bg-gray-100">
            <TabsTrigger value="ai" className="text-lg font-medium">AI Solutions</TabsTrigger>
            <TabsTrigger value="enterprise" className="text-lg font-medium">Enterprise Systems</TabsTrigger>
            <TabsTrigger value="mobile" className="text-lg font-medium">Mobile & Apps</TabsTrigger>
          </TabsList>
          
          <TabsContent value="ai">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {aiSolutions.map((solution, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-l-4 border-cyan-500">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-900">{solution}</CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="enterprise">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enterpriseSolutions.map((solution, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-l-4 border-green-500">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-900">{solution}</CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="mobile">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mobileSolutions.map((solution, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-l-4 border-blue-500">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-900">{solution}</CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Solutions;
