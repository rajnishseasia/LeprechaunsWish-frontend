import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import CrystalsCard from "@/components/Cards/CrystalCard";
import NftCard from "@/components/NFTS/NftCard";
import { ROUTES } from "@/routes/routes";
import { Crystal } from "@/assets";
import { useSelector } from "react-redux";
import NoDataFound from "@/components/NoDataFound/NoDataFound";
import { teirDescriptions } from "@/lib/utils";
import appConfig from "@/lib/appConfig";
import NFT_CONTRACT_ABI from "../../abi/NFT_CONTRACT_ABI.json";
import { useReadContract } from "wagmi";
import useGetDecimal from "@/hooks/useGetDecimal";
import { formatUnits } from "viem";


function CrystalDetail() {
  const navigate = useNavigate();
  const [saleCrystals, setSaleCrystals] = useState([]);
  const [purchasedCrystals, setPurchasedCrystals] = useState([]);

  const [salePage, setSalePage] = useState(1);
  const [purchasedPage, setPurchasedPage] = useState(1);
  const { teirId, isCrystalSelected } = useSelector((state) => state.global);
  const [descriptionData, setDescriptionData] = useState("");
  const limit = 5;

  const [image, setImage] = useState(Crystal);
  const [name, setName] = useState("Love Token");
  const { selectedCrystalCoinType } = useSelector((state) => state.global);

  const crystalTierId = useMemo(() => {
    return teirId === "4" ? selectedCrystalCoinType?.subTeirId : teirId;
  }, [teirId, selectedCrystalCoinType?.subTeirId]);


  const {
    data: nftCrystalsData,
    refetch: nftCrystalsRefetch
  } = useReadContract({
    address: appConfig.NFT_CONTRACT_ADDRESS,
    abi: NFT_CONTRACT_ABI,
    functionName: "nftTiersMetadata",
    args: [crystalTierId],
  });


  const { stableCoinDecimal } = useGetDecimal();

  useEffect(() => {
    if (nftCrystalsData) {
      const desc = teirDescriptions[teirId];
      const rawPrice = BigInt(nftCrystalsData[0]);
      const price = formatUnits(rawPrice, stableCoinDecimal);

      const startIndex = Number(nftCrystalsData[3]);
      const maxSupply = Number(nftCrystalsData[1]);
      const mintedCount = Number(nftCrystalsData[2]);

      const namePrefix = teirId === 4 || teirId === "4" ? selectedCrystalCoinType?.name : desc?.name;
      const subImage = teirId === 4 || teirId === "4" ? selectedCrystalCoinType?.image : desc?.uri;

      let fullData = [];

      if ((teirId === 4 || teirId === "4") && selectedCrystalCoinType?.subTeirId !== undefined) {
        const start = selectedCrystalCoinType.subTeirId;

        fullData = Array.from({ length: 50 }, (_, i) => {
          const tokenId = start + i;
          return {
            name: `${namePrefix} ${String(tokenId).padStart(5, "0")}`,
            price,
            uri: subImage,
            owner: "",
            minted: mintedCount,
            maxSupply,
            tokenId,
          };
        });
      } else {
        fullData = Array.from({ length: maxSupply }, (_, i) => {
          const tokenId = startIndex + i;
          return {
            name: `${namePrefix} ${String(tokenId).padStart(5, "0")}`,
            price,
            uri: subImage,
            owner: "",
            minted: mintedCount,
            maxSupply,
            tokenId,
          };
        });
      }


      const purchased = fullData.slice(0, mintedCount);
      const forSale = fullData.slice(mintedCount);

      setPurchasedCrystals(purchased);
      setSaleCrystals(forSale);
    }
  }, [nftCrystalsData, stableCoinDecimal, teirId, selectedCrystalCoinType]);

  const paginatedSale = saleCrystals.slice((salePage - 1) * limit, salePage * limit);
  const paginatedPurchased = purchasedCrystals.slice((purchasedPage - 1) * limit, purchasedPage * limit);

  const saleTotalPages = Math.ceil(saleCrystals.length / limit);
  const purchasedTotalPages = Math.ceil(purchasedCrystals.length / limit);




  useEffect(() => {
    if (!teirId) return;

    const desc = teirDescriptions[teirId];
    const nftCardName = teirId === 4 ? selectedCrystalCoinType?.name : desc?.name;
    const nftCardImage = teirId === 4 ? selectedCrystalCoinType?.image : desc?.uri;

    setName(nftCardName);
    setImage(nftCardImage);
    setDescriptionData(desc || "A unique crystal with special properties.");
  }, [teirId]);

  useEffect(() => {
    if (crystalTierId) {
      nftCrystalsRefetch();
    }
  }, [crystalTierId]);


  const handleBack = () => {
    if (!teirId) return;

    const desc = teirDescriptions[teirId];
    if (isCrystalSelected && isCrystalSelected === "true") {
      if (desc?.name === "Crystal" || (teirId === 4 || teirId === "4")) {
        navigate(ROUTES.NFTS);
      }
      else {
        navigate(ROUTES.CRYSTAL);
      }
    } else {
      if (desc?.name === "Crystal" || (teirId === 4 || teirId === "4"))
        navigate(ROUTES.NFTS);
      else
        navigate(ROUTES.HOME);
    }
  };



  return (
    <div>
      <div>
        <h1
          onClick={handleBack}
          className="flex items-center gap-1 text-white md:text-[24px] text-[18px] font-[600] cursor-pointer w-fit"
        >
          <IoIosArrowBack /> Back
        </h1>
      </div>
      <div className="py-6">
        <NftCard name={name} image={image} descriptionData={descriptionData} teirId={teirId} nftDetailsRefetch={nftCrystalsRefetch} nfthere={"false"} />
      </div>
      <div className="flex flex-col justify-center text-center items-center md:pt-[50px] pt-[25px] w-full">
        <h1 className="text-white md:text-[40px] text-[24px] font-[500]">
          {`${name} Owners`}
        </h1>
        <p className="text-white/80 md:text-[20px] font-semibold text-[16px] ">
          Sold {`${purchasedCrystals?.length} / ${saleCrystals?.length + purchasedCrystals?.length}`}
        </p>
      </div>
      <div className="w-full flex flex-col gap-3 justify-center py-[56px]">
        <h2 className="text-white text-2xl font-bold mb-2">Purchased Crystals</h2>
        <div className="flex flex-wrap justify-center gap-[25px] relative">
          {paginatedPurchased?.length === 0 ? (
            <NoDataFound />
          ) : (paginatedPurchased.map((val, idx) => (
            <CrystalsCard val={val} idx={idx} key={`purchased-${val.name}`} type="crystal" saleType={"purchased"} />
          )))}
        </div>
        {/* Pagination for purchased */}
        {purchasedTotalPages > 1 && (
          <div className="flex justify-between items-center mt-4 pb-5 text-white">
            <button disabled={purchasedPage <= 1} className="px-3 sm:px-6 py-2 text-white rounded-full border border-purple-500 hover:bg-purple-800 transition sm:w-[190px] md:text-base text-xs disabled:cursor-not-allowed disabled:bg-transparent disabled:opacity-50"
              onClick={() => setPurchasedPage(p => p - 1)}>Previous</button>
            <span>{purchasedPage}/{purchasedTotalPages}</span>
            <button disabled={purchasedPage >= purchasedTotalPages} className="px-3 sm:px-6 py-2 text-white rounded-full border border-purple-500 hover:bg-purple-800 transition sm:w-[190px] md:text-base text-xs disabled:cursor-not-allowed disabled:bg-transparent disabled:opacity-50"
              onClick={() => setPurchasedPage(p => p + 1)}>Next</button>
          </div>
        )}
      </div>

      <div className="w-full flex flex-col gap-3 justify-center py-[56px]">


        <h2 className="text-white text-2xl font-bold mt-8 mb-2">For Sale</h2>
        <div className="flex flex-wrap justify-center gap-[25px] relative">
          {paginatedSale.map((val, idx) => (
            <CrystalsCard val={val} idx={idx} key={`sale-${val.name}`} type="crystal" saleType={"sale"} />
          ))}
        </div>
        {/* Pagination for sale */}
        {saleTotalPages > 1 && (
          <div className="flex justify-between items-center mt-4 pb-5 text-white">
            <button disabled={salePage <= 1} className="px-3 sm:px-6 py-2 text-white rounded-full border border-purple-500 hover:bg-purple-800 transition sm:w-[190px] md:text-base text-xs disabled:cursor-not-allowed disabled:bg-transparent disabled:opacity-50"
              onClick={() => setSalePage(p => p - 1)}>Previous</button>
            <span>{salePage}/{saleTotalPages}</span>
            <button disabled={salePage >= saleTotalPages} className="px-3 sm:px-6 py-2 text-white rounded-full border border-purple-500 hover:bg-purple-800 transition sm:w-[190px] md:text-base text-xs disabled:cursor-not-allowed disabled:bg-transparent disabled:opacity-50"
              onClick={() => setSalePage(p => p + 1)}>Next</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CrystalDetail;
