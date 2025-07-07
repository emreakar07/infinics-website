import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Upload, FileText, Send, Bot, User, ChevronLeft, Sparkles, X, Eye, EyeOff, Plus, Wrench, AlertCircle, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { callOpenAIWithHistory, type ChatCompletionMessage } from "@/lib/openai";
import MaintenanceDisplay from "@/components/MaintenanceDisplay";

interface UploadedFile {
  name: string;
  content: string;
  markdown: string;
  size: number;
  type: string;
  tags: string[];
}

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  maintenanceData?: any;
}

interface MaintenanceRule {
  id: string;
  text: string;
}

interface IndustryTemplate {
  name: string;
  icon: any;
  rules: string[];
}

const industryTemplates: IndustryTemplate[] = [
  {
    name: "HVAC Systems",
    icon: "🌡️",
    rules: [
      "Ask about the specific symptoms (noise, temperature issues, airflow problems)",
      "Request the model number and age of the HVAC unit",
      "Inquire about recent maintenance history and filter changes",
      "Check if the issue is intermittent or constant",
      "Ask about thermostat settings and recent changes",
      "Verify power supply and circuit breaker status",
      "Check for any visible damage or leaks",
      "Ask about outdoor unit condition (debris, ice buildup)",
      "Inquire about unusual smells or sounds",
      "Recommend safety precautions before any DIY troubleshooting"
    ]
  },
  {
    name: "Industrial Machinery",
    icon: "⚙️",
    rules: [
      "Request machine model, serial number, and operating hours",
      "Ask about the specific malfunction or error codes displayed",
      "Inquire about recent maintenance or part replacements",
      "Check operating conditions (temperature, humidity, load)",
      "Ask about any unusual vibrations, sounds, or smells",
      "Verify safety protocols have been followed (lockout/tagout)",
      "Request information about lubrication schedules",
      "Check for any recent operational changes or new operators",
      "Ask about production output changes or quality issues",
      "Confirm emergency stop procedures are known and accessible"
    ]
  },
  {
    name: "IT Equipment",
    icon: "💻",
    rules: [
      "Ask for device model, operating system, and software versions",
      "Request specific error messages or codes",
      "Check when the issue first occurred and any triggering events",
      "Inquire about recent software updates or hardware changes",
      "Ask about network connectivity and other connected devices",
      "Verify backup status before suggesting any fixes",
      "Check for any unusual behavior (overheating, slow performance)",
      "Ask about user access levels and permissions",
      "Inquire about antivirus status and recent scans",
      "Suggest creating a restore point before troubleshooting"
    ]
  },
  {
    name: "Vehicles & Fleet",
    icon: "🚗",
    rules: [
      "Request vehicle make, model, year, and mileage",
      "Ask about specific symptoms (sounds, performance issues, warning lights)",
      "Inquire about recent maintenance and service history",
      "Check when the issue occurs (cold start, while driving, etc.)",
      "Ask about recent fuel quality or type changes",
      "Verify fluid levels (oil, coolant, brake fluid)",
      "Inquire about any recent accidents or impacts",
      "Check tire condition and pressure",
      "Ask about driving conditions when issue occurs",
      "Recommend safety checks before road testing"
    ]
  },
  {
    name: "Medical Equipment",
    icon: "🏥",
    rules: [
      "Request equipment model, serial number, and software version",
      "Ask about specific error codes or alarms",
      "Verify the equipment has been properly cleaned and disinfected",
      "Check calibration date and maintenance schedule",
      "Inquire about environmental conditions (temperature, humidity)",
      "Ask about patient safety protocols during downtime",
      "Verify backup equipment availability",
      "Check power supply stability and UPS status",
      "Ask about any recent drops, impacts, or liquid exposure",
      "Confirm biomedical engineering has been notified if required"
    ]
  },
  {
    name: "Manufacturing Equipment",
    icon: "🏭",
    rules: [
      "Ask for equipment identification and production line details",
      "Request current production metrics vs. normal output",
      "Check for any quality control failures or defects",
      "Inquire about recent tooling or die changes",
      "Ask about material changes or supplier switches",
      "Verify preventive maintenance schedule compliance",
      "Check environmental factors (dust, moisture, temperature)",
      "Ask about operator training and shift changes",
      "Inquire about any recent power fluctuations",
      "Confirm safety protocols for maintenance access"
    ]
  }
];

