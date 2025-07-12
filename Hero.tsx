import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Heart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/landing-hero.jpg";

const Hero = () => {
  const lookItems = [
    {
      id: 1,
      name: "Vintage Denim Jacket",
      category: "OUTERWEAR",
      image: "/placeholder-jacket.jpg",
      position: "top-[15%] left-[20%]"
    },
    {
      id: 2,
      name: "Cherry Bag Charm",
      category: "ACCESSORY", 
      image: "/placeholder-charm.jpg",
      position: "top-[20%] right-[25%]"
    },
    {
      id: 3,
      name: "High Waist Jeans",
      category: "EMBROIDERED DENIM",
      image: "/placeholder-jeans.jpg",
      position: "bottom-[30%] left-[15%]"
    },
    {
      id: 4,
      name: "Red Crossbody Bag",
      category: "LEATHER BAG",
      image: "/placeholder-bag.jpg",
      position: "bottom-[20%] right-[20%]"
    }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-soft">
      {/* Main Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Swap. Style. Sustain.
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Transform your wardrobe without waste. Discover curated looks, earn points, and trade fashion sustainably.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button variant="hero" size="xl" className="group">
                Start Swapping
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/browse">
              <Button variant="soft" size="xl">
                Browse Items
              </Button>
            </Link>
          </div>
        </div>

        {/* Pick This Look Section - Mobile Optimized */}
        <div className="max-w-4xl mx-auto">
          <Card className="relative bg-card/80 backdrop-blur-sm border-0 shadow-elevated p-6 md:p-12 rounded-3xl overflow-hidden">
            {/* Background pattern */}
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `url(${heroImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(8px) brightness(1.1)'
              }}
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/60 to-accent-soft/30" />
            
            {/* Content */}
            <div className="relative z-10">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-2">
                  PICK THIS LOOK
                </h2>
                <p className="text-muted-foreground">
                  Curated sustainable style combinations
                </p>
              </div>

              {/* Look Items Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {lookItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="group relative bg-background/80 backdrop-blur-sm rounded-2xl p-6 hover:shadow-soft transition-all duration-300 hover:scale-105"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-soft">
                          {item.id}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground text-lg mb-1 truncate">
                          {item.name}
                        </h3>
                        <p className="text-sm text-muted-foreground uppercase tracking-wide">
                          {item.category}
                        </p>
                        <div className="flex items-center mt-2 gap-2">
                          <Star className="w-4 h-4 text-accent fill-current" />
                          <span className="text-sm text-muted-foreground">
                            Available for swap
                          </span>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <Heart className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="text-center">
                <Link to="/browse">
                  <Button variant="accent" size="lg" className="mb-4">
                    Get This Complete Look
                  </Button>
                </Link>
                <p className="text-sm text-muted-foreground">
                  Total swap value: 120 points
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Explore Section */}
        <div className="text-center mt-16">
          <h3 className="text-3xl font-bold text-foreground mb-8">
            EXPLORE ALL STYLES
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {lookItems.map((item) => (
              <Card key={`explore-${item.id}`} className="group cursor-pointer hover:shadow-soft transition-all duration-300 hover:scale-105 border-0 bg-card/80 backdrop-blur-sm">
                <div className="aspect-square bg-gradient-soft rounded-t-lg flex items-center justify-center">
                  <div className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center text-white font-bold">
                    {item.id}
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-medium text-sm text-foreground truncate">
                    {item.name}
                  </h4>
                  <p className="text-xs text-muted-foreground uppercase">
                    {item.category}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
