import { Crystal, Crystal1 } from "@/assets";
import CommonCrystalCard from "@/components/Cards/CommonCrystalCard";
import NftCard from "@/components/NFTS/NftCard";
import { crystalCardData } from "@/lib/constants";
import { teirDescriptions } from "@/lib/utils";
import { ROUTES } from "@/routes/routes";
import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useReadContract } from "wagmi";
import NFT_CONTRACT_ABI from "../../abi/NFT_CONTRACT_ABI.json";
import appConfig from "@/lib/appConfig";
import useGetDecimal from "@/hooks/useGetDecimal";
import { formatUnits } from "viem";
import CrystalSubCard from "@/components/Cards/CrystalSubCard";


function NftCardSection() {
  const navigate = useNavigate();
  const [crystalData, setCrystalData] = useState([]);

  const {
    data: nftCrystalsData,
  } = useReadContract({
    address: appConfig.NFT_CONTRACT_ADDRESS,
    abi: NFT_CONTRACT_ABI,
    functionName: "nftTiersMetadata",
    args: [4],
  });




  const { stableCoinDecimal } = useGetDecimal();

  useEffect(() => {
    if (nftCrystalsData && stableCoinDecimal !== null) {
      const rawPrice = BigInt(nftCrystalsData[0]);
      const price = formatUnits(rawPrice, stableCoinDecimal);

      const startIndex = Number(nftCrystalsData[3]);
      const maxSupply = Number(nftCrystalsData[1]);
      const mintedCount = Number(nftCrystalsData[2]);
      const subCategory = Number(nftCrystalsData[4]);

      const fullData = crystalCardData.slice(0, subCategory).map((item, index) => {
        const tokenId = startIndex + index * 50;

        return {
          name: item.name,
          uri: item.uri,
          price,
          owner: "",
          minted: mintedCount,
          maxSupply,
          tokenId,
        };
      });

      setCrystalData(fullData);
    }
  }, [nftCrystalsData, stableCoinDecimal]);



  const handleBack = () => {
    navigate(ROUTES.HOME);
  };
  return (
    <div>
      <div>
        <h1
          onClick={() => handleBack()}
          className="flex items-center gap-1 text-white md:text-[24px] text-[18px] font-[600] cursor-pointer w-fit"
        >
          <IoIosArrowBack /> Back
        </h1>
      </div>
      <div className="py-6">
        <NftCard name={"Crystal Coin"} image={Crystal} descriptionData={teirDescriptions[4]} nfthere={"true"} />
      </div>
      <div className="flex flex-col justify-center text-center items-center md:pt-[50px] pt-[25px] w-full">
        <h1 className="text-white md:text-[40px] text-[24px] font-[500]">
          Crystal Coin Categories
        </h1>
        <p className="text-white/80 md:text-[18px] text-[12px] font-[400]">
          there are few main subcategories e.g. Blue, Pink, Red, green
        </p>
      </div>
      <div className="w-full flex justify-center py-[56px]">
        <div className="flex flex-wrap justify-center gap-[30px]">
          {crystalData.map((val) => (
            <CrystalSubCard val={val} type={"crystal"} key={val.name} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default NftCardSection;
