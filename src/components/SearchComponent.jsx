import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon, ShoppingCart } from "lucide-react";

function SearchComponent() {
  return (
    <div className="flex justify-between h-[8vh] border-1 items-center">
      <div className="flex-1">
        {/* logo */}
        logo
      </div>
      <div className="flex flex-3">
        <Input className="" placeholder="Enter" />
        <Button>
          <SearchIcon />
        </Button>
      </div>
      <div className="flex-1 flex justify-end">
        {/* right side  */}
        <Button>
          <ShoppingCart />
        </Button>
      </div>
    </div>
  );
}

export default SearchComponent;
