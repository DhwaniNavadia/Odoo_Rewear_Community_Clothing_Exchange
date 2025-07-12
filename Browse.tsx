import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Heart, Star, Coins } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

// Mock items data
const mockItems = [
  {
    id: 1,
    title: "Vintage Denim Jacket",
    category: "Outerwear",
    size: "M",
    condition: "Excellent",
    points: 85,
    image: "/placeholder-jacket.jpg",
    user: "Sarah J.",
    favorited: false,
    featured: true
  },
  {
    id: 2,
    title: "Floral Summer Dress",
    category: "Dresses",
    size: "S", 
    condition: "Good",
    points: 65,
    image: "/placeholder-dress.jpg",
    user: "Emma W.",
    favorited: true,
    featured: false
  },
  {
    id: 3,
    title: "Designer Handbag",
    category: "Accessories",
    size: "One Size",
    condition: "Like New",
    points: 120,
    image: "/placeholder-bag.jpg",
    user: "Lisa M.",
    favorited: false,
    featured: true
  },
  {
    id: 4,
    title: "Cashmere Scarf",
    category: "Accessories",
    size: "One Size",
    condition: "Excellent",
    points: 75,
    image: "/placeholder-scarf.jpg",
    user: "Maya P.",
    favorited: false,
    featured: false
  },
  {
    id: 5,
    title: "Black Leather Boots",
    category: "Shoes",
    size: "8",
    condition: "Good",
    points: 95,
    image: "/placeholder-boots.jpg",
    user: "Anna K.",
    favorited: true,
    featured: false
  },
  {
    id: 6,
    title: "Silk Blouse",
    category: "Tops",
    size: "M",
    condition: "Like New",
    points: 55,
    image: "/placeholder-blouse.jpg",
    user: "Grace L.",
    favorited: false,
    featured: false
  },
  {
    id: 7,
    title: "Wool Coat",
    category: "Outerwear", 
    size: "L",
    condition: "Excellent",
    points: 110,
    image: "/placeholder-coat.jpg",
    user: "Olivia R.",
    favorited: false,
    featured: true
  },
  {
    id: 8,
    title: "Gold Necklace",
    category: "Jewelry",
    size: "One Size",
    condition: "New with Tags",
    points: 140,
    image: "/placeholder-necklace.jpg",
    user: "Zoe T.",
    favorited: false,
    featured: false
  }
];

const Browse = () => {
  const [items, setItems] = useState(mockItems);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sizeFilter, setSizeFilter] = useState("all");
  const [conditionFilter, setConditionFilter] = useState("all");
  const [sortBy, setSortBy] = useState("featured");

  const categories = ["all", "Tops", "Bottoms", "Dresses", "Outerwear", "Shoes", "Accessories", "Jewelry"];
  const sizes = ["all", "XS", "S", "M", "L", "XL", "XXL", "One Size"];
  const conditions = ["all", "New with Tags", "Like New", "Excellent", "Good", "Fair"];

  const toggleFavorite = (itemId: number) => {
    setItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, favorited: !item.favorited } : item
    ));
  };

  const filteredAndSortedItems = items
    .filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
      const matchesSize = sizeFilter === "all" || item.size === sizeFilter;
      const matchesCondition = conditionFilter === "all" || item.condition === conditionFilter;
      
      return matchesSearch && matchesCategory && matchesSize && matchesCondition;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "featured":
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        case "points-low":
          return a.points - b.points;
        case "points-high":
          return b.points - a.points;
        case "newest":
          return b.id - a.id;
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Browse Items</h1>
          <p className="text-muted-foreground">Discover amazing fashion finds from the ReWear community</p>
        </div>

        {/* Filters and Search */}
        <Card className="p-6 mb-8 border-0 bg-card/80 backdrop-blur-sm shadow-soft">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            {/* Search */}
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat === "all" ? "All Categories" : cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Size Filter */}
            <Select value={sizeFilter} onValueChange={setSizeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Size" />
              </SelectTrigger>
              <SelectContent>
                {sizes.map((size) => (
                  <SelectItem key={size} value={size}>
                    {size === "all" ? "All Sizes" : size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Condition Filter */}
            <Select value={conditionFilter} onValueChange={setConditionFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Condition" />
              </SelectTrigger>
              <SelectContent>
                {conditions.map((condition) => (
                  <SelectItem key={condition} value={condition}>
                    {condition === "all" ? "All Conditions" : condition}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured First</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="points-low">Points: Low to High</SelectItem>
                <SelectItem value="points-high">Points: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-foreground">
            {filteredAndSortedItems.length} items found
          </h2>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </Button>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredAndSortedItems.map((item) => (
            <Card key={item.id} className="group overflow-hidden border-0 bg-card/80 backdrop-blur-sm shadow-soft hover:shadow-elevated transition-all duration-300 hover:scale-105">
              <div className="relative">
                <div className="aspect-square bg-gradient-soft flex items-center justify-center">
                  <div className="w-20 h-20 bg-gradient-accent rounded-2xl flex items-center justify-center text-white text-xl font-bold">
                    {item.id}
                  </div>
                </div>
                
                {/* Featured Badge */}
                {item.featured && (
                  <Badge className="absolute top-2 left-2 bg-accent text-white">
                    <Star className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>
                )}
                
                {/* Favorite Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className={`absolute top-2 right-2 ${item.favorited ? 'text-accent' : 'text-muted-foreground'} hover:text-accent`}
                  onClick={() => toggleFavorite(item.id)}
                >
                  <Heart className={`w-5 h-5 ${item.favorited ? 'fill-current' : ''}`} />
                </Button>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {item.category} • Size {item.size}
                </p>
                <p className="text-sm text-muted-foreground mb-3">
                  Condition: {item.condition}
                </p>
                
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-1">
                    <Coins className="w-4 h-4 text-accent" />
                    <span className="font-semibold text-foreground">{item.points}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">by {item.user}</span>
                </div>
                
                <div className="flex gap-2">
                  <Link to={`/item/${item.id}`} className="flex-1">
                    <Button variant="soft" size="sm" className="w-full">
                      View Details
                    </Button>
                  </Link>
                  <Button variant="hero" size="sm">
                    Swap
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredAndSortedItems.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No items found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search criteria or browse all items
            </p>
            <Button 
              onClick={() => {
                setSearchTerm("");
                setCategoryFilter("all");
                setSizeFilter("all");
                setConditionFilter("all");
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Load More Button */}
        {filteredAndSortedItems.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Items
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
