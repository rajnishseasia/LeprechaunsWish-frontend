import { useEffect, useState } from "react";
import { useReadContracts } from "wagmi";
import appConfig from "@/lib/appConfig";
import NFT_CONTRACT_ABI from "../abi/NFT_CONTRACT_ABI.json";
import { teirs } from "@/lib/utils";
import { formatUnits } from "viem";
import useGetDecimal from "./useGetDecimal";

export default function useTotalVaultValue() {
  const [totalVaultValue, setTotalVaultValue] = useState(0);
  const { stableCoinDecimal } = useGetDecimal();

  // Prepare all read calls for each tier
  const tierIds = teirs.map((t) => t.teirId);

  const { data, isLoading } = useReadContracts({
    contracts: tierIds.map((id) => ({
      address: appConfig.NFT_CONTRACT_ADDRESS,
      abi: NFT_CONTRACT_ABI,
      functionName: "nftTiersMetadata",
      args: [id],
    })),
  });

  useEffect(() => {
    if (!data || data.length === 0) return;

    let total = 0;

    data.forEach((result) => {
      if (result.status === "success" && Array.isArray(result.result)) {
        try {
          const rawPrice = BigInt(result.result[0]);
          const totalSupply = Number(result.result[2]);
          const formattedPrice = parseFloat(
            formatUnits(rawPrice, stableCoinDecimal)
          );
          total += formattedPrice * totalSupply;
        } catch (err) {
          console.error("Error calculating vault value:", err);
        }
      }
    });

    setTotalVaultValue(total);
  }, [data, stableCoinDecimal]);

  return {
    totalVaultValue,
    isLoading,
  };
}
