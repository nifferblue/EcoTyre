import React from "react";
import Button2 from "../Components/Button2";

const Header2 = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">My Listings</h1>
      <p className="text-gray-400">Manage your tyre listings and track offers</p>
      <Button2 text="New Listing" className="bg-green-600 mt-4 hover:bg-green-700" />

    </div>
  );
};

export default Header2;
