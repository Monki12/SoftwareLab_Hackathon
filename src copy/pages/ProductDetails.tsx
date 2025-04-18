
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState(0);

  // This would typically be fetched from an API based on the ID
  const product = {
    id: Number(id),
    name: "Product Name",
    description: "Product description goes here. This is a detailed explanation of the product including its features, benefits, and specifications.",
    price: "$99.99",
    brandName: "Brand Name",
    brandDescription: "Brand description with details about the company.",
    images: [
      { id: 1, src: "https://via.placeholder.com/300x300" },
      { id: 2, src: "https://via.placeholder.com/300x300" },
      { id: 3, src: "https://via.placeholder.com/300x300" },
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8 flex-col md:flex-row">
          {/* Left column - Images */}
          <div className="w-full md:w-1/2">
            <div className="flex flex-col gap-4">
              <div className="bg-gray-100 rounded-lg overflow-hidden">
                <img 
                  src={product.images[selectedImage].src} 
                  alt={product.name} 
                  className="w-full h-80 object-contain"
                />
              </div>
              <div className="flex gap-4 overflow-x-auto">
                {product.images.map((image, index) => (
                  <div 
                    key={image.id}
                    onClick={() => setSelectedImage(index)}
                    className={`w-24 h-24 bg-gray-100 rounded cursor-pointer flex-shrink-0 ${selectedImage === index ? 'ring-2 ring-blue-500' : ''}`}
                  >
                    <img 
                      src={image.src} 
                      alt={`${product.name} thumbnail ${index + 1}`} 
                      className="w-full h-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column - Product details */}
          <div className="w-full md:w-1/2">
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            <div className="mb-4">
              <Link to={`/vendor/1`} className="text-blue-600 hover:underline">
                {product.brandName}
              </Link>
            </div>
            <p className="text-gray-700 mb-6">{product.description}</p>
            
            <div className="flex gap-4 mb-8">
              <Button className="bg-blue-600 hover:bg-blue-700">Add to Cart</Button>
              <Button variant="outline">Wishlist</Button>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-2">Brand Info</h3>
              <p className="text-gray-600 mb-4">{product.brandDescription}</p>
              <Link to={`/vendor/1`} className="text-blue-600 hover:underline">Visit Vendor Profile</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
