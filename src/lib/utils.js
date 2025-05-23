import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  Crystal,
  Leaf,
  LoveHeart,
  Rainbow,
  Ruin,
  Crystal1,
  Shamrock,
  Unicorn,
  Wish,
} from "@/assets";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


export const teirs = [
  {
    name: "Love Token",
    teirId: 1,
  },
  {
    name: "Shamrock",
    teirId: 2,
  },
  {
    name: "Ruin",
    teirId: 3,
  },
  {
    name: "Crystal",
    teirId: 4,
  },
  {
    name: "Rainbow",
    teirId: 5,
  },
  {
    name: "4 Leaf Clover",
    teirId: 6,
  },
  {
    name: "Wish",
    teirId: 7,
  },
  {
    name: "Unicorn",
    teirId: 8,
  },
]

export const matchTeirRoutes = [
  {
    name: "love",
    teirId: 1,
  },
  {
    name: "shamrock",
    teirId: 2,
  },
  {
    name: "ruin",
    teirId: 3,
  },
  {
    name: "crystal",
    teirId: 4,
  },
  {
    name: "rainbow",
    teirId: 5,
  },
  {
    name: "leaf",
    teirId: 6,
  },
  {
    name: "wish",
    teirId: 7,
  },
  {
    name: "unicorn",
    teirId: 8,
  },
]

export const teirDescriptions = {
  1: {
    name: "Love Token",
    uri: LoveHeart,
    description: "The love token is the most important coin in the leprechaun world. Free and unlimited.",
    list: [
      "Cost: Free (except gas)",
      "Unlimited supply"
    ],
  },
  2: {
    name: "Shamrock",
    uri: Shamrock,
    description: "The Shamrock coin is the most widely used coin in the leprechaun world.",
    list: [
      "Total Supply: 10,000 (1,000 at first mint)",
      "Cost: Not specified"
    ],
    perks: [
      "Usable in future game (if developed)"
    ]
  },
  3: {
    name: "Ruin",
    uri: Ruin,
    description: "Includes digital benefits and in-game utility.",
    list: [
      "Rarity: 1,000",
      "Cost: 0.0546 ETH"
    ],
    perks: [
      "Digital download of movie",
      "In-game use (if game is developed)"
    ]
  },
  4: {
    name: "Crystal",
    uri: Crystal1,
    description: "The Crystal Coin is a silver crystal with a rugged silver rim.",
    list: [
      "Rarity: 500",
      "Colors: Red, Green, Yellow, Blue, Purple",
      "Cost: 0.5465 ETH"
    ],
    perks: [
      "Movie Swag Bag",
      "Digital download of movie",
      "Free copy of game (if developed)"
    ]
  },
  5: {
    name: "Rainbow",
    uri: Rainbow,
    description: "Exclusive Rainbow Coins for accredited investors with financial returns.",
    list: [
      "Eligibility: Accredited investors only",
      "Rarity: 60 coins",
      "Cost: €50k or 27.32 ETH"
    ],
    perks: [
      "20% ROI",
      "0.16% net profits for movie's lifetime",
      "Movie screening + after party",
      "Swag bag",
      "Name in credits"
    ]
  },
  6: {
    name: "4 Leaf Clover",
    uri: Leaf,
    description: "Investor-tier coin with high ROI and film involvement.",
    list: [
      "Eligibility: Accredited investors only",
      "Rarity: 4",
      "Cost: 273.24 ETH"
    ],
    perks: [
      "20% ROI",
      "1.66% net revenue of movie",
      "0.25% Franchise IP",
      "Executive Producer credit",
      "On-set experience + small role in movie",
      "Cast and crew wrap party",
      "VIP premiere tickets"
    ]
  },
  7: {
    name: "Wish",
    uri: Wish,
    description: "Wish Key tier for high-level investors with major IP perks.",
    list: [
      "Eligibility: Accredited investors only",
      "Rarity: 3",
      "Cost: 546.49 ETH"
    ],
    perks: [
      "20% ROI",
      "3.33% net profits of film",
      "0.5% Franchise IP",
      "Executive Producer credit",
      "On-set experience + small role in movie",
      "Cast and crew wrap party",
      "VIP premiere tickets"
    ]
  },
  8: {
    name: "Unicorn",
    uri: Unicorn,
    description: "Unicorn Key: the rarest treasure, granting full access and major IP rights.",
    list: [
      "Eligibility: Accredited investors only",
      "Rarity: 1",
      "Price: 3,825.43 ETH"
    ],
    perks: [
      "20% ROI",
      "23% net profits of movie",
      "3% ownership of Franchise IP",
      "Lead Executive Producer credit",
      "On-set visit + small role in movie",
      "Cast and crew after party",
      "VIP premiere tickets",
      "Access to Unicorn Realm (virtual reality experience)"
    ]
  }
};


export const getCrystalRoute = (teirName) => `/crystal/${teirName}`;

export const getCrystalCoinRoute = (teirName) => `/nfts/crystal/${teirName}`;
