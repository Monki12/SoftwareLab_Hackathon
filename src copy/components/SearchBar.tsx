
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="relative max-w-md w-full mx-auto">
      <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#7C6F93]" />
      <Input 
        type="text"
        placeholder="Search for anything..."
        className="w-full pl-10 pr-4 bg-white/80 backdrop-blur border-[#E5DEFF] focus:border-[#FEC6A1] transition-all duration-300 placeholder:text-[#7C6F93]"
      />
    </div>
  );
};

export default SearchBar;
