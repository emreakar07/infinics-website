import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Clock, Users, Zap, ArrowRight, X } from "lucide-react";

interface AgentDetail {
  name: string;
  description: string;
  icon: React.ElementType;
  category: string;
  color: string;
  overview: string;
  keyFeatures: {
    title: string;
    description: string;
  }[];
  useCases: string[];
  benefits: {
    metric: string;
    description: string;
  }[];
  implementation: {
    timeframe: string;
    integration: string;
    support: string;
  };
}

interface AgentDetailModalProps {
  agent: AgentDetail | null;
  isOpen: boolean;
  onClose: () => void;
}

const AgentDetailModal: React.FC<AgentDetailModalProps> = ({ agent, isOpen, onClose }) => {
  if (!agent) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-3 bg-gradient-to-br ${agent.color} rounded-xl shadow-lg`}>
                <agent.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold">{agent.name}</DialogTitle>
                <DialogDescription className="text-base mt-1">
                  {agent.category}
                </DialogDescription>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="mt-6 space-y-8">
          {/* Overview */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Overview</h3>
            <p className="text-gray-600 leading-relaxed">{agent.overview}</p>
          </div>

          {/* Key Features */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Key Features</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {agent.keyFeatures.map((feature, index) => (
                <Card key={index} className="p-4 border-0 bg-gray-50">
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                    <CheckCircle className={`h-4 w-4 text-${agent.color.split('-')[1]}-500`} />
                    {feature.title}
                  </h4>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Use Cases */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Common Use Cases</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {agent.useCases.map((useCase, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${agent.color} mt-2 flex-shrink-0`}></div>
                  <span className="text-gray-700">{useCase}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Expected Benefits</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {agent.benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className={`text-2xl font-bold bg-gradient-to-r ${agent.color} bg-clip-text text-transparent mb-1`}>
                    {benefit.metric}
                  </div>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Implementation */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Implementation Details</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-gray-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-900">Timeframe</h4>
                  <p className="text-sm text-gray-600">{agent.implementation.timeframe}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Zap className="h-5 w-5 text-gray-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-900">Integration</h4>
                  <p className="text-sm text-gray-600">{agent.implementation.integration}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-gray-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-900">Support</h4>
                  <p className="text-sm text-gray-600">{agent.implementation.support}</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex gap-3 pt-4">
            <Button 
              size="lg"
              className={`flex-1 bg-gradient-to-r ${agent.color} hover:opacity-90 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300`}
              onClick={() => {
                onClose();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Get Started with {agent.name}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AgentDetailModal;