
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Solutions = () => {
  const businessSolutions = [
    {
      title: "Smart CRM System",
      description: "Complete customer management with AI insights and automated workflows."
    },
    {
      title: "Project Management Platform",
      description: "Track projects, manage teams, and monitor progress in one unified dashboard."
    },
    {
      title: "Digital Document Management",
      description: "Secure document storage, sharing, and electronic signing solution."
    },
    {
      title: "Compliance & Audit Platform",
      description: "Automated compliance tracking and audit management for regulatory requirements."
    },
    {
      title: "Quality Control System",
      description: "Monitor and maintain quality standards across your operations."
    }
  ];

  const aiPoweredSolutions = [
    {
      title: "AI Recruitment Assistant",
      description: "Automated candidate screening and AI-powered interview system."
    },
    {
      title: "Smart Inventory Manager",
      description: "AI-driven inventory optimization and automated stock management."
    },
    {
      title: "Contract Analyzer",
      description: "AI system that reviews and analyzes contracts for key terms and risks."
    },
    {
      title: "Sales Proposal Generator",
      description: "Create winning proposals with AI assistance and templates."
    },
    {
      title: "Customer Service Bot",
      description: "24/7 AI assistant for customer support and call center analytics."
    }
  ];

  const industrySpecific = [
    {
      title: "Hotel & Restaurant Analytics",
      description: "Review analysis and dynamic pricing optimization for hospitality."
    },
    {
      title: "Marketing Budget & Expense Tracking",
      description: "Smart platform for planning, tracking, and optimizing marketing budgets and expenses to maximize ROI and reduce waste."
    },
    {
      title: "FundAI - Government Grants Matching Engine",
      description: "AI-powered system that automatically matches your business with relevant government funding opportunities and grants based on your industry and needs."
    },
    {
      title: "Personal Finance App",
      description: "Comprehensive mobile application for managing personal finances, budgeting, expense tracking, and achieving financial goals with AI insights."
    },
    {
      title: "AI-Based Investment Research Platform",
      description: "Intelligent system for analyzing investment opportunities, market trends, and portfolio optimization with real-time data and predictive analytics."
    },
    {
      title: "AI-Powered Document Sharing Platform",
      description: "Secure document sharing with advanced permission controls, AI content analysis, access tracking, and automatic watermarking for complete data protection."
    },
    {
      title: "Web and Telegram E-Commerce Platform",
      description: "Multi-channel e-commerce solution with cryptocurrency payment integration, inventory sync, and seamless customer experience across platforms."
    },
    {
      title: "Telegram E-Pin Sales Platform",
      description: "Digital pin code sales and distribution platform integrated with Telegram for automated delivery and customer management."
    },
    {
      title: "Telegram HangiKredi (Credit Advisor)",
      description: "Smart financial advisor bot on Telegram providing personalized credit and loan recommendations based on user profiles and market conditions."
    },
    {
      title: "E-commerce Solutions",
      description: "Multi-platform stores with payment processing and inventory sync."
    },
    {
      title: "Healthcare Management",
      description: "Patient management, scheduling, and compliance tracking systems."
    },
    {
      title: "Real Estate Platform",
      description: "Property management, client tracking, and market analysis tools."
    }
  ];

  const mobileApps = [
    {
      title: "Business Mobile Apps",
      description: "Custom mobile applications for iOS and Android platforms."
    },
    {
      title: "Financial Apps",
      description: "Personal finance, budgeting, and expense tracking mobile solutions."
    },
    {
      title: "Telegram Bots",
      description: "Custom Telegram bots for sales, customer service, and automation."
    }
  ];

  const renderSolutionAccordion = (solutions: any[], category: string) => (
    <Accordion type="single" collapsible className="w-full space-y-3">
      {solutions.map((solution, index) => (
        <AccordionItem 
          key={index} 
          value={`${category}-${index}`}
          className="border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 bg-white"
        >
          <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-gray-50 rounded-t-xl">
            <span className="text-left font-semibold text-gray-900 text-lg">{solution.title}</span>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-5">
            <p className="text-gray-600 leading-relaxed text-base">{solution.description}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Solutions We Build
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Custom AI agents and business solutions delivered in 14 days
          </p>
        </div>

        <Tabs defaultValue="business" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-12 bg-white shadow-lg rounded-xl p-2">
            <TabsTrigger value="business" className="text-base font-medium rounded-lg">Business Tools</TabsTrigger>
            <TabsTrigger value="ai" className="text-base font-medium rounded-lg">AI-Powered</TabsTrigger>
            <TabsTrigger value="industry" className="text-base font-medium rounded-lg">Industry-Specific</TabsTrigger>
            <TabsTrigger value="mobile" className="text-base font-medium rounded-lg">Mobile & Apps</TabsTrigger>
          </TabsList>
          
          <TabsContent value="business" className="mt-8">
            <div className="mb-6 text-center">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Essential Business Solutions</h3>
              <p className="text-gray-600">Core tools every business needs to operate efficiently</p>
            </div>
            {renderSolutionAccordion(businessSolutions, "business")}
          </TabsContent>
          
          <TabsContent value="ai" className="mt-8">
            <div className="mb-6 text-center">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">AI-Powered Automation</h3>
              <p className="text-gray-600">Intelligent solutions that work 24/7 to boost productivity</p>
            </div>
            {renderSolutionAccordion(aiPoweredSolutions, "ai")}
          </TabsContent>
          
          <TabsContent value="industry" className="mt-8">
            <div className="mb-6 text-center">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Industry-Tailored Solutions</h3>
              <p className="text-gray-600">Specialized tools designed for specific business sectors</p>
            </div>
            {renderSolutionAccordion(industrySpecific, "industry")}
          </TabsContent>
          
          <TabsContent value="mobile" className="mt-8">
            <div className="mb-6 text-center">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Mobile & Communication</h3>
              <p className="text-gray-600">Apps and bots that connect you with customers anywhere</p>
            </div>
            {renderSolutionAccordion(mobileApps, "mobile")}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Solutions;
