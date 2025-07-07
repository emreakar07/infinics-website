import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Clock, Wrench, Shield, CheckCircle, AlertCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface MaintenanceData {
  issue?: string;
  severity?: "low" | "medium" | "high" | "critical";
  category?: string;
  estimatedTime?: string;
  difficulty?: "easy" | "moderate" | "advanced" | "expert";
  requiredTools?: string[];
  safetyPrecautions?: string[];
  steps?: Array<{
    step: number;
    action: string;
    warning?: string;
  }>;
  preventiveMeasures?: string[];
}

interface MaintenanceDisplayProps {
  data: MaintenanceData;
  className?: string;
}

const MaintenanceDisplay: React.FC<MaintenanceDisplayProps> = ({ data, className }) => {
  const getSeverityColor = (severity?: string) => {
    switch (severity) {
      case "low":
        return "bg-green-100 text-green-700";
      case "medium":
        return "bg-yellow-100 text-yellow-700";
      case "high":
        return "bg-orange-100 text-orange-700";
      case "critical":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getSeverityIcon = (severity?: string) => {
    switch (severity) {
      case "low":
        return <CheckCircle className="h-4 w-4" />;
      case "medium":
        return <AlertCircle className="h-4 w-4" />;
      case "high":
      case "critical":
        return <XCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-blue-100 text-blue-700";
      case "moderate":
        return "bg-indigo-100 text-indigo-700";
      case "advanced":
        return "bg-purple-100 text-purple-700";
      case "expert":
        return "bg-pink-100 text-pink-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <Card className={cn("overflow-hidden border-0 shadow-md", className)}>
      <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">Maintenance Guide</CardTitle>
            {data.issue && (
              <CardDescription className="text-sm mt-1">{data.issue}</CardDescription>
            )}
          </div>
          <div className="flex gap-2">
            {data.severity && (
              <Badge variant="secondary" className={cn("gap-1", getSeverityColor(data.severity))}>
                {getSeverityIcon(data.severity)}
                {data.severity.toUpperCase()}
              </Badge>
            )}
            {data.difficulty && (
              <Badge variant="secondary" className={getDifficultyColor(data.difficulty)}>
                {data.difficulty}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4 space-y-4">
        {/* Quick Info */}
        {(data.category || data.estimatedTime) && (
          <div className="grid grid-cols-2 gap-4 text-sm">
            {data.category && (
              <div className="flex items-center gap-2">
                <Wrench className="h-4 w-4 text-gray-500" />
                <span className="text-gray-700">{data.category}</span>
              </div>
            )}
            {data.estimatedTime && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-gray-700">{data.estimatedTime}</span>
              </div>
            )}
          </div>
        )}

        {/* Safety Precautions */}
        {data.safetyPrecautions && data.safetyPrecautions.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div className="flex items-center gap-2 font-medium text-yellow-800 mb-2">
              <Shield className="h-4 w-4" />
              Safety Precautions
            </div>
            <ul className="space-y-1">
              {data.safetyPrecautions.map((precaution, index) => (
                <li key={index} className="text-sm text-yellow-700 flex items-start gap-2">
                  <span className="text-yellow-600 mt-0.5">•</span>
                  <span>{precaution}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Required Tools */}
        {data.requiredTools && data.requiredTools.length > 0 && (
          <div>
            <div className="font-medium text-sm text-gray-700 mb-2 flex items-center gap-2">
              <Wrench className="h-4 w-4" />
              Required Tools
            </div>
            <div className="flex flex-wrap gap-2">
              {data.requiredTools.map((tool, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tool}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Maintenance Steps */}
        {data.steps && data.steps.length > 0 && (
          <div>
            <div className="font-medium text-sm text-gray-700 mb-3">Maintenance Steps</div>
            <div className="space-y-3">
              {data.steps.map((step) => (
                <div key={step.step} className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700">{step.action}</p>
                    {step.warning && (
                      <div className="mt-1 flex items-start gap-2 text-xs text-orange-600 bg-orange-50 p-2 rounded">
                        <AlertTriangle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                        <span>{step.warning}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Preventive Measures */}
        {data.preventiveMeasures && data.preventiveMeasures.length > 0 && (
          <div className="border-t pt-3">
            <div className="font-medium text-sm text-gray-700 mb-2 flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              Preventive Measures
            </div>
            <ul className="space-y-1">
              {data.preventiveMeasures.map((measure, index) => (
                <li key={index} className="text-xs text-gray-600 flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>{measure}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MaintenanceDisplay;