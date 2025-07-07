import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Euro, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface PricingData {
  dates?: string;
  roomType?: string;
  adults?: number;
  children?: number;
  childAges?: number[];
  basePrice?: number;
  discount?: number;
  totalPrice?: number;
  currency?: string;
  notes?: string[];
  breakdown?: {
    label: string;
    value: number;
  }[];
}

interface PricingDisplayProps {
  data: PricingData;
  className?: string;
}

const PricingDisplay: React.FC<PricingDisplayProps> = ({ data, className }) => {
  const currency = data.currency || "€";
  
  const formatPrice = (price: number) => {
    if (typeof price !== 'number' || isNaN(price)) {
      return 'N/A';
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency === "€" ? "EUR" : "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card className={cn("overflow-hidden border-0 shadow-md", className)}>
      <CardHeader className="bg-gradient-to-r from-cyan-50 to-green-50 pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Pricing Details</CardTitle>
          {data.discount && data.discount > 0 && (
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              {data.discount}% OFF
            </Badge>
          )}
        </div>
        {data.roomType && (
          <CardDescription className="text-sm">{data.roomType}</CardDescription>
        )}
      </CardHeader>
      
      <CardContent className="pt-4 space-y-3">
        {/* Stay Details */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          {data.dates && (
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-gray-700">{data.dates}</span>
            </div>
          )}
          
          {(data.adults || data.children) && (
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-gray-500" />
              <span className="text-gray-700">
                {data.adults && `${data.adults} Adult${data.adults > 1 ? 's' : ''}`}
                {data.adults && data.children ? ', ' : ''}
                {data.children && `${data.children} Child${data.children > 1 ? 'ren' : ''}`}
              </span>
            </div>
          )}
        </div>

        {/* Price Breakdown */}
        {data.breakdown && data.breakdown.length > 0 && (
          <div className="border-t pt-3 space-y-2">
            {data.breakdown.map((item, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="text-gray-600">{item.label}</span>
                <span className="font-medium">
                  {/* Only format as currency if it's a valid number and not a "nights" field */}
                  {item.label.toLowerCase().includes('night') && !item.label.toLowerCase().includes('price') 
                    ? item.value 
                    : (typeof item.value === 'number' && !isNaN(item.value) 
                        ? formatPrice(item.value) 
                        : item.value || 'N/A')}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Total Price */}
        {data.totalPrice && (
          <div className="border-t pt-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Total Price</span>
              <div className="text-right">
                {data.basePrice && data.basePrice !== data.totalPrice && (
                  <div className="text-sm text-gray-500 line-through">
                    {formatPrice(data.basePrice)}
                  </div>
                )}
                <div className="text-xl font-bold text-green-600">
                  {formatPrice(data.totalPrice)}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notes */}
        {data.notes && data.notes.length > 0 && (
          <div className="border-t pt-3 space-y-1">
            {data.notes.map((note, index) => (
              <div key={index} className="flex items-start gap-2 text-xs text-gray-600">
                <Info className="h-3 w-3 mt-0.5 flex-shrink-0" />
                <span>{note}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PricingDisplay;