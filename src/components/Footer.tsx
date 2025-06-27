
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* CTA Section */}
      <div className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Ideas?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join businesses already leveraging AI-powered development to stay ahead of the competition
          </p>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Zap className="mr-2 h-5 w-5" />
            Start Your 14-Day Project
          </Button>
        </div>
      </div>
      
      {/* Footer Bottom */}
      <div className="border-t border-gray-700 py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <img 
                src="/lovable-uploads/ae62675a-c666-4cfd-aca4-5a928cd05760.png" 
                alt="Infinics Logo" 
                className="h-8 w-auto mr-3"
              />
              <span className="text-xl font-bold">Infinics</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2024 Infinics. All rights reserved. • AI-Powered Applications Built For You
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
