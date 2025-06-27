
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Solutions = () => {
  const aiSolutions = [
    {
      title: "Intelligent Inventory Search Engine",
      description: "AI-powered search system for efficient inventory management and optimization."
    },
    {
      title: "Digital Recruitment System with AI Interview",
      description: "Streamlined hiring platform with AI-powered candidate interviews and assessments."
    },
    {
      title: "AI-Powered Contract & Document Management",
      description: "Intelligent system for analyzing and managing contracts and important documents."
    },
    {
      title: "Call Center Conversation Analyzer",
      description: "AI tool that analyzes call center interactions for quality assurance and insights."
    },
    {
      title: "AI-Powered Sales Proposal Management",
      description: "Intelligent system for creating, managing, and optimizing sales proposals."
    },
    {
      title: "AI Bot Sales Training",
      description: "Intelligent training system for sales teams using AI-powered scenarios and feedback."
    }
  ];

  const enterpriseSolutions = [
    {
      title: "Digital Audit System",
      description: "Comprehensive platform for managing and automating audit processes and compliance."
    },
    {
      title: "Marketing Budget & Expense Tracking",
      description: "Platform for planning, tracking, and optimizing marketing budgets and expenses."
    },
    {
      title: "Quality Control Management System",
      description: "End-to-end solution for quality assurance processes and standards compliance."
    },
    {
      title: "Compliance Platform",
      description: "Comprehensive solution for managing regulatory compliance and requirements."
    },
    {
      title: "Web and Telegram E-Commerce Platform",
      description: "Multi-channel e-commerce solution with cryptocurrency payment integration."
    },
    {
      title: "Enterprise Slack Platform",
      description: "Custom Slack implementation for secure enterprise communication and collaboration."
    },
    {
      title: "CRM",
      description: "Comprehensive customer relationship management system with advanced analytics."
    },
    {
      title: "Project Management App",
      description: "Comprehensive tool for planning, tracking, and managing projects and resources."
    }
  ];

  const analyticsSolutions = [
    {
      title: "Guest Review Analysis System",
      description: "AI-powered platform that analyzes customer feedback and reviews for actionable insights."
    },
    {
      title: "Hotel Price Analyzer",
      description: "Analytics tool for optimizing hotel pricing strategies based on market data."
    },
    {
      title: "AI-Based Investment Research Platform",
      description: "Intelligent system for analyzing investment opportunities and market trends."
    },
    {
      title: "AI-Powered Survey and Experience Management",
      description: "Intelligent platform for creating, managing, and analyzing customer surveys."
    }
  ];

  const mobileSolutions = [
    {
      title: "Next-Generation Mobile Application Platform",
      description: "Modern framework for developing cross-platform mobile applications with advanced features."
    },
    {
      title: "Telegram E-Pin Sales Platform",
      description: "Digital pin code sales and distribution platform integrated with Telegram."
    },
    {
      title: "Personal Finance App",
      description: "Mobile application for managing personal finances, budgeting, and financial goals."
    }
  ];

  const renderSolutionAccordion = (solutions: any[], category: string) => (
    <Accordion type="single" collapsible className="w-full space-y-2">
      {solutions.map((solution, index) => (
        <AccordionItem 
          key={index} 
          value={`${category}-${index}`}
          className="border border-gray-200 rounded-lg hover:shadow-md transition-all duration-300"
        >
          <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-gray-50 rounded-t-lg">
            <span className="text-left font-semibold text-gray-900">{solution.title}</span>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-4">
            <p className="text-gray-600 leading-relaxed">{solution.description}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );

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
          <TabsList className="grid w-full grid-cols-4 mb-12 bg-gray-100">
            <TabsTrigger value="ai" className="text-lg font-medium">AI Solutions</TabsTrigger>
            <TabsTrigger value="enterprise" className="text-lg font-medium">Enterprise</TabsTrigger>
            <TabsTrigger value="analytics" className="text-lg font-medium">Analytics</TabsTrigger>
            <TabsTrigger value="mobile" className="text-lg font-medium">Mobile</TabsTrigger>
          </TabsList>
          
          <TabsContent value="ai">
            {renderSolutionAccordion(aiSolutions, "ai")}
          </TabsContent>
          
          <TabsContent value="enterprise">
            {renderSolutionAccordion(enterpriseSolutions, "enterprise")}
          </TabsContent>
          
          <TabsContent value="analytics">
            {renderSolutionAccordion(analyticsSolutions, "analytics")}
          </TabsContent>
          
          <TabsContent value="mobile">
            {renderSolutionAccordion(mobileSolutions, "mobile")}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Solutions;
