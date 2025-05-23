import { Crystal } from "@/assets";
import React from "react";
import BuyCard from "../BuyCard/BuyCard";
import { useSelector } from "react-redux";

function NftCard({ name, image, descriptionData, teirId, nftDetailsRefetch, nfthere }) {

  const { selectedCrystalCoinType } = useSelector((state) => state.global);

  const buyTierId = teirId === "4" ? selectedCrystalCoinType?.tokenId : teirId;
  return (
    <div className="flex md:flex-row flex-col bg-white/10 backdrop-blur-[42px] md:gap-3 rounded-[15px] p-[14px]">
      <div className=" flex justify-center md:w-[300px] w-full md:h-[307px] xxs:h-[150px] h-auto rounded-md">
        <img src={image ? image : Crystal} alt="crystal" className=" w-full h-full object-cover rounded-[10px]" />
      </div>
      <div className="w-full md:py-3 md:px-0 px-5 space-y-3 md:w-[600px]">
        <h1 className="text-white md:text-[40px] text-[25px] font-[500]">
          {name}
        </h1>
        <p className="text-white/80 font-[400] md:text-base text-[12px]">
          {descriptionData?.description}
        </p>
        <ul className="list-disc pl-5">
          {descriptionData?.list?.map((item) => (
            <li key={item} className="text-white/80 text-sm md:text-base">
              {item}
            </li>
          ))}
        </ul>
        {descriptionData?.perks &&
          <p className=" text-white text-sm md:text-base">Perks:</p>
        }
        <ul className="list-disc pl-5">
          {descriptionData?.perks?.map((item) => (
            <li key={item} className="text-white text-sm md:text-base">
              {item}
            </li>
          ))}
        </ul>

        {nfthere === "false" &&
          <div className=" mt-4">
            <BuyCard teirId={buyTierId} tokenName={name} nftDetailsRefetch={nftDetailsRefetch} />
          </div>
        }
      </div>
    </div>
  );
}

export default NftCard;
