import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Sparkles } from "lucide-react";
import WebinarPopup from "./WebinarPopup";

const WebinarButton = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <>
      {/* Floating Webinar Button */}
      <div className="fixed bottom-6 right-6 z-50 animate-bounce">
        <Button
          onClick={() => setIsPopupOpen(true)}
          className="relative bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-6 py-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 group"
        >
          {/* Notification Badge */}
          <Badge className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
            Yeni!
          </Badge>
          
          {/* Button Content */}
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 group-hover:rotate-12 transition-transform" />
            <span className="hidden sm:inline">Join The Webinar</span>
            <span className="sm:hidden">Webinar</span>
            <Sparkles className="h-4 w-4 group-hover:rotate-12 transition-transform" />
          </div>
        </Button>
      </div>

      {/* Webinar Popup */}
      <WebinarPopup 
        isOpen={isPopupOpen} 
        onClose={() => setIsPopupOpen(false)} 
      />
    </>
  );
};

export default WebinarButton;
