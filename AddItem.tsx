import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Upload, X, Camera, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";

const AddItem = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    size: "",
    condition: "",
    type: ""
  });
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    "Tops", "Bottoms", "Dresses", "Outerwear", "Shoes", 
    "Accessories", "Bags", "Jewelry", "Activewear", "Formal"
  ];

  const sizes = ["XS", "S", "M", "L", "XL", "XXL", "One Size"];
  const conditions = ["New with Tags", "Like New", "Excellent", "Good", "Fair"];
  const types = ["Casual", "Formal", "Business", "Party", "Vintage", "Designer", "Sustainable"];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim()) && tags.length < 8) {
      setTags(prev => [...prev, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove));
  };

  const handleImageUpload = () => {
    // Simulate image upload
    const newImage = `/placeholder-item-${images.length + 1}.jpg`;
    if (images.length < 6) {
      setImages(prev => [...prev, newImage]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const calculatePoints = () => {
    let basePoints = 50;
    
    // Category multiplier
    const categoryMultipliers: { [key: string]: number } = {
      "Designer": 2.0,
      "Formal": 1.5,
      "Outerwear": 1.4,
      "Shoes": 1.3,
      "Bags": 1.3,
      "Dresses": 1.2,
      "Accessories": 1.1
    };

    // Condition multiplier
    const conditionMultipliers: { [key: string]: number } = {
      "New with Tags": 1.5,
      "Like New": 1.3,
      "Excellent": 1.2,
      "Good": 1.0,
      "Fair": 0.8
    };

    const categoryMultiplier = categoryMultipliers[formData.category] || 1.0;
    const conditionMultiplier = conditionMultipliers[formData.condition] || 1.0;
    
    return Math.round(basePoints * categoryMultiplier * conditionMultiplier);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.category || !formData.condition || images.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields and add at least one image.",
        variant: "destructive"
      });
      return;
    }

    if (formData.description.length < 20) {
      toast({
        title: "Description Too Short",
        description: "Please provide at least 20 characters in the description.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Item Listed Successfully!",
        description: `Your ${formData.title} has been listed and is now available for swapping.`
      });
      
      setIsSubmitting(false);
      navigate("/dashboard");
    }, 2000);
  };

  const estimatedPoints = calculatePoints();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">List a New Item</h1>
            <p className="text-muted-foreground">Share your fashion finds with the ReWear community</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Image Upload Section */}
            <Card className="p-6 border-0 bg-card/80 backdrop-blur-sm shadow-soft">
              <h3 className="text-xl font-semibold text-foreground mb-4">Photos (Required)</h3>
              <p className="text-sm text-muted-foreground mb-6">Add up to 6 photos. First photo will be the cover image.</p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative group aspect-square bg-muted rounded-lg overflow-hidden">
                    <div className="w-full h-full bg-gradient-accent flex items-center justify-center text-white text-lg font-bold">
                      {index + 1}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 w-6 h-6 bg-destructive text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    {index === 0 && (
                      <Badge className="absolute bottom-2 left-2 bg-primary text-white">
                        Cover
                      </Badge>
                    )}
                  </div>
                ))}
                
                {images.length < 6 && (
                  <button
                    type="button"
                    onClick={handleImageUpload}
                    className="aspect-square border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-2 hover:border-primary transition-colors group"
                  >
                    <Camera className="w-8 h-8 text-muted-foreground group-hover:text-primary" />
                    <span className="text-sm text-muted-foreground group-hover:text-primary">Add Photo</span>
                  </button>
                )}
              </div>
            </Card>

            {/* Item Details */}
            <Card className="p-6 border-0 bg-card/80 backdrop-blur-sm shadow-soft">
              <h3 className="text-xl font-semibold text-foreground mb-6">Item Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Title *
                  </label>
                  <Input
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="e.g., Vintage Denim Jacket"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Category *
                  </label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Size *
                  </label>
                  <Select value={formData.size} onValueChange={(value) => handleInputChange("size", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {sizes.map((size) => (
                        <SelectItem key={size} value={size}>{size}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Condition *
                  </label>
                  <Select value={formData.condition} onValueChange={(value) => handleInputChange("condition", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      {conditions.map((condition) => (
                        <SelectItem key={condition} value={condition}>{condition}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Type
                  </label>
                  <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {types.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Description * (min. 20 characters)
                  </label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Describe your item in detail. Include brand, fit, any flaws, etc."
                    rows={4}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {formData.description.length}/20 characters minimum
                  </p>
                </div>
              </div>
            </Card>

            {/* Tags Section */}
            <Card className="p-6 border-0 bg-card/80 backdrop-blur-sm shadow-soft">
              <h3 className="text-xl font-semibold text-foreground mb-4">Tags (Optional)</h3>
              <p className="text-sm text-muted-foreground mb-4">Add tags to help users find your item (max 8 tags)</p>
              
              <div className="flex gap-2 mb-4">
                <Input
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  placeholder="e.g., vintage, summer, casual"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  className="flex-1"
                />
                <Button type="button" onClick={addTag} variant="outline">
                  Add Tag
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="pr-1">
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-2 hover:text-destructive"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </Card>

            {/* Points Preview */}
            <Card className="p-6 border-0 bg-gradient-primary text-white shadow-elevated">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Estimated Points Value</h3>
                  <p className="opacity-90">Based on category, condition, and demand</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">{estimatedPoints}</div>
                  <div className="flex items-center gap-1 opacity-90">
                    <Star className="w-4 h-4" />
                    <span>points</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Submit Button */}
            <div className="flex gap-4">
              <Button
                type="submit"
                variant="hero"
                size="lg"
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? (
                  <>
                    <Upload className="w-5 h-5 mr-2 animate-spin" />
                    Listing Item...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5 mr-2" />
                    List Item
                  </>
                )}
              </Button>
              
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => navigate("/dashboard")}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddItem;
