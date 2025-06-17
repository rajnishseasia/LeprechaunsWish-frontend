import React, { useEffect } from "react";

function RainbowList() {
  useEffect(() => {
    window.location.href =
      "https://drive.google.com/file/d/1Sos-oWMoLfBMVwXkCcIIdZzRjlqWHhng/view";
  }, []);

  return null; // or you can return a loader/spinner if you want
}

export default RainbowList;
