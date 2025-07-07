import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, MessageSquare, Building, Users, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { initEmailJS, sendContactForm } from "@/lib/emailjs";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    problems: "",
    timeline: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Initialize EmailJS when component mounts
  useEffect(() => {
    initEmailJS();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.problems) {
      toast({
        title: "Please fill in all required fields",
        description: "Name, email, and problem description are required.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Send email via EmailJS
      await sendContactForm(formData);
      
      toast({
        title: "Request Submitted Successfully! 🎉",
        description: "We'll contact you within 24 hours to schedule your demo session.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        problems: "",
        timeline: ""
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error sending your request. Please try again or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-white to-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Calendar className="h-8 w-8 text-cyan-600 mr-3" />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Ready to Transform Your Business?
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tell us about your challenges and we'll design a custom AI solution for your needs. 
            Book a free consultation and see exactly how we can help.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="shadow-2xl">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl text-gray-900">
                Get Your Free AI Strategy Session
              </CardTitle>
              <p className="text-gray-600 mt-2">
                Schedule a personalized demo and discover your automation opportunities
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="John Doe"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="john@example.com"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Implementation Timeline</Label>
                  <Select 
                    value={formData.timeline} 
                    onValueChange={(value) => handleInputChange("timeline", value)}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="When do you need this?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asap">ASAP (Within 1 month)</SelectItem>
                      <SelectItem value="quarter">This quarter (1-3 months)</SelectItem>
                      <SelectItem value="half-year">Next 6 months</SelectItem>
                      <SelectItem value="planning">Just planning ahead</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="problems">Describe Your Current Challenges *</Label>
                  <Textarea
                    id="problems"
                    value={formData.problems}
                    onChange={(e) => handleInputChange("problems", e.target.value)}
                    placeholder="Tell us about the manual processes, repetitive tasks, or inefficiencies you'd like to automate. What takes too much time in your daily operations?"
                    className="min-h-[120px]"
                    required
                    disabled={isSubmitting}
                  />
                  <p className="text-sm text-gray-500">
                    The more details you provide, the better we can prepare for your demo session.
                  </p>
                </div>

                <div className="pt-6">
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-white py-3 text-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <MessageSquare className="mr-2 h-5 w-5" />
                        Schedule My Free Strategy Session
                      </>
                    )}
                  </Button>
                  <p className="text-center text-gray-500 mt-3 text-sm">
                    No commitment required • 30-minute session • Get custom recommendations
                  </p>
                </div>
              </form>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div className="flex flex-col items-center">
                    <Building className="h-8 w-8 text-cyan-600 mb-2" />
                    <h4 className="font-semibold text-gray-900">Custom Solutions</h4>
                    <p className="text-sm text-gray-600">Tailored to your specific industry and needs</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <Users className="h-8 w-8 text-green-600 mb-2" />
                    <h4 className="font-semibold text-gray-900">Expert Team</h4>
                    <p className="text-sm text-gray-600">AI specialists with industry experience</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <Calendar className="h-8 w-8 text-blue-600 mb-2" />
                    <h4 className="font-semibold text-gray-900">Fast Implementation</h4>
                    <p className="text-sm text-gray-600">From concept to deployment in 14 days</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
