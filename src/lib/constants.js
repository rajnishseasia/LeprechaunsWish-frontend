import {
  Crystal,
  Crystal001,
  Crystal1,
  Crystal2,
  Crystal3,
  Crystal4,
  Crystal5,
  Crystal6,
  Leaf,
  LoveHeart,
  Rainbow,
  Ruin,
  Shamrock,
  Unicorn,
  Wish,
} from "@/assets";
import isJwtTokenExpired from "jwt-check-expiry";
import toast from "react-hot-toast";
import { isAddress } from "viem";


export const crystalCardData = [
  {
    teirId: 0,
    name: "Blue",
    uri: Crystal1,
  },
  {
    teirId: 1,
    name: "Green",
    uri: Crystal6,
  },
  {
    teirId: 2,
    name: "Purple",
    uri: Crystal3,
  },
  {
    teirId: 3,
    name: "Red",
    uri: Crystal4,
  },
  {
    teirId: 4,
    name: "Yellow",
    uri: Crystal5,
  },
];

export const crystalsData = [
  {
    name: "Crystal 001",
    uri: Crystal001,
  },
  {
    name: "Crystal 001",
    uri: Crystal001,
  },
  {
    name: "Crystal 001",
    uri: Crystal001,
  },
  {
    name: "Crystal 001",
    uri: Crystal001,
  },
  {
    name: "Crystal 001",
    uri: Crystal001,
  },
  {
    name: "Crystal 001",
    uri: Crystal001,
  },
  {
    name: "Crystal 001",
    uri: Crystal001,
  },
  {
    name: "Crystal 001",
    uri: Crystal001,
  },
  {
    name: "Crystal 001",
    uri: Crystal001,
  },
  {
    name: "Crystal 001",
    uri: Crystal001,
  },
  {
    name: "Crystal 001",
    uri: Crystal001,
  },
  {
    name: "Crystal 001",
    uri: Crystal001,
  },
];

export const getImageUrl = async (url) => {
  try {
    const response = await fetch(url);

    // Try to parse as JSON (for metadata with image URL)
    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      const metadata = await response.json();

      if (metadata?.image) {
        return metadata.image; // Return the image URL from metadata
      }

      console.warn("Image field not found in JSON metadata");
      return null;
    }

    // If it's not JSON, treat it as an image Blob
    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);

    return imageUrl;
  } catch (error) {
    console.error("Error fetching image:", error);
    return null;
  }
};

export const extractIpfsHash = (uri) => {
  if (uri.startsWith("ipfs://")) {
    return uri.replace("ipfs://", "");
  }
  return null;
};

export const validateAddress = (addressToValidate) => {
  return isAddress(addressToValidate);
};

export const copyToClipboard = (text, successMessage) => {
  navigator?.clipboard?.writeText(text);
  toast.success(successMessage || "Copied to clipboard!");
};

export const validateNameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
export const emailRegex =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$/;

export const showErrorToast = (error) => {
  let message = error;

  if (!message || typeof message !== "string") {
    toast.error("Something went wrong. Please try again.");
    return;
  }

  const lowerCaseError = message.toLowerCase();

  if (lowerCaseError.includes("forbidden") || lowerCaseError.includes("403")) {
    message = "Access denied. You do not have permission to view this content.";
  } else {
    message = error; // Fallback to the error string if it's user-friendly
  }

  toast.error(message);
};

export const checkLogin = (token = "") => {
  try {
    return !isJwtTokenExpired(token);
  } catch (error) {
    console.log("error in check login", error);
    return false;
  }
};

export const truncateAddress = (address) => {
  return (`${address?.slice(0, 4)}...${address?.slice(-4)}`)
}


export const vaultCardData = [
  {
    teirId: 1,
    name: "Love Token",
    uri: LoveHeart,
    startIndex: 1,
    supply: 1000
  },
  {
    teirId: 2,
    name: "Shamrock",
    uri: Shamrock,
    startIndex: 1001,
    supply: 1000
  },
  {
    teirId: 3,
    name: "Ruin",
    uri: Ruin,
    startIndex: 2001,
    supply: 50
  },
  {
    teirId: 4,
    name: "Crystal",
    uri: Crystal,
    Category: 5,
    startIndex: 2051,
    supply: 5
  },
  {
    teirId: 5,
    name: "Rainbow",
    uri: Rainbow,
    startIndex: 2301,
    supply: 25
  },
  {
    teirId: 6,
    name: "4 Leaf Clover",
    uri: Leaf,
    startIndex: 2326,
    supply: 4
  },
  {
    teirId: 7,
    name: "Wish",
    uri: Wish,
    startIndex: 2330,
    supply: 2
  },
  {
    teirId: 8,
    name: "Unicorn",
    uri: Unicorn,
    startIndex: 2332,
    supply: 1
  },
];