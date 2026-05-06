import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon, ShoppingCart } from "lucide-react";

function SearchComponent() {
  return (
    <div className="flex flex-3 gap-2 items-center">
      <Input placeholder="Enter" />
      <Button>
        <SearchIcon />
      </Button>
    </div>
  );
}

export default SearchComponent;
