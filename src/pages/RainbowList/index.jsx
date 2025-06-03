import React, { useEffect } from "react";

function RainbowList() {
  useEffect(() => {
    window.location.href =
      "https://docs.google.com/forms/d/1uBmZAPTvNVAiPV_srBo5vit4S8GGF1gTLCSsX3fguaY/viewform?pli=1&pli=1&edit_requested=true";
  }, []);

  return null; // or you can return a loader/spinner if you want
}

export default RainbowList;
