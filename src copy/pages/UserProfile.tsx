
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User } from "lucide-react";
import { useState } from "react";

const UserProfile = () => {
  const [selectedTab, setSelectedTab] = useState("orders");

  // Mock user data
  const userInfo = {
    name: "User Name",
    email: "user@example.com",
    phone: "+1 (555) 123-4567",
    orders: [
      { id: 1, title: "Card Title", description: "Order details", date: "Nov 10, 2023" },
      { id: 2, title: "Card Title", description: "Order details", date: "Oct 25, 2023" },
      { id: 3, title: "Card Title", description: "Order details", date: "Sep 15, 2023" },
      { id: 4, title: "Card Title", description: "Order details", date: "Aug 2, 2023" },
    ],
    wishlist: [],
    products: []
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8 flex-col md:flex-row">
          {/* Left column - User info */}
          <div className="w-full md:w-1/3">
            <div className="flex flex-col items-center p-6 border rounded-lg">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                <User className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-xl font-bold mb-1">{userInfo.name}</h2>
              <p className="text-gray-600 mb-4">{userInfo.email}</p>
              <div className="w-full">
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Personal Information</label>
                  <select className="w-full p-2 border rounded mb-3">
                    <option>Edit Profile</option>
                    <option>View Profile</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Orders and Returns</label>
                  <select className="w-full p-2 border rounded">
                    <option>My Orders</option>
                    <option>Return an Item</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Tabs content */}
          <div className="w-full md:w-2/3">
            <Tabs defaultValue="orders" className="w-full">
              <TabsList className="w-full grid grid-cols-3 mb-8">
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
                <TabsTrigger value="products">My Products</TabsTrigger>
              </TabsList>
              <TabsContent value="orders" className="space-y-4">
                {userInfo.orders.map(order => (
                  <Card key={order.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex items-center p-4 border-b">
                        <div className="bg-gray-200 w-16 h-16 flex items-center justify-center mr-4">
                          <span className="text-gray-400 text-sm">Image</span>
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">{order.title}</h3>
                          <p className="text-sm text-gray-500">{order.description}</p>
                          <p className="text-xs text-gray-400 mt-1">{order.date}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              <TabsContent value="wishlist">
                <p className="text-center py-8 text-gray-500">Your wishlist is empty.</p>
              </TabsContent>
              <TabsContent value="products">
                <p className="text-center py-8 text-gray-500">You don't have any products yet.</p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
