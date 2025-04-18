
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import FeaturedVendor from "@/components/FeaturedVendor";
import { Sparkle } from "lucide-react";

const Index = () => {
  const vendors = [
    { 
      id: 1, 
      title: "Sweet Treats", 
      secondaryText: "Delicious Desserts",
      imageUrl: "https://images.unsplash.com/photo-1488900128323-21503983a07e?auto=format&fit=crop&w=400&h=400"
    },
    { 
      id: 2, 
      title: "Cozy Corner", 
      secondaryText: "Home Decor",
      imageUrl: "https://images.unsplash.com/photo-1539755530862-00f623c00f52?auto=format&fit=crop&w=400&h=400"
    },
    { 
      id: 3, 
      title: "Tech Hub", 
      secondaryText: "Latest Gadgets",
      imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&h=400"
    },
    { 
      id: 4, 
      title: "Fashion Forward", 
      secondaryText: "Trendy Styles",
      imageUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=400&h=400"
    },
    { 
      id: 5, 
      title: "Green Garden", 
      secondaryText: "Plants & More",
      imageUrl: "https://images.unsplash.com/photo-1470058869958-2a77ade41c02?auto=format&fit=crop&w=400&h=400"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F2FCE2] to-[#E5DEFF]">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#6B4E71] flex items-center justify-center gap-2">
            Sykeee
            <Sparkle className="w-8 h-8 text-[#FEC6A1] animate-pulse" />
          </h1>
          <p className="text-[#7C6F93] text-lg">Discover amazing products & services</p>
        </div>
        <div className="max-w-md mx-auto mb-12 transform hover:scale-105 transition-transform duration-300">
          <SearchBar />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {vendors.map((vendor) => (
            <div key={vendor.id} className="transform hover:-translate-y-2 transition-transform duration-300">
              <FeaturedVendor
                id={vendor.id}
                title={vendor.title}
                secondaryText={vendor.secondaryText}
                imageUrl={vendor.imageUrl}
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;
