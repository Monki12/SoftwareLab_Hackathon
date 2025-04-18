
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useParams } from "react-router-dom";

const VendorProfile = () => {
  const { id } = useParams<{ id: string }>();

  // This would typically be fetched from an API based on the ID
  const vendor = {
    id: Number(id),
    name: "Brand Name",
    description: "Brand description with details about the company and what they offer. This provides customers with information about the brand's story, values, and product offerings.",
    products: [
      { id: 1, name: "Product 1", price: "$59.99", image: "https://via.placeholder.com/200x200" },
      { id: 2, name: "Product 2", price: "$89.99", image: "https://via.placeholder.com/200x200" },
      { id: 3, name: "Product 3", price: "$49.99", image: "https://via.placeholder.com/200x200" },
      { id: 4, name: "Product 4", price: "$79.99", image: "https://via.placeholder.com/200x200" },
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">{vendor.name}</h1>
          </div>
          <div className="w-64">
            <SearchBar />
          </div>
        </div>

        <div className="border-b pb-4 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-gray-200 w-16 h-16 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-400">
                {vendor.name.charAt(0)}
              </span>
            </div>
            <div>
              <h2 className="text-lg font-medium">Card Title</h2>
              <p className="text-sm text-gray-500">Subheader</p>
            </div>
          </div>
          <p className="text-gray-700">{vendor.description}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Products/Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {vendor.products.map((product) => (
              <Link to={`/product/${product.id}`} key={product.id}>
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <div className="bg-gray-200 h-40 flex items-center justify-center">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="p-3">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-sm">{product.name}</h3>
                        <span className="text-sm">{product.price}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorProfile;
