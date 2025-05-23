import React from "react";
import { FaRegFaceFrownOpen } from "react-icons/fa6";

function NoDataFound() {
  return (
    <div className="flex flex-col gap-3 items-center justify-center py-10">
      <div>
        <FaRegFaceFrownOpen className="text-white text-2xl opacity-60" />
      </div>
      <h1 className="text-white">No NFT Purchased</h1>
    </div>
  );
}

export default NoDataFound;