const DemoMaintenanceAgent = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [maintenanceRules, setMaintenanceRules] = useState<MaintenanceRule[]>([]);
  const [newRule, setNewRule] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showMarkdown, setShowMarkdown] = useState(true);
  const [newTag, setNewTag] = useState("");
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when new messages arrive
  React.useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    // Check file count limit
    if (uploadedFiles.length + files.length > 2) {
      alert("You can only upload a maximum of 2 files");
      return;
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Check file size (4MB limit)
      if (file.size > 4 * 1024 * 1024) {
        alert(`File ${file.name} exceeds 4MB limit`);
        continue;
      }

      const content = await file.text();
      const markdown = convertToMarkdown(file, content);
      
      setUploadedFiles(prev => [...prev, {
        name: file.name,
        content,
        markdown,
        size: file.size,
        type: file.type,
        tags: []
      }]);
    }
  };

  const convertToMarkdown = (file: File, content: string): string => {
    let markdown = `# ${file.name}\n\n`;
    
    if (file.type === "text/csv" || file.name.endsWith(".csv")) {
      // Convert CSV to markdown table
      const lines = content.split('\n').filter(line => line.trim());
      if (lines.length > 0) {
        // Parse CSV properly handling quoted values
        const parseCSVLine = (line: string) => {
          const result = [];
          let current = '';
          let inQuotes = false;
          
          for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (char === '"') {
              inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
              result.push(current.trim());
              current = '';
            } else {
              current += char;
            }
          }
          result.push(current.trim());
          return result;
        };
        
        const headers = parseCSVLine(lines[0]);
        markdown += '| ' + headers.join(' | ') + ' |\n';
        markdown += '|' + headers.map(() => ' --- ').join('|') + '|\n';
        
        for (let i = 1; i < lines.length; i++) {
          const cells = parseCSVLine(lines[i]);
          if (cells.length === headers.length) {
            markdown += '| ' + cells.join(' | ') + ' |\n';
          }
        }
      }
    } else {
      // For other text files, just add the content
      markdown += '```\n' + content + '\n```';
    }
    
    return markdown;
  };

  const handleAddTag = (fileIndex: number) => {
    if (newTag.trim() && uploadedFiles[fileIndex]) {
      const updated = [...uploadedFiles];
      updated[fileIndex].tags.push(newTag.trim());
      setUploadedFiles(updated);
      setNewTag("");
    }
  };

  const handleRemoveTag = (fileIndex: number, tagIndex: number) => {
    const updated = [...uploadedFiles];
    updated[fileIndex].tags.splice(tagIndex, 1);
    setUploadedFiles(updated);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    if (activeFileIndex >= uploadedFiles.length - 1) {
      setActiveFileIndex(Math.max(0, uploadedFiles.length - 2));
    }
  };

  const addRule = () => {
    if (newRule.trim()) {
      setMaintenanceRules(prev => [...prev, {
        id: Date.now().toString(),
        text: newRule.trim()
      }]);
      setNewRule("");
    }
  };

  const removeRule = (id: string) => {
    setMaintenanceRules(prev => prev.filter(rule => rule.id !== id));
  };

  const editRule = (id: string, newText: string) => {
    setMaintenanceRules(prev => prev.map(rule => 
      rule.id === id ? { ...rule, text: newText } : rule
    ));
  };

  const applyTemplate = (templateName: string) => {
    const template = industryTemplates.find(t => t.name === templateName);
    if (template) {
      const newRules = template.rules.map((rule, index) => ({
        id: `template-${Date.now()}-${index}`,
        text: rule
      }));
      setMaintenanceRules(newRules);
      setSelectedTemplate(templateName);
    }
  };

  const sendMessage = async () => {
    if (!currentMessage.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: currentMessage,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setCurrentMessage("");
    setIsLoading(true);

    try {
      // Build conversation history for OpenAI
      const context = buildContext();
      const conversationHistory: ChatCompletionMessage[] = chatMessages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));
      
      // Add the current user message
      conversationHistory.push({
        role: "user",
        content: userMessage.content
      });
      
      const response = await callOpenAIWithHistory(context, conversationHistory);
      
      // Extract maintenance data if present
      const { maintenanceData, cleanContent } = extractMaintenanceData(response);
      
      const assistantMessage: ChatMessage = {
        id: Date.now().toString(),
        role: "assistant",
        content: cleanContent,
        timestamp: new Date(),
        maintenanceData
      };
      
      setChatMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error calling AI:", error);
      const errorMessage: ChatMessage = {
        id: Date.now().toString(),
        role: "assistant",
        content: "I'm sorry, I encountered an error. Please try again.",
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const extractMaintenanceData = (content: string): { maintenanceData: any | null; cleanContent: string } => {
    const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/);
    
    if (jsonMatch) {
      try {
        const maintenanceData = JSON.parse(jsonMatch[1]);
        // Remove the JSON block from the content
        const cleanContent = content.replace(jsonMatch[0], '').trim();
        return { maintenanceData, cleanContent };
      } catch (error) {
        console.error("Failed to parse maintenance JSON:", error);
      }
    }
    
    return { maintenanceData: null, cleanContent: content };
  };

  const buildContext = () => {
    let context = "You are a maintenance support AI assistant specialized in troubleshooting and repair guidance. ";
    context += "You have access to maintenance manuals and technical documentation.\n\n";
    
    context += "IMPORTANT: When providing maintenance guidance, structure your response in two parts:\n";
    context += "1. A JSON object with maintenance data (wrapped in ```json code blocks)\n";
    context += "2. A natural language explanation\n\n";
    context += "The JSON should include fields like:\n";
    context += "- issue: string (the identified problem)\n";
    context += "- severity: string ('low', 'medium', 'high', 'critical')\n";
    context += "- category: string (type of maintenance needed)\n";
    context += "- estimatedTime: string (time to complete)\n";
    context += "- difficulty: string ('easy', 'moderate', 'advanced', 'expert')\n";
    context += "- requiredTools: array of strings\n";
    context += "- safetyPrecautions: array of strings\n";
    context += "- steps: array of {step: number, action: string, warning?: string}\n";
    context += "- preventiveMeasures: array of strings\n\n";
    
    if (maintenanceRules.length > 0) {
      context += `=== TROUBLESHOOTING RULES AND PROCEDURES ===\n`;
      maintenanceRules.forEach((rule, index) => {
        context += `Rule ${index + 1}: ${rule.text}\n`;
      });
      context += `\n`;
    }
    
    if (uploadedFiles.length > 0) {
      context += "=== UPLOADED MAINTENANCE DOCUMENTATION ===\n";
      context += "You MUST use the maintenance manuals and technical documentation provided:\n\n";
      uploadedFiles.forEach((file, index) => {
        context += `--- Document ${index + 1}: ${file.name} ---\n`;
        if (file.tags.length > 0) {
          context += `Tags: ${file.tags.join(", ")}\n`;
        }
        context += `Content:\n${file.markdown}\n\n`;
      });
      context += "=== END OF DOCUMENTATION ===\n\n";
    }
    
    context += "Use the above documentation to provide accurate maintenance guidance, troubleshooting steps, and safety recommendations.\n";
    context += "Always prioritize safety and recommend professional help for complex or dangerous repairs.\n";
    
    // Log context length for debugging
    console.log("Context length:", context.length, "characters");
    
    return context;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Back to Home
                </Button>
              </Link>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Maintenance Support Agent Demo
              </h1>
            </div>
            <Badge variant="secondary" className="bg-gradient-to-r from-green-100 to-emerald-100">
              <Wrench className="h-3 w-3 mr-1" />
              AI Powered
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Configuration */}
          <div className="space-y-6">
            {/* File Upload */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-green-600" />
                  Upload Maintenance Manuals
                </CardTitle>
                <CardDescription>
                  Upload technical documentation, manuals, or specifications (max 2 files, 4MB each)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Label htmlFor="file-upload" className="cursor-pointer">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-500 transition-colors">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-600">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        PDF, TXT, CSV, or similar documentation
                      </p>
                    </div>
                    <Input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      multiple
                      accept=".pdf,.txt,.csv,.tsv,.doc,.docx"
                      onChange={handleFileUpload}
                    />
                  </Label>

                  {/* Uploaded Files */}
                  {uploadedFiles.length > 0 && (
                    <div className="space-y-2">
                      {uploadedFiles.map((file, index) => (
                        <div
                          key={index}
                          className={cn(
                            "flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer transition-colors",
                            activeFileIndex === index && "bg-green-50 ring-2 ring-green-500"
                          )}
                          onClick={() => setActiveFileIndex(index)}
                        >
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-gray-600" />
                            <span className="text-sm font-medium">{file.name}</span>
                            <span className="text-xs text-gray-500">
                              ({(file.size / 1024).toFixed(1)} KB)
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeFile(index);
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Troubleshooting Rules */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-green-600" />
                  Define Troubleshooting Procedures
                </CardTitle>
                <CardDescription>
                  Add diagnostic questions or select an equipment template
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Template Selector */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Equipment Templates</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {industryTemplates.map((template) => (
                      <Button
                        key={template.name}
                        variant={selectedTemplate === template.name ? "default" : "outline"}
                        size="sm"
                        className="justify-start"
                        onClick={() => applyTemplate(template.name)}
                      >
                        <span className="mr-2">{template.icon}</span>
                        <span className="truncate">{template.name}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Rules List */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    Diagnostic Rules ({maintenanceRules.length})
                  </Label>
                  <div className="space-y-2 max-h-[300px] overflow-y-auto">
                    {maintenanceRules.length === 0 ? (
                      <p className="text-sm text-gray-500 text-center py-4">
                        No rules added yet. Add custom rules or select a template above.
                      </p>
                    ) : (
                      maintenanceRules.map((rule, index) => (
                        <div
                          key={rule.id}
                          className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg group"
                        >
                          <Badge variant="secondary" className="mt-0.5">
                            {index + 1}
                          </Badge>
                          <Input
                            value={rule.text}
                            onChange={(e) => editRule(rule.id, e.target.value)}
                            className="flex-1 bg-white"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeRule(rule.id)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Add New Rule */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Add New Rule</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="e.g., Check if the equipment is plugged in and powered on"
                      value={newRule}
                      onChange={(e) => setNewRule(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          addRule();
                        }
                      }}
                    />
                    <Button onClick={addRule} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Clear All Button */}
                {maintenanceRules.length > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setMaintenanceRules([]);
                      setSelectedTemplate("");
                    }}
                    className="w-full"
                  >
                    Clear All Rules
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* File Preview & Tags */}
            {uploadedFiles.length > 0 && (
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Document Preview</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowMarkdown(!showMarkdown)}
                    >
                      {showMarkdown ? (
                        <>
                          <EyeOff className="h-4 w-4 mr-1" />
                          Hide
                        </>
                      ) : (
                        <>
                          <Eye className="h-4 w-4 mr-1" />
                          Show
                        </>
                      )}
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {showMarkdown && uploadedFiles[activeFileIndex] && (
                    <div className="space-y-4">
                      {/* Tags */}
                      <div>
                        <Label className="text-sm font-medium mb-2 block">Tags</Label>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {uploadedFiles[activeFileIndex].tags.map((tag, tagIndex) => (
                            <Badge
                              key={tagIndex}
                              variant="secondary"
                              className="flex items-center gap-1"
                            >
                              {tag}
                              <X
                                className="h-3 w-3 cursor-pointer hover:text-red-500"
                                onClick={() => handleRemoveTag(activeFileIndex, tagIndex)}
                              />
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Input
                            placeholder="Add a tag..."
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                handleAddTag(activeFileIndex);
                              }
                            }}
                            className="flex-1"
                          />
                          <Button
                            size="sm"
                            onClick={() => handleAddTag(activeFileIndex)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Markdown Preview */}
                      <div className="h-[300px] w-full rounded-md border p-4 overflow-y-auto">
                        <div className="prose prose-sm max-w-none">
                          <pre className="whitespace-pre-wrap text-xs">
                            {uploadedFiles[activeFileIndex].markdown}
                          </pre>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Chat Interface */}
          <Card className="shadow-lg border-0 flex flex-col h-[calc(100vh-200px)] min-h-[600px]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-emerald-600" />
                Test Your Maintenance Agent
              </CardTitle>
              <CardDescription>
                Ask questions about equipment maintenance and troubleshooting
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col overflow-hidden">
              {/* Chat Messages */}
              <div ref={scrollAreaRef} className="flex-1 overflow-y-auto pr-4 mb-4">
                <div className="space-y-4 pb-4">
                  {chatMessages.length === 0 ? (
                    <div className="text-center text-gray-500 py-8">
                      <Wrench className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                      <p className="text-sm">
                        Upload maintenance manuals and start troubleshooting!
                      </p>
                    </div>
                  ) : (
                    chatMessages.map((message) => (
                      <div key={message.id} className="space-y-2">
                        <div
                          className={cn(
                            "flex gap-3",
                            message.role === "user" ? "justify-end" : "justify-start"
                          )}
                        >
                          {message.role === "assistant" && (
                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center flex-shrink-0 mt-1">
                              <Bot className="h-5 w-5 text-white" />
                            </div>
                          )}
                          <div
                            className={cn(
                              "min-w-0 max-w-[80%]",
                              message.role === "user" ? "order-1" : "order-2"
                            )}
                          >
                            <div
                              className={cn(
                                "rounded-lg px-4 py-2 break-words",
                                message.role === "user"
                                  ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                                  : "bg-gray-100 text-gray-800"
                              )}
                            >
                              <p className="text-sm whitespace-pre-wrap break-words overflow-wrap-anywhere">
                                {message.content}
                              </p>
                              <p className={cn(
                                "text-xs mt-1",
                                message.role === "user" ? "text-white/70" : "text-gray-500"
                              )}>
                                {message.timestamp.toLocaleTimeString()}
                              </p>
                            </div>
                            
                            {/* Maintenance Display */}
                            {message.role === "assistant" && message.maintenanceData && (
                              <div className="mt-3">
                                <MaintenanceDisplay data={message.maintenanceData} />
                              </div>
                            )}
                          </div>
                          {message.role === "user" && (
                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center flex-shrink-0 mt-1 order-2">
                              <User className="h-5 w-5 text-white" />
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                  {isLoading && (
                    <div className="flex gap-3 justify-start">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center">
                        <Bot className="h-5 w-5 text-white" />
                      </div>
                      <div className="bg-gray-100 rounded-lg px-4 py-2">
                        <div className="flex gap-1">
                          <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" />
                          <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                          <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Message Input */}
              <div className="flex gap-2">
                <Input
                  placeholder="Ask about maintenance procedures..."
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button
                  onClick={sendMessage}
                  disabled={isLoading || !currentMessage.trim()}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DemoMaintenanceAgent;