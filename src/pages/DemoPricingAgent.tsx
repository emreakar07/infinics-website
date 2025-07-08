import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Upload, FileText, Send, Bot, User, ChevronLeft, Sparkles, X, Eye, EyeOff, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { callOpenAIWithHistory, type ChatCompletionMessage } from "@/lib/openai";
import { convertDocumentToMarkdown } from "@/lib/documentConverter";
import PricingDisplay from "@/components/PricingDisplay";

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
  pricingData?: any;
}

interface PricingRule {
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
    name: "Hotels & Resorts",
    icon: "🏨",
    rules: [
      "CRITICAL: When prices show 'pp', 'per person', or 'pp in dbl', multiply the price by the number of people",
      "For per-person pricing: Total Room Cost = Price per person × Number of adults",
      "Example: €160 pp in dbl with 2 adults = €160 × 2 = €320 per night total",
      "Ask for the exact check-in and check-out dates",
      "Ask how many adults and children will be staying",
      "Ask the ages of all children (as child pricing often varies by age)",
      "Inquire about room type preferences (standard, deluxe, suite, etc.)",
      "Check if they need multiple rooms",
      "Ask about meal plan preferences (room only, breakfast included, half-board, full-board)",
      "Inquire about any special requests or accessibility needs",
      "Apply seasonal pricing based on peak/off-peak dates",
      "Apply length of stay discounts for bookings over 7 nights",
      "Add local taxes and service charges to the final price"
    ]
  },
  {
    name: "Airlines",
    icon: "✈️",
    rules: [
      "Ask for departure and return dates (or one-way)",
      "Ask for departure and destination cities",
      "Ask number of passengers (adults, children, infants)",
      "Ask for cabin class preference (economy, premium economy, business, first)",
      "Inquire about flexibility in travel dates",
      "Check baggage requirements (carry-on only, checked bags)",
      "Apply dynamic pricing based on booking date vs travel date",
      "Add fuel surcharges and airport taxes",
      "Offer seat selection fees as optional add-ons",
      "Apply child discounts (typically 75% for ages 2-11, lap infants 10%)"
    ]
  },
  {
    name: "Car Rentals",
    icon: "🚗",
    rules: [
      "Ask for pickup and drop-off dates and times",
      "Ask for pickup and drop-off locations",
      "Ask for driver's age (apply young driver surcharge if under 25)",
      "Inquire about car type preference (economy, compact, SUV, luxury)",
      "Ask about additional drivers",
      "Check insurance coverage preferences",
      "Apply daily, weekly, or monthly rate structures",
      "Add location-based taxes and fees",
      "Include mileage limitations or unlimited mileage options",
      "Offer GPS, child seats, and other accessories as add-ons"
    ]
  },
  {
    name: "Event Tickets",
    icon: "🎫",
    rules: [
      "Ask for event date and time preference",
      "Ask number of tickets needed",
      "Check if buying as a group (apply group discounts for 10+ tickets)",
      "Ask for seating preference (orchestra, mezzanine, balcony)",
      "Apply early bird discounts if booking 30+ days in advance",
      "Add booking and service fees",
      "Apply dynamic pricing based on demand and availability",
      "Offer VIP or premium packages",
      "Check for student, senior, or military discounts",
      "Include parking or merchandise bundle options"
    ]
  },
  {
    name: "Subscription Services",
    icon: "📱",
    rules: [
      "Ask for subscription tier (basic, standard, premium)",
      "Ask for billing cycle preference (monthly, quarterly, annual)",
      "Apply discounts for annual payments (typically 15-20% off)",
      "Check number of users or devices",
      "Ask about add-on features or modules needed",
      "Apply new customer promotional pricing",
      "Include setup or onboarding fees for enterprise plans",
      "Offer family or team bundles",
      "Apply volume discounts based on number of licenses",
      "Include applicable taxes based on customer location"
    ]
  },
  {
    name: "Machine & Machinery Parts",
    icon: "⚙️",
    rules: [
      "Ask for specific part numbers or machine model",
      "Ask for quantity needed (apply bulk discounts for 10+ units)",
      "Check if parts are OEM or aftermarket",
      "Inquire about material specifications (steel, aluminum, composite)",
      "Ask about required certifications or standards (ISO, CE, UL)",
      "Apply volume pricing tiers (1-9, 10-49, 50-99, 100+)",
      "Add express manufacturing surcharge for rush orders",
      "Include packaging and handling fees based on part size/weight",
      "Check warranty requirements (standard 6 months, extended available)",
      "Apply industry-specific markups (aerospace 40%, automotive 25%, general 20%)",
      "Consider lead time pricing (in-stock, 2-4 weeks, 6-8 weeks custom)",
      "Add technical support package options"
    ]
  },
  {
    name: "Logistics",
    icon: "🚚",
    rules: [
      "Ask for shipment origin and destination (city/country)",
      "Ask for cargo type (general, refrigerated, hazardous, fragile)",
      "Inquire about weight and dimensions (calculate volumetric weight)",
      "Check shipping method (air freight, sea freight, ground, express)",
      "Ask about delivery timeline requirements (standard, expedited, same-day)",
      "Apply distance-based pricing zones",
      "Add fuel surcharge based on current fuel prices (5-15%)",
      "Include customs clearance fees for international shipments",
      "Apply special handling fees for oversized or hazardous materials",
      "Check insurance requirements (basic coverage or full value)",
      "Add warehousing fees if storage needed",
      "Apply peak season surcharges (holidays, shopping seasons)",
      "Include last-mile delivery options and pricing",
      "Offer consolidation discounts for multiple shipments"
    ]
  }
];

