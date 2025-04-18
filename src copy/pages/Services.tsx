
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Services = () => {
  const services = [
    { id: 1, name: "Shoes", price: "$59.99" },
    { id: 2, name: "Sneakers", price: "$89.99" },
    { id: 3, name: "Boots", price: "$129.99" },
    { id: 4, name: "Sandals", price: "$39.99" },
    { id: 5, name: "Slippers", price: "$29.99" },
    { id: 6, name: "Athletic Shoes", price: "$99.99" },
    { id: 7, name: "Dress Shoes", price: "$149.99" },
    { id: 8, name: "Casual Shoes", price: "$69.99" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold">Browse Services</h1>
          <div className="flex items-center gap-4">
            <div className="w-40">
              <select className="w-full p-2 border rounded">
                <option>Filter</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest</option>
              </select>
            </div>
            <div className="w-64">
              <SearchBar />
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          <div className="w-1/5">
            <div className="border rounded p-4">
              <h2 className="font-medium mb-2">Filters</h2>
              <div className="mb-4">
                <h3 className="text-sm font-medium mb-1">Category 1</h3>
                <ul className="text-sm">
                  <li className="mb-1">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      Option 1
                    </label>
                  </li>
                  <li className="mb-1">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      Option 2
                    </label>
                  </li>
                  <li className="mb-1">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      Option 3
                    </label>
                  </li>
                </ul>
              </div>
              <div className="mb-4">
                <h3 className="text-sm font-medium mb-1">Category 2</h3>
                <ul className="text-sm">
                  <li className="mb-1">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      Option 1
                    </label>
                  </li>
                  <li className="mb-1">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      Option 2
                    </label>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="w-4/5">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {services.map((service) => (
                <Link to={`/product/${service.id}`} key={service.id}>
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-0">
                      <div className="bg-gray-200 h-40 flex items-center justify-center">
                        <div className="text-gray-400">
                          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      </div>
                      <div className="p-3">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium text-sm">{service.name}</h3>
                          <span className="text-sm">{service.price}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Short description</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
