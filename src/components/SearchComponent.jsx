import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon, ShoppingCart } from "lucide-react";

function SearchComponent({ className, ...props }) {
  return (
    <form className={`flex flex-3 gap-2 items-center ${className}`} {...props}>
      <Input name="searchItem" placeholder="Enter" />
      <Button type="submit">
        <SearchIcon />
      </Button>
    </form>
  );
}

export default SearchComponent;
