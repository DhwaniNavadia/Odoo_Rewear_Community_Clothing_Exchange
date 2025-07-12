import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Star, Package, History, User, Coins } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

// Mock data
const mockUser = {
  name: "Sarah Johnson",
  email: "sarah@email.com",
  points: 450,
  avatar: "/placeholder-avatar.jpg",
  joinDate: "March 2024"
};

const mockItems = [
  {
    id: 1,
    title: "Vintage Denim Jacket",
    category: "Outerwear",
    size: "M",
    condition: "Excellent",
    points: 85,
    status: "active",
    image: "/placeholder-jacket.jpg",
    views: 23,
    favorited: 8
  },
  {
    id: 2,
    title: "Floral Summer Dress",
    category: "Dresses", 
    size: "S",
    condition: "Good",
    points: 65,
    status: "swapped",
    image: "/placeholder-dress.jpg",
    views: 41,
    favorited: 15
  },
  {
    id: 3,
    title: "Designer Handbag",
    category: "Accessories",
    size: "One Size",
    condition: "Like New",
    points: 120,
    status: "pending",
    image: "/placeholder-bag.jpg",
    views: 12,
    favorited: 3
  }
];

const mockSwapHistory = [
  {
    id: 1,
    type: "swap",
    item: "Black Leather Boots",
    withUser: "Emma Wilson",
    date: "2024-01-15",
    status: "completed",
    points: 95
  },
  {
    id: 2,
    type: "redeem",
    item: "Cashmere Scarf",
    date: "2024-01-10",
    status: "completed",
    points: -75
  },
  {
    id: 3,
    type: "list",
    item: "Vintage Denim Jacket",
    date: "2024-01-05",
    status: "active",
    points: 85
  }
];

const Dashboard = () => {
  const [user] = useState(mockUser);
  const [items] = useState(mockItems);
  const [swapHistory] = useState(mockSwapHistory);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "swapped": return "bg-blue-100 text-blue-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "completed": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-gradient-accent text-white text-xl">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Welcome back, {user.name}!</h1>
                <p className="text-muted-foreground">Member since {user.joinDate}</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Card className="p-4 text-center bg-gradient-primary text-white border-0">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Coins className="w-5 h-5" />
                  <span className="text-2xl font-bold">{user.points}</span>
                </div>
                <p className="text-sm opacity-90">Points Available</p>
              </Card>
              
              <Link to="/add-item">
                <Button variant="hero" size="lg" className="h-full">
                  <Plus className="w-5 h-5 mr-2" />
                  List New Item
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 text-center bg-card/80 backdrop-blur-sm border-0 shadow-soft">
            <Package className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{items.length}</div>
            <p className="text-sm text-muted-foreground">Items Listed</p>
          </Card>
          
          <Card className="p-6 text-center bg-card/80 backdrop-blur-sm border-0 shadow-soft">
            <History className="w-8 h-8 text-accent mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{swapHistory.filter(h => h.type === 'swap').length}</div>
            <p className="text-sm text-muted-foreground">Successful Swaps</p>
          </Card>
          
          <Card className="p-6 text-center bg-card/80 backdrop-blur-sm border-0 shadow-soft">
            <Star className="w-8 h-8 text-accent mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{items.reduce((acc, item) => acc + item.favorited, 0)}</div>
            <p className="text-sm text-muted-foreground">Total Favorites</p>
          </Card>
          
          <Card className="p-6 text-center bg-card/80 backdrop-blur-sm border-0 shadow-soft">
            <User className="w-8 h-8 text-primary-glow mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">4.8</div>
            <p className="text-sm text-muted-foreground">User Rating</p>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="items" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-secondary/50">
            <TabsTrigger value="items">My Items</TabsTrigger>
            <TabsTrigger value="history">Swap History</TabsTrigger>
            <TabsTrigger value="profile">Profile Settings</TabsTrigger>
          </TabsList>

          {/* My Items Tab */}
          <TabsContent value="items" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground">My Listed Items</h2>
              <Link to="/browse">
                <Button variant="soft">View All Products</Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <Card key={item.id} className="overflow-hidden border-0 bg-card/80 backdrop-blur-sm shadow-soft hover:shadow-elevated transition-all duration-300 hover:scale-105">
                  <div className="aspect-square bg-gradient-soft flex items-center justify-center">
                    <div className="w-24 h-24 bg-gradient-accent rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                      {item.id}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-foreground">{item.title}</h3>
                      <Badge className={getStatusColor(item.status)}>
                        {item.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{item.category} • Size {item.size}</p>
                    <p className="text-sm text-muted-foreground mb-3">Condition: {item.condition}</p>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Coins className="w-4 h-4 text-accent" />
                        <span className="font-semibold text-foreground">{item.points} points</span>
                      </div>
                      <div className="flex gap-2 text-sm text-muted-foreground">
                        <span>{item.views} views</span>
                        <span>{item.favorited} ♥</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        Edit
                      </Button>
                      <Link to={`/item/${item.id}`} className="flex-1">
                        <Button variant="soft" size="sm" className="w-full">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Swap History Tab */}
          <TabsContent value="history" className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Recent Activity</h2>
            
            <div className="space-y-4">
              {swapHistory.map((activity) => (
                <Card key={activity.id} className="p-6 border-0 bg-card/80 backdrop-blur-sm shadow-soft">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        activity.type === 'swap' ? 'bg-blue-100 text-blue-600' :
                        activity.type === 'redeem' ? 'bg-accent-soft text-accent' :
                        'bg-green-100 text-green-600'
                      }`}>
                        {activity.type === 'swap' ? '⇄' : activity.type === 'redeem' ? '★' : '+'}
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">
                          {activity.type === 'swap' ? 'Swapped' : activity.type === 'redeem' ? 'Redeemed' : 'Listed'} {activity.item}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {activity.withUser && `with ${activity.withUser} • `}
                          {activity.date}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className={`font-semibold ${activity.points > 0 ? 'text-green-600' : 'text-accent'}`}>
                        {activity.points > 0 ? '+' : ''}{activity.points} points
                      </div>
                      <Badge className={getStatusColor(activity.status)}>
                        {activity.status}
                      </Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Profile Settings Tab */}
          <TabsContent value="profile" className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Profile Settings</h2>
            
            <Card className="p-6 border-0 bg-card/80 backdrop-blur-sm shadow-soft">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-gradient-accent text-white text-2xl">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <Button variant="outline">Change Photo</Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                    <input 
                      type="text" 
                      defaultValue={user.name}
                      className="w-full p-3 border border-border rounded-lg bg-background"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                    <input 
                      type="email" 
                      defaultValue={user.email}
                      className="w-full p-3 border border-border rounded-lg bg-background"
                    />
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Button variant="hero">Save Changes</Button>
                  <Button variant="outline">Cancel</Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
