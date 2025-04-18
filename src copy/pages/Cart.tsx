
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Item 1", price: 29.99, quantity: 1, image: "https://via.placeholder.com/100x100" },
    { id: 2, name: "Item 2", price: 49.99, quantity: 1, image: "https://via.placeholder.com/100x100" },
  ]);

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(
      cartItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 5.99;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8 text-center">Cart</h1>
        
        <Tabs defaultValue="cart" className="w-full">
          <TabsList className="w-full grid grid-cols-4 max-w-md mx-auto mb-8">
            <TabsTrigger value="cart">Cart</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
            <TabsTrigger value="payment">Payment</TabsTrigger>
            <TabsTrigger value="review">Review</TabsTrigger>
          </TabsList>
          <TabsContent value="cart">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Cart Items */}
              <div className="w-full lg:w-2/3">
                {cartItems.length > 0 ? (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <Card key={item.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center">
                            <div className="bg-gray-200 w-20 h-20 flex-shrink-0 mr-4">
                              <img 
                                src={item.image} 
                                alt={item.name}
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <div className="flex-grow">
                              <h3 className="font-medium">{item.name}</h3>
                              <p className="text-sm text-gray-500">Secondary text</p>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="flex items-center">
                                <button 
                                  className="w-6 h-6 border rounded-l flex items-center justify-center"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                  -
                                </button>
                                <span className="w-8 text-center">{item.quantity}</span>
                                <button 
                                  className="w-6 h-6 border rounded-r flex items-center justify-center"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  +
                                </button>
                              </div>
                              <div className="w-20 text-right font-medium">
                                ${(item.price * item.quantity).toFixed(2)}
                              </div>
                              <button 
                                className="text-red-500 ml-4"
                                onClick={() => removeItem(item.id)}
                              >
                                ✕
                              </button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <p className="text-gray-500">Your cart is empty</p>
                    <Button className="mt-4">Continue Shopping</Button>
                  </div>
                )}
              </div>

              {/* Order Summary */}
              <div className="w-full lg:w-1/3">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-lg font-semibold mb-4">Price Details</h2>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span>${shipping.toFixed(2)}</span>
                      </div>
                      <div className="border-t pt-3 font-semibold flex justify-between">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                    <Button className="w-full mt-6">Proceed to Checkout</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="shipping">
            <div className="max-w-md mx-auto">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Shipping Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Full Name</label>
                      <input type="text" className="w-full p-2 border rounded" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Address</label>
                      <input type="text" className="w-full p-2 border rounded" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">City</label>
                        <input type="text" className="w-full p-2 border rounded" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Zip Code</label>
                        <input type="text" className="w-full p-2 border rounded" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Country</label>
                      <select className="w-full p-2 border rounded">
                        <option>United States</option>
                        <option>Canada</option>
                        <option>United Kingdom</option>
                      </select>
                    </div>
                    <Button className="w-full mt-2">Continue to Payment</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="payment">
            <div className="max-w-md mx-auto">
              <p className="text-center py-8 text-gray-500">Payment section placeholder</p>
            </div>
          </TabsContent>
          <TabsContent value="review">
            <div className="max-w-md mx-auto">
              <p className="text-center py-8 text-gray-500">Review section placeholder</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Cart;
