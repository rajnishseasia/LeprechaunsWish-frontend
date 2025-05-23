import appConfig from "@/lib/appConfig";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import NFT_CONTRACT_ABI from "../../abi/NFT_CONTRACT_ABI.json";
import { teirs } from "@/lib/utils";
import toast from "react-hot-toast";
import { LuLoader } from "react-icons/lu";
import useGetDecimal from "@/hooks/useGetDecimal";
import { validateAddress } from "@/lib/constants";
import { formatUnits } from "viem";
import { useGetVerifiedStatusQuery, useUpdateKycStatusMutation } from "@/services/api";

function Admin() {
  const { register, watch, setValue } = useForm({
    defaultValues: {
      category: "Love Token",
      available: "100",
      price: "1",
      quantity: 10,
      buyVia: "crypto",
      nftAddress: "",
    },
  });

  const token = localStorage.getItem("token");
  const [updateKycStatus] = useUpdateKycStatusMutation();

  const { data: verifiedStatus, refetch: verifyRefetch } =
    useGetVerifiedStatusQuery(
      {},
      {
        skip: !token,
      }
    );

  console.log(verifiedStatus, "verifiedStatus")

  const { isConnected } = useAccount();
  const [tierId, setTierId] = useState(1);
  const [error, setError] = useState(null); // ⚠️ Error state

  console.log(error, "buy error");

  const {
    data: nftData,
    refetch: nftRefetch,
  } = useReadContract({
    address: appConfig.NFT_CONTRACT_ADDRESS,
    abi: NFT_CONTRACT_ABI,
    functionName: "nftTiersMetadata",
    args: [tierId],
  });

  const { stableCoinDecimal } = useGetDecimal();


  const {
    data: manualMintData,
    writeContract: mintNft,
    isPending: manualMintPending,
    error: mintError,
  } = useWriteContract();

  const { isLoading: mintLoadingNft, isSuccess: mintConfirmNft } =
    useWaitForTransactionReceipt({
      hash: manualMintData,
    });


  const handleManualMint = async () => {
    if (!isConnected) {
      toast.error("Connect wallet.");
      return;
    }

    if (!watch("nftAddress")) {
      toast.error("Enter the NFT address.");
      return;
    }

    if (!validateAddress(watch("nftAddress"))) {
      toast.error("Invalid NFT address");
      return;
    }
    try {
      mintNft({
        abi: NFT_CONTRACT_ABI,
        address: appConfig.NFT_CONTRACT_ADDRESS,
        functionName: "manualMint",
        args: [watch("nftAddress"), tierId, 0],
      });
      console.log(mintError, "mintError");
    } catch (err) {
      console.error("Buy Error:", err);
      setError(err?.message || "Failed to send buy transaction.");
    }
  };

  useEffect(() => {
    if (nftData) {
      const rawPrice = BigInt(nftData[0]);
      const maxSupply = BigInt(nftData[1]);
      const minted = BigInt(nftData[2]);

      const price = formatUnits(rawPrice, stableCoinDecimal);
      setValue("price", price.toString());
      setValue("available", (maxSupply - minted).toString());
    }
  }, [nftData, setValue]);

  useEffect(() => {
    const subscription = watch((value) => {
      const selectedCategory = value.category;
      const selectedTeir = teirs.find((t) => t.name === selectedCategory);
      if (selectedTeir) {
        setTierId(selectedTeir.teirId);
      }
    });

    return () => subscription.unsubscribe();
  }, [watch]);


  useEffect(() => {
    const handleMintConfirmation = async () => {
      if (mintConfirmNft) {
        toast.success("Transaction success.");

        const res = await updateKycStatus({
          walletAddress: watch("nftAddress"),
          token: (watch("category") === "4 Leaf Clover" ? "leaf" : watch("category")?.toLowerCase()),
        });
        console.log(res, "res ")

        if (res.message) {
          verifyRefetch();
        }

        nftRefetch();
      }
    };

    handleMintConfirmation();
  }, [mintConfirmNft]);


  return (
    <div className="max-w-[1280px] md:px-[56px] px-[25px] md:pt-[56px] pt-[25px] md:pb-[133px] pb-[40px] rounded-2xl border border-white/10 bg-white/10 backdrop-blur-[40px] text-white/80 shadow-lg my-5">
      <h2 className="text-2xl font-semibold mb-6">Mint</h2>
      <form className="space-y-6 w-full">
        <div className="flex flex-col gap-4 w-full">
          <div className="flex w-full md:w-[410px gap-5 flex-wrap">
            <div className="w-full md:w-[410px] space-y-3">
              <label htmlFor="category" className="text-sm">
                NFT Categories
              </label>
              <select
                {...register("category")}
                className="md:w-[410px] w-full px-4 py-2 rounded-md bg-[#5b5482] backdrop-blur-[40px] border-white/15 text-white border focus:outline-none"
              >
                {teirs?.map((item) => (
                  <option key={item.teirId} value={item?.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full md:w-[410px] space-y-3">
              <label htmlFor="nftAddress" className=" mb-2 text-sm">
                NFT Address
              </label>
              <input
                type="text"
                placeholder="Enter NFT Address"
                {...register("nftAddress")}
                className="md:w-[410px] w-full px-4 py-2 text-sm rounded-md bg-white/10 backdrop-blur-[40px] border-white/15 text-white border focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-5 w-full">
            <div className="w-full md:w-[410px] space-y-3">
              <label htmlFor="price" className=" mb-2 text-sm">
                Price of NFT
              </label>
              <div className=" flex justify-between gap-2 items-center bg-white/10 backdrop-blur-[40px] border border-white/15 px-4 py-2 rounded-md">
                <input
                  type="text"
                  defaultValue="1000"
                  {...register("price")}
                  readOnly
                  className="md:w-[390px] w-full bg-transparent  text-white  focus:outline-none"
                />
              </div>
            </div>

          </div>
        </div>

        <div className="flex gap-6 mt-4">
          <button
            type="button"
            disabled={mintLoadingNft || manualMintPending}
            onClick={() => handleManualMint()}
            className="px-6 py-2 rounded-full bg-[#210860] hover:bg-purple-800 transition text-white w-[190px] md:text-base text-xs backdrop-blur-[40px] flex items-center justify-center gap-2"
          >
            Mint
            {(mintLoadingNft || manualMintPending) && (
              <LuLoader className="animate-spin" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Admin;
