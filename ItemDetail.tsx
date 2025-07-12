import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Heart, Star, Coins, ArrowLeft, Share, Flag, Camera, MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";

// Mock item data
const mockItem = {
  id: 1,
  title: "Vintage Denim Jacket",
  description: "Beautiful vintage denim jacket in excellent condition. This is a classic piece that never goes out of style. Features include button closure, chest pockets, and a perfect faded wash. No stains, tears, or significant wear. From a smoke-free home. Perfect for layering or as a statement piece.",
  category: "Outerwear",
  size: "M",
  condition: "Excellent",
  points: 85,
  images: ["/placeholder-jacket-1.jpg", "/placeholder-jacket-2.jpg", "/placeholder-jacket-3.jpg"],
  tags: ["vintage", "denim", "classic", "layering"],
  user: {
    name: "Sarah Johnson",
    avatar: "/placeholder-user.jpg",
    rating: 4.8,
    totalSwaps: 23,
    joinDate: "March 2024"
  },
  stats: {
    views: 45,
    favorites: 12,
    listingDate: "2024-01-15"
  },
  availability: "available", // available, swapped, pending
  featured: true
};

const ItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [item] = useState(mockItem);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showSwapDialog, setShowSwapDialog] = useState(false);
  const [showRedeemDialog, setShowRedeemDialog] = useState(false);

  const handleSwapRequest = () => {
    toast({
      title: "Swap Request Sent!",
      description: Your swap request for ${item.title} has been sent to ${item.user.name}.
    });
    setShowSwapDialog(false);
  };

  const handleRedeem = () => {
    toast({
      title: "Item Redeemed!",
      description: You've successfully redeemed ${item.title} for ${item.points} points.
    });
    setShowRedeemDialog(false);
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    toast({
      title: isFavorited ? "Removed from favorites" : "Added to favorites",
      description: isFavorited ? "Item removed from your favorites" : "Item added to your favorites"
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied!",
      description: "Item link has been copied to your clipboard."
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Browse
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <Card className="overflow-hidden border-0 shadow-elevated">
              <div className="aspect-square bg-gradient-soft flex items-center justify-center">
                <div className="w-32 h-32 bg-gradient-accent rounded-3xl flex items-center justify-center text-white text-4xl font-bold">
                  {currentImageIndex + 1}
                </div>
              </div>
            </Card>
            
            {/* Thumbnail Navigation */}
            <div className="flex gap-2">
              {item.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-16 h-16 rounded-lg border-2 transition-colors ${
                    currentImageIndex === index 
                      ? 'border-primary bg-primary/10' 
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="w-full h-full bg-gradient-soft rounded-md flex items-center justify-center text-sm font-bold text-muted-foreground">
                    {index + 1}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Item Details */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  {item.featured && (
                    <Badge className="mb-2 bg-accent text-white">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                  <h1 className="text-3xl font-bold text-foreground mb-2">{item.title}</h1>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <span>{item.category}</span>
                    <span>•</span>
                    <span>Size {item.size}</span>
                    <span>•</span>
                    <span>{item.condition}</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={handleFavorite}>
                    <Heart className={w-5 h-5 ${isFavorited ? 'fill-current text-accent' : 'text-muted-foreground'}} />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={handleShare}>
                    <Share className="w-5 h-5 text-muted-foreground" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Flag className="w-5 h-5 text-muted-foreground" />
                  </Button>
                </div>
              </div>

              {/* Points Value */}
              <Card className="p-4 bg-gradient-primary text-white border-0 shadow-soft">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="opacity-90 text-sm">Swap Value</p>
                    <div className="flex items-center gap-2">
                      <Coins className="w-6 h-6" />
                      <span className="text-2xl font-bold">{item.points} points</span>
                    </div>
                  </div>
                  <Badge 
                    className={`${
                      item.availability === 'available' ? 'bg-green-100 text-green-800' :
                      item.availability === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {item.availability}
                  </Badge>
                </div>
              </Card>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Dialog open={showSwapDialog} onOpenChange={setShowSwapDialog}>
                <DialogTrigger asChild>
                  <Button 
                    variant="hero" 
                    size="lg" 
                    className="flex-1"
                    disabled={item.availability !== 'available'}
                  >
                    Request Swap
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Request Item Swap</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <p>You're about to request a swap for <strong>{item.title}</strong> from {item.user.name}.</p>
                    <p className="text-sm text-muted-foreground">
                      This will send a notification to the item owner. They can view your items and decide whether to accept the swap.
                    </p>
                    <div className="flex gap-3">
                      <Button onClick={handleSwapRequest} className="flex-1">
                        Send Request
                      </Button>
                      <Button variant="outline" onClick={() => setShowSwapDialog(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog open={showRedeemDialog} onOpenChange={setShowRedeemDialog}>
                <DialogTrigger asChild>
                  <Button 
                    variant="soft" 
                    size="lg"
                    disabled={item.availability !== 'available'}
                  >
                    Redeem ({item.points} pts)
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Redeem with Points</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <p>You're about to redeem <strong>{item.title}</strong> for <strong>{item.points} points</strong>.</p>
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-sm">
                        <strong>Your balance:</strong> 450 points<br />
                        <strong>After redemption:</strong> {450 - item.points} points
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <Button onClick={handleRedeem} className="flex-1">
                        Confirm Redemption
                      </Button>
                      <Button variant="outline" onClick={() => setShowRedeemDialog(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* User Profile */}
            <Card className="p-6 border-0 bg-card/80 backdrop-blur-sm shadow-soft">
              <h3 className="font-semibold text-foreground mb-4">Listed by</h3>
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={item.user.avatar} alt={item.user.name} />
                  <AvatarFallback className="bg-gradient-accent text-white">
                    {item.user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{item.user.name}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Star className="w-4 h-4 text-accent fill-current" />
                    <span>{item.user.rating}</span>
                    <span>•</span>
                    <span>{item.user.totalSwaps} swaps</span>
                    <span>•</span>
                    <span>Member since {item.user.joinDate}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Message
                </Button>
              </div>
            </Card>

            {/* Description */}
            <Card className="p-6 border-0 bg-card/80 backdrop-blur-sm shadow-soft">
              <h3 className="font-semibold text-foreground mb-4">Description</h3>
              <p className="text-foreground leading-relaxed">{item.description}</p>
              
              {/* Tags */}
              {item.tags.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium text-foreground mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </Card>

            {/* Item Stats */}
            <Card className="p-6 border-0 bg-card/80 backdrop-blur-sm shadow-soft">
              <h3 className="font-semibold text-foreground mb-4">Item Information</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Views</p>
                  <p className="font-semibold text-foreground">{item.stats.views}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Favorited</p>
                  <p className="font-semibold text-foreground">{item.stats.favorites}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Listed</p>
                  <p className="font-semibold text-foreground">{item.stats.listingDate}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Item ID</p>
                  <p className="font-semibold text-foreground">#{item.id}</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
