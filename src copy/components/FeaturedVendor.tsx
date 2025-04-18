
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

interface FeaturedVendorProps {
  id: number;
  title: string;
  secondaryText: string;
  imageUrl: string;
}

const FeaturedVendor = ({ id, title, secondaryText, imageUrl }: FeaturedVendorProps) => {
  return (
    <Link to={`/product/${id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur">
        <CardContent className="p-0">
          <div className="relative h-40 overflow-hidden">
            <img 
              src={imageUrl} 
              alt={title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            />
            <div className="absolute top-2 right-2">
              <Star className="w-5 h-5 text-[#FEC6A1]" />
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-medium text-sm text-[#6B4E71]">{title}</h3>
            <p className="text-xs text-[#7C6F93]">{secondaryText}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default FeaturedVendor;
