import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WebinarPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const WebinarPopup = ({ isOpen, onClose }: WebinarPopupProps) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    phone: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Form validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.company) {
      toast({
        title: "Hata",
        description: "Lütfen zorunlu alanları doldurun.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Hata", 
        description: "Geçerli bir email adresi girin.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Here you would typically send the data to your backend
      console.log("Webinar registration:", formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Başarılı!",
        description: "Webinar kaydınız başarıyla alındı. Email adresinize detaylar gönderilecek.",
      });
      
      // Reset form and close popup
      setFormData({
        firstName: "",
        lastName: "", 
        email: "",
        company: "",
        phone: ""
      });
      onClose();
    } catch (error) {
      toast({
        title: "Hata",
        description: "Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
            Upcoming Webinar
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Webinar Info */}
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6 border border-cyan-100">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  AI-Powered Business Transformation: Real Results in 14 Days
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Discover how companies are achieving 5x ROI with custom AI solutions. 
                  Learn our proven methodology and see live demos of successful implementations.
                </p>
              </div>
              <Badge className="bg-green-100 text-green-700 whitespace-nowrap">
                Free Event
              </Badge>
            </div>

            {/* Event Details */}
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-cyan-600" />
                <span className="font-semibold">14 Eylül 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-cyan-600" />
                <span className="font-semibold">14:00 - 15:30</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-cyan-600" />
                <span className="font-semibold">Online Event</span>
              </div>
            </div>

            {/* What you'll learn */}
            <div className="mt-4 pt-4 border-t border-cyan-200">
              <h4 className="font-semibold text-gray-900 mb-2">Bu Webinarda Öğrenecekleriniz:</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• AI implementation için doğru use case'leri nasıl belirlersiniz</li>
                <li>• 14 günde nasıl custom AI çözümü geliştirirsiniz</li>
                <li>• ROI'yi maksimize eden stratejiler</li>
                <li>• Gerçek müşteri başarı hikayeleri</li>
              </ul>
            </div>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">Kayıt Bilgileri</h4>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                  Ad *
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Adınızı girin"
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                  Soyad *
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Soyadınızı girin"
                  className="mt-1"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Adresi *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="email@ornek.com"
                className="mt-1"
                required
              />
            </div>

            <div>
              <Label htmlFor="company" className="text-sm font-medium text-gray-700">
                Şirket Adı *
              </Label>
              <Input
                id="company"
                name="company"
                type="text"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="Şirket adınızı girin"
                className="mt-1"
                required
              />
            </div>

            <div>
              <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                Telefon Numarası <span className="text-gray-500">(opsiyonel)</span>
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+90 5XX XXX XX XX"
                className="mt-1"
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-3"
              >
                {isSubmitting ? "Kaydediliyor..." : "Webinara Kayıt Ol"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="px-6"
              >
                İptal
              </Button>
            </div>
          </form>

          {/* Additional Info */}
          <div className="text-xs text-gray-500 bg-gray-50 rounded-lg p-3">
            <p>
              * Kayıt olduktan sonra webinar bağlantısı ve detaylar email adresinize gönderilecektir.
              Webinar başlamadan 1 saat önce hatırlatma maili alacaksınız.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WebinarPopup;
