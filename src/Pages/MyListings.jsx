import React, { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Header2 from "../components/Header2";
import SearchBar from "../components/SearchBar";
import FilterButtons from "../components/FilterButtons";
import ListingCard from "../components/ListingCard";

import tyre1 from "../assets/ty1.jpeg";
import tyre2 from "../assets/ty2.jpeg";
import tyre3 from "../assets/ty3.jpeg";
import tyre4 from "../assets/ty4.jpeg";

const listings = [
  { id: 1, title: "Michelin Tyre", image: tyre1, condition: "Used • Good", price: 500, location: "Nairobi, Kenya", date: "01/02/2024" },
  { id: 2, title: "Pirelli Tyre", image: tyre2, condition: "New", price: 1200, location: "Mombasa, Kenya", date: "03/02/2024" },
  { id: 3, title: "Goodyear Tyre", image: tyre3, condition: "Used • Fair", price: 400, location: "Kisumu, Kenya", date: "05/02/2024" },
  { id: 4, title: "Bridgestone Tyre", image: tyre4, condition: "Used • Excellent", price: 800, location: "Nakuru, Kenya", date: "06/02/2024" },
  { id: 5, title: "Michelin Tyre", image: tyre1, condition: "Used • Good", price: 500, location: "Nairobi, Kenya", date: "07/02/2024" },
  { id: 6, title: "Pirelli Tyre", image: tyre2, condition: "New", price: 1200, location: "Mombasa, Kenya", date: "08/02/2024" },
  { id: 7, title: "Goodyear Tyre", image: tyre3, condition: "Used • Fair", price: 400, location: "Kisumu, Kenya", date: "09/02/2024" },
  { id: 8, title: "Bridgestone Tyre", image: tyre4, condition: "Used • Excellent", price: 800, location: "Nakuru, Kenya", date: "10/02/2024" },
];

const MyListings = () => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-gray-100">
      {/* Main Content */}
      <div className="flex-1 flex flex-col px-4 w-full max-w-6xl mx-auto">
        {/* Header & Search Section */}
        <div className="space-y-3 mt-4">
          <Header2 />
          <SearchBar />
          <FilterButtons />
        </div>

        {/* Listings Horizontal Scroll */}
        <div className="relative mt-6">
          {/* Left Arrow */}
          <button 
            onClick={scrollLeft} 
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300 z-20"
          >
            <FaChevronLeft className="text-xl" />
          </button>

          {/* Scrollable Listings */}
          <div 
            ref={scrollRef} 
            className="flex space-x-4 overflow-x-auto scroll-smooth no-scrollbar w-full px-4"
            style={{ scrollBehavior: "smooth", whiteSpace: "nowrap" }}
          >
            {listings.map((listing) => (
              <div key={listing.id} className="min-w-[250px]">
                <ListingCard 
                  title={listing.title} 
                  image={listing.image} 
                  condition={listing.condition} 
                  price={listing.price} 
                  location={listing.location} 
                  date={listing.date} 
                />
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button 
            onClick={scrollRight} 
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300 z-20"
          >
            <FaChevronRight className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyListings;
