import { useEffect, useState } from "react";
import { Upload, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function CreateProduct() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    mainImage: null,
    subImages: [],
  });

  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [subImagePreviews, setSubImagePreviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]); // ✅ Store fetched categories
  const [loadingCategories, setLoadingCategories] = useState(true);

  // ✅ Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const url = `${import.meta.env.VITE_API_URL}/ecommerce/categories`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            accept: "application/json",
          },
          credentials: "include",
        });

        const data = await response.json();
        console.log("Categories:", data);

        if (data.success && data.data) {
          setCategories(data.data.categories); // ✅ Store category objects with _id and name
          // console.log(categories)
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Handle text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle main image upload
  const handleMainImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        mainImage: file,
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setMainImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle sub images upload
  const handleSubImagesChange = (e) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setFormData((prev) => ({
        ...prev,
        subImages: [...prev.subImages, ...newFiles],
      }));

      // Generate previews
      newFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setSubImagePreviews((prev) => [...prev, reader.result]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  // Remove sub image
  const removeSubImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      subImages: prev.subImages.filter((_, i) => i !== index),
    }));
    setSubImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // Remove main image
  const removeMainImage = () => {
    setFormData((prev) => ({
      ...prev,
      mainImage: null,
    }));
    setMainImagePreview(null);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("description", formData.description);
      form.append("price", formData.price);
      form.append("stock", formData.stock);
      form.append("category", formData.category); // ✅ Now this is a valid ObjectId

      if (formData.mainImage) {
        form.append("mainImage", formData.mainImage);
      }

      formData.subImages.forEach((image) => {
        form.append("subImages", image);
      });

      const url = `${import.meta.env.VITE_API_URL}/ecommerce/products`;
      const response = await fetch(url, {
        method: "POST",
        body: form,
        credentials: "include",
      });

      const data = await response.json();
      console.log("Product created:", data);

      if (data.success) {
        // Reset form
        setFormData({
          name: "",
          description: "",
          price: "",
          stock: "",
          category: "",
          mainImage: null,
          subImages: [],
        });
        setMainImagePreview(null);
        setSubImagePreviews([]);

        alert("Product Added successfully!");
      } else {
        alert("Failed to create product: " + data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to create product");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">
              Create New Product
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Fill in the details below to create a new product
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Product Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground font-semibold">
                  Product Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Recycled Granite Gloves"
                  required
                  className="bg-background border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label
                  htmlFor="description"
                  className="text-foreground font-semibold"
                >
                  Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your product..."
                  rows={4}
                  required
                  className="bg-background border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>

              {/* Price and Stock */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="price"
                    className="text-foreground font-semibold"
                  >
                    Price ($)
                  </Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="413"
                    required
                    className="bg-background border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="stock"
                    className="text-foreground font-semibold"
                  >
                    Stock
                  </Label>
                  <Input
                    id="stock"
                    name="stock"
                    type="number"
                    value={formData.stock}
                    onChange={handleInputChange}
                    placeholder="47"
                    required
                    className="bg-background border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label
                  htmlFor="category"
                  className="text-foreground font-semibold"
                >
                  Category
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, category: value }))
                  }
                >
                  <SelectTrigger className="bg-background border-border text-foreground">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {loadingCategories? (
                      <SelectItem value='loadingCategories' disabled>
                        Loading categories...
                      </SelectItem>
                    ) : categories.length > 0 ? (
                      categories.map((cat) => (
                        <SelectItem key={cat._id} value={cat._id}>
                          {/* ✅ Display category name, but send category ID */}
                          {cat.name}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="loading" disabled>
                        No categories available
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>

              {/* Main Image */}
              <div className="space-y-2">
                <Label className="text-foreground font-semibold">
                  Main Image
                </Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 hover:border-primary transition-colors">
                  {mainImagePreview ? (
                    <div className="space-y-3">
                      <img
                        src={mainImagePreview}
                        alt="Main preview"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={removeMainImage}
                        className="w-full"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <label className="cursor-pointer flex flex-col items-center justify-center space-y-2">
                      <Upload className="w-8 h-8 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">
                        Click to upload main image
                      </span>
                      <span className="text-xs text-muted-foreground">
                        PNG, JPG, GIF up to 10MB
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleMainImageChange}
                        className="hidden"
                        required
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Sub Images */}
              <div className="space-y-2">
                <Label className="text-foreground font-semibold">
                  Sub Images (Gallery)
                </Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 hover:border-primary transition-colors">
                  <label className="cursor-pointer flex flex-col items-center justify-center space-y-2">
                    <Plus className="w-8 h-8 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">
                      Click to add sub images
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Multiple images allowed
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleSubImagesChange}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Sub Images Preview */}
                {subImagePreviews.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                    {subImagePreviews.map((preview, index) => (
                      <div
                        key={index}
                        className="relative rounded-lg overflow-hidden group"
                      >
                        <img
                          src={preview}
                          alt={`Sub image ${index + 1}`}
                          className="w-full h-24 object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeSubImage(index)}
                          className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-5 h-5 text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex gap-3 pt-6">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  {isLoading ? "Creating..." : "Create Product"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 border-border text-foreground hover:bg-secondary"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
