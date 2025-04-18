
import { User, ShoppingCart, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="backdrop-blur-md bg-white/70 border-b border-[#E5DEFF] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-[#6B4E71] hover:text-[#9B6B9D] transition-colors">Home</Link>
            <Link to="/services" className="text-[#7C6F93] hover:text-[#6B4E71] transition-colors">Services</Link>
            <Link to="/contact" className="text-[#7C6F93] hover:text-[#6B4E71] transition-colors">Contact Us</Link>
          </div>
          <div className="flex items-center space-x-6">
            <Link to="/wishlist" className="text-[#7C6F93] hover:text-[#6B4E71] transition-colors">
              <Heart className="w-5 h-5" />
            </Link>
            <Link to="/cart" className="text-[#7C6F93] hover:text-[#6B4E71] transition-colors flex items-center">
              <ShoppingCart className="w-5 h-5" />
            </Link>
            <Link to="/profile" className="text-[#7C6F93] hover:text-[#6B4E71] transition-colors">
              <User className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