const DemoPricingAgent = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [pricingRules, setPricingRules] = useState<PricingRule[]>([]);
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
      
      // Show loading state while converting
      setUploadedFiles(prev => [...prev, {
        name: file.name,
        content,
        markdown: "Converting document...",
        size: file.size,
        type: file.type,
        tags: []
      }]);
      
      // Convert using AI
      const markdown = await convertDocumentToMarkdown(file, content);
      
      // Update with converted markdown
      setUploadedFiles(prev => prev.map(f => 
        f.name === file.name ? { ...f, markdown } : f
      ));
    }
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
      setPricingRules(prev => [...prev, {
        id: Date.now().toString(),
        text: newRule.trim()
      }]);
      setNewRule("");
    }
  };

  const removeRule = (id: string) => {
    setPricingRules(prev => prev.filter(rule => rule.id !== id));
  };

  const editRule = (id: string, newText: string) => {
    setPricingRules(prev => prev.map(rule => 
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
      setPricingRules(newRules);
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
      
      // Extract pricing data if present
      const { pricingData, cleanContent } = extractPricingData(response);
      
      const assistantMessage: ChatMessage = {
        id: Date.now().toString(),
        role: "assistant",
        content: cleanContent,
        timestamp: new Date(),
        pricingData
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

  const extractPricingData = (content: string): { pricingData: any | null; cleanContent: string } => {
    const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/);
    
    if (jsonMatch) {
      try {
        // Clean up common JSON formatting issues
        let jsonString = jsonMatch[1]
          .replace(/,\s*}/g, '}') // Remove trailing commas before closing braces
          .replace(/,\s*]/g, ']') // Remove trailing commas before closing brackets
          .replace(/'/g, '"') // Replace single quotes with double quotes
          .replace(/(\w+):/g, '"$1":') // Add quotes around keys
          .replace(/:\s*'([^']*)'/g, ': "$1"') // Fix single-quoted values
          .replace(/"\s*"/g, '","') // Fix missing commas between strings
          .replace(/}\s*{/g, '},{') // Fix missing commas between objects
          .replace(/]\s*\[/g, '],[') // Fix missing commas between arrays
          .replace(/\n\s*\n/g, '\n') // Remove empty lines
          .replace(/,\s*,/g, ','); // Remove double commas
        
        // Try to parse the cleaned JSON
        const pricingData = JSON.parse(jsonString);
        
        // Remove the JSON block from the content
        const cleanContent = content.replace(jsonMatch[0], '').trim();
        return { pricingData, cleanContent };
      } catch (error) {
        console.error("Failed to parse pricing JSON:", error);
        console.error("Attempted to parse:", jsonMatch[1]);
        
        // Try a more aggressive cleanup
        try {
          // Extract key-value pairs manually for common fields
          const fallbackData: any = {};
          
          // Extract common fields using regex
          const extractField = (fieldName: string, content: string) => {
            const regex = new RegExp(`"?${fieldName}"?\\s*:\\s*"?([^",}\\n]+)"?`, 'i');
            const match = content.match(regex);
            return match ? match[1].trim() : null;
          };
          
          fallbackData.roomType = extractField('roomType', jsonMatch[1]);
          fallbackData.dates = extractField('dates', jsonMatch[1]);
          fallbackData.totalPrice = parseFloat(extractField('totalPrice', jsonMatch[1]) || '0');
          fallbackData.currency = extractField('currency', jsonMatch[1]) || '€';
          
          // Extract adults/children
          const adultsMatch = jsonMatch[1].match(/"?adults"?\s*:\s*(\d+)/);
          const childrenMatch = jsonMatch[1].match(/"?children"?\s*:\s*(\d+)/);
          if (adultsMatch) fallbackData.adults = parseInt(adultsMatch[1]);
          if (childrenMatch) fallbackData.children = parseInt(childrenMatch[1]);
          
          const cleanContent = content.replace(jsonMatch[0], '').trim();
          return { pricingData: fallbackData, cleanContent };
        } catch (fallbackError) {
          console.error("Fallback parsing also failed:", fallbackError);
        }
      }
    }
    
    return { pricingData: null, cleanContent: content };
  };

  const buildContext = () => {
    let context = "You are a pricing agent AI assistant. ";
    context += "You have access to pricing data and should help users with booking inquiries.\n\n";
    
    context += "IMPORTANT: When providing pricing information, structure your response in two parts:\n";
    context += "1. A JSON object with pricing data (wrapped in ```json code blocks)\n";
    context += "2. A natural language explanation\n\n";
    context += "CRITICAL JSON RULES:\n";
    context += "- Use double quotes for all strings, never single quotes\n";
    context += "- No trailing commas after the last item in objects or arrays\n";
    context += "- All keys must be in double quotes\n";
    context += "- Numbers should not be quoted\n";
    context += "- Ensure proper comma separation between all elements\n\n";
    context += "Required JSON structure (example shows per-person pricing calculation):\n";
    context += "```json\n";
    context += "{\n";
    context += '  "dates": "2025-07-05 to 2025-07-10",\n';
    context += '  "roomType": "Standard Room Main Building",\n';
    context += '  "adults": 2,\n';
    context += '  "children": 0,\n';
    context += '  "totalPrice": 1600,\n';
    context += '  "currency": "€",\n';
    context += '  "breakdown": [\n';
    context += '    {"label": "Price per Person per Night", "value": 160},\n';
    context += '    {"label": "Number of Adults", "value": 2},\n';
    context += '    {"label": "Nights", "value": 5},\n';
    context += '    {"label": "Calculation", "value": "160 × 2 × 5"},\n';
    context += '    {"label": "Total Price", "value": 1600}\n';
    context += '  ]\n';
    context += "}\n";
    context += "```\n\n";
    
    if (pricingRules.length > 0) {
      context += `=== CRITICAL PRICING RULES - YOU MUST FOLLOW THESE ===\n`;
      context += `The following rules define how prices should be calculated. Pay special attention to any rules about per-person pricing:\n\n`;
      pricingRules.forEach((rule, index) => {
        context += `RULE ${index + 1}: ${rule.text}\n`;
      });
      context += `\nIMPORTANT: Apply ALL the above rules when calculating prices. If a rule mentions 'per person' or 'pp', you MUST multiply by the number of people.\n\n`;
    }
    
    if (uploadedFiles.length > 0) {
      context += "=== UPLOADED PRICING DATA ===\n";
      context += "You MUST use the pricing information from these documents to answer queries:\n\n";
      uploadedFiles.forEach((file, index) => {
        context += `--- Document ${index + 1}: ${file.name} ---\n`;
        if (file.tags.length > 0) {
          context += `Tags: ${file.tags.join(", ")}\n`;
        }
        context += `Content:\n${file.markdown}\n\n`;
      });
      context += "=== END OF PRICING DATA ===\n\n";
    }
    
    context += "Use the above pricing data to answer user queries about room rates, availability, and pricing for specific dates.\n";
    
    // Log context length for debugging
    console.log("Context length:", context.length, "characters");
    
    return context;
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-green-50">
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
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-green-600 bg-clip-text text-transparent">
                Pricing Agent Demo
              </h1>
            </div>
            <Badge variant="secondary" className="bg-gradient-to-r from-cyan-100 to-green-100">
              <Sparkles className="h-3 w-3 mr-1" />
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
                  <Upload className="h-5 w-5 text-cyan-600" />
                  Upload Pricing Data
                </CardTitle>
                <CardDescription>
                  Upload CSV or text documents (max 2 files, 4MB each)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Label htmlFor="file-upload" className="cursor-pointer">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-cyan-500 transition-colors">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-600">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        CSV, TXT, or similar text files
                      </p>
                    </div>
                    <Input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      multiple
                      accept=".csv,.txt,.tsv"
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
                            activeFileIndex === index && "bg-cyan-50 ring-2 ring-cyan-500"
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

            {/* Pricing Rules */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-cyan-600" />
                  Define Pricing Rules
                </CardTitle>
                <CardDescription>
                  Add pricing calculation rules (e.g., "Prices with 'pp' are per person") or select a template
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Template Selector */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Industry Templates</Label>
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
                    Pricing Rules ({pricingRules.length})
                  </Label>
                  <div className="space-y-2 max-h-[300px] overflow-y-auto">
                    {pricingRules.length === 0 ? (
                      <p className="text-sm text-gray-500 text-center py-4">
                        No rules added yet. Add custom rules or select a template above.
                      </p>
                    ) : (
                      pricingRules.map((rule, index) => (
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
                      placeholder="e.g., Prices marked 'pp' are per person - multiply by number of guests"
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
                {pricingRules.length > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setPricingRules([]);
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
                        {uploadedFiles[activeFileIndex].markdown === "Converting document..." ? (
                          <div className="flex flex-col items-center justify-center h-full">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600"></div>
                            <p className="mt-4 text-sm text-gray-600">Converting document with AI...</p>
                          </div>
                        ) : (
                          <div className="prose prose-sm max-w-none">
                            <pre className="whitespace-pre-wrap text-xs">
                              {uploadedFiles[activeFileIndex].markdown}
                            </pre>
                          </div>
                        )}
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
                <Bot className="h-5 w-5 text-green-600" />
                Test Your Pricing Agent
              </CardTitle>
              <CardDescription>
                Chat with your AI agent to test pricing scenarios
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col overflow-hidden">
              {/* Chat Messages */}
              <div ref={scrollAreaRef} className="flex-1 overflow-y-auto pr-4 mb-4">
                <div className="space-y-4 pb-4">
                  {chatMessages.length === 0 ? (
                    <div className="text-center text-gray-500 py-8">
                      <Bot className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                      <p className="text-sm">
                        Upload your pricing data and start chatting!
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
                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0 mt-1">
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
                                  ? "bg-gradient-to-r from-cyan-500 to-green-500 text-white"
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
                            
                            {/* Pricing Display */}
                            {message.role === "assistant" && message.pricingData && (
                              <div className="mt-3">
                                <PricingDisplay data={message.pricingData} />
                              </div>
                            )}
                          </div>
                          {message.role === "user" && (
                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center flex-shrink-0 mt-1 order-2">
                              <User className="h-5 w-5 text-white" />
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                  {isLoading && (
                    <div className="flex gap-3 justify-start">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
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
                  placeholder="Ask about pricing calculations..."
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
                  className="bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600"
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

export default DemoPricingAgent;